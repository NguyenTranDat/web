import axios from "axios";

export const changePassword = async (password, newPassword, userID) => {
  try {
    axios.post('http://localhost:9000/update/password', { password, newPassword, userID})
        .then(() => console.log("Data update done!"))
        .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    return null;
  }
};