import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:9000/api/login', { 
      username, 
      password 
    });
    
    return { userId: response.data.customer_id, admin: response.data.ad };
  } catch (error) {
    console.log(error);
    return null;
  }
};