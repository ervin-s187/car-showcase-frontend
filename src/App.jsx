import Navbar from './components/navbar';
import Hero from './components/Hero';
import './App.css';
import './index.css';
import CarList from './components/CarList';
import AddCarPage from './components/AddCarPage';
import ShowCarPage from './components/ShowCarPage';

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '');
  const isAddCarPage = pathname === '/add-car';
  const isAllCarsPage = pathname === '/cars';

  return (
    <>
      <Navbar />
      <main>
        {isAddCarPage ? (
          <AddCarPage />
        ) : isAllCarsPage ? (
          <ShowCarPage />
        ) : (
          <>
            <Hero />
            <CarList />
          </>
        )}
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>
            <span>Done by <strong>Ervin Sekiraqa</strong></span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;