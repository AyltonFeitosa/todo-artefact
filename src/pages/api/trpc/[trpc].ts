import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/server/api/root";

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

//Criei o TRCP onde vai intermediar as requisicoes do front para o back
