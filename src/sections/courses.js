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
import { emitter } from "@/app/layout";
import { post_request } from "../utils/services";
import { shuffle_array } from "../utils/functions";

class Courses extends React.Component {
  constructor(props) {
    super(props);

    let { section } = this.props;
    this.state = { courses: section.courses_, show: null };
  }

  componentDidMount = async () => {
    let { section } = this.props,
      courses;

    this.setState({ slides_per_view: window.innerWidth < 650 ? 1 : 3 });

    if (!section.courses_?.length) {
      let arr = shuffle_array(section.courses.filter((c) => c));
      courses = arr.slice(0, 6);

      courses = await post_request(`get_courses`, {
        courses,
      });

      courses.length < 6 &&
        courses.push(...courses.slice(0, 6 - courses.length));

      this.setState({ courses });
    }

    this.section_removed = (section_id) =>
      section_id === section._id && this.setState({ removed: true });

    emitter.emit("section_removed", this.section_removed);

    this.setState({ show: true });
  };

  componentWillUnmount = () => {
    emitter.remove_listener("section_removed", this.section_removed);
  };

  render() {
    let { section, gray } = this.props;
    let { title, text, _id } = section;
    let { courses, removed, show } = this.state;
    if (!show) return;

    if ((courses && !courses.length) || removed) return null;

    return (
      <section className={gray ? `gray` : ""}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {courses?.length ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={window.innerWidth < 650 ? 1 : 3}
                autoplay={{
                  delay: 2000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
                }}
                loop
              >
                {courses.map((course) => (
                  <SwiperSlide key={course._id}>
                    <Featured_course full="col-11" course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                <Loadindicator />
              </div>
            )}
          </div>
          {courses && courses.length ? (
            <Explore_more_btn title={title} to={`/courses?section=${_id}`} />
          ) : null}
        </div>
      </section>
    );
  }
}

export default Courses;
