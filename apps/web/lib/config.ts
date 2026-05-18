let url = process.env.NEXT_PUBLIC_BACKEND_URL_DOCKER || process.env.NEXT_PUBLIC_BACKEND_URL;
if (!url || url === "undefined" || url === "null") {
  url = typeof window !== "undefined" ? "http://18.191.180.37:5000/" : "http://backend_app:5000/";
}
export const BACKEND_URL = url;