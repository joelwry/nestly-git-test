"use client";

import React from "react";
import Loadindicator from "../components/loadindicator";
import Featured_course from "../components/course";
import Explore_more_btn from "../components/explore_more_btn";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { master_course_alignment } from "@/app/static_data";
import { get_request } from "../utils/services";

class Master_courses extends React.Component {
  constructor(props) {
    super(props);

    // let { master_courses } = this.props;
    this.state = {};
  }

  componentDidMount = async () => {
    let { all, master_courses } = this.props;

    this.setState({ slides_per_view: window.innerWidth < 650 ? 1 : 3 });

    master_courses =
      master_courses ||
      (await get_request(`master_courses/${all ? "all" : "6"}`));

    master_courses = master_courses.sort((m1, m2) => {
      let m1_index = master_course_alignment.findIndex((m) =>
          m1.title.toLowerCase().includes(m)
        ),
        m2_index = master_course_alignment.findIndex((m) =>
          m2.title.toLowerCase().includes(m)
        );
      if (m1_index === -1) m1_index = 200;
      if (m2_index === -1) m2_index = 200;

      return m1_index - m2_index;
    });

    this.setState({ master_courses });
  };

  render() {
    let { gray, all } = this.props;
    let { master_courses, slides_per_view } = this.state;
    if (master_courses && !master_courses.length) return null;

    return (
      <section className={`${gray ? "gray" : ""} min`} id="master_courses">
        <div className="container">
          {all ? null : (
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="sec-heading center">
                  <h2>Top Master Career Course</h2>
                  <p>
                    Without any past expertise, you can start a new career in
                    information technology.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="row justify-content-center">
            {master_courses ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={slides_per_view}
                autoplay={{
                  delay: 2000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
                }}
                loop
              >
                {master_courses.map((course, index) => (
                  <SwiperSlide key={index}>
                    <Featured_course full="col-11" course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loadindicator contained />
            )}
          </div>
          {all ? null : (
            <Explore_more_btn title="master courses" to={"/master_courses"} />
          )}
        </div>
      </section>
    );
  }
}

export default Master_courses;
