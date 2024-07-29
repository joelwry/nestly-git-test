"use client";

import React from "react";
import Link from "next/link";
// commenting out because of error in build
// import bg from "../../assets/css/img/breadcrumb_bg.jpg";
import bg from "../../assets/css/img/Jiji_Logo.png";

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { page_text, page_title, no_gray } = this.props;

    return (
      <section
        style={{
          ...(page_title === "courses"
            ? new Object({ paddingTop: 30, paddingBottom: 20 })
            : null),
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#ff9800",
        }}
        data-overlay="8"
        className={`page-title ${no_gray ? "" : "gray"}`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="breadcrumbs-wrap">
                <h1 className="breadcrumb-title text-light">{page_title}</h1>
                <nav className="transparent">
                  <ol className="breadcrumb p-0">
                    <li className="breadcrumb-item">
                      <Link
                        href="/"
                        style={{
                          color: "#eee",
                        }}
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active theme-cl"
                      aria-current="page"
                    >
                      {page_text}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Breadcrumb;
