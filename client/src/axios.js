import axios from 'axios';
import {BASE_URL} from "./utils/endpoints";

export default axios.create({
    baseURL : BASE_URL
})