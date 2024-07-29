"use client";

import React from "react";
import Article_sidebar from "./article_sidebar";
import Preview_image from "@/src/components/preview_image";
import Article_comments from "./article_comments";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Img_tag } from "@/src/components/article";

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { article } = this.props;
    if (!article) return null;

    let { title, image, image_hash, comments, sections } =
      article || new Object();

    return (
      <section className="gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <div className="article_detail_wrapss single_article_wrap format-standard">
                <div className="article_body_wrap">
                  <div className="article_featured_image">
                    <Preview_image
                      image={image}
                      class_name="img-fluid rounded"
                      image_hash={image_hash}
                    />
                  </div>
                  <div className="article_top_info">
                    <ul className="article_middle_info">
                      <li>
                        <a href="#article_comments">
                          <span className="icons">
                            <i className="ti-comment-alt"></i>
                          </span>
                          {`${comments || 0} Comments`}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h2 className="post-title">{`${title}.`}</h2>
                  {sections.map((section, index) =>
                    section.type === "paragraph" ? (
                      <ReactMarkdown
                        children={section.text}
                        components={{
                          img: Img_tag,
                        }}
                      />
                    ) : (
                      <blockquote key={index}>
                        <span className="icon">
                          <i className="fas fa-quote-left"></i>
                        </span>
                        <ReactMarkdown
                          children={section.text}
                          components={{
                            img: Img_tag,
                          }}
                        />

                        <h5 className="name">{`- ${section.speaker || ""}`}</h5>
                      </blockquote>
                    )
                  )}
                </div>
                <Article_comments article={article} />
              </div>
            </div>
            <Article_sidebar article={article} />
          </div>
        </div>
      </section>
    );
  }
}

export default Section;
