import Listempty from "@/src/components/list_empty";
import Loadindicator from "@/src/components/loadindicator";
import Review from "@/src/components/review";
import Video_review from "@/src/components/video_review";
import Breadcrumb from "@/src/sections/breadcrumb";
import Contact_us_today from "@/src/sections/contact_us_today";
import Footer from "@/src/sections/footer";
import Header from "@/src/sections/header";
import { post_request } from "@/src/utils/services";

const Testimonials = async () => {
  let reviews = await post_request("reviews", {
    verified: true,
    skip: 0,
    limit: 24,
  });

  let video_reviews = await post_request("video_reviews");

  return (
    <div id="main-wrapper">
      <Header page="testimonials" />
      <Breadcrumb page_title="Testimonials" page_text="What clients say" />

      <div style={{ backgroundColor: "#f7f8f9", paddingTop: 20 }}>
        <div className="container">
          <div class="row justify-content-center my-3">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  Our Video <span class="theme-cl">Reviews</span>
                </h2>
                <p></p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {video_reviews ? (
              video_reviews.length ? (
                video_reviews.map((r) => (
                  <Video_review
                    review={r}
                    class_name="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-2"
                    key={r._id}
                  />
                ))
              ) : null
            ) : (
              <Loadindicator />
            )}
          </div>

          <div class="row justify-content-center my-3 mt-5">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  <span class="theme-cl">Reviews</span>
                </h2>
                <p>More on what our happy alumnis has to say</p>
              </div>
            </div>
          </div>

          <div className="mt-5 row justify-content-center">
            {reviews ? (
              reviews.length ? (
                reviews.map((review) => <Review testimonials review={review} />)
              ) : (
                <Listempty />
              )
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>
      </div>

      <Contact_us_today />

      <Footer />
    </div>
  );
};

export default Testimonials;
