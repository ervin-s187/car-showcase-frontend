
function CarDetails({ car, onClose }) {
  return (
    <div
      className="car-details-overlay"
      onClick={onClose}
    >
      <section
        className="car-details-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="car-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="car-details-header">
          <h2 id="car-details-title">
            {car.brand} {car.model}
          </h2>

          <button
            className="car-details-close"
            onClick={onClose}
            aria-label="Close details"
          >
            ×
          </button>
        </header>

        <div className="car-details-content">

          {car.image && (
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
            />
          )}

          <p className="car-details-price">
            ${Number(car.price).toLocaleString("en-US")}
          </p>

          <dl>
            <div>
              <dt>Year</dt>
              <dd>{car.year || "—"}</dd>
            </div>

            <div>
              <dt>Horsepower</dt>
              <dd>{car.horsepower ? `${car.horsepower} hp` : "—"}</dd>
            </div>

            <div>
              <dt>Fuel</dt>
              <dd>{car.fuel || "—"}</dd>
            </div>

            <div>
              <dt>Transmission</dt>
              <dd>{car.transmission || "—"}</dd>
            </div>
          </dl>
        </div>

        <footer className="car-details-footer">
          <button
            className="button-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}

export default CarDetails;
