import Router from "express";
import authControllers from "./authControllers.js";
import {body, check} from "express-validator";
import authMiddleware from "./middleware/auth-middleware.js";

const router = new Router();

router.post('/registration', [
    body('email').isEmail(),
    check('name', "This field can't be empty!").notEmpty(),
    check('password', "Min length of password id 4 symbols").isLength({min: 4})
], authControllers.registration)
router.post('/login', authControllers.login)
router.post('/role', authControllers.role)
router.post('/logout', authControllers.logout);
router.get('/activate/:link', authControllers.activate);
router.get('/refresh', authControllers.refresh);
router.get('/users', authMiddleware, authControllers.findUsers)
router.delete('/delete', authMiddleware, authControllers.delete)

export default router;