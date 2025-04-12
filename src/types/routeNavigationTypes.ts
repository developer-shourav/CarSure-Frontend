import { ReactNode } from "react";

type TPathNavValues = {
    name: string;
    path: string;
    element: ReactNode;
};

type TPathNavWitChild = {
    name: string;
    children: TPathNavValues[];
};

export type TRouteAndNavItemList = TPathNavValues | TPathNavWitChild;

export type TRoute = {
    path: string;
    element: ReactNode;
};

export type TNavItem = {
    key: string;
    label: ReactNode;
    children?: TNavItem[];
};
