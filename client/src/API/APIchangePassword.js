import axios from "axios";

export const APIchangePassword = async (password, newPassword, userID) => {
    try {
        axios.post('http://localhost:9000/update/password', { password, newPassword, userID });
        alert("Đổi mật khẩu thành công.")
        return true;
    } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
            alert(error.response.data);
        }
        return false;
    }
};