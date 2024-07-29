"use client";

import React from "react";
import { domain, month_index } from "@/src/utils/constants";
import { post_request } from "@/src/utils/services";

class Course_review extends React.Component {
  constructor(props) {
    super(props);

    let { likes, unlikes, hearts } = this.props?.review || {};

    this.state = {
      likes: likes || 0,
      unlikes: unlikes || 0,
      hearts: hearts || 0,
    };
  }

  format_date = (timestamp) => {
    let date = new Date(timestamp);
    return `${date.getDate()} ${
      month_index[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  like = async (e) => {
    e.preventDefault();

    let { review } = this.props;
    let { likes } = this.state;

    likes++;
    this.setState({ likes });
    await post_request(`review_like/${review.course}/${review._id}`);
  };

  unlike = async (e) => {
    e.preventDefault();

    let { review } = this.props;
    let { unlikes } = this.state;

    unlikes++;
    this.setState({ unlikes });
    await post_request(`review_unlike/${review.course}/${review._id}`);
  };

  heart = async (e) => {
    e.preventDefault();

    let { review } = this.props;
    let { hearts } = this.state;

    hearts++;
    this.setState({ hearts });
    await post_request(`review_heart/${review.course}/${review._id}`);
  };

  render = () => {
    let { likes, unlikes, hearts } = this.state;
    let { review } = this.props;
    let { text, user, image, name, created, _id } = review || {};
    if (user) {
      let { image: image_, firstname, lastname } = user;
      name = `${firstname} ${lastname}`.trim();
      image = image_;
    } else {
      image = "user_image_placeholder.png";
    }

    return (
      <div key={_id} className="reviews-comments-item">
        <div className="review-comments-avatar">
          <img src={`${domain}/Images/${image}`} className="img-fluid" alt="" />
        </div>
        <div className="reviews-comments-item-text">
          <h4>
            <a href="#">{name}</a>
            <span className="reviews-comments-item-date">
              <i className="ti-calendar theme-cl"></i>
              {this.format_date(created)}
            </span>
          </h4>

          {/* <div className="listing-rating">
            <i className="fas fa-star active"></i>
            <i className="fas fa-star active"></i>
            <i className="fas fa-star active"></i>
            <i className="fas fa-star active"></i>
            <i className="fas fa-star active"></i>
          </div> */}
          <div className="clearfix"></div>
          <p>{`" ${text} "`}</p>
          <div className="pull-left reviews-reaction">
            <a onClick={this.like} href="#" className="comment-like active">
              <i className="ti-thumb-up"></i> {likes}
            </a>
            <a
              onClick={this.unlike}
              href="#"
              className="comment-dislike active"
            >
              <i className="ti-thumb-down"></i> {unlikes}
            </a>
            <a onClick={this.heart} href="#" className="comment-love active">
              <i className="ti-heart"></i> {hearts}
            </a>
          </div>
        </div>
      </div>
    );
  };
}

export default Course_review;
