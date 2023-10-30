import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetail from './components/ItemDetail/ItemDetail';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
          <Routes>
            <Route exact path="/" element={<ItemListContainer title={'Bienvenido'}/>} />
            <Route exact path="/categoria/:catid" element={<ItemListContainer title={'Productos'} />} />
            <Route path="/producto/:id" element={<ItemDetail />} />
          </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;