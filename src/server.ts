import { Server, createServer } from 'http';
import { URL } from 'url';
import cluster from 'cluster';
import { UUID } from 'crypto';

import 'dotenv/config';

import { users } from './db';
import { CustomResponse } from './models';
import { BASE_ENDPOINT, HttpMethod, resourceIdMethods, strings, uuidRegex } from './constants';
import { normalizeUrl } from './utils/normalizeUrl';
import {
  handleBadRequest,
  handleInvalidMethod,
  handleNotFound,
  handleServerError,
} from './handlers/responseErrorHandlers';
import {
  handleDeleteRequest,
  handleGetUser,
  handleGetUsers,
  handlePostUser,
  handlePutRequest,
} from './handlers/userHandlers';
import { getUserId } from './utils/getUserId';

import { getUserData } from './utils/getUserData';

let envPort: number;

if (cluster.isPrimary) {
  envPort = Number(process.env.PORT) || 8000;
} else if (cluster.isWorker) {
  if (cluster.worker) {
    envPort = cluster.worker?.id + Number(process.env.PORT);
  }
}

export const initServer = (): Server => {
  const server = createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    const sendResponse = (response: CustomResponse) => {
      const { statusCode, body } = response;
      res.statusCode = statusCode;
      res.end(JSON.stringify(body));
    };

    if (!url || !method) {
      handleNotFound(sendResponse, strings.errors.urlOrMethodNotFound);
      return;
    }

    const parsedUrl = new URL(url, `http://${req.headers.host}`).pathname;

    const normalizedUrl = normalizeUrl(parsedUrl);
    const userId = getUserId(normalizedUrl);
    try {
      switch (normalizedUrl) {
        case BASE_ENDPOINT:
          if (method === HttpMethod.GET) {
            handleGetUsers(sendResponse);
          } else if (method === HttpMethod.POST) {
            req.on('data', (chunk) => {
              const userData = getUserData(chunk);

              if (!userData) {
                handleBadRequest(sendResponse, strings.errors.invalidJSON);
                return;
              }

              handlePostUser(sendResponse, userData);
            });
          } else {
            handleInvalidMethod(sendResponse);
          }
          break;
        case `${BASE_ENDPOINT}/${userId}`:
          if (!resourceIdMethods.includes(method)) {
            handleInvalidMethod(sendResponse);
            return;
          }

          const user = users.find((user) => user.id === userId);

          if (!userId) {
            return;
          }

          if (!uuidRegex.test(userId)) {
            handleBadRequest(sendResponse, strings.errors.invalidUserId);
            return;
          }
          if (!user) {
            handleNotFound(sendResponse, strings.errors.noSuchUser);
            return;
          }

          if (method === HttpMethod.GET) {
            handleGetUser(sendResponse, user);
          } else if (method === HttpMethod.PUT) {
            req.on('data', (chunk) => {
              const userData = getUserData(chunk);

              if (!userData) {
                handleBadRequest(sendResponse, strings.errors.invalidJSON);
                return;
              }

              handlePutRequest(sendResponse, userId as UUID, userData);
            });
          } else if (method === HttpMethod.DELETE) {
            handleDeleteRequest(sendResponse, userId as UUID);
          } else {
            handleInvalidMethod(sendResponse);
          }
          break;
        default:
          handleNotFound(sendResponse, 'Invalid endpoint. Try to use /api/users');
          break;
      }
    } catch {
      handleServerError(sendResponse);
    }
  });

  server.listen(envPort, () => {
    console.log(`Server is http://localhost:${envPort}`);
  });

  return server;
};
