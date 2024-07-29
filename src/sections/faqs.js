"use client";

import React from "react";
import Listempty from "../components/list_empty";
import Loadindicator from "../components/loadindicator";
import { emitter } from "@/app/layout";
import { post_request } from "../utils/services";

class Faqs extends React.Component {
  constructor(props) {
    super(props);

    let { limit } = this.props;

    this.state = {
      page_size: limit || 15,
      page: 0,
      open: 0,
    };
  }

  componentDidMount = async () => {
    let { page_size, page } = this.state;
    let { faqs, total_faqs } = await post_request("faqs", {
      limit: page_size,
      skip: page_size * page,
      total_faqs: true,
    });

    this.setState({ faqs, total_faqs });

    this.new_faq = (faq) => {
      let { faqs } = this.state;

      faqs = new Array(faq, ...faqs);
      this.setState({ faqs });
    };

    this.faq_updated = (faq) => {
      let { faqs } = this.state;

      faqs = faqs.map((faq_) => {
        if (faq_._id === faq._id) return faq;
        return faq_;
      });

      this.setState({ faqs });
    };

    emitter.listen("new_faq", this.new_faq);
    emitter.listen("faq_updated", this.faq_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("faq_updated", this.faq_updated);
    emitter.remove_listener("new_faq", this.new_faq);
  };

  remove_faq = async (faq) => {
    let { faqs } = this.state;

    if (!window.confirm("Are you sure to remove faq?")) return;

    await post_request(`remove_faq/${faq}`);

    faqs = faqs.filter((fq) => fq._id !== faq);
    this.setState({ faqs });
  };

  faq = (faq, index) => {
    let { question, answer, _id } = faq;
    let { open } = this.state;
    let { admin, edit_faq } = this.props;

    return (
      <div class="card" key={_id}>
        <div
          id={`heading${index}`}
          class="card-header bg-white shadow-sm border-0"
        >
          <h6 class="mb-0 accordion_title">
            <a
              href="#"
              data-toggle="collapse"
              data-target={`#collapse${index}`}
              aria-expanded={index === open ? "true" : "false"}
              aria-controls={`collapse${index}`}
              class="d-block position-relative text-dark collapsible-link py-2"
            >
              {question}

              {admin ? (
                <span>
                  <a
                    onClick={() => this.remove_faq(_id)}
                    className="btn btn-action ml-2"
                  >
                    <i className={`fas fa-window-close`}></i>
                  </a>

                  <a
                    onClick={() => edit_faq(faq)}
                    className="btn btn-action ml-2"
                  >
                    <i className={`fas fa-edit`}></i>
                  </a>
                </span>
              ) : null}
            </a>
          </h6>
        </div>
        <div
          id={`collapse${index}`}
          aria-labelledby={`heading${index}`}
          data-parent="#accordionExample"
          class={index === open ? "collapse show" : "collapse"}
        >
          <div class="card-body pl-3 pr-3 pt-0">
            <p>{answer}</p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { admin, paged } = this.props;
    let { faqs } = this.state;

    if (faqs && !faqs.length) return null;

    return (
      <section>
        <div class="container">
          {admin ? null : (
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  {paged ? null : (
                    <h2>
                      Frequently Asked <span class="theme-cl">Questions</span>
                    </h2>
                  )}
                  <p>{/*  */}</p>
                </div>
              </div>
            </div>
          )}
          <div class="row justify-content-center">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div id="accordionExample" class="accordion">
                {faqs ? (
                  faqs.length ? (
                    faqs.map((faq, index) => this.faq(faq, index))
                  ) : (
                    <Listempty />
                  )
                ) : (
                  <Loadindicator contained />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Faqs;
