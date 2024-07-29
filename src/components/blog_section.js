"use client";

import React from "react";
import Article from "./article";
import Listempty from "./list_empty";
import Loadindicator from "./loadindicator";
import { post_request } from "../utils/services";

class Blog_section extends React.Component {
  constructor(props) {
    super(props);

    let { articles, total_articles } = this.props;
    this.state = {
      articles,
      total_articles,
      page_size: 12,
      page: articles ? 1 : 0,
    };
  }

  fetch_articles = async (page = this.state.page) => {
    let { page_size } = this.state;

    let { articles, total_articles } = await post_request("articles", {
      skip: page_size * page,
      limit: page_size,
      total_articles: true,
    });

    let i = 0;
    for (let p = 0; p < total_articles; p += page_size) i++;

    this.setState({ articles, page, total_articles, total_pages: i });
  };

  componentDidMount = async () => {
    let { articles } = this.state;
    if (!articles) await this.fetch_articles();
    else {
      let { total_articles, page_size } = this.state;

      let i = 0;
      for (let p = 0; p < total_articles; p += page_size) i++;
      this.setState({ total_pages: i });
    }
  };

  page = async (page) => {
    await this.fetch_articles(page);

    scroll_to_top();
  };

  next_page = async () => {
    let { page, total_pages } = this.state;
    page < total_pages - 1 && (await this.fetch_articles(page + 1));
  };

  prev_page = async () => {
    let { page } = this.state;
    page > 0 && (await this.fetch_articles(page - 1));
  };

  render_pagers = () => {
    let { page_size, page, total_articles } = this.state,
      mapper = new Array(),
      i = 0;
    for (let p = 0; p < total_articles; p += page_size) mapper.push(i++);

    return mapper.map((pager, index) => (
      <li
        className={`page-item ${index === page ? "active" : ""}`}
        onClick={() => this.page(index)}
      >
        <a className="page-link" href="#">
          {pager + 1}
        </a>
      </li>
    ));
  };

  render_pagination = () => {
    let { page, page_size, total_pages, articles, total_articles } = this.state;

    return (
      <div className="row align-items-center justify-content-between">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <p className="p-0">{`Showing ${page * page_size + 1} to ${
            page * page_size + articles.length
          } of ${total_articles} entire`}</p>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <nav className="float-right">
            <ul className="pagination smalls m-0">
              <li
                onClick={this.prev_page}
                className={`page-item ${page === 0 ? "disabled" : ""}`}
              >
                <a className="page-link" href="#" tabindex="-1">
                  <i className="fas fa-arrow-circle-left"></i>
                </a>
              </li>

              {this.render_pagers()}

              <li
                className={`page-item ${
                  total_pages - 1 === page ? "disabled" : ""
                }`}
                onClick={this.next_page}
              >
                <a className="page-link" href="#">
                  <i className="fas fa-arrow-circle-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  render() {
    let { articles } = this.state;
    return (
      <section class="min">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  Latest News & <span class="theme-cl">Articles</span>
                </h2>
                <p>
                  Get lastest updates on whats happening in the world of tech.
                </p>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            {articles ? (
              articles.length ? (
                articles.map((article) => (
                  <Article article={article} key={article._id} />
                ))
              ) : (
                <Listempty />
              )
            ) : (
              <Loadindicator contained />
            )}
          </div>

          {articles ? this.render_pagination() : null}
        </div>
      </section>
    );
  }
}

export default Blog_section;
