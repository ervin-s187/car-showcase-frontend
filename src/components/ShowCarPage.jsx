
import { useEffect, useState, useCallback } from 'react';
import CarCard from './CarCard';
import CarForm from './carform';

function ShowCarPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingCar, setEditingCar] = useState(null);

  const loadCars = useCallback(async () => {
    try {
      const response = await fetch('/api/cars');

      if (!response.ok) {
        throw new Error('Could not load the car collection.');
      }

      const carData = await response.json();
      setCars(carData);
      setError('');
    } catch {
      setError('Could not load cars. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadInitialCars = async () => {
      try {
        const response = await fetch('/api/cars', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Could not load the car collection.');
        }

        const carData = await response.json();

        if (!controller.signal.aborted) {
          setCars(carData);
          setError('');
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('Could not load cars. Check your connection and try again.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadInitialCars();

    return () => controller.abort();
  }, []);

  // Open the edit form
  const handleEdit = (car) => {
    setEditingCar(car);
  };

  // Close the edit form
  const handleCancelEdit = () => {
    setEditingCar(null);
  };

  // Refresh cars after editing
  const handleCarSaved = async () => {
    await loadCars();
    setEditingCar(null);
  };

  // Delete a car
  const handleDelete = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Could not delete this car.');
      }

      setCars((previousCars) =>
        previousCars.filter((car) => car.id !== carId)
      );

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="show-car-page collection-section">
      <div className="container">

        <a className="button-secondary" href="/">
          Back to garage
        </a>

        <header className="show-car-page-heading">
          <h1>Car Collection</h1>
         
        </header>

        {loading && (
          <p className="status-message" role="status">
            Loading cars…
          </p>
        )}

        {error && (
          <p className="status-message text-danger" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && cars.length === 0 && (
          <p className="status-message">
            No cars yet.
          </p>
        )}

        {!loading && !error && cars.length > 0 && (
          <div className="row g-4">
            {cars.map((car) => (
              <div className="col-12 col-sm-6 col-lg-4" key={car.id}>
                <CarCard
                  car={car}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}

        {/* EDIT CAR POPUP */}
        {editingCar && (
          <CarForm
            key={editingCar.id}
            car={editingCar}
            onCarSaved={handleCarSaved}
            onCancel={handleCancelEdit}
          />
        )}

      </div>
    </section>
  );
}

export default ShowCarPage;
