export interface IDiscountRequest {
    date: Date;
    name: string;
    title: string;
    description: string;
    imgPath: string;
}

export interface IDiscountResponse extends IDiscountRequest {
    id: number;
}
