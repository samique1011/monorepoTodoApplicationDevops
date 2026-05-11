import axios from "axios";

const BACKEND_URL = "http://localhost:5000/";

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