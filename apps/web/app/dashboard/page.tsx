import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../api/auth/[...nextauth]/route";
import axios from "axios";
import TodoComponent from "../components/TodoComponent";
import { BACKEND_URL } from "../../lib/config";

export default async function Dashboard() {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    console.log("token got back = ", session.accesstoken);
    if (!session) {
      return <p>You are not authenticated</p>;
    }
    const allTodos = await axios.post(
      `${BACKEND_URL}getTodos`,
      {},
      {
        headers: {
          Authorization: session.accesstoken,
        },
      },
    );
    console.log(allTodos);
    console.log(allTodos.data.allTodos)
    return (
      <TodoComponent todos = {allTodos.data.allTodos} />
    );
  } catch (e) {
    console.log((e as any).response);
    return <p>error</p>;
  }
}
