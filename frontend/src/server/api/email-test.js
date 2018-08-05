import { get } from 'lodash';
import express from 'express';

import { renderEmail } from '../../common/utils/email.js';

// import mailClient from '../../common/mail-client.js';

export default () => {
  const router = express.Router();
  router.get('/email-test', (req, res) => {
    const template = get(req, 'query.t') || 'welcome';
    const email = 'zirho6@gmail.com';
    const html = renderEmail(template, { user: { email } });
    // const msg = {
    //   to: email,
    //   from: email,
    //   subject: `Welcome ${email}`,
    //   text: 'welcome!',
    //   html,
    // };

    // mailClient.send(msg);
    res.send(html);
  });
  return router;
};
