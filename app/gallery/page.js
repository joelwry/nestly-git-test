import Breadcrumb from "@/src/sections/breadcrumb";
import Contact_us_today from "@/src/sections/contact_us_today";
import Footer from "@/src/sections/footer";
import Header from "@/src/sections/header";
import Student_reviews from "@/src/sections/student_reviews";
import Gallery_component from "./gallery";
import { post_request } from "@/src/utils/services";

const Gallery = async () => {
  let { gallery: gallery_, total_media } = await post_request("fetch_media", {
    skip: 0,
    limit: 12,
    total_media: true,
  });

  return (
    <div id="main-wrapper">
      <Header page="gallery" />
      <Breadcrumb page_title="Gallery" page_text="Gallery" />

      <div style={{ backgroundColor: "#f7f8f9", paddingTop: 20 }}>
        <div className="container"></div>
      </div>

      <Gallery_component gallery={gallery_} total_media={total_media} />

      <Student_reviews />
      <Contact_us_today />

      <Footer />
    </div>
  );
};

export default Gallery;
