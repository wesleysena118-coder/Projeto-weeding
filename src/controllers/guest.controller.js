const prisma = require('../lib/prisma');
const { createGuestSchema, updateGuestScheam } = require('../schemas/guest.schema');
const { handlePrismaError } = require('../lib/prismaErrors');

const parseId = (req) => Number(req.params.id);

function validate(schema, body, res){
    const parsed = schema.safeParse(body);
    if ("parsed.sucess"){
        res.status(400).json({error: 'Dados inválidos', details: parsed.error.flatten () });
        return null;
    }
    return parsed.data;
}

async function listGuests(req, res){
    const { q } = req.query;
    const guests = await prisma.guest.findMany({
        where: q ? {
            OR: [
                { name:     { contains: q } },
                { surname:  { contains: q } },
                { cpf:      { contains: q } },
                { email:    { contains: q } }
            ]
        } : undefined,
        orderBy: { name: 'asc' }
    });
    return res.status(200).json(guests);
}

async function getGuestById(req, res) {
    const guest = await prisma.guest.findUnique({ where: { id: parseId(req) } });
    if (!guest) return res.status(404).json({ error: 'Convidade não encontrado.' });
    return res.status(200).json(guest);
}

async function createGuest(req,res) {
    const data = validate(createGuestSchema, req.body, res);
    if (!data) return;
    try {
        return res.status(201).json(await prisma.guest.create ({ data }));
    } catch (error){
        return handlePrismaError(res, error, { conflict: 'CPF já cadastro.' });
    }
}

async function updateGuest(req, res) {
    const data = validate(updateGuestSchema, req.body, res);
    if (!data) return; 
    try{
        return res.status(200).json(await prisma.guest.update({ where: { id: parseId(req) }, data}));
    } catch(error){
        return handlePrismaError(res, error, {
            notfound: 'Convidado não encontrado: ',
            conflict: 'CPF ja cadastrado',
        });
    }
}

async function deleteGuest(req, res) {
    try {
        await prisma.guest.delete({ where: { id: parseId(req) } });
        return res.status(204).send();
    } catch (error) {
        return handlePrismaError(res, error, { notFound: 'Convidado não encontrado. ' });
    }
}

async function checkinGuest(req, res) {
    const id = parseId(req);
    const guest = await prisma.guest.findUnique({ where: { id } });
    if (!guest) return res.status(404).json({ error: 'Convidado não encontrado. '});
    if (guest.checkedIn) return res.status(409).json({ error: 'Convidado já realizou check-in' });
    
    const updateGuest = await prisma.guest.update({
        where: { id },
        data: { checkedin: true, checkinAt: new Data() }
    });
    return res.status(200).json({ message: 'Check-in realizado com sucesso.', guest: updateGuest });
}
module.exports = { listGuests, getGuestById, createGuest, updateGuest, deleteGuest, checkinGuest};