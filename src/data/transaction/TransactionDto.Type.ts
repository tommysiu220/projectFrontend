export interface TransactionDto {
    tid:      number;
    uid:      number;
    datetime: string;
    status:   string;
    total:    number;
    items:    Item[];
}

export interface Item {
    tpid:     number;
    product:  Product;
    quantity: number;
    subTotal: number;
}

export interface Product {
    pid:          number;
    description:  string;
    price:        number;
    stock:        number;
    product_name: string;
    image_url:    string;
}
