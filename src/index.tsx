import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsProvider } from './contexts/productsContext';
import { FilterProvider } from './contexts/filterContext';
import { CartProvider } from './contexts/cartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ProductsProvider>
    <FilterProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FilterProvider>
  </ProductsProvider>
);