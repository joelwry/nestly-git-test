"use client";

import React from "react";
import Loadindicator from "../components/loadindicator";
import Combo_course from "../components/combo_course";
import { get_request } from "../utils/services";

class Combo_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let combos = await get_request("combo_courses");

    this.setState({ combos });
  };

  render() {
    let { gray } = this.props;
    let { combos } = this.state;
    if (combos && !combos.length) return null;

    return (
      <section className={`${gray ? "gray" : ""} min`} id="combo_courses">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>Get any of our course collection</h2>
                <p>
                  Choose one of our combo courses to advance your career and
                  become a skilled professional.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {combos ? (
              combos?.map((combo, index) => (
                <Combo_course combo={combo} key={index} />
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

export default Combo_courses;
