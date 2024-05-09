import axios from "axios";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

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


export async function checkout(tid:number):Promise<string>{
    try{
        const response = await axios.post<string>(
            `${baseUrl}/checkout/${tid}`,
            null,
            await getAuthConfig()
        )
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}