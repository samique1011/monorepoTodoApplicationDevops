import axios from "axios";

const BACKEND_URL = "http://localhost:5000/";

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