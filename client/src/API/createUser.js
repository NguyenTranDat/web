import axios from "axios";

export const createUser = async (username, password, firstName, lastName, address, phone) => {
    try {
        await axios.post('http://localhost:9000/api/register', {username, password, firstName, lastName, address, phone});
        return true;
    } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            alert(error.response.data);
        }
        return false;
    }
};