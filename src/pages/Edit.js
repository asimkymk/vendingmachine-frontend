import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SupplierService from '../services/SupplierService';
import UnitService from '../services/UnitService';
import ProductService from '../services/ProductService';
function Edit() {
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState({});
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentUnit, setCurrentUnit] = useState(null);
  const [currentTab, setCurrentTab] = useState('Products');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/supplier');
        return;
      }

      const supplierService = new SupplierService();
      const isValid = await supplierService.validateToken(token);

      if (isValid.success) {
        await getProduct();
        await getUnits();
      } else {
        navigate('/supplier');
      }
    };

    fetchData();
  },[] );

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/supplier');
  };


  const getProduct = () => {
    const productService = new ProductService();
    productService.getAllProducts()
      .then((result) => {
        if (result.success) {
          setProducts(result.data)
        }
        else {

        }

      },
        (error) => {

        });
  };

  const getUnits = () => {
    const unitService = new UnitService();
    unitService.getUnits()
      .then((result) => {
        if (result.success) {
          setUnits(result.data)
          getTotalRevenue();
        }
        else {

        }

      },
        (error) => {

        });
  };

  const getTotalRevenue = () => {
    const token = localStorage.getItem('token');
    const unitService = new SupplierService();
    unitService.getTotalRevenue(token)
      .then((result) => {
        if (result.success) {
          setTotalRevenue(result.data)
        }
        else {

        }

      },
        (error) => {

        });
  };



  const deleteProduct = (id) => {
    const supplierService = new SupplierService();
    const token = localStorage.getItem('token');
    supplierService.deleteProduct(token, id).then((response) => getProduct())
  };

  const deleteUnit = (id) => {
    const supplierService = new SupplierService();
    const token = localStorage.getItem('token');
    supplierService.deleteUnit(token, id).then((response) => getUnits())

  };
  const updateProduct = (product) => {
    setCurrentProduct(product);
    setShowProductModal(true);
  };

  const updateUnit = (unit) => {
    setCurrentUnit(unit);
    setShowUnitModal(true);
  };

  const handleUpdate = () => {
    const supplierService = new SupplierService();
    const token = localStorage.getItem('token');
    supplierService.updateProduct(token, currentProduct.id, currentProduct).then(() => {
      getProduct();
      setShowProductModal(false);
    });
  };

  const handleUnitUpdate = () => {
    const supplierService = new SupplierService();
    const token = localStorage.getItem('token');
    supplierService.updateUnit(token, currentUnit.id, currentUnit).then(() => {
      getUnits();
      setShowUnitModal(false);
    });
  };

  const addProduct = () => {
    setCurrentProduct({ productName: '', productPrice: 0, productAmount: 0 });
    setShowProductModal(true);
  };

  const addUnit = () => {
    setCurrentUnit({ unitPrice: 0, unitAmount: 0, tempAmount:0 });
    setShowUnitModal(true);
  };

  const collectAllMoney = () => {
    const supplierService = new SupplierService();
    const token = localStorage.getItem('token');
    supplierService.collectAllMoney(token).then((result) => {
      if (result.success) {
        getUnits();
      }
      else {

      }

    },
      (error) => {

      });
  };

  const handleAdd = () => {
    const supplierService = new SupplierService();
    const token = localStorage.getItem('token');
    supplierService.addProduct(token, currentProduct)
      .then(data => {
        getProduct();
        setShowProductModal(false);
      });
  };

  const handleUnitAdd = () => {
    const supplierService = new SupplierService();
    const token = localStorage.getItem('token');
    supplierService.addUnit(token, currentUnit)
      .then(data => {
        getUnits();
        setShowUnitModal(false);
      });
  };

  return (
    <div className="container">
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">Vending Machine</div>
       
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </nav>
      <ul className="nav nav-tabs mt-4">
        <li className="nav-item">
          <a className={`nav-link ${currentTab === 'Products' ? 'active' : ''}`} onClick={() => setCurrentTab('Products')}>Products</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${currentTab === 'Units' ? 'active' : ''}`} onClick={() => setCurrentTab('Units')}>Units</a>
        </li>
      </ul>

      {currentTab === 'Products' && (
        <div>
          {/* Your Products Table and Modal Here */}
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
                    <button className="btn btn-danger ml-2" style={{marginLeft:5}} onClick={() => deleteProduct(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={addProduct}>Add Product</button>
          {showProductModal && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Product</h5>
                    <button type="button" className="btn btn-danger" onClick={() => setShowProductModal(false)}>
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
                    <button type="button" className="btn btn-secondary" onClick={() => setShowProductModal(false)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={currentProduct.id ? handleUpdate : handleAdd}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      {currentTab === 'Units' && (
        <div>
          {/* Your Products Table and Modal Here */}
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Unit Price</th>
                <th>Unit Amount</th>
                <th>Temp Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.id}>
                  <td>{unit.unitPrice}</td>
                  <td>{unit.unitAmount}</td>
                  <td>{unit.tempAmount}</td>
                  <td>
                    <button className="btn btn-primary mr-2" onClick={() => updateUnit(unit)}>Edit</button>
                    <button className="btn btn-danger ml-2" style={{marginLeft:5}} onClick={() => deleteUnit(unit.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        <div>
          <p>Total Revenue : {totalRevenue.totalRevenue}₺</p>
        </div>
        <div>
          <p>Total Revenue Without Temp Amount : {totalRevenue.totalRevenueWithoutTemp}₺</p>
        </div>
        <div>
          <p>Active Wallet Price : {totalRevenue.activeWalletPrice}₺</p>
        </div>
          <button className="btn btn-success" onClick={addUnit}>Add Unit</button>
          <button className="btn btn-primary" style={{marginLeft:5}} onClick={collectAllMoney}>Collect All Money</button>

          {showUnitModal && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Unit</h5>
                    <button type="button" className="btn btn-danger" onClick={() => setShowUnitModal(false)}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="number"
                      className="form-control mb-2"
                      value={currentUnit.unitPrice}
                      onChange={(e) => setCurrentUnit({ ...currentUnit, unitPrice: e.target.value })}
                      placeholder="Price"
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      value={currentUnit.unitAmount}
                      onChange={(e) => setCurrentUnit({ ...currentUnit, unitAmount: e.target.value })}
                      placeholder="Amount"
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      value={currentUnit.tempAmount}
                      onChange={(e) => setCurrentUnit({ ...currentUnit, tempAmount: e.target.value })}
                      placeholder="Temp Amount for Wallet"
                    />

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowUnitModal(false)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={currentUnit.id ? handleUnitUpdate : handleUnitAdd}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}



    </div>
  );
}

export default Edit;
