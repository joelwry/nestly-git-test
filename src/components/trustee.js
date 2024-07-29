"use client";

import React from "react";
import { domain } from "../utils/constants";

class Trustee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { trustee, remove } = this.props;
    let { logo, url, name } = trustee;

    return (
      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
        <div className="crs_partn">
          <div className="p-3" style={{ flexDirection: "row" }}>
            <a href={url}>
              <img
                src={`${domain}/Images/${logo}`}
                className="img-fluid"
                alt={name}
              />
            </a>
            {remove ? (
              <a
                onClick={() => window.confirm("Remove trustee?") && remove()}
                className="btn btn-action"
              >
                <i className={`fas fa-window-close`}></i>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Trustee;
