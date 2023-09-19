import './App.css';
import Products from './modules/Products';
import ActiveWallet from './modules/ActiveWallet';
function App() {

  
  return (
    <div className="main">
<h1 className='main-title'>Vending Machine</h1>
      <div className="main-box">
        
        <div className='box-left'>
        <Products></Products>
        </div>
        <div className='box-right'>
          <h3>Welcome</h3>
          <ActiveWallet></ActiveWallet>
        </div>
      </div>
    </div>
  );
}

export default App;
