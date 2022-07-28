import express, { Router } from 'express';

import SetupController from '../../controllers/setup/setup.controller';

const router = Router({ mergeParams: true });

router.route('/').get((req, res, next): express.Response => {
  return res.status(200).send('This is the setup!');
});

router.route('/players').get(SetupController.getPlayers);

router.route('/players').post(SetupController.setPlayers);

router.route('/questions').get(SetupController.getQuestions);

router.route('/questions').post(SetupController.setQuestions);

export default router;
