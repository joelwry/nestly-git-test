"use client";

import React from "react";
import loader from "../../assets/css/plugins/ajax-loader.gif";
import Image from "next/image";

class Loadindicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { height, width, contained } = this.props;

    return (
      <div
        className={
          contained
            ? "d-flex align-items-center justify-content-center my-5"
            : ""
        }
      >
        <Image
          src={loader}
          style={{ height: height || 64, width: width || 64 }}
        />
      </div>
    );
  }
}

export default Loadindicator;
