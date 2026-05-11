"use client";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUp(){
    const router = useRouter();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword , setShowPassword] = useState<boolean>(false);

    async function submitHanlder(){
        const username = usernameRef?.current?.value || "";
        const password = passwordRef?.current?.value || "";

        const result = await signIn("credentials" , {
            username : username , 
            password : password ,
            redirect : false
        })

        if(result?.error){
            console.log(result.error)
        }
        else{
            console.log(result);
            router.push("/dashboard");
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