import { api } from "@/utils/api";
import { useState } from "react";
import { Tarefa } from "@/types/types";

export default function Home() {
  const utils = api.useContext(); // permite recarregar a lista depois de excluir

  const { data: tarefas } = api.task.listarTasks.useQuery();

  const { mutate: deletarTarefa } = api.task.deletarTask.useMutation({
    onSuccess: () => {
      utils.task.listarTasks.invalidate(); // recarrega a lista após deletar
    },
  });

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>

      <ul className="space-y-4">
        {tarefas?.map((tarefa: Tarefa) => (
          <li
            key={tarefa.id}
            className="border p-4 rounded shadow bg-white flex justify-between items-start"
          >
            <div>
              <h2 className="text-lg font-semibold">{tarefa.title}</h2>
              <p className="text-sm text-gray-600">{tarefa.description}</p>
              <span className="text-xs text-gray-400">
                Criada em: {new Date(tarefa.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="cursor-pointer border p-2 rounded shadow bg-white flex">
              <button
                onClick={() => deletarTarefa({ id: tarefa.id })}
                className="cursor-pointer ml-4 text-red-600 hover:underline text-sm"
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
