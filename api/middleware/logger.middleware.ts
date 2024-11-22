import {MiddlewareHandler} from "hono";
import {logger} from "hono/logger";

const loggerMiddleware: MiddlewareHandler = logger();

export default loggerMiddleware;
