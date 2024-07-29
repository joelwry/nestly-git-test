import Contact_us_today from "@/src/sections/contact_us_today";
import Footer from "@/src/sections/footer";
import Student_reviews from "@/src/sections/student_reviews";
import { post_request } from "@/src/utils/services";
import Section from "./section";

const { default: Breadcrumb } = require("@/src/sections/breadcrumb");
const { default: Header } = require("@/src/sections/header");

const Courses = async () => {
  let { total_courses, courses } = await post_request("courses", {
    total_courses: true,
    limit: 24,
    skip: 0,
  });

  return (
    <div id="main-wrapper">
      <Header page="courses" />
      <Breadcrumb page_title="courses" no_gray page_text="Find Courses" />

      <Section total_courses={total_courses} courses={courses} />

      <Student_reviews />
      <Contact_us_today />
      <Footer />
    </div>
  );
};

export default Courses;
