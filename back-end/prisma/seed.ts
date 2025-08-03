import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient({
  log: ["error"]
});

const disciplinas = ["Matemática", "Português", "História", "Geografia", "Ciências"];
const nomes = ["Alice Silva", "Pedro Santos", "Maria Oliveira", "Lucas Rodrigues", "Ana Souza", "Gabriel Costa", "Julia Pereira", "Rafael Almeida", "Beatriz Nascimento", "Guilherme Fernandes", "Isabela Carvalho", "Matheus Gomes", "Sophia Ribeiro", "Enzo Barbosa", "Manuela Castro", "Davi Martins", "Laura Rocha", "Thiago Campos", "Valentina Cunha", "Bruno Andrade", "Helena Azevedo", "Eduardo Tavares", "Lorena Correia", "Felipe Cardoso", "Lara Mendonça", "Vinicius Barros", "Cecília Freitas", "Daniel Dias", "Mariana Lima", "Ricardo Melo", "Emanuelly Cavalcanti", "Igor Vieira", "Yasmin Batista", "Samuel Santana", "Olivia Teixeira", "Gustavo Vieira", "Isadora Campos", "Caio Ribeiro", "Luiza Albuquerque", "Renato Gonçalves", "Bianca Siqueira", "Marcelo Vargas", "Clara Montenegro", "Antônio Sampaio", "Nicole Valença", "Leonardo Aguiar", "Carolina Lemos", "Fernando Macedo", "Erick Novaes", "Amanda Diniz", "Diego Pimentel", "Rafaela Benício", "Thiago Peixoto", "Gabriela Câmara", "João Queiroz", "Letícia Marinho", "Vitor Lucena", "Natália Brandão", "José Pontes", "Maria Flor", "Carlos Maia", "Ana Clara", "Paulo Alcântara", "Sofia Caminha", "Luís Arruda", "Maria Helena", "Roberto Lins", "Fernanda Pessoa", "Sérgio Miranda", "Juliana Uchoa", "André Alencar", "Vitória Feitosa", "Rodrigo Aquino", "Lívia Pires", "Marcos Galvão", "Ester Saraiva", "Fábio Arruda", "Rebeca Mota", "Alex Morais", "Daniela Maia", "Ricardo Melo", "Emanuelly Cavalcanti", "Igor Vieira", "Yasmin Batista", "Samuel Santana", "Olivia Teixeira", "Gustavo Vieira", "Isadora Campos", "Caio Ribeiro", "Luiza Albuquerque", "Renato Gonçalves", "Bianca Siqueira", "Marcelo Vargas", "Clara Montenegro", "Antônio Sampaio", "Nicole Valença"];

async function main() {
  await ClearDatabse();
  await DisciplinasSeed();
  await AlunosSeed();

  console.log("Dados semeados com sucesso!");
}

async function ClearDatabse() {
  await prisma.notas.deleteMany({});
  await Promise.all([
    prisma.alunos.deleteMany({}),
    prisma.disciplinas.deleteMany({})
  ]);

  console.log("Banco de dados limpo com sucesso!");
}

async function DisciplinasSeed() {
  await prisma.disciplinas.createMany({
    data: disciplinas.map((nome) => ({
      nome,
    })),
  });

  console.log("Disciplinas semeadas com sucesso!");
}

async function AlunosSeed() {
  const disciplinas = await prisma.disciplinas.findMany();

  async function SeedUnique(nome: string) {
    return await prisma.alunos.create({
      data: {
        nome: nome,
        frequencia: Math.floor(Math.random() * 101),
        notas: {
          createMany: {
            data: disciplinas.map((disciplina) => ({
              disciplina: disciplina.id,
              nota: Math.floor(Math.random() * 11)
            })),
          },
        }
      }
    });
  }

  await Promise.all(nomes.map((nome) => SeedUnique(nome)));

  console.log("Alunos semeados com sucesso!");
}

main();