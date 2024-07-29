"use client";

import React from "react";
import { domain } from "@/src/utils/constants";
import { to_title } from "@/src/utils/functions";

class Course_banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { course } = this.props;
    let {
      image,
      tags,
      title,
      stars,
      banner_image,
      reviews,
      short_description,
    } = course;
    tags = tags && tags.split(",");

    return (
      <div
        className="ed_detail_head bg-cover"
        style={{
          backgroundColor: "#03b97c",
          backgroundImage: `url(${domain}/Images/${banner_image || image})`,
          backgroundRepeat: "no-repeat",
        }}
        data-overlay={banner_image ? "8" : "10"}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-7">
              <div className="ed_detail_wrap light">
                {tags && tags.length
                  ? tags.map((tag, index) => (
                      <div key={index} className="crs_cates cl_1" style={{}}>
                        <span>{tag}</span>
                      </div>
                    ))
                  : null}
                <div className="ed_header_caption">
                  <h2 className="ed_title">
                    {to_title(title.replace(/_/g, " "))}
                  </h2>
                </div>
                <div className="ed_header_short">
                  <p>{short_description.slice(0, 500)}</p>
                </div>

                <div className="ed_rate_info">
                  <div className="star_info">
                    <i
                      className={`fas fa-star ${stars >= 0 ? "filled" : ""}`}
                    ></i>
                    <i
                      className={`fas fa-star ${stars >= 1 ? "filled" : ""}`}
                    ></i>
                    <i
                      className={`fas fa-star ${stars >= 2 ? "filled" : ""}`}
                    ></i>
                    <i
                      className={`fas fa-star ${stars >= 3 ? "filled" : ""}`}
                    ></i>
                    <i
                      className={`fas fa-star ${stars >= 4 ? "filled" : ""}`}
                    ></i>
                  </div>
                  <div className="review_counter">
                    <strong className="high">{stars || 0}</strong>
                    &nbsp;&nbsp;
                    {reviews ? ` ${reviews} Reviews` : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Course_banner;
