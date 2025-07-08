# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js microservice for credit card processing (`microservico-cartao-credito`) built with TypeScript and Express.js. The project follows a layered architecture with RabbitMQ for message queuing and external API integration for limit consultation.

## Architecture Structure

```
src/
├── config/        # Application configuration
├── controllers/   # HTTP request handlers
├── middleware/    # Express middleware
├── models/        # Data models and validation
├── routes/        # API endpoint definitions
├── services/      # Business logic and external integrations
└── utils/         # Helper functions
```

## Key Technologies

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js v5.1.0
- **Message Queue**: RabbitMQ (amqplib)
- **HTTP Client**: Axios
- **Security**: Helmet middleware
- **Testing**: Jest with ts-jest
- **Development**: ts-node-dev

## Environment Configuration

Required environment variables (see `.env.example`):
- `PORT=3000` - Server port
- `NODE_ENV=development` - Environment mode
- `RABBITMQ_URL=amqp://localhost:5672` - RabbitMQ connection
- `FILA_CARTAO=fila-cartao` - Message queue name
- `ROUTING_KEY=cartao.solicitacao` - Rounting key
- `EXCHANGE_NAME=cartao-exchange` - Exchange name
- `EXCHANGE_TYPE=direct` - Exchange type
- `URL_CONSULTA_LIMITE=http://localhost:3003` - External limit check service



## Development Setup

**Current Status**: Project structure is set up but requires initial configuration:

1. Create `tsconfig.json` for TypeScript configuration
2. Add build scripts to `package.json`
3. Configure Jest for testing
4. Implement source code in structured directories
5. Set up proper `.gitignore` file

## Common Commands

**Note**: The project currently only has a placeholder test script. You will need to add proper build and development scripts to `package.json`.

Expected commands once configured:
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests with Jest
- `npm run test:watch` - Run tests in watch mode

## Integration Points

- **RabbitMQ**: Used for asynchronous message processing
- **External APIs**: HTTP client for limit consultation service
- **CORS**: Configured for cross-origin requests
- **Security**: Helmet middleware for security headers

## Module System

Uses CommonJS (`"type": "commonjs"`) with TypeScript compilation to JavaScript output in `dist/` directory.