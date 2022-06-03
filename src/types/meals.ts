export type IngredientType = {
  [key: string]: number;
};

export interface BurgerStateType {
  ingredients: IngredientType;
  totalPrice: number;
  error: boolean;
  signToOrder: boolean;
}
