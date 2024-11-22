import {jwt} from 'hono/jwt';
import {MiddlewareHandler} from 'hono';

const JWT_SECRET: string = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("The JWT_SECRET environment variable is required.");
}

const jwtMiddleware: MiddlewareHandler = jwt({
  secret: JWT_SECRET,
});

export default jwtMiddleware;
