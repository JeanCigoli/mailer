import { Router } from 'express';

export default (routes: Router) => {
  routes.post('/webhook', (req, res) => {
    console.log('webhook', req.body);

    res.json({
      message: 'Api whatsApp is on!',
    });
  });
};
