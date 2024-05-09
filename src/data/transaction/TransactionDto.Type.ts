import {ProductDto} from "../product/ProductDto.Type.ts";

export interface TransactionDto {
    tid:      number;
    uid:      number;
    datetime: string;
    status:   string;
    total:    number;
    items:    TransactionProductDto[];
}

export interface TransactionProductDto {
    tpid:     number;
    product:  ProductDto;
    quantity: number;
    subTotal: number;
}

