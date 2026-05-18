import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../api/auth/[...nextauth]/route";
import axios from "axios";
import TodoComponent from "../components/TodoComponent";
import { BACKEND_URL } from "../../lib/config";

export default async function Dashboard() {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-xl font-semibold text-red-500">
            You are not authenticated
          </p>
        </div>
      );
    }

    const allTodos = await axios.post(
      `${BACKEND_URL}getTodos`,
      {},
      {
        headers: {
          Authorization: session.accesstoken,
        },
      }
    );

    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            My Dashboard
          </h1>

          <TodoComponent todos={allTodos.data.allTodos} />
        </div>
      </div>
    );
  } catch (e) {
    console.log((e as any).response);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-red-500">
          Something went wrong
        </p>
      </div>
    );
  }
}