"use client";

import React from "react";
import Video from "./video";
import Preview_image from "./preview_image";
import { domain } from "../utils/constants";

class Media extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { width } = this.state;
    let { media, remove, edit } = this.props;
    let { video, image, image_hash, title, description } = media;

    return (
      <div
        style={{
          boxSizing: "border-box",
          width: width - 14,
          position: "relative",
          marginRight: 14,
        }}
      >
        {edit || remove ? (
          <span
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              display: "flex",
            }}
          >
            {edit ? (
              <a onClick={edit} className="btn btn-action">
                <i className={`fas fa-edit`}></i>
              </a>
            ) : null}
            {remove ? (
              <a onClick={remove} className="btn btn-action">
                <i className={`fas fa-window-close`}></i>
              </a>
            ) : null}
          </span>
        ) : null}
        {video ? (
          <Video
            thumbnail={image}
            responsive
            thumbnail_hash={image_hash}
            url={video ? `${domain}/Videos/${video}` : null}
          />
        ) : (
          <Preview_image
            ref={(img) => (this.img = img)}
            image={image}
            image_hash={image_hash}
            parent_size={(size) => this.setState(size)}
            responsive={5}
          />
        )}

        <br />
        <span
          style={{ textOverflow: "clip", flexWrap: "wrap" }}
          className="h6 mt-2 text-bold"
        >
          <b>{title}</b>
        </span>
        <br />
        <span>{description}</span>
      </div>
    );
  }
}

export default Media;
