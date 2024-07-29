"use client";

import React from "react";
import Link from "next/link";
import { domain } from "../utils/constants";

class Service extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_service = () => {
    let { service } = this.props;
    window.sessionStorage.setItem("service", JSON.stringify(service));
  };

  render() {
    let { service } = this.props;
    let { title, image, description } = service;

    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6">
        <Link
          href="/contact_us"
          style={{
            textDecoration: "none",
            textDecorationColor: "#000",
            textDecorationLine: "none",
            color: "#000",
          }}
        >
          <div onClick={this.handle_service} class="cates_crs_wrip">
            <div class="crs_trios">
              <div class="crs_cate_icon">
                <img
                  src={`${domain}/Images/${image}`}
                  className="img-fluid"
                  style={{ height: 80 }}
                />
              </div>
            </div>
            <div class="crs_capt_cat">
              <h4>{title}</h4>
              <p>{description.slice(0, 50)}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Service;
