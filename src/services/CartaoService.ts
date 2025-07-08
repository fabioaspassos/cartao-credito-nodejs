import { SolicitacaoCartaoRequest, SolicitacaoCartao } from '../models/SolicitacaoCartao';
import { LimiteService } from './LimiteService';
import { RabbitMQService } from './RabbitMQService';

export class CartaoService {
  private limiteService: LimiteService;
  private rabbitMQService: RabbitMQService;

  constructor() {
    this.limiteService = new LimiteService();
    this.rabbitMQService = new RabbitMQService();
  }

  async processarSolicitacao(request: SolicitacaoCartaoRequest): Promise<void> {
    const { id_cliente, nome } = request;

    if (!id_cliente || !nome) {
      throw new Error('Campos obrigatórios não preenchidos');
    }

    const limiteResponse = await this.limiteService.consultarLimite(id_cliente);

    const solicitacao: SolicitacaoCartao = {
      id_cliente,
      limite_credito: limiteResponse.limite,
      status: 'SOLICITADO'
    };

    await this.rabbitMQService.enviarSolicitacao(solicitacao);
  }

  async inicializarRabbitMQ(): Promise<void> {
    await this.rabbitMQService.connect();
  }

  async fecharConexoes(): Promise<void> {
    await this.rabbitMQService.close();
  }
}