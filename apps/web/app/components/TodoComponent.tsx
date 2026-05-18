"use client";

import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { addTodoHandler } from "../api/Server_functions/addTodoHandler";

interface TodoProps {
  title: string;
  description: string;
}

export default function TodoComponent({
  todos,
}: {
  todos: TodoProps[];
}) {
  const session = useSession();

  const [todosState, setTodos] = useState<TodoProps[]>(todos);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  async function onSubmitHandler() {
    const title = titleRef?.current?.value || "";
    const description = descriptionRef?.current?.value || "";

    const res = await addTodoHandler(
      (session as any).data.accesstoken,
      title,
      description
    );

    if (res.success) {
      setTodos((prev) => [
        ...prev,
        {
          title,
          description,
        },
      ]);

      if (titleRef.current) titleRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
    }

    console.log(res);
  }

  return (
    <div className="space-y-8">
      {/* Add Todo Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add a Todo
        </h1>

        <div className="space-y-4">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Title
            </label>

            <input
              type="text"
              ref={titleRef}
              placeholder="Enter todo title"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>

            <input
              type="text"
              ref={descriptionRef}
              placeholder="Enter todo description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* Button */}
          <button
            onClick={onSubmitHandler}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* Todos List */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Your Todos
        </h1>

        {todosState.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-500">
            No todos yet
          </div>
        ) : (
          todosState.map((todo, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {todo.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {todo.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}