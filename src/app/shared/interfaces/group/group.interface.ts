export interface IGroupRequest {
    name: string;
    path: string;
}

export interface IGroupResponse extends IGroupRequest {
    id: number;
}
