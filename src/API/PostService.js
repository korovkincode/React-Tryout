import axios from "axios"

export default class PostService {
    static async getAll (limit=10, page=1) {
        const par = limit === "-1" ? {} : {_limit: limit, _page: page};
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
            params: par
        });
        return response;
    }
    static async getPost (id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response;
    }
    static async getComments (id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;
    }
}