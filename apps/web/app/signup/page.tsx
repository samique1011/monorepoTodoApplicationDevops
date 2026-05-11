"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { signupHandler } from "../api/Server_functions/signupHandler";

export default function SignUp(){
    const router = useRouter();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword , setShowPassword] = useState<boolean>(false);

    async function submitHanlder(){
        const username = usernameRef?.current?.value || "";
        const password = passwordRef?.current?.value || "";

        const res = await signupHandler(username , password);
        alert(res.msg);

        console.log(res)

        if(res.success){
            router.push("/signin");
        }
    }

    return <div>
        <div>
            <label htmlFor="username">Enter username</label>
            <input type="text" required ref={usernameRef}></input>
        </div>
        <div>
            <label htmlFor="password">Enter password</label>
            <div>
                {showPassword ? <input type="text" required ref={passwordRef}></input> :
                 <input type="password" required ref={passwordRef}></input> }
                <button onClick={() => setShowPassword((prev) => !prev)}>Show password</button>
            </div>
        </div>

        <div>
            <button onClick={submitHanlder}>Submit</button>
        </div>
    </div>
}