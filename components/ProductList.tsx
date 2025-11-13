
import React, { useState, useEffect, useRef } from 'react';
import { FishProduct } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { XIcon } from './icons/XIcon';

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// --- Product Card Component ---
interface ProductCardProps {
  product: FishProduct;
  isAdmin: boolean;
  onEdit?: (product: FishProduct) => void;
  onDelete?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin, onEdit, onDelete }) => (
  <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col text-left overflow-hidden">
    <div className="relative h-56 bg-slate-200">
      {product.imageUrl ? (
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
      )}
      {isAdmin && (
       <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={() => onEdit?.(product)} className="bg-white p-2 rounded-full shadow-md hover:bg-blue-100" aria-label="Edit product">
            <EditIcon className="w-5 h-5 text-blue-600" />
        </button>
        <button onClick={() => onDelete?.(product.id)} className="bg-white p-2 rounded-full shadow-md hover:bg-red-100" aria-label="Delete product">
            <TrashIcon className="w-5 h-5 text-red-600" />
        </button>
      </div>
      )}
    </div>
    <div className="p-6 flex-grow flex flex-col justify-between">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{product.name}</h3>
      <p className="text-2xl font-bold text-blue-600">{product.price}</p>
    </div>
  </div>
);


// --- Product Form Modal Component ---
interface ProductFormModalProps {
  productToEdit: FishProduct | null;
  onClose: () => void;
  onSave: (productData: { name: string; price: string; imageFile?: File }, productId?: string) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ productToEdit, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>(productToEdit?.imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setImagePreview(productToEdit.imageUrl);
    }
  }, [productToEdit]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    onSave({ name, price, imageFile }, productToEdit?.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800" aria-label="Close modal">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-slate-800">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-slate-300 hover:border-blue-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Product preview" className="w-full h-full object-contain rounded-lg" />
            ) : (
              <div className="text-center text-slate-500">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                <p className="mt-1 text-sm">Click to upload an image</p>
              </div>
            )}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 text-left">Product Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700 text-left">Price</label>
            <input type="text" id="price" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div className="flex justify-end space-x-4">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">Cancel</button>
             <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Main Product List Component ---
interface ProductListProps {
  products: FishProduct[];
  isAdmin: boolean;
  onAddProduct?: (product: Omit<FishProduct, 'id' | 'imageUrl'> & { imageUrl?: string }) => void;
  onUpdateProduct?: (product: FishProduct) => void;
  onDeleteProduct?: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, isAdmin, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<FishProduct | null>(null);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: FishProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (productId: string) => {
    if (onDeleteProduct && window.confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(productId);
    }
  };

  const handleSave = async (
    productData: { name: string; price: string; imageFile?: File },
    productId?: string
  ) => {
    let imageUrl = editingProduct?.imageUrl;
    if (productData.imageFile) {
      imageUrl = await fileToBase64(productData.imageFile);
    }
    
    if (editingProduct && productId) {
        onUpdateProduct?.({ ...editingProduct, name: productData.name, price: productData.price, imageUrl });
    } else {
        onAddProduct?.({ name: productData.name, price: productData.price, imageUrl });
    }

    handleCloseModal();
  };

  return (
    <div>
      {isAdmin && (
        <div className="mb-8 flex justify-center">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New Product
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            isAdmin={isAdmin}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {isAdmin && isModalOpen && (
        <ProductFormModal
          productToEdit={editingProduct}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProductList;
