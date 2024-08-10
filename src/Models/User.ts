export type UserProfile = {
    currency: {
        id: number,
        name: string,
        full_name: string
    },
    balance: string,
    daily_amount: null | string
};
