"use client";

import React from "react";
import { post_request } from "../utils/services";
import { emitter } from "@/app/layout";

class Post_comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  set_name = ({ target }) => this.setState({ name: target.value });

  set_text = ({ target }) => this.setState({ text: target.value });

  set_email = ({ target }) => this.setState({ email: target.value });

  comment = async (e) => {
    e.preventDefault();

    let { article, comment } = this.props;
    let { email, name, text } = this.state;
    if (!email || !name || !text) return;

    let comment_ = {
      email,
      name,
      text,
      article: (article && article._id) || (comment && comment.article),
      comment: comment && comment._id,
      replies: new Array(),
    };

    let response = await post_request(
      comment ? "new_reply" : "new_comment",
      comment_
    );
    comment_._id = response._id;
    comment_.created = response.created;

    emitter.emit(comment ? "new_reply" : "new_comment", comment_);
    this.reset_state();
  };

  reset_state = () => this.setState({ email: "", name: "", text: "" });

  render() {
    let { comment } = this.props;
    let { text, name, email } = this.state;

    return (
      <div class="comment-box submit-form mt-3">
        <h3 class="reply-title">{comment ? "Post Reply" : `Post Comment`}</h3>
        <div class="comment-form">
          <form action="#">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="form-group">
                  <input
                    type="text"
                    value={name}
                    onChange={this.set_name}
                    class="form-control"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={this.set_email}
                    class="form-control"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="form-group">
                  <textarea
                    value={text}
                    onChange={this.set_text}
                    name="comment"
                    class="form-control"
                    cols="30"
                    rows="6"
                    placeholder={
                      comment ? "Type your comment...." : "Type your reply..."
                    }
                  ></textarea>
                </div>
              </div>
              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="form-group">
                  <a
                    href="#"
                    onClick={this.comment}
                    class="btn theme-bg text-white"
                  >
                    Submit Now
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Post_comment;
