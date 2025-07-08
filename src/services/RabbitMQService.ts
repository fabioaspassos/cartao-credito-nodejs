import amqp, { Connection, Channel } from 'amqplib';
import { config } from '../config/environment';
import { SolicitacaoCartao } from '../models/SolicitacaoCartao';

export class RabbitMQService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  async connect(): Promise<void> {
    try {
      const connectionUrl = `amqp://${config.rabbitmq.user}:${config.rabbitmq.password}@${config.rabbitmq.host}:${config.rabbitmq.port}`;
      this.connection = await amqp.connect(connectionUrl);
      this.channel = await this.connection.createChannel();
      
      await this.channel.assertExchange(
        config.rabbitmq.exchangeName,
        config.rabbitmq.exchangeType,
        { durable: true }
      );
      
      await this.channel.assertQueue(config.rabbitmq.filaCartao, { durable: true });
      
      await this.channel.bindQueue(
        config.rabbitmq.filaCartao,
        config.rabbitmq.exchangeName,
        config.rabbitmq.routingKey
      );
    } catch (error) {
      console.error('Erro ao conectar com RabbitMQ:', error);
      throw error;
    }
  }

  async enviarSolicitacao(solicitacao: SolicitacaoCartao): Promise<void> {
    if (!this.channel) {
      throw new Error('RabbitMQ não está conectado');
    }

    try {
      const message = Buffer.from(JSON.stringify(solicitacao));
      
      this.channel.publish(
        config.rabbitmq.exchangeName,
        config.rabbitmq.routingKey,
        message,
        { persistent: true }
      );
    } catch (error) {
      console.error('Erro ao enviar solicitação para a fila:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
    } catch (error) {
      console.error('Erro ao fechar conexão com RabbitMQ:', error);
    }
  }
}