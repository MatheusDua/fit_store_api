import ProdutoService from '../services/produto.service.js';

class WebController {
    static async listarCatalogo(req, res) {
        try {
            const busca = req.query.busca || '';
            const produtos = await ProdutoService.getAll(busca);

            res.render('produtos', { produtos, busca });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno ao carregar a vitrine.');
        }
    }

    static async listarProdutoUnico(req, res) {
        try {
            const id = req.params.id;
            const produto = await ProdutoService.getById(id);

            res.render('produto_detalhe', { produto });
        } catch (error) {
            res.status(404).send('Produto não encontrado na vitrine.');
        }
    }
}

export default WebController;

