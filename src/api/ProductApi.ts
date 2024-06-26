import axios from "axios";
import {ProductDto} from "../data/product/ProductDto.Type.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

export const getAllProduct = async (): Promise<ProductDto[]> => {
    try {
        const apiUrl = baseUrl+"/public/product";
        const response = await axios.get<ProductDto[]>(apiUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getProductByPid = async (pid:string): Promise<ProductDto> => {
    try {
        const apiUrl = baseUrl+`/public/product/${pid}`;
        const response = await axios.get<ProductDto>(apiUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

