"use client";

import React from "react";
import Course_curriculum from "./course_curriculum";
import Course_overview from "./course_overview";
import Course_reviews from "./course_reviews";
import { to_title } from "@/src/utils/functions";

class Course_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active_tab: "overview" };
  }

  tabs = new Array("overview", "curriculum", "reviews");

  render_tab_pill = () => {
    let { current_tab } = this.state;

    return this.tabs.map((tab) => (
      <li
        class="nav-item"
        key={tab}
        onClick={() => this.setState({ active_tab: tab })}
      >
        <a
          class={`nav-link ${current_tab === tab ? "active" : ""}`}
          id={`${tab}-tab`}
          data-toggle="pill"
          href={`#${tab}`}
          role="tab"
          aria-controls={tab}
          aria-selected="true"
        >
          {to_title(tab)}
        </a>
      </li>
    ));
  };

  render() {
    let { course } = this.props;
    let { active_tab } = this.state;

    return (
      <div class="col-lg-8 col-md-12 order-lg-first">
        <div class="tab_box_info mt-4">
          <ul class="nav nav-pills mb-3 light" id="pills-tab" role="tablist">
            {this.render_tab_pill()}
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <Course_overview active_tab={active_tab} course={course} />
            <Course_curriculum active_tab={active_tab} course={course} />
            <Course_reviews active_tab={active_tab} course={course} />
          </div>
        </div>
      </div>
    );
  }
}

export default Course_details;
