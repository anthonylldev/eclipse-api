import {MiddlewareHandler} from "hono";
import {cors} from "hono/cors";

const CORS_ORIGIN: string = process.env.CORS_ORIGIN as string;
const CORS_METHODS: string = process.env.CORS_METHODS as string;

if (!CORS_ORIGIN || !CORS_METHODS) {
  console.error("\nThe CORS_ORIGIN and CORS_METHODS environment variables is required.\n");
  process.exit(1);
}

const corsMiddleware: MiddlewareHandler = cors({
  origin: CORS_ORIGIN,
  credentials: true,
  allowMethods: CORS_METHODS.split(","),
});

export default corsMiddleware;
