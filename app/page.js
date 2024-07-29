import Header from "@/src/sections/header";

import { navs, sections_alignment } from "./static_data";
import Banner from "@/src/sections/banner";
import { get_request, post_request } from "@/src/utils/services";
import Ratings from "@/src/sections/associates";
import Footer from "@/src/sections/footer";
import { emitter } from "./layout";
import Courses from "@/src/sections/courses";
import Master_courses from "@/src/sections/master_courses";
import Combo_courses from "@/src/sections/combo_courses";
import Flash_promo from "@/src/sections/flash_promo";
import Certification_courses from "@/src/sections/certification_courses";
import Best_instructors from "@/src/sections/best_instructors";
import Onboarding_steps from "@/src/sections/onboarding_steps";
import Gallery from "@/src/sections/gallery";
import Student_reviews from "@/src/sections/student_reviews";
import Student_works from "@/src/sections/student_works";
import Latest_news_and_articles from "@/src/sections/latest_news_and_articles";
import Services from "@/src/sections/services";
import Contact_us_today from "@/src/sections/contact_us_today";
import Faqs from "@/src/sections/faqs";
import { shuffle_array } from "@/src/utils/functions";
import Loadindicator from "@/src/components/loadindicator";

const Home = async ({}) => {
  let {
    flash_promo,
    banner_stuffs,
    best_instructors_stuffs,
    onboarding_stuffs,
  } = await get_request("entry");
  let master_courses = await get_request("master_courses/all");
  let sections = await get_request("sections/all");
  for (let s = 0; s < sections.length; s++) {
    let section = sections[s];

    let arr = shuffle_array(section.courses.filter((c) => c));
    let courses = arr.slice(0, 6);

    courses = await post_request(`get_courses`, {
      courses,
    });

    courses.length < 6 && courses.push(...courses.slice(0, 6 - courses.length));

    sections[s].courses_ = courses;
  }

  sections && sections.push && sections.push("master_course", "combo");
  sections = typeof sections.sort ==='function'&& sections?.sort((s1, s2) => {
    let s1_index = sections_alignment.findIndex((m) =>
        (s1.title || s1).toLowerCase().includes(m)
      ),
      s2_index = sections_alignment.findIndex((m) =>
        (s2.title || s2).toLowerCase().includes(m)
      );
    if (s1_index === -1) s1_index = 200;
    if (s2_index === -1) s2_index = 200;

    if (
      s1 &&
      s1.title &&
      s1.title.toLowerCase().includes("degree") &&
      s1.title.toLowerCase().includes("uk")
    )
      emitter.emit("ncc_section", s1._id);

    return s1_index - s2_index;
  });
  let student_works = await get_request("student_works");
  let lastest_articles = await post_request("articles", { limit: 6 });
  let services = await get_request("services");

  return (
    <div id="main-wrapper">
      <Header navs_data={{ navs }} />
      <Banner banner_stuffs={banner_stuffs} />
      <Ratings />

      {sections && sections.map ? (
        sections.map((section, index) => {
          if (section === "combo")
            return <Combo_courses gray={!!(index % 2)} key={index} />;
          else if (section === "master_course")
            return (
              <Master_courses
                master_courses={master_courses}
                gray={!!(index % 2)}
                key={index}
              />
            );
          else
            return (
              <Courses gray={!!(index % 2)} section={section} key={index} />
            );
        })
      ) : (
        <Loadindicator contained />
      )}
      <Flash_promo flash_promo={flash_promo} />
      <Certification_courses />
      <Best_instructors best_instructors_stuffs={best_instructors_stuffs} />
      <Onboarding_steps onboarding_stuffs={onboarding_stuffs} />
      <Gallery />
      <Student_reviews />
      <Student_works student_works={student_works} />
      <Latest_news_and_articles lastest_articles={lastest_articles} />
      <Services services={services} />
      <Faqs limit={6} />

      <Contact_us_today />

      <Footer master_courses={master_courses} />
    </div>
  );
};

export default Home;
