import cluster from 'cluster';
import { availableParallelism } from 'os';

import { initServer } from './server';

if (cluster.isPrimary) {
  initServer();
  for (let i = 0; i < availableParallelism() - 1; i++) {
    cluster.fork();
  }
} else {
  initServer();
}
