const { default: Breadcrumb } = require("@/src/sections/breadcrumb");
const {
  default: Contact_us_today,
} = require("@/src/sections/contact_us_today");
const { default: Footer } = require("@/src/sections/footer");
const { default: Header } = require("@/src/sections/header");
const { default: Services } = require("@/src/sections/services");
const { default: Trusted_by } = require("@/src/sections/trusted_by");
const { get_request } = require("@/src/utils/services");

const Services_page = async ({}) => {
  let services = await get_request("services");
  let trustees = await get_request("trusted_by");

  return (
    <div id="main-wrapper">
      <Header page="servcices" />
      <Breadcrumb no_gray page_title="What we offer" page_text="Services" />
      <Services services={services} />
      <Trusted_by trustees={trustees} />

      <Contact_us_today />

      <Footer />
    </div>
  );
};

export default Services_page;
