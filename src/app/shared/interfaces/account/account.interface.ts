export interface ILogin {
    email: string;
    password: string;
}

export interface IUserRequest extends  ILogin{
    fullname: string;
    role: string;
}

export interface IUserResponse extends IUserRequest { 
    id: number;
}
