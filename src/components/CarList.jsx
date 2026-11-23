import AboutUs from './AboutUs';

function CarList() {
  return (
    <>
      <section id="cars" className="collection-section">
        <div className="container">
          <div className="collection-heading all-cars-cta">
            <h2>Every car. One collection.</h2>
            <p>Explore our curated collection of cars, from classic models to the latest releases. Each car is meticulously documented with detailed specifications and high-quality images.</p>
            <a className="button-primary" href="/cars">Show all cars</a>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <AboutUs />
        </div>
      </section>
    </>
  );
}

export default CarList;
