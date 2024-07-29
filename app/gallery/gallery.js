"use client";

import Explore_more_btn from "@/src/components/explore_more_btn";
import Listempty from "@/src/components/list_empty";
import Loadindicator from "@/src/components/loadindicator";
import Media from "@/src/components/media";
import { scroll_to_top } from "@/src/utils/functions";
import { post_request } from "@/src/utils/services";
import React from "react";

class Gallery_component extends React.Component {
  constructor(props) {
    super(props);

    let { gallery, total_media } = this.props;

    this.state = { gallery, page: gallery ? 1 : 0, page_size: 12, total_media };
  }

  fetch_gallery = async (page = this.state.page) => {
    let { page_size, loading_more, gallery } = this.state;
    if (loading_more) return;

    gallery && this.setState({ loading_more: true });
    let { gallery: gallery_, total_media } = await post_request("fetch_media", {
      skip: page_size * page,
      limit: page_size,
      total_media: true,
    });

    if (!gallery) gallery = new Array();
    gallery = new Array(...gallery, ...gallery_);

    this.setState({
      gallery,
      total_media,
      no_more: gallery_?.length < page_size,
      loading_more: false,
      page,
    });
  };

  componentDidMount = async () => {
    scroll_to_top();
    let { gallery } = this.props;

    this.setState({ hide_nav: true }, () => this.setState({ hide_nav: false }));
    !gallery && (await this.fetch_gallery());
  };

  load_more = async (e) => {
    e && e.preventDefault();

    let { page } = this.state;

    await this.fetch_gallery(page + 1);
  };

  render() {
    let { gallery, loading_more, no_more } = this.state;

    return (
      <section class="min">
        <div class="container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {gallery ? (
              gallery.length ? (
                gallery.map((media) => <Media media={media} key={media._id} />)
              ) : (
                <Listempty text="No media in gallery yet" />
              )
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>

        {loading_more ? (
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Loadindicator contained />
          </div>
        ) : !gallery || no_more ? null : (
          <Explore_more_btn action={this.load_more} text="Load more" />
        )}
      </section>
    );
  }
}

export default Gallery_component;
