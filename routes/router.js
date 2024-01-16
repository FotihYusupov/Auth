const { Router } = require('express');
const userController = require('../controllers/userController');
const cardController = require('../controllers/cardsController');
const storyController = require('../controllers/storyController');
const authMiddleware = require('../middlewares/authMiddlwware');

const router = Router();

// users routes
router.post('/sign-in', userController.register);
router.post('/log-in', userController.login);
router.get('/user', authMiddleware, userController.getUserCards);
router.get('/get-me', authMiddleware, userController.getMe);

// cards routes
router.get('/new-card', authMiddleware, cardController.addCard);
router.post('/transfer', cardController.transfers);
router.get('/card/:cardNumber', cardController.getCardsCardNumber);
router.get('/user-cards', authMiddleware, cardController.getCardsCardUserId);
router.get('/get-cards', cardController.getAllCards);
router.get('/restore/:cardNumber', cardController.restoreCard);

// story routes
router.get('/story/:cardNumber', storyController.getCardStory);

module.exports = router;
