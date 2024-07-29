"use client";

import Featured_course from "@/src/components/course";
import Courses_sidebar from "@/src/components/courses_sidebar";
import Courses_tabbar from "@/src/components/courses_tabbar";
import Loadindicator from "@/src/components/loadindicator";
import { organisation_name } from "@/src/utils/constants";
import { scroll_to_top } from "@/src/utils/functions";
import { post_request } from "@/src/utils/services";
import React from "react";

class Section extends React.Component {
  constructor(props) {
    super(props);

    let { courses, total_courses } = this.props;

    this.state = {
      courses,
      total_courses,
      filter: new Object(),
      page: courses ? 1 : 0,
      page_size: 24,
    };
  }

  fetch_courses = async (filter, page) => {
    this.setState({ fetching_courses: true });

    let { page_size } = this.state;

    let { total_courses, courses } = await post_request("courses", {
      total_courses: true,
      filter: filter || this.state.filter,
      limit: page_size,
      skip: page_size * (Number(page) || 0),
    });

    let i = 0;
    for (let p = 0; p < total_courses; p += page_size) i++;

    this.setState(
      {
        courses,
        page,
        total_courses,
        filter: filter || new Object(),
        fetching_courses: false,
        total_pages: i,
      },
      scroll_to_top
    );
  };

  componentDidMount = async () => {
    document.title = `Courses | ${organisation_name}`;

    let { filter, courses } = this.state;
    let query = window.location.search;
    let params = query.slice(1).split("&");
    params.map((param) => {
      param = param.split("=");
      filter[param[0]] = param[1];
    });

    if (filter.search) {
      delete filter.search;
      this.setState({ search_focus: true });
    }

    filter.section &&
      filter.section === "ncc" &&
      this.setState({ ncc_stuff: true });

    if (!courses) await this.fetch_courses();
    else {
      let { page_size } = this.state;
      let { total_courses } = this.props;

      let i = 0;
      for (let p = 0; p < total_courses; p += page_size) i++;
      this.setState({ total_pages: i });
    }
  };

  page = async (page) => {
    await this.fetch_courses(null, page);

    scroll_to_top();
  };

  next_page = async () => {
    let { page, total_pages } = this.state;
    page < total_pages - 1 && (await this.fetch_courses(null, page + 1));
  };

  prev_page = async () => {
    let { page } = this.state;
    page > 0 && (await this.fetch_courses(null, page - 1));
  };

  render_pagers = () => {
    let { page_size, page, total_courses } = this.state,
      mapper = new Array(),
      i = 0;
    for (let p = 0; p < total_courses; p += page_size) mapper.push(i++);

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
    let { page, page_size, total_pages, courses, total_courses } = this.state;

    return (
      <div className="row align-items-center justify-content-between">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <p className="p-0">{`Showing ${page * page_size + 1} to ${
            page * page_size + courses.length
          } of ${total_courses} entire`}</p>
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
    let {
      courses,
      search_focus,
      page_size,
      fetching_courses,
      total_courses,
      filter,
      ncc_stuff,
    } = this.state;

    return (
      <section class="gray" style={{ paddingTop: 20 }}>
        <div class="container">
          <div class="row">
            <Courses_sidebar
              section={filter.section}
              category={filter.category}
              search_focus={search_focus}
              fetch_courses={this.fetch_courses}
              ncc_stuff={ncc_stuff}
              ref={(courses_sidebar) =>
                (this.courses_sidebar = courses_sidebar)
              }
            />
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12">
              <Courses_tabbar
                page_size={page_size}
                courses_length={courses && courses.length}
                total_courses={total_courses || ""}
              />
              <div class="row justify-content-center">
                {courses && !fetching_courses ? (
                  courses.length ? (
                    courses.map((course) => (
                      <Featured_course
                        in_courses
                        course={course}
                        key={course._id}
                      />
                    ))
                  ) : null
                ) : (
                  <Loadindicator contained />
                )}
              </div>

              {courses ? this.render_pagination() : null}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Section;
