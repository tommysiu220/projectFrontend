import CheckoutContainer from "../../component/CheckoutPage/CheckoutContainer.tsx";
import { useParams} from "react-router-dom";
import * as TransactionApi from '../../../api/TransactionApi.ts'
import {useContext, useEffect, useState} from "react";
import {TransactionDto} from "../../../data/transaction/TransactionDto.Type.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {UserData} from "../../../data/user/UserData.ts";
import LoadingPage from "../LoadingPage";


type Params = {
    transactionId: string
}

export default function CheckoutPage() {
    const params = useParams<Params>();
    const loginUser = useContext<UserData | undefined | null>(LoginUserContext)
    const [dto, setDto] = useState<TransactionDto | undefined>(undefined);


    const fetchTransactionDto = async (tid:string) => {
        const responseDto = await TransactionApi.getTransactionByTid(tid);
        setDto(responseDto);

    }

    useEffect(() => {
        if (loginUser && params.transactionId)
            fetchTransactionDto(params.transactionId)

    }, [loginUser]);
    return (
        <>
            {
                dto
                    ? <CheckoutContainer transactionDto={dto}/>
                    : <LoadingPage/>
            }

        </>
    )
}