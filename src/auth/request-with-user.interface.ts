// src/auth/request-with-user.interface.ts

import { Request } from 'express';
import { JwtPayload } from './jwt-payload.interface'; // Import JwtPayload

export interface RequestWithUser extends Request {
  user: JwtPayload; // Attach the user property with the JwtPayload type
}
