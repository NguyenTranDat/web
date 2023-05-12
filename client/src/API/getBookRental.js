import axios from "axios";

export const getBookRental = async (userID) => {
  try {
    const response = await axios.post(`http://localhost:9000/rental`, {userID});
    return response.data.books;
  } catch (error) {
    console.log(error);
    return null;
  }
};
