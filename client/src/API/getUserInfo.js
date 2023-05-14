import axios from "axios";

export const APIgetUserInfo = async (userID) => {
    try {
        const response = await axios.post("http://localhost:9000/user/info", { userID });
        return response.data.userInfo;
    } catch (error) {
        console.log(error);
        return null;
    }
};