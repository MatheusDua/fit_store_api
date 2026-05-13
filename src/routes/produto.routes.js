import { Router } from 'express';
import ProdutoController from '../controllers/produto.controller.js';
import {
    regrasValidacaoProduto,
    regrasValidacaoID,
    regrasValidacaoQuantidade
} from '../validators/produto.validator.js';

const router = Router();

router.get('/produtos', ProdutoController.getAll);
router.get('/produtos/:id', regrasValidacaoID, ProdutoController.getById);

router.post('/produtos', regrasValidacaoProduto, ProdutoController.create);
router.put('/produtos/:id', regrasValidacaoID, regrasValidacaoProduto, ProdutoController.update);

router.patch('/produtos/:id/vender', regrasValidacaoID, regrasValidacaoQuantidade, ProdutoController.vender);
router.patch('/produtos/:id/repor', regrasValidacaoID, regrasValidacaoQuantidade, ProdutoController.repor);
router.patch('/produtos/:id/inativar', regrasValidacaoID, ProdutoController.inativar);

router.delete('/produtos/:id', regrasValidacaoID, ProdutoController.delete);

export default router;