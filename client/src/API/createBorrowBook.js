import axios from "axios";

export const createBorrowBook = async (_id, userID) => {
  try {
    axios.post('http://localhost:9000/update/rental', { _id, userID})
        .then(() => console.log("Data update done!"))
        .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    return null;
  }
};
