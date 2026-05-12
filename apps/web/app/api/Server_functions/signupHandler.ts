import axios from "axios";
import { BACKEND_URL } from "../../../lib/config";

export const signupHandler = async (username : string , password : string) => {
    try{
        const response = await axios.post(`${BACKEND_URL}signup` , {
            username : username , 
            password : password
        });

        return {
            msg : response.data.msg ,
            success : true
        }
    }catch(e : any){
        return {
            msg : e.response.data.msg ,
            success : false
        }
    }
    

}