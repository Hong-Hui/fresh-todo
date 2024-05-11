import { useRef, useState } from "preact/hooks";
import { ITodo } from "../interfaces/iTodo.ts";
import { Todo } from "../components/Todo.tsx";

export default function Todos() {
  const [counter, setCounter] = useState<number>(0);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onNewTodo = (event: Event) => {
    event.preventDefault();

    if (inputRef.current?.value) {
      const newTodo: ITodo = {
        id: counter,
        title: inputRef.current.value,
      };
      setTodos((prevState) => {
        return [...prevState, newTodo];
      });
      setCounter((prevState) => ++prevState);
      inputRef.current.value = "";
    }
  };

  const onRemoveTodo = (id: number) => {
    setTodos((prevState) => prevState.filter((t) => t.id !== id));
  };

  const onEditTodo = (todo: ITodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => {
        if (t.id == todo.id) {
          return todo;
        }
        return t;
      }),
    );
  };

  return (
    <>
      <div class="mt-10 mx-auto max-w-sm w-full">
        <form onSubmit={onNewTodo}>
          <input
            id="todo"
            name="todo"
            type="text"
            ref={inputRef}
            placeholder="Enter new Todo..."
            required
            class="w-full rounded-md py-1.5 px-3.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          />
        </form>
      </div>
      {todos.length > 0 ? (
        <div class="mt-10">
          {todos.map((todo) => (
            <Todo
              todo={todo}
              onTodoRemove={onRemoveTodo}
              onTodoEdit={onEditTodo}
            />
          ))}
        </div>
      ) : (
        <div class="mt-10 text-center">
          <div>
            <img
              src="/undraw_react.svg"
              alt="undraw react"
              class="mx-auto w-2/3"
            />
            <h2 class="text-2xl font-bold mb-5">All tasks are Completed!</h2>
            <p>Go have fun outside!</p>
          </div>
        </div>
      )}
    </>
  );
}
