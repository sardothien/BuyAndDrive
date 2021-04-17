import Router from 'express-promise-router';
import * as api from '../api';

const router = Router();

// TODO: Add actual logic, and define other endpoints
router.post('/login', api.login);

router.post('/signup', api.signup);

router.post('/verify_signup', api.verifySignUp);

router.post('/reset_password', api.resetPassword);
router.post('/verify_reset_password', api.verifyResetPassword);


export default router;
