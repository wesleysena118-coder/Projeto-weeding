const express = require('express');
const cors = require('cors');

const prisma = require('./lib/prisma');

const authRoutes = require('./routes/auth.routes');
const guestRoutes = require('./routes/guest.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const {notFoundMiddleware} = require('./middlewares/notFound.middleware');
const { errorMiddleware} = require('./middlewares/error.middleware');

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || '*'
    })
);

app.use(express.json());

app.get('/health', async (req, res) => {
    const users = await prisma.user.count();
    const guests = await prisma.guest.count();
    return res.status(200).json({
        status: 'ok',
        users,
        guests
    });
});

app.use('/auth', authRoutes);
app.use('/guests', guestRoutes);
app.use('/dashboard', dashboardRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;