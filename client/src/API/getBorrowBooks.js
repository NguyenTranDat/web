import axios from "axios";

export const getBorrowBooks = async (userID) => {
    try {
        const response = await axios.post('http://localhost:9000/book/borrow', {userID});
        return response.data.books;
    } catch (error) {
        console.log(error);
        return null;
    }
};