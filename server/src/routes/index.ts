import Router from 'express-promise-router';
import * as api from '../api';

const router = Router();

// TODO: Add actual logic, and define other endpoints
router.post('/login', api.login);

router.post('/signup', api.signup);

router.post('/verify_signup', api.verifySignUp);

router.post('/reset_password', api.resetPassword);
router.post('/verify_reset_password', api.verifyResetPassword);
router.post('/submit_reset_password', api.submitResetPassword);

router.post('/new_car', api.newCar);

router.get('/filter_cars',api.filterCars)

export default router;
