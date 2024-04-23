import axios from "axios";
import {TransactionDto} from "../data/transaction/TransactionDto.Type.ts";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";

const baseUrl = "http://localhost:8080"

const getAuthConfig = async () => {
    const accessToken = await FirebaseAuthService.getAccessToken();

    if (!accessToken) {
        throw new Error();
    }

    console.log(accessToken)

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }
}

export async function getTransactionByTid(tid:string):Promise<TransactionDto>{

    try {
        const response = await axios.get<TransactionDto>(
            `${baseUrl}/transaction/${tid}`,
            await getAuthConfig()
        )
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }


}