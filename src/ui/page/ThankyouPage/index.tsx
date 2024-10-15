import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import {TransactionDto} from "../../../data/transaction/TransactionDto.Type.ts";
import LoadingPage from "../LoadingPage";
import {Container} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCoverflow} from "swiper/modules";
import "./thankyouStyle.css"

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

  const handleClick = () => {
    navigate("/productlist")
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
            <div style={{opacity: "0.5"}}>
              <video
                className="video-background unselectable"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                style={{height: "100vh"}}
              >
                <source src="https://fsse2401-project-tommy.s3.ap-southeast-1.amazonaws.com/thankyoupage.mp4"/>
              </video>
            </div>
            <Container style={{
              height: "80%",
              width: "80%",
              padding: 0,
              backgroundColor: "rgba(255,255,255,0.9)",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
              <div className={"thankyou-logo"}>
                DoubleShot
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "65%"
              }}>
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  spaceBetween={20}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: false
                  }}
                  pagination={true}
                  modules={[EffectCoverflow]}
                  className="mySwiper"
                >
                  {finishTransaction.items.map(item => (
                    <SwiperSlide key={item.tpid}>
                      <div className={"confirmed-item"}>
                        <img className="confirmed-item-img" src={item.product.image_url}/>
                        <div className="confirmed-item-name">
                          {item.product.product_name}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  {/*<SwiperSlide>*/}
                  {/*  <div className={"confirmed-item"}>*/}
                  {/*    <img className="confirmed-item-img" src="https://i.imgur.com/6I1t4yz.png"/>*/}
                  {/*    <div className="confirmed-item-name">*/}
                  {/*      Los Angeles Lakers LeBron James Nike Gold Swingman Jersey - Icon Edition*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</SwiperSlide>*/}
                  {/*<SwiperSlide>*/}
                  {/*  <div className={"confirmed-item"}>*/}
                  {/*    <img className="confirmed-item-img"*/}
                  {/*      src="https://raw.githubusercontent.com/tommysiu220/projectFrontend/master/src/productImg/G34-1.png"/>*/}
                  {/*    <div className="confirmed-item-name">*/}
                  {/*      Milwaukee Bucks Giannis Antetokounmpo Nike Hunter Green Swingman Jersey - Icon Edition*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</SwiperSlide>*/}
                  {/*<SwiperSlide>*/}
                  {/*  <div className={"confirmed-item"}>*/}
                  {/*    <img className="confirmed-item-img" src="https://i.imgur.com/wEFLp1i.png"/>*/}
                  {/*    <div className="confirmed-item-name">*/}
                  {/*      Los Angeles Lakers LeBron James Nike Black Fast Break Jersey - City Edition*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</SwiperSlide>*/}
                </Swiper>

              </div>
              <div className={" thankyou-msg-container"}>
                <div className={"thankyou-content-1"}>
                  ✅ Your order is confirmed ✅
                </div>
                <div className={"thankyou-content-2"}>
                  Thanks for choosing DoubleShot<br/>
                  Your order will ready as soon as possible
                </div>
                <div className={"thankyou-content-3"}>
                  Hope to see you again
                </div>
                <button className={"thankyou-to-home"} onClick={handleClick}>
                  CONTINUE SHOPPING
                </button>
              </div>
            </Container>
          </>
          : <LoadingPage/>
      }

    </>
  )
}