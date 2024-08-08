export type RegisterSuccessResponce = {
    email: string;
    password: string
};

export type LoginSuccessResponce = {
    detail: string;
    refresh: string;
    access: string;
};
