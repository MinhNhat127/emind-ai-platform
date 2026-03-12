import React, { useState } from 'react';
import { useProductManager } from './useProductManager';
import { ProductTable } from './ProductTable';
import { ProductFormModal } from './ProductFormModal';
import { ProductDetailModal } from './ProductDetailModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import styles from './ProductPage.module.css';

function IconPlus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function ProductPage() {
  const {
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
  } = useProductManager();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const displayedProducts = filteredProducts(searchTerm, filterCategory);
  const totalProducts = state.products.length;

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Quản lý sản phẩm</h1>
          <p className={styles.pageSubtitle}>
            {totalProducts} sản phẩm trong hệ thống
          </p>
        </div>
        <button className={styles.btnAdd} onClick={openAdd}>
          <IconPlus />
          Thêm sản phẩm
        </button>
      </div>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}><IconSearch /></span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Tìm theo tên hoặc mã sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className={styles.categorySelect}
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Result count */}
      {(searchTerm || filterCategory) && (
        <p className={styles.resultCount}>
          Tìm thấy <strong>{displayedProducts.length}</strong> sản phẩm
          {searchTerm && <> cho "<em>{searchTerm}</em>"</>}
          {filterCategory && <> trong "<em>{filterCategory}</em>"</>}
        </p>
      )}

      {/* Table */}
      <ProductTable
        products={displayedProducts}
        onView={openDetail}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      {/* Modals */}
      {(state.modal === 'add' || state.modal === 'edit') && (
        <ProductFormModal
          mode={state.modal}
          product={selectedProduct}
          onSave={(data) => {
            if (state.modal === 'add') addProduct(data);
            else if (state.modal === 'edit' && state.selectedId) updateProduct(state.selectedId, data);
          }}
          onClose={closeModal}
        />
      )}

      {state.modal === 'detail' && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeModal}
          onEdit={() => openEdit(selectedProduct.id)}
        />
      )}

      {state.modal === 'delete' && selectedProduct && (
        <DeleteConfirmModal
          product={selectedProduct}
          onConfirm={() => deleteProduct(selectedProduct.id)}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
