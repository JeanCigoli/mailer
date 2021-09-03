import { Router } from 'express';

export default (routes: Router) => {
  routes.get('/health', (_, res) => {
    res.json({
      message: 'API ON',
    });
  });
};
