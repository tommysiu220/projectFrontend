import {Box} from "@mui/material";
import "./greetingPageStyle.css";
import {useNavigate} from "react-router-dom";


export default function GreetingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{height: "100vh"}}>
        <Box sx={{height: "35%", backgroundColor: "black"}}/>
        <Box className="greeting-background"/>
      </Box>

      <Box sx={{
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        top: "20%",
        justifyContent: "center",
        width: "100vw"
      }}>
        <Box sx={{width: "20%"}}></Box>
        <button className="glowing-btn" onClick={() => navigate('/productlist')}>DOUBLESHOT</button>
        <Box sx={{width: "20%"}}></Box>
      </Box>
    </>
  )
}
