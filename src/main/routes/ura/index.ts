import { Router } from 'express';
import { makeResponseXml } from '../../../utils/response/response-xml';
import { adaptMiddlewareXml } from '../../adapters/adapt-middleware-xml';
import { makeXmlParser } from '../../factories/middlewares/ura';

export default (routes: Router) => {
  routes.post('/', adaptMiddlewareXml(makeXmlParser()), (req, res) => {
    // console.log('CONTROLLER', req.body);

    const objTest = {
      name: 'Emanoel',
      colors: [
        {
          name: 'RED',
          value: 1,
        },
        {
          name: 'BLACK',
          value: 10,
        },
      ],
    };

    res.send(makeResponseXml(objTest));
  });
};
