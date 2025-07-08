# Microserviço Cartão de Crédito (Exemplo)

## 1. Prompt Chain-of-thought

> Utilizado para guiar o desenvolvimento deste projeto:

```
Vamos criar um microserviço em Node.js com TypeScript, que segue o fluxo abaixo.
A arquitetura deve usar uma estrutura de pastas comum para microsserviços.
Use a biblioteca amqplib para interação com RabbitMQ.

Etapa 1 – Receber solicitação de novo cartão de crédito
    Criar um endpoint HTTP POST /cartao que receba um JSON com idCliente (número) e nome (string).
    O endpoint deve validar se os campos foram preenchidos. Se não, retornar erro 400.

Etapa 2 – Consultar serviço externo de limite de crédito
    Após validação, o microserviço deve fazer uma requisição GET para o endpoint:
    URL_CONSULTA_LIMITE/consultalimite/:id
    Se o retorno for HTTP 200, o JSON será:
        { "id-cliente": 99, "limite": 99.99 }
    Se o retorno for HTTP 404, a resposta será:
        { "erro": "cliente nao existe" }
    Nesse caso, o microserviço deve responder com erro 404 e mensagem apropriada.

Etapa 3 – Enviar solicitação para a fila RabbitMQ
    Se o cliente for encontrado, criar um objeto SolicitacaoCartao com:
        idCliente,
        limiteCredito,
        status: 'SOLICITADO'
    Enviar o objeto como mensagem para a fila chamada FILA_CARTAO, no RabbitMQ rodando em localhost:5672.

Outras instruções:
Utilize axios para chamada HTTP externa.
Crie separação de responsabilidades entre controller, service e client HTTP.
O código deve ser modular e fácil de testar.
Escreva apenas o código necessário para o funcionamento desse fluxo.
```

---

## 2. Descrição

Microserviço em Node.js/TypeScript que recebe solicitações de cartão de crédito, consulta limite em serviço externo e envia para RabbitMQ.

---

## 3. Fluxo da Aplicação

### 3.1 Receber solicitação de novo cartão de crédito

- Endpoint: `POST /cartao`
- Payload esperado:

```json
{
  "idCliente": 123,
  "nome": "Fulano de Tal"
}
```

- Resposta em caso de sucesso:

```json
{
  "mensagem": "Solicitação recebida com sucesso"
}
```

- Resposta em caso de erro de validação:

```json
{
  "erro": "Campos obrigatórios não preenchidos"
}
```

### 3.2 Consultar serviço externo de limite de crédito

- Requisição GET para:  
  `URL_CONSULTA_LIMITE/consultalimite/:id`

- Exemplo de resposta 200:

```json
{
  "id-cliente": 123,
  "limite": 1500.00
}
```

- Exemplo de resposta 404:

```json
{
  "erro": "cliente nao existe"
}
```

### 3.3 Enviar solicitação para RabbitMQ

- Objeto enviado para a fila `FILA_CARTAO`:

```json
{
  "idCliente": 123,
  "limiteCredito": 1500.00,
  "status": "SOLICITADO"
}
```

---

## 4. Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Axios
- amqplib (RabbitMQ)

---

## 5. Observações

- Projeto criado para fins de estudo e demonstração de boas práticas em microserviços.
- Estrutura modular para facilitar testes e manutenção.

