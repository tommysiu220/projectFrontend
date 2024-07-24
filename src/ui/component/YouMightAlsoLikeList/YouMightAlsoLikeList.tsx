import "./youMightAlsoLikeStyle.css"
import {ProductDto} from "../../../data/product/ProductDto.Type.ts";
import {useNavigate} from "react-router-dom";


type Props={
  randomItemList : ProductDto[]
}

export default function YouMightAlsoLikeList({randomItemList}:Props){
  const navigate=useNavigate();

  return(
    <div className="also-like-list-container unselectable">
      {randomItemList.map((item)=>(
        <div className="also-like-item-container"
             onClick={() => {
               navigate(`/product/${item.pid}`)
               window.location.reload();
             }}>

          <div className="also-like-item-img-container">
            <img className="also-like-item-img" src={item.image_url}/>
          </div>

          <div className="also-like-item-name">
          {item.product_name}
          </div>

        </div>
      ))
      }
    </div>
  )
}