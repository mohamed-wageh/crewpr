import axios from "axios";


export async function sendRequest(RequestData, token) {
  try {
    const response = await axios.post(
      "https://crewpr-1732e-default-rtdb.firebaseio.com/requests.json?auth=" +
        token,
      RequestData
    );
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Errors:", error.response);
  }
}

export async function getOrders(token) {
  try {
    const response = await axios.get(
      "https://crewpr-1732e-default-rtdb.firebaseio.com/requests.json?auth=" +
        token
    );
    const data = [];
    for (const key in response.data){
      const dataObj = {
        id: key,
        data: response.data[key],
      };
      data.push(dataObj);
    }
    console.log("Response:", response.data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export  function updateOrder(id,updatedData, token) {
  try {
    return axios.put(
      `https://crewpr-1732e-default-rtdb.firebaseio.com/requests/${id}.json?auth=${token}`,
      updatedData
    );
  } catch (error) {
    console.error("Errors:", error.response);
  }
}

export async function DeleteOrder(id, token) {
  try {
    const response = await axios.delete(
      `https://crewpr-1732e-default-rtdb.firebaseio.com/requests/${id}.json?auth=${token}`
    );
    console.log("Response:", response.data); // Log the response data
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error:", error.response);
    throw error;
  }
}