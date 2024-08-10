import { UserProfile } from "./User";

export type Operation = {
    amount: string,
    currency: number,
    description: string,
    id: number,
    created_at: string,
    owner: UserProfile
};
