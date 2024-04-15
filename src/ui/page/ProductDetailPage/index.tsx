import {useNavigate, useParams} from "react-router-dom";
import NavBar2 from "../../component/NavBar/NavBar2.tsx";
import {useEffect, useState} from "react";
import {ProductDto} from "../../../data/ProductDto.Type.ts";
import * as ProductDtoApi from "../../../api/ProductApi.ts";
import ProductDetailPageContainer from "../../component/ProductDetailPageContainer.tsx";
import TopNavBar from "../../component/NavBar/TopNavBar.tsx";

type params = {
    pid: string,
}

export default function ProductDetailPage(){
    const {pid} = useParams<params>();
    const [getProductByPid, setGetProductByPid] = useState<ProductDto | undefined>(undefined);
    const navigate = useNavigate();

    const fetchGetProductByPid = async (pid) => {
        try {
            setGetProductByPid(undefined);
            const responseGetAllProductDto = await ProductDtoApi.getProductByPid(pid);
            setGetProductByPid(responseGetAllProductDto);
        } catch (error) {
            // navigate to error page
            navigate("/error");
        }
    }

    useEffect(() => {
        if (pid){
            fetchGetProductByPid(pid);
        } else{
            navigate("/error");
        }

    }, []);

    return(

        <>

            <TopNavBar/>
            {
                getProductByPid
                ? <ProductDetailPageContainer productDto={getProductByPid}/>
                    :"Loading..."
            }
        </>
    )
}