export type TCarCategory = 'sedan' | 'suv' | 'sports' | 'coupe' | 'convertible';

export type TCar = {
    _id: string;
    carName: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    rating: number;
    category: TCarCategory;
    description: string;
    quantity: number;
    productImg: string | string[];
    inStock: boolean;
};
