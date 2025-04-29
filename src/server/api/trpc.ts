import { initTRPC } from "@trpc/server";

//Iniciar o tRPC
const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Inciei o servidor tRPC
// Criei o router para definir as rotas
// Criei o publicProcedure para defini