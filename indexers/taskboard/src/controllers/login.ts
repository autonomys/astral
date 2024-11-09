import { Request, Response, urlencoded } from "express";
import { QUEUES, ROUTES, VIEWS } from "../constants";

export const indexController = (req, res) => {
  res.render("login", { invalid: false });
};

export const loginController = urlencoded({ extended: true });
(req: Request, res: Response) => {
  const { username, password } = req.body;
  if (
    username === process.env.BULL_USERNAME &&
    password === process.env.BULL_PASSWORD
  ) {
    req.session.authenticated = true;
    res.redirect(ROUTES.DASHBOARD);
  } else res.render(VIEWS.LOGIN, { invalid: true });
};

export const dashboardController = (req: Request, res: Response) => {
  if (req.session.authenticated)
    res.render(VIEWS.DASHBOARD, { queues: QUEUES });
  else res.redirect(ROUTES.LOGIN);
};
