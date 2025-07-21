export type TMonthlyUserGrowth = {
    month: string;
    users: number;
}

export type TLatestUser = {
    _id: string;
    name: string;
    email: string;
}

export type TLatestOrder = {
    _id: string;
    totalPrice: number;
    status: string;
}