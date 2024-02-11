import { UUID } from 'crypto';

export interface UserData {
  name: string;
  age: number;
  hobbies: string[];
}

export interface User extends UserData {
  id: UUID;
}

export interface CustomResponse {
  statusCode: number;
  body: string | User | User[];
}

export interface SendResponseFunction {
  (response: CustomResponse): void;
}
