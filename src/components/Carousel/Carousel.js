import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: "img/photo1.jpg", alt: "Slider1" },
    { src: "img/photo5.jpg", alt: "Slider2" },
    { src: "img/photo2.jpg", alt: "Slider3" },
    { src: "img/photo3.jpg", alt: "Slider4" },
    { src: "img/photo4.jpg", alt: "slider5" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-ride functionality to match data-ride="carousel"
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>
      {/* Bootstrap CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
        crossOrigin="anonymous"
      />

      <div id="demo" className="carousel slide" data-ride="carousel">
        {/* Carousel indicators */}
        <ul className="carousel-indicators">
          {slides.map((_, index) => (
            <li
              key={index}
              data-target="#demo"
              data-slide-to={index}
              className={index === currentSlide ? "active" : ""}
              onClick={() => goToSlide(index)}
              style={{ cursor: "pointer" }}
            ></li>
          ))}
        </ul>

        {/* Carousel inner */}
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentSlide ? "active" : ""
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                style={{
                  height: "500px",
                  width: "100%" /*objectFit: "cover"*/,
                }}
              />
              <div className="carousel-caption">
                <h3></h3>
                {index > 0 && <p></p>}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <a
          className="carousel-control-prev"
          href="#demo"
          data-slide="prev"
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
        >
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a
          className="carousel-control-next"
          href="#demo"
          data-slide="next"
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
        >
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>

      {/* Bootstrap JS - Note: In a real React app, you'd handle this differently */}
      <script
        src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossOrigin="anonymous"
      ></script>
    </>
  );
};

export default Carousel;
