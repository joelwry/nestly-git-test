"use client";

import React from "react";
import Loadindicator from "../components/loadindicator";
import Service from "../components/service";

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { bg, services } = this.props;
    if (services && !services.length) return null;

    return (
      <section id="services" className={bg === "light" ? "" : "gray"}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>Our Services</h2>
                <p>
                  We offer a vast array of services to serve the need of
                  demanding market
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {services && typeof services.map === "function" ? (
              services.map((service, index) => (
                <Service service={service} key={index} />
              ))
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Services;
