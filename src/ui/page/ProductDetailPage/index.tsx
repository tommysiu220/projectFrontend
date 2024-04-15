import {useNavigate, useParams} from "react-router-dom";
import NavBar2 from "../../component/NavBar/NavBar2.tsx";
import {useEffect, useState} from "react";
import {ProductDto} from "../../../data/ProductDto.Type.ts";
import * as ProductDtoApi from "../../../api/ProductApi.ts";
import ProductDetailPageContainer from "../../component/ProductDetailPageContainer.tsx";
import {HeadBanner} from "../../component/HeadBanner.tsx";

type params = {
    pid: string,
}

export default function ProductDetailPage(){
    const params = useParams<params>();
    const [getProductByPid, setGetProductByPid] = useState<ProductDto | undefined>(undefined);
    const navigate = useNavigate();

    const fetchGetProductByPid = async () => {
        try {
            setGetProductByPid(undefined);
            const responseGetAllProductDto = await ProductDtoApi.getProductByPid(params.pid?.toString());
            setGetProductByPid(responseGetAllProductDto);
        } catch (error) {
            // navigate to error page
            navigate("/error");
        }
    }

    useEffect(() => {
        fetchGetProductByPid();
    }, []);

    return(

        <>

            <NavBar2/>
            {
                getProductByPid
                ? <ProductDetailPageContainer productDto={getProductByPid}/>
                    :"gg"
            }
        </>
    )
}