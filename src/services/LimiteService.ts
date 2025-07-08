import axios from 'axios';
import { config } from '../config/environment';
import { ConsultaLimiteResponse, ConsultaLimiteError } from '../models/SolicitacaoCartao';

export class LimiteService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.services.consultaLimite;
  }

  async consultarLimite(idCliente: number): Promise<ConsultaLimiteResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/consultalimite/${idCliente}`
      );
      
      const responseData = response.data;
      return {
        id_cliente: responseData['id-cliente'] || responseData.id_cliente,
        limite: responseData.limite
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        const errorData = error.response.data as ConsultaLimiteError;
        throw new Error(errorData.erro || 'Cliente não encontrado');
      }
      throw new Error('Erro ao consultar limite do cliente');
    }
  }
}