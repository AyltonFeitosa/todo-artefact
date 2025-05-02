import { appRouter } from "@/server/api/root";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { Tarefa } from "@/types/types";
import { GetServerSideProps } from "next";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<typeof appRouter>;
type TarefasListadas = RouterOutput["task"]["listarTasks"];

interface Props { // Props recebidas com os dados renderizados no servidor
  tarefasSSR: TarefasListadas;
}

export default function Home({ tarefasSSR }: Props) {
  const router = useRouter();
  const utils = api.useContext();

  const { data: tarefas = [] } = api.task.listarTasks.useQuery(undefined, {
    initialData: tarefasSSR, // Consulta de tarefas usando os dados já carregados pelo SSR
  });

  const { mutate: deletarTarefa } = api.task.deletarTask.useMutation({
    onSuccess: () => {
      utils.task.listarTasks.invalidate();
    },
  });

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Tarefas</h1>

      <div className="mb-4 text-right">
        <button
          onClick={() => router.push("/task/new")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Nova Tarefa
        </button>
      </div>

      <ul className="space-y-4">
        {tarefas.map((tarefa: Tarefa) => (
          <li
            key={tarefa.id}
            className="border p-4 rounded shadow bg-white flex justify-between items-start"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{tarefa.title}</h2>
              <p className="text-sm text-gray-600">{tarefa.description}</p>
              <span className="text-xs text-gray-500">
                Criada em: {new Date(tarefa.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <button
                onClick={() => router.push(`/task/${tarefa.id}`)}
                className="text-blue-600 hover:underline text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => deletarTarefa({ id: tarefa.id })}
                className="text-red-600 hover:underline text-sm"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

// Função executada no servidor para carregar os dados (SSR)
export const getServerSideProps: GetServerSideProps = async () => {
  const caller = appRouter.createCaller({} as any); //chamador para acessar rotas do backend
  const tarefasSSR = await caller.task.listarTasks();

  //retorna os dados como props
  return {
    props: {
      tarefasSSR,
    },
  };
};
