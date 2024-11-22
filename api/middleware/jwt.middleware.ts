import {jwt} from 'hono/jwt';
import {MiddlewareHandler} from 'hono';

const JWT_SECRET: string = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  console.error("\nThe JWT_SECRET environment variable is required.\n");
  process.exit(1);
}

const jwtMiddleware: MiddlewareHandler = jwt({
  secret: JWT_SECRET,
});

export default jwtMiddleware;
