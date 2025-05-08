import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [prazo, setPrazo] = useState("");

  useEffect(() => {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
    if (tarefasSalvas) {
      setTarefas(tarefasSalvas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa() {
    if (novaTarefa.trim() === "") return;

    const nova = {
      id: Date.now(),
      texto: novaTarefa,
      prazo: prazo,
      feita: false
    };

    setTarefas([...tarefas, nova]);
    setNovaTarefa("");
    setPrazo("");
  }

  function marcarComoFeita(id) {
    const atualizadas = tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, feita: !tarefa.feita } : tarefa
    );
    setTarefas(atualizadas);
  }

  function excluirTarefa(id) {
    const filtradas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(filtradas);
  }

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <input
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <ul className="lista">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className={tarefa.feita ? "feita" : ""}>
            <input
              type="checkbox"
              checked={tarefa.feita}
              onChange={() => marcarComoFeita(tarefa.id)}
            />
            <span>{tarefa.texto}</span>
            {tarefa.prazo && <small>📅 {tarefa.prazo}</small>}
            <button onClick={() => excluirTarefa(tarefa.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;