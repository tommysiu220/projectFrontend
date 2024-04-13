import { useParams} from "react-router-dom";
import NavBar2 from "../../component/NavBar2.tsx";
import {useEffect, useState} from "react";
import {ProductDto} from "../../../data/ProductDto.Type.ts";
import * as ProductDtoApi from "../../../api/ProductApi.ts";
import ProductDetailPageContainer from "../../component/ProductDetailPageContainer.tsx";

type params = {
    pid: string,
}

export default function ProductDetailPage(){
    const params = useParams<params>();
    const [getProductByPid, setGetProductByPid] = useState<ProductDto | undefined>(undefined);

    const fetchGetProductByPid = async () => {
        try {
            setGetProductByPid(undefined);
            const responseGetAllProductDto = await ProductDtoApi.getProductByPid(parseInt(params.pid, 10));
            setGetProductByPid(responseGetAllProductDto);
        } catch (error) {
            // navigate to error page
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