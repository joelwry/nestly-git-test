const { default: Footer } = require("@/src/sections/footer");
const { default: Header } = require("@/src/sections/header");
const { default: Signup_section } = require("./section");

const Signup = () => {
  return (
    <div id="main-wrapper">
      <Header page="signup" />
      <div className="clearfix"></div>

      <Signup_section />
      <Footer />
    </div>
  );
};

export default Signup;
