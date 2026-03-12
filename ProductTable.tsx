import React from 'react';
import { Product } from './types';
import styles from './ProductTable.module.css';

type Props = {
  products: Product[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + '₫';
}

function StatusBadge({ status }: { status: Product['status'] }) {
  return (
    <span className={`${styles.badge} ${status === 'active' ? styles.badgeActive : styles.badgeInactive}`}>
      {status === 'active' ? 'Hoạt động' : 'Không HĐ'}
    </span>
  );
}

// Inline SVG icons
function IconEye() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export function ProductTable({ products, onView, onEdit, onDelete }: Props) {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Không có sản phẩm nào phù hợp.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} style={{ width: 48 }}>STT</th>
            <th className={styles.th} style={{ width: 110 }}>Mã SP</th>
            <th className={styles.th}>Tên sản phẩm</th>
            <th className={styles.th} style={{ width: 140 }}>Danh mục</th>
            <th className={styles.th} style={{ width: 130, textAlign: 'right' }}>Đơn giá</th>
            <th className={styles.th} style={{ width: 80, textAlign: 'right' }}>Tồn kho</th>
            <th className={styles.th} style={{ width: 120 }}>Trạng thái</th>
            <th className={styles.th} style={{ width: 120, textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`${styles.tr} ${index % 2 === 0 ? styles.trOdd : styles.trEven}`}
            >
              <td className={styles.td} style={{ textAlign: 'center', color: 'var(--color-grey-500)' }}>
                {index + 1}
              </td>
              <td className={styles.td}>
                <span className={styles.code}>{product.code}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.productName}>{product.name}</span>
              </td>
              <td className={styles.td}>{product.category}</td>
              <td className={styles.td} style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                {formatPrice(product.price)}
              </td>
              <td className={`${styles.td} ${product.stock === 0 ? styles.stockZero : ''}`} style={{ textAlign: 'right' }}>
                {product.stock.toLocaleString('vi-VN')}
              </td>
              <td className={styles.td}>
                <StatusBadge status={product.status} />
              </td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  <button
                    className={`${styles.actionBtn} ${styles.actionView}`}
                    onClick={() => onView(product.id)}
                    title="Xem chi tiết"
                    aria-label="Xem chi tiết"
                  >
                    <IconEye />
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.actionEdit}`}
                    onClick={() => onEdit(product.id)}
                    title="Chỉnh sửa"
                    aria-label="Chỉnh sửa"
                  >
                    <IconEdit />
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.actionDelete}`}
                    onClick={() => onDelete(product.id)}
                    title="Xoá"
                    aria-label="Xoá"
                  >
                    <IconTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
