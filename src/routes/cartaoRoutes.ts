import { Router } from 'express';
import { CartaoController } from '../controllers/CartaoController';

const router = Router();
const cartaoController = new CartaoController();

router.post('/cartao', (req, res) => cartaoController.criarSolicitacao(req, res));

export { router as cartaoRoutes, cartaoController };