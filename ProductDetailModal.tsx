import React from 'react';
import { Product } from './types';
import styles from './ProductDetailModal.module.css';

type Props = {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
};

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + '₫';
}

function StatusBadge({ status }: { status: Product['status'] }) {
  return (
    <span className={`${styles.badge} ${status === 'active' ? styles.badgeActive : styles.badgeInactive}`}>
      {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
    </span>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue}>{children}</span>
    </div>
  );
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ProductDetailModal({ product, onClose, onEdit }: Props) {
  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Chi tiết sản phẩm">
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Chi tiết sản phẩm</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng">
            <IconClose />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <Row label="Mã sản phẩm">{product.code}</Row>
          <Row label="Tên sản phẩm">
            <strong>{product.name}</strong>
          </Row>
          <Row label="Danh mục">{product.category}</Row>
          <Row label="Đơn giá">
            <span className={styles.price}>{formatPrice(product.price)}</span>
          </Row>
          <Row label="Đơn vị">{product.unit}</Row>
          <Row label="Tồn kho">
            <span className={product.stock === 0 ? styles.stockZero : ''}>
              {product.stock.toLocaleString('vi-VN')} {product.unit}
            </span>
          </Row>
          <Row label="Trạng thái">
            <StatusBadge status={product.status} />
          </Row>
          <Row label="Ngày tạo">{product.createdAt}</Row>
          {product.description && (
            <div className={styles.descBlock}>
              <span className={styles.rowLabel}>Mô tả</span>
              <p className={styles.descText}>{product.description}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.btnSecondary} onClick={onClose}>
            Đóng
          </button>
          <button className={styles.btnPrimary} onClick={onEdit}>
            Chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  );
}
