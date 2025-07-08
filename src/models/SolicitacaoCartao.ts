export interface SolicitacaoCartaoRequest {
  id_cliente: number;
  nome: string;
}

export interface ConsultaLimiteResponse {
  id_cliente: number;
  limite: number;
}

export interface ConsultaLimiteError {
  erro: string;
}

export interface SolicitacaoCartao {
  id_cliente: number;
  limite_credito: number;
  status: 'SOLICITADO';
}