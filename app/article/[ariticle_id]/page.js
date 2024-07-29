import Contact_us_today from "@/src/sections/contact_us_today";
import Footer from "@/src/sections/footer";
import Section from "./section";

const { default: Breadcrumb } = require("@/src/sections/breadcrumb");
const { default: Header } = require("@/src/sections/header");
const { get_request, post_request } = require("@/src/utils/services");

const Article = async ({ params }) => {
  let article = await get_request(`article/${params.ariticle_id}`);

  await post_request(`article_viewed/${article._id}`);

  return (
    <div className="blog-page">
      <div id="main-wrapper">
        <Header page="article" />
        <div className="clearfix"></div>
        <Breadcrumb page_text="Article" page_title={article.title} no_gray />

        <Section article={article} />
        <Contact_us_today />
        <Footer />
      </div>
    </div>
  );
};

export default Article;
