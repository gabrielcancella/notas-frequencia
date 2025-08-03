
# Sistema de Notas e Frequência

Sistema para gerenciamento de notas e frequência de alunos, com interface web moderna e API.

## Premissas Assumidas

- Notas são registradas por disciplina e por aluno.
- A frequência é registrada por aluno.
- Existir a possibilidade de filtrar a lista de alunos.
- O banco de dados utilizado é relacional.

## Decisões de Projeto

- **React** para o front-end pela componentização.
- **Next.js** para roteamento simplificado e performático.
- **Tailwind CSS** para estilização rápida e fácil.
- **Shadcn UI** para uso de componentes prontos e de fácil customização.
- **Fastify** por sua simplicidade e eficiência em projetos de menor complexidade.
- **Prisma ORM** para facilidade nas consultas ao banco de dados.

## Pré Requisitos para Executar o Sistema

- Git (Opcional)
- Node.js - v22.14.0
- MySQL - 8.0.44

Essas foram as versões utilizadas, mas pode funcionar em outras também.

## Instruções para Executar o Sistema

1. Clone o repositório:
  ```bash
  git clone https://github.com/gabrielcancella/notas-frequencia.git
  ```

2. Instale as dependências do back-end e front-end:
  ```bash
  cd back-end
  npm install
  cd ../front-end
  npm install
  ```

3. Configure o banco de dados MySQL:
  - Edite o arquivo `.env` na pasta `back-end` e configure a variável de conexão:
    ```env
    DATABASE_URL="mysql://user:password@localhost:3306/notas_frequencia"
    ```
    Substitua `user` e `password` pelos dados do seu MySQL.
  - Gere as tabelas no banco executando:
    ```bash
    npx prisma migrate dev
    ```
  > **Observação:** Este comando também executará o script de seed para popular o banco. Caso não deseje que o seed seja executado, utilize a flag `--skip-seed`.

4. Inicie o back-end:
  ```bash
  cd back-end
  npm run dev
  ```

5. Descubra seu IP local e configure a URL da API no front-end:
  - No Windows, execute o comando `ipconfig` no terminal e procure pelo campo "Endereço IPv4".
  - No Linux/Mac, execute `ifconfig` ou `ip a`.
  - Copie o IP encontrado e edite o arquivo `.env` dentro da pasta `front-end`, adicionando ou alterando a linha:
    ```env
    NEXT_PUBLIC_API_URL=http://{seu_ip}:3333/
    ```
  - Exemplo: `NEXT_PUBLIC_API_URL=http://192.168.0.10:3333/`
  - Salve o arquivo antes de iniciar o front-end.

6. Inicie o front-end:
  ```bash
  cd front-end
  npm run dev
  ```

7. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Documentação da API

O back-end possui documentação via Swagger, disponível em [http://localhost:3333/docs/](http://localhost:3333/docs/)