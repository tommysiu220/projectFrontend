import {useNavigate} from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="empty-cart-container"
         style={{
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
           height: "80%",
           flexDirection: "column"
         }}>
      <div style={{margin: "20px 0"}}>Your Cart is Currently Empty...</div>

      <button style={{
        border: "2px black solid",
        backgroundColor: "white",
        borderRadius: 0,
        textAlign: "center",
        fontSize: "16px",
        height: "32px",
        padding: "4px 16px",
        color: "black"
      }}
              onClick={() => navigate("/productlist")}>
        Return to Shopping
      </button>
    </div>
  )
}