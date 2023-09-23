import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SupplierService from '../services/SupplierService';
function Supplier() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const supplierService = new SupplierService();
    const token = localStorage.getItem('token');
    if (token) {
      supplierService.validateToken(token)
        .then(data => {
          if (data.success) {
            navigate('/edit');
          } else {
            
          }
        });
      
    }
  },);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const supplierService = new SupplierService();
    
    const data = await supplierService.login({username,password})

    if (data.success) {
      localStorage.setItem('token', data.data);
      navigate('/edit');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="container vh-100">
      <h1 className="text-center mb-4">Vending Machine</h1>
      <div className="row align-items-center h-100">
        <div className="col-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Supplier Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Please type your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Please type your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-custom btn-custom-success">
                  Login
                </button>
              </form>
              {error && <div className="mt-3 text-danger">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supplier;
