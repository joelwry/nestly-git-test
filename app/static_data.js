let navs = new Array(
  {
    title: "search",
    path: "/courses?search=true",
  },
  {
    title: "home",
    path: "/",
  },
  {
    title: "courses",
    path: "/courses",
    submenu: new Array(),
  },
  {
    title: "ncc uk",
    path: "/ncc",
    submenu: new Array(
      {
        title: "courses",
        path: `/courses?section=ncc`,
      },
      {
        title: "university progressions",
        path: "/university_progressions",
      },
      {
        title: "visa assistance",
        path: "/visa_assistance",
      },
      {
        title: "admission assistance",
        path: "/admission_assistance",
      }
    ),
  },
  {
    title: "about",
    path: "/about",
    submenu: new Array(
      {
        title: "who we are",
        path: "/about",
      },
      {
        title: "our instructors",
        path: "/instructors",
      },
      {
        title: "career",
        path: "/career",
      },
      {
        title: "internships",
        path: "https://giitfoundation.org/internship",
      },
      {
        title: "mentorships",
        path: "https://giitfoundation.org/mentorship",
      },
      {
        title: "FAQs",
        path: "/faqs",
      }
    ),
  },
  {
    title: "services",
    path: "/services",
  },
  {
    title: "testimonials",
    path: "/testimonials",
  },
  {
    title: "gallery",
    path: "/gallery",
  },
  {
    title: "blog",
    path: "/blog",
  },
  {
    title: "events",
    path: "",
    submenu: new Array(
      {
        title: "seminars",
        path: `https://giitfoundation.org/seminars?upcoming`,
      },
      {
        title: "conferences",
        path: "https://giitfoundation.org/conferences?upcoming",
      }
    ),
  },
  {
    title: "contact",
    path: "/contact_us",
  },
  {
    title: "get started",
    path: "/signup",
  }
);

let master_course_alignment = new Array(
  "science",
  "cyber",
  "cloud",
  "software",
  "web",
  "graphic",
  "digital",
  "support",
  "analytics"
);

const sections_alignment = new Array("degree", "master", "professional");

export { navs, master_course_alignment, sections_alignment };
