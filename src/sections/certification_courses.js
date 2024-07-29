"use client";

import React from "react";
import Loadindicator from "../components/loadindicator";
import Certification_course from "../components/certification_course";
import { get_request, post_request } from "../utils/services";

class Certification_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { certifications: cert_ids } = this.props;

    let certifications =
      cert_ids && cert_ids.length
        ? await post_request("get_certifications", { cert_ids })
        : await get_request("certifications");

    this.setState({ certifications });
  };

  render() {
    let { certifications: cert_ids, gray, subtitle } = this.props;
    let { certifications } = this.state;

    if (certifications && !certifications.length) return null;

    return (
      <section className={cert_ids?.length || gray ? `gray` : ""}>
        <div className="container">
          {cert_ids?.length ? null : (
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  <h2>
                    Explore Courses by{" "}
                    <span class="theme-cl">Certifications</span>
                  </h2>
                  <p></p>
                </div>
              </div>
            </div>
          )}
          <div class="row justify-content-center">
            {certifications?.length ? (
           typeof certifications.map ==='function'&&   certifications?.map((certification) => (
                <Certification_course
                  key={certification._id}
                  certification={certification}
                />
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

export default Certification_courses;
