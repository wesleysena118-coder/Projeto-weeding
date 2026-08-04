    function notFoundMiddleware(req, res){
        return res.status(404).json({ error: 'Rota não encontrado.'});
    }

    module.exports = { notFoundMiddleware};