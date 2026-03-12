import React from 'react';
import { Product } from './types';
import styles from './DeleteConfirmModal.module.css';

type Props = {
  product: Product;
  onConfirm: () => void;
  onClose: () => void;
};

function IconWarning() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.warningIcon}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
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

export function DeleteConfirmModal({ product, onConfirm, onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Xác nhận xoá">
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Xác nhận xoá</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng">
            <IconClose />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <IconWarning />
          <p className={styles.message}>
            Bạn có chắc chắn muốn xoá sản phẩm{' '}
            <strong className={styles.productName}>"{product.name}"</strong> không?
          </p>
          <p className={styles.subMessage}>Hành động này không thể hoàn tác.</p>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.btnSecondary} onClick={onClose}>
            Huỷ
          </button>
          <button className={styles.btnAlert} onClick={onConfirm}>
            Xoá sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}
