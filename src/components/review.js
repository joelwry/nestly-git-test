"use client";

import React from "react";
import Preview_image from "./preview_image";
import { to_title } from "../utils/functions";

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_full_text = () => this.setState({ full_text: !this.state.full_text });

  render() {
    let { review, remove, edit, testimonials, approve_review } = this.props;
    let { full_text } = this.state;
    let { image, name, organisation, image_hash, position, rating, text } =
      review;
    text = text[0].toUpperCase() + text.slice(1);

    return (
      <div
        className={
          remove || testimonials
            ? "col-md-6 col-lg-4 col-sm-12 mb-3"
            : "single_items lios_item mb-3"
        }
      >
        <div className="_testimonial_wrios">
          <div className="_testimonial_flex">
            <div className="_testimonial_flex_first">
              <div className="_tsl_flex_thumb">
                <Preview_image
                  image={image}
                  image_hash={image_hash}
                  height={70}
                  width={70}
                />
              </div>
              <div className="_tsl_flex_capst">
                <h5>{name}</h5>
                <div className="_ovr_posts">
                  <span>{to_title(`${position}, ${organisation}`)}</span>
                </div>
                {review.verified ? (
                  <div className="_ovr_rates">
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                    {`${rating || 1.0}`}
                  </div>
                ) : approve_review ? (
                  <a
                    href="#"
                    onClick={() =>
                      window.confirm("Approve review?") && approve_review()
                    }
                  >
                    Approve
                  </a>
                ) : (
                  <em>Awaiting Confirmation...</em>
                )}
              </div>
            </div>
            {edit ? (
              <a onClick={edit} className="btn btn-action px-2">
                <i className={`fas fa-edit`}></i>
              </a>
            ) : null}
            {remove ? (
              <a
                onClick={() => window.confirm("Remove review?") && remove()}
                className="btn btn-action"
              >
                <i className={`fas fa-window-close`}></i>
              </a>
            ) : null}
          </div>
          <div className="facts-detail">
            <a onClick={this.toggle_full_text} style={{ cursor: "pointer" }}>
              <p>{full_text ? text : text.slice(0, 150)}</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
