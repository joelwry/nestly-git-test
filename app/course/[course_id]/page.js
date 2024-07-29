import Header from "@/src/sections/header";
import { get_request, post_request } from "@/src/utils/services";
import Course_banner from "./course_banner";
import Featured_course from "@/src/components/course";
import Loadindicator from "@/src/components/loadindicator";
import Certification_courses from "@/src/sections/certification_courses";
import Course_details from "./course_details";
import Course_sidebar from "./course_sidebar";
import Footer from "@/src/sections/footer";
import Contact_us_today from "@/src/sections/contact_us_today";
import Student_reviews from "@/src/sections/student_reviews";

const Course = async ({ params }) => {
  let cummulative_price = 0;
  let fetch_course_children = async (course) => {
    let cummulative_price = 0;
    let courses = await post_request("get_courses", {
      courses: course.courses,
    });
    courses.map((c) => (cummulative_price += c.price));

    return courses;
  };
  let { course_id } = params;

  let course = await get_request(
      `${
        course_id.startsWith("master") ? "master_course" : "course"
      }/${course_id}`
    ),
    courses;

  if (course.courses) courses = await fetch_course_children(course);

  let cummulate_certifications = (courses) => {
    if (!courses) return;

    let certifications = new Array();

    courses.map(
      (course) =>
        course.certifications && certifications.push(...course.certifications)
    );
    return certifications;
  };

  let certifications = cummulate_certifications(courses);

  return (
    <div id="main-wrapper">
      <Header page="course" />
      <div class="clearfix"></div>

      <Course_banner course={course} />

      {!course ? null : (
        <section class="gray pt-3">
          <div class="container">
            <div class="row justify-content-between">
              {course.courses ? (
                <div class="col-lg-8 col-md-12 order-lg-first">
                  <div class="row justify-content-center">
                    {courses ? (
                      courses.map((course_) => (
                        <Featured_course
                          in_courses
                          course={course_}
                          key={course_._id}
                        />
                      ))
                    ) : (
                      <Loadindicator contained />
                    )}
                  </div>

                  {certifications ? (
                    <>
                      <h4 class="edu_title">Certifications</h4>
                      <Certification_courses certifications={certifications} />
                    </>
                  ) : null}
                </div>
              ) : (
                <Course_details course={course} />
              )}

              <Course_sidebar
                course={course}
                cummulative_price={cummulative_price}
              />
            </div>
          </div>
        </section>
      )}

      <Student_reviews />
      <Contact_us_today />
      <Footer />
    </div>
  );
};

export default Course;
