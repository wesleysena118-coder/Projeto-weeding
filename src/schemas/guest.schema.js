const { z } = require('zod');

const cpfRegex = /^\d{3}\. \d{3}\.{3}-\d{2}$/;

const createGuestSchema = z.object({
    name: z.string().min(2, 'Nome muito curto'),
    surname: z.string().min(2, 'Sobrenome muito curto'),
    cpf: z.string().regex(cpfRegex, 'CPF inválido. Use o formato 000.000.000-00'),
    phone: z.string().min(8, 'Telefone inválido'),
    email: z.string().email('E-mail inválido').optional().or(z.literal('')),
    tableNumber: z.coerce.number().int().positive('Nesa deve ser maior que zero')
});

const updateGuestSchema = createGuestSchema.partial();

module.exports = {
    createGuestSchema,
    updateGuestSchema
};