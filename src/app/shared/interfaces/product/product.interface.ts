import { ICategoryResponse } from "../category/category.interface";
import { IGroupResponse } from "../group/group.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    group: IGroupResponse;
    name: string;
    sklad: string;
    weight: number;
    price: number;
    imgPath: string;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}
