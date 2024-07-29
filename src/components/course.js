"use client";

import React from "react";
import Link from "next/link";
import Handle_image_upload from "./handle_image_upload";
import Preview_image from "./preview_image";
import Video from "./video";
import { SKILL_LEVEL, domain } from "../utils/constants";
import { post_request } from "../utils/services";
import {
  commalise_figures,
  gen_random_int,
  to_title,
} from "../utils/functions";
import { emitter } from "@/app/layout";

const pricey = (price, percentage_off) => {
  if (!percentage_off) return commalise_figures(price);

  let return_val = ((100 - percentage_off) / 100) * price;

  if (parseInt(return_val) === return_val)
    return_val = commalise_figures(Number(parseInt(return_val)));

  return return_val;
};

class Featured_course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { course } = this.props;

    this.full_desc = (course_id) => {
      if (!this.state.full_desc || course_id === course._id) return;
      this.setState({ full_desc: false });
    };
    emitter.listen("full_desc", this.full_desc);

    if (!course.image_hash && course.image) {
      try {
        let image_hash =
          await new Handle_image_upload().encode_image_to_blurhash(
            `${domain}/Images/${course.image}`
          );

        this.setState({ image_hash });
        await post_request(
          course.courses
            ? "update_master_course_image_hash"
            : "update_course_image_hash",
          {
            course: course._id,
            image_hash,
          }
        );
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  componentWillUnmount = () => {
    emitter.remove_listener("full_desc", this.full_desc);
  };

  toggle_description = () =>
    this.setState({ full_desc: !this.state.full_desc }, () =>
      emitter.emit("full_desc", this.props.course._id)
    );

  play_video = () => this.setState({ play: !this.state.play });

  padd_length = 70;

  handle_course = () => {
    // let { course } = this.props;
    // window.sessionStorage.setItem("course", JSON.stringify(course));
    // emitter.emit("push_course", course);
  };

  handle_enroll = () => {
    // let { course } = this.props;
    // window.sessionStorage.setItem("enroll", JSON.stringify(course));
    // emitter.emit("push_enroll", course);
  };

  render() {
    let { progress, image_hash: img_hash, full_desc, play } = this.state;

    let {
      course,
      full,
      classname,
      flash_promo,
      adminstrator,
      edit_course,
      delete_course,
    } = this.props;

    if (!course) return null;

    let {
      image,
      image_hash,
      courses,
      tags,
      title,
      short_description,
      video,
      price,
      lectures,
      duration,
      skill_level,
      instructor,
      _id,
    } = course;
    if (!title) return null;

    image_hash = image_hash || img_hash;

    if (course?.categories?.length) {
      tags = "";
      course.categories.map((cat) => (tags += `${cat.tags},`));
      tags = tags.slice(0, tags.length - 1);
    }

    if (short_description) {
      short_description = short_description.split("");
      for (let i = short_description.length; i < this.padd_length; i++)
        short_description.push("**");
    }
    if (tags) tags = tags.split(",").filter((tag) => tag);

    this.flash_promo = flash_promo;

    return (
      <div
        className={
          full
            ? typeof full === "string"
              ? full
              : "col-12"
            : classname || `col-xl-${"4"} col-lg-${"4"} col-md-6 col-sm-12`
        }
      >
        <div className="crs_grid">
          <div className="crs_grid_thumb">
            {play ? (
              <Video url={video} />
            ) : (
              <Link className="crs_detail_link" href={`/course/${_id}`}>
                <Preview_image
                  image={image}
                  image_hash={image_hash}
                  title={title}
                  onclick={this.handle_course}
                />
              </Link>
            )}
            {video || edit_course ? (
              <div
                className="crs_video_ico"
                onClick={edit_course || this.play_video}
              >
                <i
                  className={`fa fa-${
                    edit_course ? "edit" : `${play ? "pause" : "play"}`
                  }`}
                ></i>
              </div>
            ) : null}
            {delete_course ? (
              <div className="crs_locked_ico" onClick={delete_course}>
                <i className={`fa fa-${delete_course ? "trash" : "lock"}`}></i>
              </div>
            ) : null}
          </div>
          <div className="crs_grid_caption">
            {instructor ? (
              <div className="crs_tutor_thumb overl_top">
                <Link href={`/courses?instructor=${instructor._id}`}>
                  <Preview_image
                    image={instructor.image}
                    image_hash={instructor.image_hash}
                    class_name="img-fluid circle"
                    no_preview
                  />
                </Link>
              </div>
            ) : null}
            <div
              className="table-responsive-sm overfolow-hidden"
              style={{ width: "100%" }}
            >
              {courses && courses.length && tags && tags.length ? (
                <div className="mb-4 crs_cates cl_1">
                  <span>{to_title(tags[gen_random_int(tags.length - 1)])}</span>
                </div>
              ) : null}
            </div>

            <div className="crs_title">
              <h4>
                <Link href={`/course/${_id}`} className="crs_title_link">
                  <span onClick={this.handle_course}>
                    {to_title(title.trim().replace(/_/g, " "))}
                  </span>
                </Link>
              </h4>
            </div>
            <div onClick={this.toggle_description} className="crs_info_detail">
              {short_description ? (
                <div style={{ flexWrap: "wrap", display: "flex" }}>
                  {short_description
                    .slice(
                      0,
                      full_desc ? short_description.length : this.padd_length
                    )
                    .map((d, i) =>
                      d === "**" || d === " " ? <span key={i}>&nbsp;</span> : d
                    )}
                  {full_desc ? "" : "..."}
                </div>
              ) : null}

              <ul className="mt-2">
                {duration ? (
                  <li>
                    <i class="fa fa-calendar text-danger mr-2"></i>
                    <span>{`${duration} Weeks`}</span>
                  </li>
                ) : null}
                {lectures ? (
                  <li>
                    <i class="fa fa-video text-success mx-2"></i>
                    <span>{`${lectures} Lectures`}</span>
                  </li>
                ) : null}
                {
                  <li>
                    <i class="fa fa-th text-success ml-2"></i>
                    <span>
                      {to_title(
                        `${
                          skill_level ||
                          SKILL_LEVEL[gen_random_int(SKILL_LEVEL.length - 1)]
                        }`.split(" ")[0]
                      )}
                    </span>
                  </li>
                }
              </ul>
            </div>

            <div className="preview_crs_info">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "100%" }}
                  aria-valuenow={progress || 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
          <div className="crs_grid_foot">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_price">
                  {this.flash_promo ? (
                    <span>
                      <em className="currency">&#8358;</em>
                      <em
                        style={{ textDecoration: "line-through" }}
                        className="theme-cl"
                      >
                        {commalise_figures(Number(price))}
                      </em>
                    </span>
                  ) : null}

                  <h2>
                    <span className="currency">&#8358;</span>
                    <span className="theme-cl">
                      {pricey(price, flash_promo?.percentage_off)}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="crs_linkview">
                  <Link href={adminstrator ? "/course" : "/enroll"}>
                    <span
                      onClick={
                        adminstrator ? this.handle_course : this.handle_enroll
                      }
                      className="btn btn_view_detail theme-bg text-light"
                    >
                      {adminstrator ? "View Course" : "Enroll Now"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Featured_course;
export { pricey };
