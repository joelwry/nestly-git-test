"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Video from "../components/video";
import Link from "next/link";
import { domain } from "../utils/constants";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    document.getElementById("my_video")?.play();

    setTimeout(() => {
      if (!this.state.playing) document.getElementById("my_video")?.play();
    }, 1500);
  };

  render() {
    let { banner_stuffs } = this.props;
    let { image, thumbnail, thumbnail_hash, video_url, video } =
      banner_stuffs || new Object();

    return (
      <div
        className="hero_banner d-flex justify-content-center image-cover for_top_info"
        style={
          image?.endsWith(".jpg")
            ? {
                backgroundColor: "gray",
                backgroundImage: `url(${domain}/Images/${
                  image || "giit_africa_banner_background_image.jpg"
                })`,
                backgroundRepeat: "no-repeat",
                marginTop: "50px",
                display: "flex",
                alignItems: "center",
              }
            : { backgroundImage: "#000" }
        }
        data-overlay="1"
      >
        {image?.endsWith(".mp4") ? (
          <video
            autoplay
            muted
            loop
            id="my_video"
            onPlaying={() => this.setState({ playing: true })}
          >
            <source src={`${domain}/Videos/${image}`} type="video/mp4" />
          </video>
        ) : null}

        <Container
          style={{ minHeight: "50vh", overflow: "auto" }}
          id="banner_video"
        >
          <Row className="banner_row mt-5 d-flex align-items-center mb-2">
            <Col xl={6} lg={6} md={6} sm={12}>
              <div
                className="simple-search-wrap text-left"
                style={{
                  linearGradient: "reform",
                  paddingHorizontal: "50px",
                  borderRadius: "25px",
                }}
              >
                <div className="hero_search-2">
                  <div className="elsio_tag">RAISING GLOBALSTARS</div>
                  <h1 className="banner_title mb-2">
                    Enjoy 100% practical sessions
                  </h1>
                  <p className="font-lg mb-4">
                    Every professional starts out as a beginner. At our hands-on
                    class sessions, join other Global leaders.
                  </p>
                  <div className="input-group simple_search">
                    <div className="input-group-append">
                      <Link href="/courses">
                        <span
                          className="btn pt-3 theme-bg ml-0 rounded text-light"
                          type="button"
                        >
                          Apply Now
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              style={{
                display: thumbnail ? "inline" : "none",
                overflow: "hidden",
                marginTop: 10,
              }}
              xl={6}
              lg={6}
              md={6}
              sm={12}
            >
              {thumbnail ? (
                <Video
                  url={video_url || `${domain}/Videos/${video}`}
                  thumbnail={thumbnail}
                  thumbnail_hash={thumbnail_hash}
                  style={{ overflow: "hidden" }}
                />
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Banner;
