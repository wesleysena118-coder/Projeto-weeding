function handlePrismaError(res, error, { notfound =  'Registro não encontrado', conflict = 'Registro duplicado.'} = {}) {
 if (error.code === 'P2025') return res.status(404).json({ error: notFound });
 if (error.code === 'P2002') return res.status(409).json({ error: conflict });
 return res.status(500).json({ error: 'Erro interno do servidor.' });
}

module.exports = { handlePrismaError};
