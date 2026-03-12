import { useReducer, useMemo } from 'react';
import {
  Product,
  ProductFormData,
  ProductState,
  ProductAction,
  ModalMode,
} from './types';

// ── Mock data ──────────────────────────────────────────────────
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    code: 'SP001',
    name: 'Áo thun cotton unisex',
    category: 'Thời trang',
    price: 120000,
    unit: 'cái',
    stock: 250,
    status: 'active',
    description: 'Áo thun cotton 100%, thoáng mát, phù hợp mọi lứa tuổi.',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    code: 'SP002',
    name: 'Quần jean slim fit',
    category: 'Thời trang',
    price: 350000,
    unit: 'cái',
    stock: 80,
    status: 'active',
    description: 'Quần jean co giãn, dáng slim fit, nhiều màu sắc.',
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    code: 'SP003',
    name: 'Cà phê rang xay Arabica',
    category: 'Thực phẩm',
    price: 180000,
    unit: 'gói',
    stock: 500,
    status: 'active',
    description: 'Cà phê Arabica nguyên chất, rang mộc, hương thơm đậm đà.',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    code: 'SP004',
    name: 'Bình giữ nhiệt inox 500ml',
    category: 'Gia dụng',
    price: 220000,
    unit: 'cái',
    stock: 120,
    status: 'active',
    description: 'Bình giữ nhiệt 8-12 giờ, thân inox 304 cao cấp.',
    createdAt: '2024-02-10',
  },
  {
    id: '5',
    code: 'SP005',
    name: 'Dầu gội trị gàu 400ml',
    category: 'Chăm sóc cá nhân',
    price: 95000,
    unit: 'chai',
    stock: 300,
    status: 'active',
    description: 'Dầu gội trị gàu, sạch da đầu, mùi hương dễ chịu.',
    createdAt: '2024-02-20',
  },
  {
    id: '6',
    code: 'SP006',
    name: 'Sách "Đắc Nhân Tâm"',
    category: 'Sách',
    price: 79000,
    unit: 'cuốn',
    stock: 45,
    status: 'inactive',
    description: 'Tác phẩm kinh điển của Dale Carnegie, bản dịch mới nhất.',
    createdAt: '2024-03-01',
  },
  {
    id: '7',
    code: 'SP007',
    name: 'Tai nghe bluetooth V5.0',
    category: 'Điện tử',
    price: 450000,
    unit: 'cái',
    stock: 60,
    status: 'active',
    description: 'Tai nghe không dây, pin 20 giờ, chống ồn chủ động.',
    createdAt: '2024-03-10',
  },
  {
    id: '8',
    code: 'SP008',
    name: 'Kem dưỡng ẩm ban đêm',
    category: 'Chăm sóc cá nhân',
    price: 165000,
    unit: 'hộp',
    stock: 0,
    status: 'inactive',
    description: 'Kem dưỡng ẩm ban đêm, phục hồi da sau 8 tiếng ngủ.',
    createdAt: '2024-03-15',
  },
];

// ── Reducer ────────────────────────────────────────────────────
function productReducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case 'ADD':
      return { ...state, products: [...state.products, action.payload] };

    case 'UPDATE':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload.data } : p
        ),
      };

    case 'DELETE':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload.id),
        modal: null,
        selectedId: null,
      };

    case 'OPEN_MODAL':
      return {
        ...state,
        modal: action.payload.mode,
        selectedId: action.payload.id ?? null,
      };

    case 'CLOSE_MODAL':
      return { ...state, modal: null, selectedId: null };

    default:
      return state;
  }
}

// ── Hook ───────────────────────────────────────────────────────
export function useProductManager() {
  const [state, dispatch] = useReducer(productReducer, {
    products: INITIAL_PRODUCTS,
    selectedId: null,
    modal: null,
  });

  const selectedProduct = useMemo(
    () => state.products.find((p) => p.id === state.selectedId) ?? null,
    [state.products, state.selectedId]
  );

  const categories = useMemo(
    () => Array.from(new Set(state.products.map((p) => p.category))).sort(),
    [state.products]
  );

  function filteredProducts(search: string, category: string) {
    const q = search.toLowerCase();
    return state.products.filter((p) => {
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q);
      const matchCategory = !category || p.category === category;
      return matchSearch && matchCategory;
    });
  }

  function addProduct(data: ProductFormData) {
    const product: Product = {
      ...data,
      id: String(Date.now()),
      createdAt: new Date().toISOString().split('T')[0],
    };
    dispatch({ type: 'ADD', payload: product });
  }

  function updateProduct(id: string, data: ProductFormData) {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }

  function deleteProduct(id: string) {
    dispatch({ type: 'DELETE', payload: { id } });
  }

  function openAdd() {
    dispatch({ type: 'OPEN_MODAL', payload: { mode: 'add' } });
  }

  function openEdit(id: string) {
    dispatch({ type: 'OPEN_MODAL', payload: { mode: 'edit', id } });
  }

  function openDetail(id: string) {
    dispatch({ type: 'OPEN_MODAL', payload: { mode: 'detail', id } });
  }

  function openDelete(id: string) {
    dispatch({ type: 'OPEN_MODAL', payload: { mode: 'delete', id } });
  }

  function closeModal() {
    dispatch({ type: 'CLOSE_MODAL' });
  }

  return {
    state,
    selectedProduct,
    categories,
    filteredProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    openAdd,
    openEdit,
    openDetail,
    openDelete,
    closeModal,
  };
}
