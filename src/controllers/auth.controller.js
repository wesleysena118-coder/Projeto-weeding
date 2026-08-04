const bcrypt = require ('bcryptjs');
const jwt    = require ('jsonwebtoken');
const prisma = require ('../lib/prisma');
const { loginSchema, registerSchema } = require('../schemas/auth.schema');

async function register(req,res) {
    try {
        const data = registerSchema.parse(req.body);

        const exists = await prisma.user.findUnique({ where: {email: data.email} });
        if (exists) return res.status(400).json({ error: 'Usuário já existe'}); 
        
        await prisma.user.create({
            data: {
                name:       data.name,
                cpf:        Date.now().toString(),
                email:      data.email,
                password:   await bcrypt.hash(data.password, 10),
                role:       'ADMIN'
            }
        });

        return res.status(201).json({ message : 'Usuário criado com sucesso'});
    }   catch (error) {
        return res.status(500).json({ error: error.message});
    }
}
    
async function login(req,res) {
    try{
        const data = loginSchema.parse(req.body);
        const user = await prisma.user.findFirst({where: {email: data.email}});

        const valid = user && await bcrypt.compare(data.password, user.password);
        if (!valid)  return res.status(401).json({ error: 'Email ou senha inválidos'});

        const token = jwt.sign({ id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: 'id'});
        return res.status(200).json({ token, user: {id: user.id, name: user.name, email: user.email, role: user.role}});    
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

module.exports = {register, login};