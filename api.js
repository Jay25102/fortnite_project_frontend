import axios from "axios";
// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "https://fortnite-project-backend.onrender.com";

class backendApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call: ", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${backendApi.token}`};
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        }
        catch (err) {
            console.error("API Error: ", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message: [message];
        }
    }

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        console.log(data);
        return res.token;
    }

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async addFavorite(data) {
        let res = await this.request(`items/new`, data, "post");
        return res.success;
    }

    static async getFavorites(username) {
        let res = await this.request(`items/${username}`);
        return res.result;
    }
}

export default backendApi;