"use client";

import React from "react";
import { Carousel } from "react-bootstrap";
import Listempty from "../components/list_empty";
import Loadindicator from "../components/loadindicator";
import Media from "../components/media";
import Explore_more_btn from "../components/explore_more_btn";
import { post_request } from "../utils/services";

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 12,
      page: 0,
    };
  }

  fetch_gallery = async (page = this.state.page) => {
    let { page_size } = this.state;

    let { gallery, total_media } = await post_request("fetch_media", {
      skip: page_size * page,
      limit: page_size,
      total_media: true,
    });

    this.setState({ gallery, total_media });
  };

  componentDidMount = async () => {
    this.setState({ hide_nav: true }, () => this.setState({ hide_nav: false }));
    await this.fetch_gallery();
  };

  split_into_3 = (gallery) => {
    let gall = new Array();

    for (let g = 0; g < gallery.length; g += 3)
      gall.push(gallery.slice(g, g + 3));

    return gall;
  };

  render() {
    let { gallery } = this.state;

    if (gallery && !gallery.length) return;

    return (
      <section className="min">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Our <span className="theme-cl">Gallery</span>
                </h2>
                <p></p>
              </div>
            </div>
          </div>

          {gallery ? (
            gallery.length ? (
              <Carousel
                fade
                ref={(carousel) => (this.carousel = carousel)}
                indicators={false}
              >
                {this.split_into_3(new Array(...gallery, gallery[2])).map(
                  (gal, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <div
                          className="row justify-content-center"
                          style={{
                            flexWrap: "wrap",
                          }}
                        >
                          {gal.map((media) => (
                            <Media media={media} key={media._id} />
                          ))}
                        </div>
                      </Carousel.Item>
                    );
                  }
                )}
              </Carousel>
            ) : (
              <Listempty text="No media in gallery yet" />
            )
          ) : (
            <Loadindicator contained />
          )}

          {gallery && gallery.length ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span onClick={this.carousel?.prev} className="gallery_pager">
                  <i
                    style={{ fontSize: 24, marginRight: 10 }}
                    className="fa fa-chevron-left"
                  ></i>
                  Prev
                </span>
                <span onClick={this.carousel?.next} className="gallery_pager">
                  Next
                  <i
                    style={{ fontSize: 24, marginLeft: 10 }}
                    className="fa fa-chevron-right"
                  ></i>
                </span>
              </div>
              <Explore_more_btn title="media" to={"/gallery"} />
            </>
          ) : null}
        </div>
      </section>
    );
  }
}

export default Gallery;
