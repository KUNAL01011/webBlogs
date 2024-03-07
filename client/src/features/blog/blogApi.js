import axios from "axios";
export async function fatchAllTodo() {
   const response = await axios.get("http://localhost:8000/api/v1/todos");

   if(!response){
    console.error("we don't get data from this api :");
   }
   return response.data;
}