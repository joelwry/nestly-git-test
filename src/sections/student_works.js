"use client";

import React from "react";
import Loadindicator from "../components/loadindicator";
import Student_work from "../components/student_work";
import Explore_more_btn from "../components/explore_more_btn";

class Student_works extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { gray, all, student_works } = this.props;

    if (student_works && !student_works.length) return null;

    return (
      <section className={gray ? `gray` : ""}>
        <div className="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  Where our Students&nbsp;
                  <span class="theme-cl">Work</span>
                </h2>
                <p></p>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            {student_works ? (
              student_works.map((work) => (
                <Student_work key={work._id} work={work} />
              ))
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>

        {all ? null : <Explore_more_btn title="" to={"/students_works"} />}
      </section>
    );
  }
}

export default Student_works;
