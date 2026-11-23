import CarForm from './carform';

function AddCarPage() {
  return (
    <section className="add-car-page">
      <div className="container">
        <a className="add-car-back" href="/#cars">← Back to collection</a>
        <header className="add-car-page-heading">
          <h1>Add a car to your garage</h1>
          <p>Enter the car details below to add it to the collection.</p>
        </header>
        <CarForm />
      </div>
    </section>
  );
}

export default AddCarPage;
