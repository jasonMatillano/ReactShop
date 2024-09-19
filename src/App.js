import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ShopContextProvider } from "./context/shop-context";
import {Navbar} from './components/navbar';
import {Cart} from './pages/cart/cart';
import {Shop} from './pages/shop/shop';

function App() {
  return (
  <div className="App">
   <Router>
    <ShopContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />}/>
          <Route path="/contact"/>
          <Route path="/cart" element={<Cart />}/>
        </Routes>
      </ShopContextProvider>
    </Router>
  </div>
  );
}

export default App;
