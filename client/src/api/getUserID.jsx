import axios from "axios";

export default async function getUserID() {
    try {
      const response = await axios.get('http://localhost:9000/api/user');
      const data = response.data;
      if (data.length > 0) {
        return (data[0].customer_id);
      }
    } catch (error) {
      console.error(error);
      return 0;
    }
}