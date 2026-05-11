"use client";

import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { addTodoHandler } from "../api/Server_functions/addTodoHandler";

interface TodoProps {
    title : string , 
    description : string
}

export default function TodoComponent({ todos } : { todos: TodoProps[] }){
    const session = useSession();

    if(!session){
        return <p>Session is null</p>
    }
    const [todosState , setTodos] = useState<TodoProps[]>(todos);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    
    async function onSubmitHandler(){
        const title = titleRef?.current?.value || "";
        const description = descriptionRef?.current?.value || "";

        const res = await addTodoHandler((session as any).data.accesstoken , title , description);
        if(res.success){
            setTodos((prev) => {
                return [...prev , {
                    title : title ,
                    description : description
                }]
            })
        }
        console.log(res);

    }

    return <div>
        <div>
            <h1>Add a todo</h1>
            <label htmlFor="">Title</label>
            <input type="text" ref={titleRef} />
            <br></br>
            <label htmlFor="">Description</label>
            <input type="text" ref={descriptionRef} />
            <br />
            <button onClick={onSubmitHandler}>Add todo</button>
        </div>

        <div>
            <h1>{JSON.stringify(todosState)}</h1>
            <p></p>
        </div>
    </div>

}