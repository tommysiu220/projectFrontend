import {Container} from "@mui/material";
import './thanksStyle.css'
import {useNavigate} from "react-router-dom";

export default function Thanks() {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/productlist")
  }
  return (
    <>
      <div style={{opacity: "0.5"}}>
        <video
          className="video-background unselectable"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          style={{height:"100vh"}}
        >
          <source src="https://fsse2401-project-tommy.s3.ap-southeast-1.amazonaws.com/thankyoupage.mp4"/>
        </video>
      </div>
      <Container style={{
        height: "80%",
        width: "80%",
        padding: 0,
        backgroundColor: "white",
        opacity: "0.9",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"

      }}>
        <div className={"thankyou-logo"}>
          DoubleShot
        </div>
        <div className={" thankyou-msg-container"}>
          <div className={"thankyou-content-1"}>
            Thanks for choosing DoubleShot <br/>
          </div>
          <div className={"thankyou-content-2"}>
            Your order will ready as soon as possible <br/>
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
  )
}