const { default: Blog_section } = require("@/src/components/blog_section");
const { default: Breadcrumb } = require("@/src/sections/breadcrumb");
const {
  default: Contact_us_today,
} = require("@/src/sections/contact_us_today");
const { default: Footer } = require("@/src/sections/footer");
const { default: Header } = require("@/src/sections/header");
const { post_request } = require("@/src/utils/services");

const Blog = async () => {
  let { articles, total_articles } = await post_request("articles", {
    skip: 0,
    limit: 12,
    total_articles: true,
  });

  return (
    <div id="main-wrapper">
      <Header page="blog" />
      <Breadcrumb page_title="Latest News" page_text="Blog" />
      <Blog_section articles={articles} total_articles={total_articles} />

      <Contact_us_today />
      <Footer />
    </div>
  );
};

export default Blog;
