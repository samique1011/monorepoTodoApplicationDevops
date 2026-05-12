import axios from "axios";
import { BACKEND_URL } from "../../../lib/config";

export const addTodoHandler = async (token : string , title : string , description : string) => {
    try{
        const res = await axios.post(`${BACKEND_URL}addTodo` , {
            title : title , 
            description : description
        } , {
            headers : {
                Authorization : token
            }
        })

        return {
            msg : res.data.msg ,
            success : true
        }
    }catch(e){
        return {
            msg : (e as any).response.data.msg ,
            success : false
        }
    }
    
}