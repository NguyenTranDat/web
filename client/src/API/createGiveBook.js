import axios from "axios";

export const createGiveBook = async (_id, userID) => {
    try {
        axios.post('http://localhost:9000/update/return', { _id, userID})
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};