import { Router } from 'express';
import { makeResponseXml } from '../../../utils/response/response-xml';
import { adaptMiddlewareXml } from '../../adapters/adapt-middleware-xml';
import { makeXmlParser } from '../../factories/middlewares/ura';

export default (routes: Router) => {
  routes.post('/', adaptMiddlewareXml(makeXmlParser()), (req, res) => {
    // console.log('CONTROLLER', req.body);

    const objTest = {
      voice: {
        total: 1000,
        available: 1000,
        used: 0,
      },
      sms: {
        total: 0,
        available: 0,
        used: 0,
      },
      data: {
        total: 750,
        available: 750,
        used: 0,
      },
    };

    res.send(makeResponseXml(objTest));
  });
};
