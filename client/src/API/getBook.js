import axios from "axios";

export const getBooks = async (searchTerm) => {
    try {
        const response = await axios.post('http://localhost:9000/book', {search: searchTerm});
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
