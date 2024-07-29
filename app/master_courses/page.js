const { default: Breadcrumb } = require("@/src/sections/breadcrumb");
const {
  default: Contact_us_today,
} = require("@/src/sections/contact_us_today");
const { default: Footer } = require("@/src/sections/footer");
const { default: Header } = require("@/src/sections/header");
const { default: Master_courses } = require("@/src/sections/master_courses");
import { get_request } from "@/src/utils/services";

const Master_courses_ = async () => {
  let master_courses = await get_request("master_courses/all");

  return (
    <div id="main-wrapper">
      <Header page="master courses" />
      <Breadcrumb page_title="Master courses" page_text="Find Master courses" />

      <Master_courses all master_courses={master_courses} />

      <Contact_us_today />
      <Footer />
    </div>
  );
};

export default Master_courses_;
