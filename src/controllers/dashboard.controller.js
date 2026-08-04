const prisma = require('../lib/prisma');

async function getDashboard(req, res) {
    const totalGuests = await prisma.guest.count();
    const checkedIn = await prisma.guest.count({ where: { checkedIn: true } });
    const pending = await prisma.guest.count({ where: { checkedIn: false} });

    const presenceRate = totalGuests === 0 
    ? 0
    : Number (((checkedIn / totalGuests) * 100).toFixed(2));

    const recentCheckins = await prisma.guest.findMany({
        where: { checkedIn: true},
        select: {
            id: true,
            name: true,
            surname: true,
            tableNumber: true,
            checkinAt: true
        },
        orderBy: { checkinAt: 'desc'},
        take: 5
    });
    return res.status(200).json({
        totalGuests,
        checkedIn,
        pending,
        presenceRate,
        recentCheckins
    });
}
module.exports = { getDashboard}