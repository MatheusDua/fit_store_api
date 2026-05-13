import { Router } from 'express';
import WebController from '../controllers/web.controller.js';

const router = Router();

router.get('/vitrine', WebController.listarCatalogo);
router.get('/vitrine/:id', WebController.listarProdutoUnico);

export default router;

