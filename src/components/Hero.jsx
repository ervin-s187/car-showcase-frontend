function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 hero-copy">
            <h1 className="mb-4">
              Performance<br />
              <em>cars</em>
            </h1>
           <p className="hero-intro mb-4">
              Compare petrol, hybrid cars by price and specifics.
            </p>
         </div>

          <div className="col-lg-5 hero-photo-wrap">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"
              alt="A Porsche 911 parked on a mountain road"
              className="hero-photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;