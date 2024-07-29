"use client";

import React from "react";
import Nav from "./nav";
import { navs as navs_data } from "@/app/static_data";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    console.log("lola is grey!");
  };

  render() {
    let { page, lock } = this.props;

    return (
      <div
        className={
          page === "home" || !page
            ? "header header-transparent dark-text my_header_style_init"
            : "header header-light head-shadow my_header_style_init"
        }
      >
        <div
          id="top_info"
          className="top-bar-area address-two-lines text-light"
          style={{ backgroundColor: "#ff6905" }}
        >
          <div className="container pt-2">
            <div className="row">
              <div className="col-md-12 col-sm-12 address-info">
                <ul
                  style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                  }}
                >
                  <li>
                    <span>
                      <i className="fas fa-map"></i> Address
                    </span>
                    <br />
                    3, Awolowo Way, Opp. Ikeja Local Govt, Ikeja{" "}
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-envelope-open"></i> Email
                    </span>
                    <br />
                    info@giitafrica.com{" "}
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-phone"></i> Contact
                    </span>
                    <br />
                    +2348060515686, +2348129252489{" "}
                  </li>
                  <li>
                    <span className="topheader_whatsapp"> Whatsapp</span>
                    <br />
                    <a
                      href="https://wa.me/+2348060515686/?text=Hello,%20I%20like%20to%20enquire%20about%20GIIT%20courses%20and%20training?"
                      target="_blank"
                      style={{ color: "#fff" }}
                    >
                      +2348060515686
                    </a>
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Nav navs_data={{ navs: navs_data }} lock={lock} ref="nav" />
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

export default Header;
