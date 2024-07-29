"use client";

import React from "react";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import { to_title } from "../utils/functions";

class Student_work extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { work, edit, remove } = this.props;

    if (!work) return;

    let { name, link, image, image_hash, students } = work;

    return (
      <div class="col-xl-2 col-lg-3 col-md-3 col-sm-4">
        <div class="crs_trt_grid">
          <div class="crs_trt_thumb circle">
            <a href={link} target="_blank" class="crs_trt_thum_link">
              <Preview_image
                image_hash={image_hash}
                style={{ height: 100, width: 100 }}
                image={image}
                class_name="img-fluid circle"
              />
            </a>
          </div>
          <div class="crs_trt_caption">
            {students ? (
              <div class="instructor_tag dark">
                <span>{to_title(students)} students</span>
              </div>
            ) : null}
            <div class="instructor_title">
              <h4>
                <a href={link} target="_blank">
                  {to_title(name)}
                </a>
              </h4>
            </div>
          </div>

          {edit || remove ? (
            <div class="crs_trt_footer">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {edit && <Text_btn text="Edit" action={() => edit(work)} />}
                {remove && (
                  <Text_btn text="Remove" action={() => remove(work)} />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Student_work;
