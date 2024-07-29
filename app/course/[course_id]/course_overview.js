"use client";

import React from "react";
import Certification_courses from "@/src/sections/certification_courses";
import { emitter } from "@/app/layout";
import Link from "next/link";

class Course_overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_enroll = (e) => {
    let { course } = this.props;
    window.sessionStorage.setItem("enroll", JSON.stringify(course));
    emitter.emit("push_enroll", course);
  };

  tabname = "overview";

  render() {
    let { course, active_tab } = this.props;
    let {
      description,
      short_description,
      what_you_will_learn,
      requirements,
      certifications,
      description_title,
    } = course;
    description = description || short_description;
    if (requirements && !requirements.length) requirements = null;

    return (
      <div
        class={`tab-pane fade ${
          active_tab === this.tabname ? " show active" : ""
        }`}
        id="overview"
        role="tabpanel"
        aria-labelledby="overview-tab"
      >
        <div class="edu_wraper">
          <h2 class="edu_title" style={{ fontSize: 24 }}>
            {description_title || "Course Overview"}
          </h2>
          {description.split("\n").map((d, i) => (
            <p style={{ fontSize: 20, lineHeight: 2 }} key={i}>
              {d}
            </p>
          ))}

          <Link
            href="/enroll"
            onClick={this.handle_enroll}
            className="btn btn-md text-light theme-bg"
          >
            Get Started
          </Link>

          {requirements && requirements.length ? <h6>Requirements</h6> : null}
          {requirements && requirements.length ? (
            <ul class="simple-list p-0">
              {requirements.map((requirement, i) => (
                <li key={i}>{requirement}</li>
              ))}
            </ul>
          ) : null}
        </div>

        {certifications && certifications.length ? (
          <div>
            <h4 class="edu_title">Certifications</h4>
            <Certification_courses certifications={certifications} />
          </div>
        ) : null}

        {what_you_will_learn && what_you_will_learn.length ? (
          <div class="edu_wraper">
            <h4 class="edu_title" style={{ fontSize: 28 }}>
              What you'll learn
            </h4>
            <ul class="lists-3 row" style={{ fontSize: 20 }}>
              {what_you_will_learn.map((learn, i) => (
                <li key={i} class="col-xl-4 mb-2 col-lg-6 col-md-6 m-0">
                  {learn}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Course_overview;
