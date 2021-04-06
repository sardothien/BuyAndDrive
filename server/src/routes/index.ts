import Router from 'express-promise-router';
import * as api from '../api';

const router = Router();


// TODO: Add actual logic, and define other endpoints
router.post('/login', api.login);


export default router;
