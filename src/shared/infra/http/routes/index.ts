import { Router, Request, Response } from 'express';

import path from 'path';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import courtsRouter from '@modules/places/infra/http/routes/courts.routes';
import creditCardsRouter from '@modules/places/infra/http/routes/creditcards.routes';
import placesRouter from '@modules/places/infra/http/routes/places.routes';
import materialsRouter from '@modules/places/infra/http/routes/material.routes';
import appointmentsRouter from '@modules/places/infra/http/routes/appointments.routes';
import sportsRouter from '@modules/places/infra/http/routes/sports.routes';
import paymentDataRouter from '@modules/places/infra/http/routes/paymentdata.routes';
import tournamentsRouter from '@modules/places/infra/http/routes/tournaments.routes';
import termsRouter from '@modules/places/infra/http/routes/terms.routes';
import vouchersRouter from '@modules/vouchers/infra/http/routes/vouchers.routes';
import eventRouter from '@modules/events/infra/http/routes/events.routes';
import storeRouter from '@modules/store/infra/http/routes/store.routes';
import clubRouter from '@modules/club/infra/http/routes/club.routes';
import teacherRouter from '@modules/teachers/infra/http/routes/teachers.routes';
import interestsRouter from '@modules/interests/infra/http/routes/interests.routes';
import payersRouter from '@modules/payers/infra/http/routes/payers.routes';
import monthlyRouter from '@modules/monthly/infra/http/routes/monthly.routes';
import paymentsRouter from '@modules/payments/payments.routes';
import chatRouter from '@modules/chat/infra/http/routes/chat.routes';
import dayUseRouter from '@modules/day_use/infra/http/routes/dayuse.routes';
import monthlyPlayerMissedDaysRouter from '@modules/monthly/infra/http/routes/monthlyPlayerMissedDays.routes';
import privacyPolicyRouter from '@modules/privacy_policy/infra/http/routes/privacy_policy.routes';
import experimentalClassesRouter from '@modules/experimental_classes/infra/http/routes/experimentalclasses.routes';
import notificationRouter from '@modules/notifications/infra/http/routes/notifications.routes';
import watchRecordingRouter from '@modules/watchrecording/watchrecording.routes';
import cancelationRulesRouter from '@modules/cancelation_rules/infra/http/routes/cancelation_rules.routes';
import scoreRouter from '@modules/score/infra/http/routes/score.routes';
import fs from 'fs';
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/score', scoreRouter);
routes.use('/dayuse', dayUseRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/places', placesRouter);
routes.use('/courts', courtsRouter);
routes.use('/creditCards', creditCardsRouter);
routes.use('/paymentData', paymentDataRouter);
routes.use('/materials', materialsRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/sports', sportsRouter);
routes.use('/terms', termsRouter);
routes.use('/vouchers', vouchersRouter);
routes.use('/events', eventRouter);
routes.use('/store', storeRouter);
routes.use('/club', clubRouter);
routes.use('/teachers', teacherRouter);
routes.use('/interests', interestsRouter);
routes.use('/payers', payersRouter);
routes.use('/payments', paymentsRouter);
routes.use('/monthly', monthlyRouter);
routes.use('/chat', chatRouter);
routes.use('/tournaments', tournamentsRouter);
routes.use('/missedDays', monthlyPlayerMissedDaysRouter);
routes.use('/privacyPolicy', privacyPolicyRouter);
routes.use('/experimentalClasses', experimentalClassesRouter);
routes.use('/watchRecording', watchRecordingRouter);
routes.use('/notifications', notificationRouter);
routes.use('/cancelationRules', cancelationRulesRouter);

routes.get('/files/:name', function (req: Request, res: Response) {
  const options = {
    root: path.join(__dirname, '..', '..', '..', 'assets'),

    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  const fileName = req.params.name;
  res.sendFile(fileName, options);
});

routes.post('/vindi_webhook', function (req: Request, res: Response) {
  console.log('recebi uma chamada');
  console.log(req.body)
  const requestBody = JSON.stringify(req.body);
  fs.writeFile('request.txt', requestBody, err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log('Request body written to file');
      res.sendStatus(200);
    }
  });
  res.json({ ok: true });
});

export default routes;
