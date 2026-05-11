import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000/";

export const NEXT_AUTH_CONFIG = {
    providers : [
        CredentialsProvider({
            name : "Credentials" ,
            credentials : {
                username : {
                    label : "username" ,
                    type : "text"
                } ,
                password : {
                    label : "password" ,
                    type : "password"
                }
            } ,
            async authorize(credentials){
                try{
                    const response = await axios.post(`${BACKEND_URL}signin` , {
                        username : credentials?.username ,
                        password : credentials?.password
                    })

                    const data = response.data;
                    return {
                        id : data.id ,
                        token : data.token
                    }
                }catch(e){
                    console.log(e);
                    return null;
                }
            }
        })
    ] ,
    session : {
        strategy : "jwt" as const
    } ,
    callbacks : {
        async jwt({token , user} : any){
            if(user){
                token.accesstoken = (user as any).token;
            }
            return token
        } , 

        async session({session , token} : any){
            (session as any).accesstoken = token.accesstoken as string
            return session;
        }
    } ,
    secret : "123"
};

const handler = NextAuth(NEXT_AUTH_CONFIG);

export { handler as GET, handler as POST };
