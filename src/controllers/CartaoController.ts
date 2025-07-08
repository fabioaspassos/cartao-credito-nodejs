import { Request, Response } from 'express';
import { CartaoService } from '../services/CartaoService';
import { SolicitacaoCartaoRequest } from '../models/SolicitacaoCartao';

export class CartaoController {
  private cartaoService: CartaoService;

  constructor() {
    this.cartaoService = new CartaoService();
  }

  async criarSolicitacao(req: Request, res: Response): Promise<void> {
    try {
      const { id_cliente, nome }: SolicitacaoCartaoRequest = req.body;

      if (!id_cliente || !nome) {
        res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' });
        return;
      }

      await this.cartaoService.processarSolicitacao({ id_cliente, nome });
      
      res.status(201).json({ mensagem: 'Solicitação de cartão criada com sucesso' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      
      if (errorMessage.includes('Cliente não encontrado') || errorMessage.includes('cliente nao existe')) {
        res.status(404).json({ erro: 'Cliente não encontrado' });
        return;
      }
      
      res.status(500).json({ erro: errorMessage });
    }
  }

  async inicializar(): Promise<void> {
    await this.cartaoService.inicializarRabbitMQ();
  }

  async fecharConexoes(): Promise<void> {
    await this.cartaoService.fecharConexoes();
  }
}