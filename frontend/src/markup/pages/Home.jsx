import React from "react";
import banner from "../../assets/images/banner/banner.jpg";
import image1 from "../../assets/images/HomeImg/image1.png";
import image2 from "../../assets/images/HomeImg/image2.png";

import image3 from "../../assets/images/HomeImg/image3.png";
import image4 from "../../assets/images/HomeImg/image4.png";

function Home() {
  return (
    <div>
      {/* <!-- Video Section --> */}
      <section classNameNameName="video-section">
        <div
          data-parallax='{"y": 50}'
          classNameNameName="sec-bg"
          style={{
            backgroundImage: `url('../../assets/images/banner/banner.jpg')`,
          }}
        >
          <img src={banner} alt="" />
        </div>
        {/* <div classNameNameName="auto-container">
          <h5>Working since 1999</h5>
          <h2>
            Tuneup Your Car <br /> to Next Level
          </h2>
          <div classNameNameName="video-box">
            <div classNameNameName="video-btn">
              <a
                href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
                classNameNameName="overlay-link lightbox-image video-fancybox ripple"
              >
                <i classNameNameName="flaticon-play"></i>
              </a>
            </div>
            <div classNameNameName="text">
              Watch intro video <br /> about us
            </div>
          </div>
        </div> */}
      </section>

      {/* <!-- Bnner Section --> */}

      {/* <!-- End Bnner Section --> */}

      {/* <!-- About Us --> */}
      <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-5">
              <div className="image-box">
                <img src={image1} alt="" />
              </div>
            </div>
            <div className="col-lg-7 pl-lg-5">
              <div className="sec-title">
                <h5>Welcome to Our workshop</h5>
                <h2>We have 10 years experience</h2>
                <div className="text">
                  <p>
                    s@mi Garage offers free estimate automotive service,
                    dedicated to ensuring your vehicle remains in optimal
                    condition mile after mile. From routine maintenance to
                    complex repairs, our skilled professionals prioritize
                    reliability and transparency to guarantee our customer
                    satisfaction.
                  </p>
                  <p>
                    At s@mi Garage, trust and transparency drive everything we
                    do. We offer clear communication, honest advice, and fair
                    pricing, ensuring your peace of mind. With experienced
                    professionals dedicated to your safety, your car's
                    well-being is always our top priority. Welcome to Kebe
                    Garage—where you and your vehicle come first.
                  </p>
                </div>
                <div className="link-btn mt-40">
                  <a
                    href="/about"
                    className="theme-btn btn-style-one style-two"
                  >
                    <span>
                      About Us <i className="flaticon-right"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Services Section --> */}
      <section className="services-section">
        <div className="auto-container">
          <div className="sec-title style-two">
            <h2>Our Featured Services</h2>
            <div className="text"> </div>
          </div>
          <div className="row">
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Performance Upgrade</h2>
                <a href="#" className="read-more">
                  read more +
                </a>
                <div className="icon">
                  <span className="flaticon-power"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Transmission Services</h2>
                <a href="#" className="read-more">
                  read more +
                </a>
                <div className="icon">
                  <span className="flaticon-gearbox"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Break Repair & Service</h2>
                <a href="#" className="read-more">
                  read more +
                </a>
                <div className="icon">
                  <span className="flaticon-brake-disc"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Engine Service & Repair</h2>
                <a href="#" className="read-more">
                  read more +
                </a>
                <div className="icon">
                  <span className="flaticon-car-engine"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Tyre & Wheels</h2>
                <a href="#" className="read-more">
                  read more +
                </a>
                <div className="icon">
                  <span className="flaticon-tire"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">
                <h5>Service and Repairs</h5>
                <h2>Denting & Painting</h2>
                <a href="#" className="read-more">
                  read more +
                </a>
                <div className="icon">
                  <span className="flaticon-spray-gun"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Features Section --> */}
      <section className="features-section">
        <div className="col-lg-12">
          <div className="image">
            <img src={image2} alt="" />
          </div>
        </div>
      </section>

      {/* <!-- Why Choose Us --> */}
      <section className="why-choose-us">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <h2>Why Choose Us</h2>
                <div className="text">
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation heading towards.
                </div>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-mechanic"></span>
                </div>
                <h4>Certified Expert Mechanics</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-wrench"></span>
                </div>
                <h4>Fast And Quality Service</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-price-tag-1"></span>
                </div>
                <h4>Best Prices in Town</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-trophy"></span>
                </div>
                <h4>Awarded Workshop</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <h2>Addtional Services</h2>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className="image">
                    <img src={image3} alt="" />
                  </div>
                </div>
                <div className="col-md-7">
                  <ul className="list">
                    <li>General Auto Repair & Maintenance</li>
                    <li>Transmission Repair & Replacement</li>
                    <li>Tire Repair and Replacement</li>
                    <li>State Emissions Inspection</li>
                    <li>Break Job / Break Services</li>
                    <li>Electrical Diagnostics</li>
                    <li>Fuel System Repairs</li>
                    <li>Starting and Charging Repair</li>
                    <li>Steering and Suspension Work</li>
                    <li>Emission Repair Facility</li>
                    <li>Wheel Alignment</li>
                    <li>Computer Diagaonstic Testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Video Section --> */}
      <section className="video-section">
        <img src={image4} alt="" />

        <div
        // data-parallax='{"y": 50}'
        // className="sec-bg"

        // style={{
        //   backgroundImage: `url('../../assets/images/image4.png')`,
        // }}
        ></div>
        <h5></h5>
        <h2>
          {" "}
          <br />
        </h2>
        <div className="video-box">
          <div className="text"></div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <!-- CTA Section --> */}
      <section className="cta-section">
        <div className="auto-container">
          <div className="wrapper-box">
            <div className="left-column">
              <h3>Schedule Your Appointment Today</h3>
              <div className="text">
                Your Automotive Repair & Maintenance Service Specialist
              </div>
            </div>
            <div className="right-column">
              <div className="phone">+1 301 291 9845</div>
              <div className="btn">
                <a href="#" className="theme-btn btn-style-one">
                  <span>Appointment</span>
                  <i className="flaticon-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
