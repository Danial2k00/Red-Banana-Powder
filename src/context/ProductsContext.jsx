import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { db } from '../firebase/config';
import { products as defaultProducts } from '../data/products';

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mount listener for real-time changes
  useEffect(() => {
    const productsRef = ref(db, 'products');
    
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const dataVal = snapshot.val();
      
      // Auto-seeding logic if database is empty on first query
      if (!dataVal) {
        defaultProducts.forEach((product) => {
          const { id, ...cleanProduct } = product;
          push(productsRef, {
            ...cleanProduct,
            createdAt: Date.now()
          });
        });
        setProducts([]);
        setIsLoading(false);
        return;
      }
      
      const parsedList = Object.entries(dataVal).map(([id, data]) => ({
        id,
        ...data
      }));

      // Sort by creation date so new additions sit at the top
      parsedList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setProducts(parsedList);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = (newProduct) => {
    const productsRef = ref(db, 'products');
    push(productsRef, {
      ...newProduct,
      createdAt: Date.now()
    });
  };

  const updateProduct = (id, updatedProduct) => {
    const productRef = ref(db, `products/${id}`);
    update(productRef, updatedProduct);
  };

  const deleteProduct = (id) => {
    const productRef = ref(db, `products/${id}`);
    remove(productRef);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
