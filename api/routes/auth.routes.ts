import {Hono} from 'hono';
import {JwtVariables} from 'hono/dist/types/middleware/jwt';
import {authService} from '../services/auth.service';
import {deleteCookie, setCookie,} from 'hono/cookie'

const COOKIE_NAME: string = process.env.COOKIE_NAME as string;

if (!COOKIE_NAME) {
  console.error("\nThe COOKIE_NAME environment variable is required.\n");
  process.exit(1);
}

export function registerAuthRoutes(app: Hono<{ Variables: JwtVariables }>) {

  app.post('/register', async (c) => {
    const data = await c.req.json();
    const newUser = await authService.register(data);
    return c.json(newUser, 201);
  });

  app.post('/auth', async (c) => {
    const {username, password} = await c.req.json();
    const token = await authService.login(username, password);
    if (token) {
      setCookie(
        c,
        COOKIE_NAME,
        token,
        {
          path: '/',
          secure: true,
          httpOnly: true,
          maxAge: 3600,
        }
      );
      return c.json({message: 'Success'}, 200);
    }
    return c.status(401);
  });

  app.post('/logout', (c) => {
    deleteCookie(c, COOKIE_NAME);
    return c.json({}, 200);
  });
}
