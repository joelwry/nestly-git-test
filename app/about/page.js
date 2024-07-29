import Header from "@/src/sections/header";
import Footer from "@/src/sections/footer";
import { navs } from "../static_data";
import { get_request } from "@/src/utils/services";
import Breadcrumb from "@/src/sections/breadcrumb";
import Services from "@/src/sections/services";
import Best_instructors from "@/src/sections/best_instructors";
import Contact_us_today from "@/src/sections/contact_us_today";
import Trusted_by from "@/src/sections/trusted_by";
import Student_reviews from "@/src/sections/student_reviews";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/img/logo.png";
import Faqs from "@/src/sections/faqs";

const About = async ({}) => {
  let subnavs = new Object(),
    submenus = new Object();
  let master_courses = await get_request("master_courses/all");
  let about_statement = await get_request("about_statement");
  let services = await get_request("services");
  let { best_instructors_stuffs } = await get_request("entry");
  let trustees = await get_request("trusted_by");

  return (
    <div id="main-wrapper">
      <Header
        page="about"
        refs="header"
        navs_data={{ navs, subnavs, submenus }}
      />
      <div className="clearfix"></div>

      <Breadcrumb page_title="Who we are?" page_text="About Us" />

      <section>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 mb-3">
              <div className="lmp_caption">
                <span className="theme-cl">About Us</span>
                <h2 className="mb-3">What We Do & Our Aim</h2>
                {about_statement?.text.split("\n").map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
                <br />

                <div className="text-left mt-4">
                  <Link
                    href="/courses"
                    className="btn btn-md text-light theme-bg"
                  >
                    Enrolled Today
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
              <div className="lmp_thumb">
                <Image src={logo} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services services={services} />
      <Best_instructors best_instructors_stuffs={best_instructors_stuffs} />
      <Trusted_by trustees={trustees} />

      <Student_reviews />

      <Faqs limit={6} />

      <Contact_us_today />

      <Footer master_courses={master_courses} />
    </div>
  );
};

export default About;
