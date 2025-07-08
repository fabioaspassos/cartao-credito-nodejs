import { app } from './app';
import { config } from './config/environment';
import { cartaoController } from './routes/cartaoRoutes';

async function startServer() {
  try {
    await cartaoController.inicializar();
    
    app.listen(config.port, () => {
      console.log(`Servidor rodando na porta ${config.port}`);
      console.log(`Ambiente: ${config.nodeEnv}`);
    });

    const gracefulShutdown = async () => {
      console.log('Encerrando servidor...');
      await cartaoController.fecharConexoes();
      process.exit(0);
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  } catch (error) {
    console.error('Erro ao inicializar servidor:', error);
    process.exit(1);
  }
}

startServer();