import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { nanoid } from "nanoid";

// Armazenamento em memória
const tasks = [
  {
    id: "1",
    title: "Publicar novo conteúdo",
    description: "Organizar e publicar artigo",
    createdAt: "12/12",
  },
];

// Validação
const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  createdAt: z.string().min(1),
});

const idSchema = z.object({ id: z.string() });

export const taskRouter = router({
  listarTasks: publicProcedure.query(() => {
    return tasks;
  }),

  criarTask: publicProcedure
    .input(taskSchema.omit({ createdAt: true })) // data será gerada automaticamente
    .mutation(({ input }) => {
      const newTask = {
        id: nanoid(),
        ...input,
        createdAt: new Date().toISOString(), // gera data atual
      };
      tasks.push(newTask);
      console.log("Criando tarefa:", input);
      return newTask;
    }),

    atualizarTask: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .mutation(({ input }) => {
      const index = tasks.findIndex((t) => t.id === input.id);
      if (index === -1) throw new Error("Tarefa não encontrada");
      tasks[index] = { ...tasks[index], ...input };
      console.log("Atualizando tarefa:", input);
      return tasks[index];
    }),  

  deletarTask: publicProcedure.input(idSchema).mutation(({ input }) => {
    const index = tasks.findIndex((t) => t.id === input.id);
    if (index === -1) throw new Error("Tarefa não encontrada");
    const removida = tasks.splice(index, 1)[0];
    console.log("Removendo tarefa com id:", input.id);
    return removida;
  }),
});
