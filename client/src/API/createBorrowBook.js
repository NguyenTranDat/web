import axios from "axios";

export const createBorrowBook = async (_id, userID) => {
    try {
        axios.post('http://localhost:9000/update/rental', { _id, userID});
            return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
