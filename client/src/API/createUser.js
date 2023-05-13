import axios from "axios";

export const createUser = async (username, password, firstName, lastName, address, phone) => {
  try {
    await axios.post('http://localhost:9000/api/register', {username, password, firstName, lastName, address, phone});
    console.log("Done");
  } catch (error) {
    console.log(error);
    return null;
  }
};