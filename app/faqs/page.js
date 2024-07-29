import Contact_us_today from "@/src/sections/contact_us_today";
import Footer from "@/src/sections/footer";

const { default: Breadcrumb } = require("@/src/sections/breadcrumb");
const { default: Faqs } = require("@/src/sections/faqs");
const { default: Header } = require("@/src/sections/header");

const Faqs_ = async ({}) => {
  return (
    <div id="main-wrapper">
      <Header page="enroll" />
      <div className="clearfix"></div>

      <Breadcrumb page_title="FAQS" page_text="Frequently asked questions" />

      <Faqs paged />

      <Contact_us_today />
      <Footer />
    </div>
  );
};

export default Faqs_;
