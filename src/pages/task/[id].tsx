import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditarTarefa() {
  const router = useRouter();
  const { id } = router.query;

  const { data: tarefas } = api.task.listarTasks.useQuery();
  const tarefa = tarefas?.find((t) => t.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate: atualizarTask, isPending, error } = api.task.atualizarTask.useMutation({
    onSuccess: () => router.replace("/"),
  });

  useEffect(() => {
    if (tarefa) {
      setTitle(tarefa.title);
      setDescription(tarefa.description);
    }
  }, [tarefa]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("O título é obrigatório.");
      return;
    }

    atualizarTask({ id: id as string, title, description });
  };

  if (!tarefa) return <p className="p-4">Carregando tarefa...</p>;

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Tarefa</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            placeholder="Digite o título"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            placeholder="Descrição opcional"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
        >
          {isPending ? "Salvando..." : "Salvar alterações"}
        </button>

        {error && <p className="text-red-500 text-sm">Erro: {error.message}</p>}
      </form>
    </main>
  );
}
