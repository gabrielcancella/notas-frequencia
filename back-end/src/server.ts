import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { PrismaClient } from "../generated/prisma";

import AlunoController from "./Controllers/AlunoController";
import DisciplinaController from "./Controllers/DisciplinaController";

// Cria uma instância do Fastify com suporte a Zod
const app = fastify({}).withTypeProvider<ZodTypeProvider>();

// Liberar para qualquer origem
app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

// Configuração do Fastify para usar Zod como validador e serializador
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Registra o swagger para documentação da API
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Notas e Frequencia API",
      description: "API para gerenciar notas e frequencia de alunos",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

// Registra os controllers
app.register(AlunoController, { prefix: "/alunos" });
app.register(DisciplinaController, { prefix: "/disciplinas" });

// Inicia o servidor na porta 3333
app.listen({ port: 3333, host: "0.0.0.0" }, (err, addr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${addr}`);
});

// Criação da instancia do Prisma Client
export const prisma = new PrismaClient();