"use client";

import React from "react";
import Loadindicator from "./loadindicator";
import Post_comment from "./post_comment";
import { emitter } from "@/app/layout";
import { domain } from "../utils/constants";
import { post_request } from "../utils/services";
import { date_string } from "../utils/functions";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = { replies: this.props.comment.replies };
  }

  componentDidMount = () => {
    let { comment } = this.props;

    this.new_reply = (reply) => {
      if (reply.comment !== comment._id) return;

      let { replies, replies_fetched } = this.state;
      if (!replies) replies = new Array();
      if (replies_fetched)
        replies_fetched = new Array(...replies_fetched, reply);
      else replies_fetched = new Array(reply);

      replies = new Array(...replies, reply._id);
      this.setState({ replies, replies_fetched, reply: false });
    };

    emitter.listen("new_reply", this.new_reply);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_reply", this.new_reply);
  };

  toggle_reply = (e) => {
    e.preventDefault();
    this.setState({ reply: !this.state.reply }, this.load_replies);
  };

  load_replies = async () => {
    let { fetching, replies_fetched } = this.state;
    if (replies_fetched || fetching) return;
    let { comment } = this.props;

    this.setState({ fetching: true });
    let replies =
      comment.replies &&
      comment.replies.length &&
      (await post_request("get_replies", {
        replies: this.state.replies,
      }));

    this.setState({ replies_fetched: replies, fetching: false });
  };

  render() {
    let { comment } = this.props;
    let { reply, replies_fetched, replies, fetching } = this.state;
    let { created, name, text } = comment;

    return (
      <li class="article_comments_wrap">
        <article>
          <div class="article_comments_thumb">
            <img src={`${domain}/Images/user_image_placeholder.png`} alt="" />
          </div>
          <div class="comment-details">
            <div class="comment-meta">
              <div class="comment-left-meta">
                <h4 class="author-name">{`${name}`}</h4>
                <div class="comment-date">{date_string(created)}</div>
              </div>
              <div class="comment-reply">
                <a href="#" onClick={this.toggle_reply} class="reply">
                  <span class="icons">
                    <i class="ti-back-left"></i>
                  </span>{" "}
                  {`Reply` +
                    `${
                      replies && replies.length ? ` (${replies.length})` : ""
                    }`}
                </a>
              </div>
            </div>
            <div class="comment-text">
              <p>{text}</p>
            </div>
          </div>
        </article>
        {replies_fetched && reply ? (
          replies_fetched.length ? (
            replies_fetched.map((rep) => (
              <ul class="children">
                <li class="article_comments_wrap">
                  <article>
                    <div class="article_comments_thumb">
                      <img
                        src={`${domain}/Images/user_image_placeholder.png`}
                        alt=""
                      />
                    </div>
                    <div class="comment-details">
                      <div class="comment-meta">
                        <div class="comment-left-meta">
                          <h4 class="author-name">{rep.name}</h4>
                          <div class="comment-date">
                            {date_string(rep.created)}
                          </div>
                        </div>
                      </div>
                      <div class="comment-text">
                        <p>{rep.text}</p>
                      </div>
                    </div>
                  </article>
                </li>
              </ul>
            ))
          ) : null
        ) : fetching ? (
          <Loadindicator />
        ) : null}
        {reply ? <Post_comment comment={comment} /> : null}
      </li>
    );
  }
}

export default Comment;
