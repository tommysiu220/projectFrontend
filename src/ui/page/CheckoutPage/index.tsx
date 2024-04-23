import CheckoutContainer from "../../component/CheckoutContainer.tsx";
import {useNavigate, useParams} from "react-router-dom";
import * as TransactionApi from '../../../api/TransactionApi.ts'
import {useContext, useEffect, useState} from "react";
import {TransactionDto} from "../../../data/transaction/TransactionDto.Type.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {UserData} from "../../../data/user/UserData.ts";
import LoadingPage from "../LoadingPage/LoadingPage.tsx";

type Params = {
    transactionId: string
}

export default function CheckoutPage() {
    const params = useParams<Params>();
    const loginUser = useContext<UserData | undefined | null>(LoginUserContext)
    const [dto, setDto] = useState<TransactionDto | undefined>(undefined);

    const navigate = useNavigate();

    const fetchTransactionDto = async (tid:string) => {
        console.log(tid)
        const responseDto = await TransactionApi.getTransactionByTid(tid);
        setDto(responseDto);
        console.log(responseDto);

    }

    useEffect(() => {
            fetchTransactionDto(params.transactionId)

    }, []);
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