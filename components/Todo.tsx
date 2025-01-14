import { useRef, useState } from "preact/hooks";
import { ITodo } from "../interfaces/iTodo.ts";

interface TodoProps {
  todo: ITodo;
  onTodoRemove: (id: number) => void;
  onTodoEdit: (todo: ITodo) => void;
}

export function Todo({ todo, onTodoRemove, onTodoEdit }: TodoProps) {
  const [isEdit, setEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onEditTodo = (event: Event) => {
    event.preventDefault();
    if (inputRef.current?.value) {
      const editTodo: ITodo = {
        id: todo.id,
        title: inputRef.current.value,
      };
      onTodoEdit(editTodo);
      setEdit(() => false);
    }
  };

  return (
    <div class="mb-5 h-12 rounded-md bg-gray-100 flex justify-between items-center content-between px-3.5">
      {isEdit ? (
        <form onSubmit={onEditTodo}>
          <input
            id="editTodo"
            name="editTodo"
            type="text"
            ref={inputRef}
            value={todo.title}
            class="w-full rounded-md py-1.5 px-3.5 ring-1 ring-inset ring-slate-400 placeholder:text-gray-400"
          />
        </form>
      ) : (
        <p class="px-6">{todo.title}</p>
      )}

      <div class="flex flex-row items-center gap-2">
        <button
          onClick={() => setEdit((prevState) => !prevState)}
          class="px-3 flex flex-row h-full justify-center items-center gap-2 bg-white rounded py-0.5"
        >
          <span class="size-5 text-yellow-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="size-5"
            >
              <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
            </svg>
          </span>
          <span>Edit</span>
        </button>

        <button
          onClick={() => onTodoRemove(todo.id)}
          class="px-3 flex h-full justify-center items-center gap-2 bg-white rounded py-0.5"
        >
          <span class="size-5 text-yellow-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
