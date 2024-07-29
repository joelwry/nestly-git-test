"use client";

import React from "react";
import Loadindicator from "../components/loadindicator";
import Trustee from "../components/trustee";

class Trusted_by extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { trustees } = this.props;

    return trustees && trustees.length ? (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Trusted By{" "}
                  <span className="theme-cl">{trustees.length || ""}</span>
                </h2>
                <p></p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {trustees?.map ? (
              trustees.map((trustee) => (
                <Trustee key={trustee._id} trustee={trustee} />
              ))
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </section>
    ) : null;
  }
}

export default Trusted_by;
