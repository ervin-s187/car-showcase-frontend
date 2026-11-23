
import { useState } from "react";
import CarDetails from "./CarDetails";

function CarCard({ car, onEdit, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <article className="car-card">
        <div className="car-image-wrapper">
          {car.image ? (
            <img
              className="car-photo"
              src={car.image}
              alt={`${car.brand} ${car.model}`}
            />
          ) : (
            <div className="car-image-placeholder">
              No image available
            </div>
          )}

          <span className="car-year">{car.year}</span>
        </div>

        <div className="car-card-body">
          <div className="car-card-heading">
            <h3>{car.brand} {car.model}</h3>
          </div>

          <div className="car-card-bottom">
            <p className="car-price">
              ${Number(car.price).toLocaleString("en-US")}
            </p>

            <div className="car-form-actions">
              <button
                className="car-details-btn"
                onClick={() => setShowDetails(true)}
              >
                Details
              </button>

              <button
                className="car-edit-btn"
                onClick={() => onEdit?.(car)}
              >
                Edit
              </button>

              <button
                className="car-delete-btn"
                onClick={() => onDelete?.(car.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </article>

      {showDetails && (
        <CarDetails
          car={car}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}

export default CarCard;
