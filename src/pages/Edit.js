import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Edit() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/supplier');
    } else {
      // Token validation logic here
      // If invalid, redirect to /supplier
    }

    fetch('http://localhost:8080/supplier/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.data));
  }, );

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/supplier');
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:8080/supplier/products/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setProducts(products.filter(product => product.id !== id));
    });
  };

  const updateProduct = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8080/supplier/products/${currentProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentProduct),
    })
    .then(() => {
      setProducts(products.map(product => product.id === currentProduct.id ? currentProduct : product));
      setShowModal(false);
    });
  };

  const addProduct = () => {
    setCurrentProduct({ productName: '', productPrice: 0, productAmount: 0 });
    setShowModal(true);
  };

  const handleAdd = () => {
    fetch('http://localhost:8080/supplier/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentProduct),
    })
    .then(response => response.json())
    .then(data => {
      setProducts([...products, data.data]);
      setShowModal(false);
    });
  };

  return (
    <div className="container">
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">Vending Machine</div>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </nav>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productAmount}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => updateProduct(product)}>Edit</button>
                <button className="btn btn-danger ml-2" onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={addProduct}>Add Product</button>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={currentProduct.productName}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, productName: e.target.value })}
                  placeholder="Name"
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  value={currentProduct.productPrice}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, productPrice: e.target.value })}
                  placeholder="Price"
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  value={currentProduct.productAmount}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, productAmount: e.target.value })}
                  placeholder="Amount"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={currentProduct.productImageUrl}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, productImageUrl: e.target.value })}
                  placeholder="Product Image Url"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={currentProduct.id ? handleUpdate : handleAdd}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Edit;
