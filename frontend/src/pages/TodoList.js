import { useState } from "react";
import ToDo from "../components/ToDo";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState("");

  const onChange = (e) => {
    setFormData(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTasks((prevState) => [...prevState, formData]);
    setFormData("");
  };

  const onClick = (e) => {
    setTasks([]);
  };
  return (
    <>
      <h1>To do List</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="task"
          placeholder="Add new task"
          value={formData}
          onChange={onChange}
        ></input>
        <button type="submit">Add</button>
        <button onClick={onClick}>Clear Tasks</button>
      </form>
      <h1>Tasks</h1>
      <div>
        {tasks.map((todo) => {
          return <ToDo key={todo.todo} todo={todo} />;
        })}
      </div>
    </>
  );
}

export default TodoList;
