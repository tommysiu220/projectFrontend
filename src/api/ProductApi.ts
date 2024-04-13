import axios from "axios";
import {ProductDto} from "../data/ProductDto.Type.ts";

export const getAllProduct = async (): Promise<ProductDto[]> => {
    try {
        const apiUrl = "http://localhost:8080/public/product";
        const response = await axios.get<ProductDto[]>(apiUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getProductByPid = async (pid:number): Promise<ProductDto> => {
    try {
        const apiUrl = `http://localhost:8080/public/product/${pid}`;
        const response = await axios.get<ProductDto>(apiUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

