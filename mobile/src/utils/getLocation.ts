import { REACT_APP_ABSTRACT_API_KEY } from "@env";
import axios from "axios";

export const getUserLocationFromAPI = () => {
    const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${REACT_APP_ABSTRACT_API_KEY}`;
    const response = axios.get(url);

    return response;
};