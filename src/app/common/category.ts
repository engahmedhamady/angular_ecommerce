import { Products } from './products';

export class Category {
  categoryId :number;
  categoryName: string;
  description: string;
  pictureUrl: string;
  active: boolean;
  productses: Set<Products>;
}
