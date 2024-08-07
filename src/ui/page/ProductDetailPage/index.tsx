import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProductDto} from "../../../data/product/ProductDto.Type.ts";
import * as ProductDtoApi from "../../../api/ProductApi.ts";
import ProductDetailPageContainer from "../../component/ProductDetailPage/ProductDetailPageContainer.tsx";
import TopNavBar from "../../component/NavBar/TopNavBar.tsx";
import "./productDetailStyle.css"
import LoadingPage from "../LoadingPage";

type Params = {
    pid: string,
}

export default function ProductDetailPage() {
    const {pid} = useParams<Params>();
    const [getProductByPid, setGetProductByPid] = useState<ProductDto | undefined>(undefined);
    const navigate = useNavigate();

    const fetchGetProductByPid = async (pid: string) => {
        try {
            setGetProductByPid(undefined);
            const responseGetAllProductDto = await ProductDtoApi.getProductByPid(pid);
            setGetProductByPid(responseGetAllProductDto);
        } catch (error) {
            navigate("/error");
        }
    }

    useEffect(() => {
        if (pid) {
            fetchGetProductByPid(pid);
        } else {
            navigate("/error");
        }

    }, []);

    return (
        <>
            {
                getProductByPid
                    ?
                    <div >
                        <div className="background-container">
                            <img src="https://imgur.com/mKtt5pW.png" alt="Background Image"
                                 className="background-image"/>
                        </div>
                        <div className="content-container">
                            <TopNavBar/>
                            <ProductDetailPageContainer productDto={getProductByPid}/>
                        </div>

                    </div>
                    : <LoadingPage/>
            }
        </>
    )
}