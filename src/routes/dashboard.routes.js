const express = require ('express');
const { getDashboard } = require ('../controllers/dashboard.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { roleMiddleware } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', roleMiddleware ('ADMIN', 'STAFF'), getDashboard);

module.exports = router;