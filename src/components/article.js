"use client";

import React from "react";
import Link from "next/link";
import Handle_image_upload from "../components/handle_image_upload";
import Preview_image from "../components/preview_image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { emitter } from "@/app/layout";
import { domain } from "../utils/constants";
import { post_request } from "../utils/services";
import { date_string } from "../utils/functions";

const Img_tag = ({ src }) => {
  return (
    <img
      src={src}
      className="img-fluid rounded"
      style={{
        width: "100%",
      }}
    />
  );
};

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { article } = this.props;

    if (!article.image_hash && article.image) {
      try {
        let image_hash =
          await new Handle_image_upload().encode_image_to_blurhash(
            `${domain}/Images/${article.image}`
          );

        this.setState({ image_hash });
        await post_request("update_article_image_hash", {
          article: article._id,
          image_hash,
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  handle_article = () => {
    let { article } = this.props;

    window.sessionStorage.setItem("article", JSON.stringify(article));
    emitter.emit("push_article", article);
  };

  toggle_full_text = () => this.setState({ full_text: !this.state.full_text });

  render() {
    let { full_text } = this.state;
    let { article, edit, remove } = this.props;
    if (!article) return null;

    let {
      image,
      image_hash,
      title,
      sections,
      views,
      comments,
      _id,
      created,
      categories,
    } = article;

    let text = sections.find((sec) => sec.type === "paragraph")?.text;

    return (
      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
        <div className="blg_grid_box">
          <div className="blg_grid_thumb">
            <Link href={`/article/${_id}`}>
              <Preview_image
                image={image}
                image_hash={image_hash}
                onclick={this.handle_article}
              />
            </Link>
            {edit ? (
              <div className="crs_video_ico" onClick={edit}>
                <i className={`fa fa-edit`}></i>
              </div>
            ) : null}
            {remove ? (
              <div
                className="crs_locked_ico"
                onClick={() =>
                  window.confirm("Are you sure to remove article?") && remove()
                }
              >
                <i className={`fa fa-trash`}></i>
              </div>
            ) : null}
          </div>
          <div className="blg_grid_caption">
            {categories.length ? (
              <div className="blg_tag">
                <span>{categories[0].tags[0]}</span>
              </div>
            ) : null}
            <div className="blg_title">
              <h4>
                <Link href={`/article/${_id}`}>
                  <span onClick={this.handle_article}>{title}</span>
                </Link>
              </h4>
            </div>
            <div className="blg_desc" onClick={this.toggle_full_text}>
              <ReactMarkdown
                children={full_text ? text : text && text.slice(0, 150)}
                components={{
                  img: Img_tag,
                }}
              />
            </div>
          </div>
          <div className="crs_grid_foot">
            <div className="crs_flex" style={{ marginLeft: 0 }}>
              <div className="crs_fl_last" style={{ marginLeft: 0 }}>
                <div className="foot_list_info" style={{ marginLeft: 0 }}>
                  <ul
                    className="article_footer_ul"
                    style={{ marginLeft: 0, marginBlockStart: 0 }}
                  >
                    <li>
                      <div className="elsio_ic">
                        <i className="fa fa-eye text-success"></i>
                      </div>
                      <div className="elsio_tx">{views} Views</div>
                    </li>
                    <li>
                      <div className="elsio_ic">
                        <i className="ti-comment-alt text-success"></i>
                      </div>
                      <div className="elsio_tx">{comments} Comments</div>
                    </li>
                    <li>
                      <div className="elsio_ic">
                        <i className="fa fa-clock text-warning"></i>
                      </div>
                      <div className="elsio_tx">{date_string(created)}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
export { Img_tag };
