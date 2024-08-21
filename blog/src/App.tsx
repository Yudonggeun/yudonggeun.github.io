import React from 'react';
import logo from './logo.svg';
import AuctionDetails from './pages/AuctionDetail';
import './App.css';
import AuctionList from './pages/AuctionList';
import LoginPage from './pages/Login';
import ChargePointPage from './pages/ChargePoint';
import ReceiptListPage from './pages/ReceiptList';
import {usePageStore} from "./store/PageStore";
import Footer from "./pages/Footer";
import SignUpPage from "./pages/SignUp";

function App() {

  const { currentPage, setPage } = usePageStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <AuctionList />;
      case 'auctionDetail':
        return <AuctionDetails />;
      case 'login':
        return <LoginPage />;
      case 'charge':
        return <ChargePointPage />;
      case 'receiptList':
        return <ReceiptListPage />;
      case 'signup':
        return <SignUpPage />;
    }
  }

  return (
      <>
        <div>
          {renderPage()}
        </div>
        <Footer />
      </>
  );
}

export default App;
