"use client";

import React from "react";
import { to_title } from "../utils/functions";
import { client_domain } from "../utils/constants";

class Combo_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  courses_string = (courses) => {
    let str = "";
    courses.map((course) => (str += `${course.title} + `));

    return to_title(str.slice(0, str.length - 3));
  };

  handle_course = () => {
    let { combo } = this.props;
    window.sessionStorage.setItem("course", JSON.stringify(combo));
    window.location.assign(`${client_domain}/course`);
  };

  render() {
    let { combo, remove_combo } = this.props;
    let { title } = combo;

    return (
      <div className="col-lg-4 col-md-4 col-sm-6" onClick={this.handle_course}>
        <div className="edu_cat_2 cat-1 combo_course">
          <div
            className="d-flex align-items-center"
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span className="">{to_title(title)}</span>
            <span className="ml-3">
              {remove_combo ? (
                <a onClick={remove_combo} className="btn btn-action">
                  <i className={`fas fa-window-close`}></i>
                </a>
              ) : (
                <img
                  src="../assets/css/img/lightbox-next.png"
                  height="20"
                  width="20"
                />
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Combo_course;
