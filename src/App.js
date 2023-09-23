import './App.css';
import Products from './modules/Products';
import ActiveWallet from './modules/ActiveWallet';
import Supplier from './pages/Supplier';
import Edit from './pages/Edit';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div className="main">
              <h1 className='main-title'>Vending Machine</h1>
              <div className="main-box">
                <div className='box-left'>
                  <Products />
                </div>
                <div className='box-right'>
                  <h3>Welcome</h3>
                  <ActiveWallet />
                </div>
              </div>
            </div>
          </>
        } />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </Router>
    
  );
}

export default App;
