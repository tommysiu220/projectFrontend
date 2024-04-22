import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts"
import axios from "axios";
import {CartItemDto} from "../data/cartitem/CartItemDto.Type.ts";

const baseUrl = "http://localhost:8080"

const getAuthConfig = async () => {
    const accessToken = await FirebaseAuthService.getAccessToken();

    if (!accessToken) {
        throw new Error();
    }

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }
}

export async function getUserCart(): Promise<CartItemDto[]> {

    try {
        const response = await axios.get<CartItemDto[]>(
            `${baseUrl}/cart`,
            await getAuthConfig()
        )
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function putCartItem(pid: number, quantity: number) {
    try {
        await axios.put(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        )
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function patchCartItem(pid: number,quantity:number):Promise<CartItemDto>{
    try {
        const response = await axios.patch(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        )
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteCartItem(pid: number) {
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken) {
        throw new Error();
    }

    try {
        await axios.delete(
            `${baseUrl}/cart/${pid}`,
            await getAuthConfig()
        )
    } catch (error) {
        console.error(error);
        throw error;
    }
}