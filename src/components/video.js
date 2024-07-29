import React from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import Preview_image from "./preview_image";

class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = { video_loaded: true };
  }

  tap_play = () => this.setState({ play: !this.state.play });

  render() {
    let {
      url,
      video: video_,
      height,
      style,
      width,
      loop,
      muted,
      thumbnail,
      thumbnail_hash,
      thumbnail_class,
      responsive,
    } = this.props;
    let { play, video_loaded } = this.state;
    if (!url) url = video_;

    return (thumbnail && !play) || !url ? (
      <div
        style={{ ...style }}
        className={`property_video ${thumbnail_class ? "sm" : ""}`}
      >
        <div className="thumb">
          <Preview_image
            image={thumbnail}
            image_hash={thumbnail_hash}
            responsive={responsive}
            height={height}
            width={width}
            style={{ ...style }}
          />
          <div className="overlay_icon">
            {url ? (
              <div className="bb-video-box" onClick={this.tap_play}>
                <div className="bb-video-box-inner">
                  <div className="bb-video-box-innerup">
                    <Link href="#" className="theme-cl">
                      <i className="fa fa-play"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ) : typeof url === "string" &&
      url.startsWith("http") &&
      !url.includes("localhost") ? (
      <>
        <ReactPlayer
          url={url}
          height="100%"
          width="100%"
          autoPlay
          muted={muted}
          loop={loop}
          className="react-players embed-responsive embed-responsive-16by9 rounded"
          onLoadedData={() => this.setState({ video_loaded: false })}
          style={{ ...style }}
        />
      </>
    ) : (
      <>
        <video
          className="embed-responsive embed-responsive-16by9 rounded"
          autoPlay
          controls
          muted={muted}
          loop={loop}
          onLoadedData={() => this.setState({ video_loaded: false })}
          style={{ ...style }}
        >
          <source
            crossOrigin="true"
            className="embed-responsive-item"
            src={url}
            type="video/mp4"
          />
        </video>
      </>
    );
  }
}

export default Video;
