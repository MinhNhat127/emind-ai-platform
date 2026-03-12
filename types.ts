export type ProductStatus = 'active' | 'inactive';

export type ModalMode = 'add' | 'edit' | 'detail' | 'delete' | null;

export type Product = {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  status: ProductStatus;
  description?: string;
  createdAt: string;
};

export type ProductFormData = Omit<Product, 'id' | 'createdAt'>;

export type ProductState = {
  products: Product[];
  selectedId: string | null;
  modal: ModalMode;
};

export type ProductAction =
  | { type: 'ADD'; payload: Product }
  | { type: 'UPDATE'; payload: { id: string; data: ProductFormData } }
  | { type: 'DELETE'; payload: { id: string } }
  | { type: 'OPEN_MODAL'; payload: { mode: ModalMode; id?: string } }
  | { type: 'CLOSE_MODAL' };
