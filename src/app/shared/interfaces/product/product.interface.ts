import { ICategoryResponse } from "../category/category.interface";
import { IGroupResponse } from "../group/group.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    group: IGroupResponse;
    name: string;
    sklad: string;
    weight: string;
    price: number;
    path: string;
    imgPath: string;
    count: number;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}
