# 📝 Sistema de Gerenciamento de Tarefas - Next.js + tRPC

Este projeto é um sistema simples de gerenciamento de tarefas, desenvolvido como parte de um desafio técnico. Ele utiliza **Next.js 15**, **tRPC**, **React Query**, **Tailwind CSS** e **TypeScript**. As tarefas são armazenadas em memória (não persistem após reiniciar).

## ⚙️ Tecnologias Utilizadas

* Next.js 15
* TypeScript
* tRPC
* React Query (TanStack)
* Zod (validação)
* Tailwind CSS

## ✅ Funcionalidades

* Listar tarefas
* Criar tarefas
* Editar tarefas
* Deletar tarefas
* Validação de campos
* Server-Side Rendering (SSR) na listagem
* Feedback visual em estados de carregamento ou erro

## 🧠 Organização de Pastas

src/
├── pages/ → Rotas do Next.js
│   ├── index.tsx → Listagem de tarefas (com SSR)
│   └── task/
│       ├── new\.tsx → Criação de nova tarefa
│       └── \[id].tsx → Edição de tarefa
├── server/
│   └── api/
│       ├── trpc.ts → Configuração do tRPC
│       ├── root.ts → AppRouter geral
│       └── routers/
│           └── task.ts → Lógica CRUD em memória
├── types/ → Tipagens globais
├── utils/ → Conexão com tRPC frontend
├── styles/ → Tailwind + estilos globais

## ▶️ Como Rodar o Projeto Localmente

1. Clone o repositório:
   `git clone https://github.com/seu-usuario/seu-repositorio.git`
   `cd seu-repositorio`

2. Instale as dependências:
   `npm install`

3. Inicie o servidor de desenvolvimento:
   `npm run dev`

4. Acesse no navegador:
   `http://localhost:3000`

## ⚠️ Observações

* Os dados não são persistidos: tudo fica em memória RAM enquanto o app está rodando.
* Não há banco de dados ou autenticação.
* Projeto fictício para fins didáticos e de avaliação.

## 📌 Requisito do Desafio Atendido

> “Utilize Server-Side Rendering (SSR) para pré-carregar a lista de tarefas”

✔️ A página principal (`index.tsx`) usa `getServerSideProps()` + `initialData` com React Query.

## 🤝 Contribuição

Projeto desenvolvido com fins educacionais e para avaliação técnica.
Fique à vontade para adaptar ou utilizar como base.

---

