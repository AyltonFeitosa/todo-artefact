import { api } from "@/utils/api";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";

export default function NewTask(){
    const router = useRouter();
    
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");

    const {mutate: criarTask, isPending} = api.task.criarTask.useMutation({
        onSuccess: () =>{
            router.replace("/")
        }
    })
    const handleSubmite = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("O título é obrigatorio");
            return;
        }

        criarTask({title, description});
    }

    return(
    <main className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">
            Adicionar Tarefar
        </h1>
        <div>
            <form onSubmit={handleSubmite} className="space-y-4">
                <input className="w-full border px-2 py-1 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titulo"
                />

                <textarea className="w-full border px-2 py-1 rounded"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} placeholder="Descrição">
                </textarea>

                <button className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 disabled:opacity-50 items-center cursor-pointer" type="submit" disabled={isPending}>
                    {isPending ? "Criando..." : "Criar tarefa"}
                </button>
            </form>
        </div>
    </main>
    )
}

