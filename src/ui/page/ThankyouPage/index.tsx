import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import {TransactionDto} from "../../../data/transaction/TransactionDto.Type.ts";
import LoadingPage from "../LoadingPage";

type Params = {
  transactionId: string
}

export default function ThankyouPage() {
  const params = useParams<Params>();
  const [finishTransaction, setFinishTransaction] = useState<TransactionDto | undefined>(undefined)
  const loginUser = useContext<UserData | undefined | null>(LoginUserContext)
  const navigate = useNavigate();

  const handlePayment = async (tid: string) => {
    try {
      await TransactionApi.payTransaction(tid);
      const dto = await TransactionApi.finishTransaction(tid);
      setFinishTransaction(dto);
    } catch (error) {
      navigate('/error')
    }
  }

  useEffect(() => {
    if (loginUser && params.transactionId)
      handlePayment(params.transactionId).then();

  }, [loginUser]);

  return (
    <>
      {
        finishTransaction
          ?
          <>
            <h1>{finishTransaction.tid + finishTransaction.status}</h1>
            <h1>Thank you</h1>

            <video
              className="video-background"
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
            >
              <source src="https://fsse2401-project-tommy.s3.ap-southeast-1.amazonaws.com/productpage.mp4"/>
            </video>
          </>
          : <LoadingPage/>
      }

    </>
  )
}