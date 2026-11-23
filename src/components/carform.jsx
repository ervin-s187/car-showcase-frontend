import { useState } from 'react';

const currentYear = new Date().getFullYear();
const carsApi = '/api/cars';
const initialForm = {
  brand: '', model: '', year: '', price: '', horsepower: '',
  fuel: '', transmission: '', image: '',
};

function CarForm({ car, onCarSaved, onCarAdded, onCancel }) {
  const [form, setForm] = useState(() => car ? {
    brand: car.brand || '',
    model: car.model || '',
    year: String(car.year ?? ''),
    price: String(car.price ?? ''),
    horsepower: car.horsepower == null ? '' : String(car.horsepower),
    fuel: car.fuel || '',
    transmission: car.transmission || '',
    image: car.image || '',
  } : initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const fieldPrefix = car ? `edit-car-${car.id}` : 'car';

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    const carData = {
      ...form, brand: form.brand.trim(), model: form.model.trim(),
      year: Number(form.year), price: Number(form.price),
      horsepower: form.horsepower ? Number(form.horsepower) : null,
      fuel: form.fuel.trim() || null, transmission: form.transmission.trim() || null,
      image: form.image.trim() || null,
    };

    try {
      const response = await fetch(car ? `${carsApi}/${car.id}` : carsApi, {
        method: car ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || `Could not ${car ? 'update' : 'add'} this car.`);
      }

      const onSave = onCarSaved || onCarAdded;
      if (onSave) {
        await onSave();
      }
      if (!car) setForm(initialForm);
      setStatus({ type: 'success', message: `${car ? 'Updated' : 'Added'} ${carData.brand} ${carData.model}.` });
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof TypeError ? 'Could not connect to the server.' : error.message });
    } finally {
      setSubmitting(false);
    }
  }

  const fields = [
    { name: 'brand', label: 'Brand *', required: true, maxLength: 100 },
    { name: 'model', label: 'Model *', required: true, maxLength: 100 },
    { name: 'year', label: 'Year *', required: true, type: 'text', inputMode: 'numeric',
      pattern: '[0-9]{4}', title: `Enter a four-digit year from 1886 to ${currentYear + 1}.` },
    { name: 'price', label: 'Price *', required: true, type: 'text', inputMode: 'decimal',
      pattern: '[0-9]+([.][0-9]{1,2})?', title: 'Enter a price using digits and an optional decimal.' },
    { name: 'horsepower', label: 'Horsepower', type: 'text', inputMode: 'numeric',
      pattern: '[0-9]+', title: 'Enter horsepower using digits.' },
    { name: 'fuel', label: 'Fuel type', maxLength: 50 },
    { name: 'transmission', label: 'Transmission', maxLength: 50 },
    { name: 'image', label: 'Image URL', type: 'url' },
  ];

  const formContent = (
    <form className="car-form" onSubmit={handleSubmit}>
      <div className="row g-3">
        {fields.map(({ name, label, ...attributes }) => {
          const id = `${fieldPrefix}-${name}`;
          return (
            <div className="col-md-6" key={name}>
              <label className="form-label" htmlFor={id}>{label}</label>
              <input className="form-control" id={id} name={name}
                value={form[name]} onChange={handleChange} {...attributes} />
            </div>
          );
        })}
      </div>
      <div className="car-form-actions mt-3">
        <button className="button-primary" type="submit" disabled={submitting}>
          {submitting ? (car ? 'Saving…' : 'Adding…') : (car ? 'Save changes' : 'Add car')}
        </button>
        {car && (
          <button className="button-secondary" type="button" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
      {status && (
        <p className={`car-form-status ${status.type === 'error' ? 'text-danger' : ''}`}
          role={status.type === 'error' ? 'alert' : 'status'}>{status.message}</p>
      )}
    </form>
  );
  if (car) {
    return (
      <div className="car-details-overlay" onClick={onCancel}>
        <section className="car-details-panel car-edit-panel" role="dialog" aria-modal="true"
          aria-labelledby="edit-car-title" onClick={(event) => event.stopPropagation()}>
          <header className="car-details-header">
            <h2 id="edit-car-title">Edit {car.brand} {car.model}</h2>
            <button className="car-details-close" onClick={onCancel} aria-label="Close edit form">×</button>
          </header>
          <div className="car-edit-content">{formContent}</div>
        </section>
      </div>
    );
  }

  return (
    <section id="add-car" className="add-car-section" aria-labelledby="add-car-title">
      <h3 id="add-car-title">New car</h3>
      {formContent}
    </section>
  );
}

export default CarForm;
