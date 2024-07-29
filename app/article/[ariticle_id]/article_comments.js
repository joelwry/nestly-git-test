"use client";

import React from "react";
import { emitter } from "@/app/layout";
import Post_comment from "@/src/components/post_comment";
import Loadindicator from "@/src/components/loadindicator";
import Comment from "@/src/components/comment";
import { get_request } from "@/src/utils/services";

class Article_comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = { skip: 0 };
  }

  componentDidMount = async () => {
    let { article } = this.props;

    let comments = await get_request(
      `comments/${article._id}/${this.state.skip}`
    );
    this.setState({ comments });

    this.new_comment = (comment) => {
      if (comment.article !== article._id) return;

      let { comments } = this.state;
      comments = new Array(...comments, comment);
      this.setState({ comments });
    };

    emitter.listen("new_comment", this.new_comment);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_comment", this.new_comment);
  };

  render() {
    let { article } = this.props;
    let { comments } = this.state;

    return (
      <div
        id="article_comments"
        class="mt-5 article_detail_wrapss single_article_wrap format-standard"
      >
        <div class="comment-area">
          <div class="all-comments">
            {comments && comments.length ? (
              <h3 class="comments-title">
                {`${comments.length.toString().padStart(2, "0")} Comments`}
              </h3>
            ) : null}
            <div class="comment-list">
              <ul>
                {comments ? (
                  comments.length ? (
                    comments.map((comment) => (
                      <Comment comment={comment} key={comment._id} />
                    ))
                  ) : null
                ) : (
                  <Loadindicator contained />
                )}
              </ul>
            </div>
          </div>
          <Post_comment article={article} />
        </div>
      </div>
    );
  }
}

export default Article_comments;
