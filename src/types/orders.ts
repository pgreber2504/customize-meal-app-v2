import { IngredientType } from "./meals";

export type CustomerType = {
  name?: string;
  email?: string;
  telephone?: string;
  street?: string;
  postCode?: string;
  country?: string;
  deliveryMethod?: string;
};

export type OrderType = {
  ingredients: IngredientType;
  price: number;
  customer: CustomerType;
  userId: string;
  id?: string;
};

export interface OrderState<U> {
  orders: OrderType[];
  loader: boolean;
  error: U | null;
  purchased: boolean;
  signToOrder: boolean;
}

export interface OrderFormType {
  [key: string]: {
    elementType: "input" | "select" | "checkbox";
    elementConfig: {
      type?: string;
      placeholder?: string;
      options?: { value: string; displayVal: string }[];
    };
    value: string;
    validation: {
      [key: string]: boolean | number | string;
    };
    valid: boolean | { isValid?: boolean; message?: string };
    changed?: boolean;
    label?: string;
    message?: string;
    checked?: boolean;
  };
}
