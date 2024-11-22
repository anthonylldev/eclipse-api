import {Hono} from 'hono';
import {JwtVariables} from 'hono/dist/types/middleware/jwt';
import {authService} from '../services/auth.service';
import {deleteCookie, setCookie,} from 'hono/cookie'

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
        process.env.COOKIE_NAME as string,
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
    deleteCookie(c, process.env.COOKIE_NAME as string);
    return c.json({}, 200);
  });
}
