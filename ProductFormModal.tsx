import React, { useState, useEffect } from 'react';
import { Product, ProductFormData } from './types';
import styles from './ProductFormModal.module.css';

const CATEGORIES = ['Thời trang', 'Thực phẩm', 'Gia dụng', 'Điện tử', 'Sách', 'Chăm sóc cá nhân', 'Khác'];
const UNITS = ['cái', 'hộp', 'gói', 'chai', 'cuốn', 'kg', 'lít', 'bộ'];

type Props = {
  mode: 'add' | 'edit';
  product?: Product | null;
  onSave: (data: ProductFormData) => void;
  onClose: () => void;
};

type FormErrors = Partial<Record<keyof ProductFormData, string>>;

const EMPTY_FORM: ProductFormData = {
  code: '',
  name: '',
  category: '',
  price: 0,
  unit: 'cái',
  stock: 0,
  status: 'active',
  description: '',
};

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <div className={styles.label}>
      <span>{text}</span>
      {required && <span className={styles.requiredBadge}>phải nhập</span>}
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

export function ProductFormModal({ mode, product, onSave, onClose }: Props) {
  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (mode === 'edit' && product) {
      setForm({
        code: product.code,
        name: product.name,
        category: product.category,
        price: product.price,
        unit: product.unit,
        stock: product.stock,
        status: product.status,
        description: product.description ?? '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [mode, product]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
    if (errors[name as keyof ProductFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.code.trim()) newErrors.code = 'Vui lòng nhập mã sản phẩm';
    if (!form.name.trim()) newErrors.name = 'Vui lòng nhập tên sản phẩm';
    if (!form.category) newErrors.category = 'Vui lòng chọn danh mục';
    if (!form.price || form.price <= 0) newErrors.price = 'Vui lòng nhập đơn giá hợp lệ';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSave(form);
      onClose();
    }
  }

  const title = mode === 'add' ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm';

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={title}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng">
            <IconClose />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.body}>
            <div className={styles.grid2}>
              {/* Mã sản phẩm */}
              <div className={styles.field}>
                <Label text="Mã sản phẩm" required />
                <input
                  className={`${styles.input} ${errors.code ? styles.inputError : ''}`}
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="VD: SP001"
                />
                {errors.code && <span className={styles.errorText}>{errors.code}</span>}
              </div>

              {/* Danh mục */}
              <div className={styles.field}>
                <Label text="Danh mục" required />
                <select
                  className={`${styles.input} ${styles.select} ${errors.category ? styles.inputError : ''}`}
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && <span className={styles.errorText}>{errors.category}</span>}
              </div>
            </div>

            {/* Tên sản phẩm */}
            <div className={styles.field}>
              <Label text="Tên sản phẩm" required />
              <input
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nhập tên sản phẩm"
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.grid3}>
              {/* Đơn giá */}
              <div className={styles.field}>
                <Label text="Đơn giá (₫)" required />
                <input
                  className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
                  type="number"
                  name="price"
                  min={0}
                  value={form.price || ''}
                  onChange={handleChange}
                  placeholder="0"
                />
                {errors.price && <span className={styles.errorText}>{errors.price}</span>}
              </div>

              {/* Đơn vị */}
              <div className={styles.field}>
                <Label text="Đơn vị" />
                <select
                  className={`${styles.input} ${styles.select}`}
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              {/* Tồn kho */}
              <div className={styles.field}>
                <Label text="Tồn kho" />
                <input
                  className={styles.input}
                  type="number"
                  name="stock"
                  min={0}
                  value={form.stock || ''}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Trạng thái */}
            <div className={styles.field} style={{ maxWidth: 240 }}>
              <Label text="Trạng thái" />
              <select
                className={`${styles.input} ${styles.select}`}
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>

            {/* Mô tả */}
            <div className={styles.field}>
              <Label text="Mô tả" />
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Nhập mô tả sản phẩm (không bắt buộc)"
                rows={3}
              />
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Huỷ
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {mode === 'add' ? 'Thêm sản phẩm' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
