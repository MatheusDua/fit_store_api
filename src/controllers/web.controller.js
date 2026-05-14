import ProdutoService from '../services/produto.service.js';
import FuncionarioService from '../services/funcionario.service.js';

class WebController {
    static async listarCatalogo(req, res) {
        try {
            const busca = req.query.busca || '';
            const produtos = await ProdutoService.getAll(busca);

            res.render('produtos', { produtos, busca, mostrarBusca: true });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno ao carregar a vitrine.');
        }
    }

    static async listarProdutoUnico(req, res) {
        try {
            const id = req.params.id;
            const produto = await ProdutoService.getById(id);

            if (produto.cadastradoPor) {
                try {
                    const funcionario = await FuncionarioService.getById(produto.cadastradoPor);
                    produto.nomeAutor = funcionario.nome;
                } catch (err) {
                    produto.nomeAutor = 'Usuário Desconhecido';
                }
            }

            res.render('produto_detalhe', { produto });
        } catch (error) {
            res.status(404).send('Produto não encontrado na vitrine.');
        }
    }

    static async listarEquipe(req, res) {
        try {
            const funcionarios = await FuncionarioService.getAll();
            res.render('funcionarios', { funcionarios });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno ao carregar a lista de funcionários.');
        }
    }
}

export default WebController;

