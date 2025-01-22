import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Orders from './components/Orders';
import ApprovalPage from './components/ApprovalPage';
import OrderStatusChangePage from './components/OrderStatusChangePage';

function App() {
  return (
    <UserProvider>
      <>

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/approvals" element={<ApprovalPage />} />
            <Route path='/proocess-orders' element={<OrderStatusChangePage />} />
          </Routes>
          <Footer />
        </BrowserRouter>

      </>
    </UserProvider>
  );
}

export default App;
