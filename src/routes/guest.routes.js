const express = require ('express');
const{
    listGuests,
    getGuestById,
    createGuest,
    updateGuest,
    deleteGuest,
    checkinGuest
} = require ('../controllers/guest.controller');

const { authMiddleware } = require ('../middlewares/auth.middleware');
const { roleMiddleware } = require ('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roleMiddleware('ADMIN', 'STAFF'), listGuests);
router.get('/:id', roleMiddleware('ADMIN', 'STAFF'), getGuestById);
router.get('/', roleMiddleware('ADMIN'), createGuest);
router.get('/:id', roleMiddleware('ADMIN'), updateGuest);
router.get('/:id', roleMiddleware('ADMIN'), deleteGuest);
router.get('/:id/checkin', roleMiddleware('ADMIN', 'STAFF'), checkinGuest);

module.exports = router;