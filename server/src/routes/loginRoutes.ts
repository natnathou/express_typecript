import express, { Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
	body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
	if (req.session && req.session.loggedIn) {
		next();
		return;
	}

	res.status(403);
	res.send('Not permitted');
}

const router = express.Router();

router.get('/login', (req: Request, res: Response) => {
	res.send(`
  <form method="Post">
    <div>
      <label>Email</label>
      <input name="email" />
    </div>
    <div>
      <label>Password</label>
      <input name="password" type="password"  autocomplete="on"/>
    </div>
    <button>Submit</button>
  </form>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
	const { email, password } = req.body;

	if (
		email &&
		password &&
		email === 'ne.zaffran@gmail.com' &&
		password === '1'
	) {
		req.session = { loggedIn: true };
		res.redirect('/protected');
	} else {
		res.send(`Invalid email or password`);
	}
});

router.get('/', (req: Request, res: Response) => {
	if (req.session && req.session.loggedIn) {
		res.send(`
    <div>
      <div>You are logged in</div>
      <a href="/logout">Logout</a>
    </div>
    `);
	} else {
		res.send(`
    <div>
      <div>Please logged in</div>
      <a href="/login">Login</a>
    </div>
    `);
	}
});

router.get('/logout', (req: Request, res: Response) => {
	req.session = null;
	res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
	res.send('Protected');
});
export { router };
