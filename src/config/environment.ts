import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  rabbitmq: {
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: parseInt(process.env.RABBITMQ_PORT || '5672'),
    user: process.env.RABBITMQ_USER || 'usermq',
    password: process.env.RABBITMQ_PASSWORD || 'usermq',
    filaCartao: process.env.FILA_CARTAO || 'fila-cartao',
    routingKey: process.env.ROUTING_KEY || 'cartao.solicitacao',
    exchangeName: process.env.EXCHANGE_NAME || 'cartao-exchange',
    exchangeType: process.env.EXCHANGE_TYPE || 'direct'
  },
  services: {
    consultaLimite: process.env.URL_CONSULTA_LIMITE || 'http://localhost:3003'
  }
};