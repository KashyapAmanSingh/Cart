import axios from "axios";

export const fetchData = async (url, method = "GET", data = null) => {
  try {
    let response;

    switch (method) {
      case "GET":
        response = await axios.get(url);
        break;
      case "POST":
        response = await axios.post(url, data);
        break;
      case "PUT":
        response = await axios.put(url, data);
        break;
      case "DELETE":
        response = await axios.delete(url);
        break;
      default:
        throw new Error("Invalid HTTP method");
    }

     response = { ...response, status: response.status };

    return response;
  } catch (error) {
    console.error("Error during API request:", error);
    throw error;
  }
};









