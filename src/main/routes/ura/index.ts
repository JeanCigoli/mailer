import { Router } from 'express';
import { adaptMiddlewareXml } from '../../adapters/adapt-middleware-xml';
import { makeXmlParser } from '../../factories/middlewares/ura';

export default (routes: Router) => {
  routes.get('/', adaptMiddlewareXml(makeXmlParser()), (req, res) => {
    console.log('CONTROLLER', req.body);

    res.json({
      message: 'API ON',
    });
  });
};
