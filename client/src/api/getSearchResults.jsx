import axios from 'axios';

export default async function getSearchResults(searchTerm) {
    try {
        const res = await axios.get(`http://localhost:9000/search?term=${searchTerm}`)
        return res.data;
      } catch (error) {
        console.log(error);
      }
}