import Router from 'express-promise-router';
import * as api from '../api';
const router = Router();

router.post('/login', api.login);

router.post('/signup', api.signup);

router.post('/verify_signup', api.verifySignUp);

router.post('/oauth_google', api.googleOAuth);

router.post('/reset_password', api.resetPassword);
router.post('/verify_reset_password', api.verifyResetPassword);
router.post('/submit_reset_password', api.submitResetPassword);

router.put('/new_car/image/:carId', api.putCarImage);
router.post('/new_car', api.newCar);


router.post('/add_favourite', api.postFavourite);
router.delete('/remove_favourite/:carId/:userId', api.delFavourite);
router.get('/favourites', api.getFavourites);

router.get('/filter_cars',api.filterCars);

router.patch('/approve_cars/:carId', api.approveCarById);
router.get('/approve_cars', api.approveCars);

router.delete('/reject_cars/:carId/:reason', api.rejectCarById);

router.get('/users_cars', api.getUsersCars);

router.patch('/buy_car/:carId', api.buyCar);

router.get('/image_path', api.getImagesPathByCarId);
router.get('/image', api.getImage);

export default router;
