import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts, selectProduct } from '../features/products/productsSlice';
import { RootState } from '../app/store';
import { useAppDispatch } from '../app/hooks';

const ProductTable = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const [query, setQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    dispatch(fetchProducts({ query, sort: `${sortOrder === 'asc' ? '' : '-'}${sortColumn}` }));
  }, [query, sortColumn, sortOrder, dispatch]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleSelect = (id: number) => {
    dispatch(selectProduct(id));
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th onClick={() => handleSort('id')} className="p-3 text-left text-gray-600 cursor-pointer">ID</th>
            <th onClick={() => handleSort('name')} className="p-3 text-left text-gray-600 cursor-pointer">Name</th>
            <th onClick={() => handleSort('description')} className="p-3 text-left text-gray-600 cursor-pointer">Description</th>
            <th onClick={() => handleSort('price')} className="p-3 text-left text-gray-600 cursor-pointer">Price</th>
            <th onClick={() => handleSort('stock')} className="p-3 text-left text-gray-600 cursor-pointer">Stock</th>
            <th className="p-3 text-left text-gray-600">Select</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{product.id}</td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.description}</td>
              <td className="p-3">${Number(product.price).toFixed(2)}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3">
                <button
                  onClick={() => handleSelect(product.id)}
                  className={`px-4 py-2 rounded ${
                    product.selected ? 'bg-gray-300' : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {product.selected ? 'Selected' : 'Select'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
