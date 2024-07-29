import Forgot_password_section from "./section";
const { default: Footer } = require("@/src/sections/footer");
const { default: Header } = require("@/src/sections/header");

const Forgot_password = () => {
  return (
    <div id="main-wrapper">
      <Header page="signup" />
      <div className="clearfix"></div>

      <Forgot_password_section />
      <Footer />
    </div>
  );
};

export default Forgot_password;
