import { Router } from 'express';
import FuncionarioController from '../controllers/funcionario.controller.js';
import { criarFuncionarioValidation, atualizarFuncionarioValidation } from '../validators/funcionario.validator.js';

const router = Router();

router.get('/', FuncionarioController.getAll);
router.get('/:id', FuncionarioController.getById);
router.post('/', criarFuncionarioValidation, FuncionarioController.contratar);
router.patch('/:id', atualizarFuncionarioValidation, FuncionarioController.atualizar);
router.delete('/:id', FuncionarioController.inativar);

export default router;

