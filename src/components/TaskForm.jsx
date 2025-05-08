function TaskForm({ onAdd }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const task = e.target.elements.task.value.trim();
      if (task) {
        onAdd(task);
        e.target.reset();
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="task" placeholder="Digite a tarefa" />
        <button type="submit">Adicionar</button>
      </form>
    );
  }
  
  export default TaskForm;
  