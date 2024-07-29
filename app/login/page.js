const { default: Footer } = require("@/src/sections/footer");
const { default: Header } = require("@/src/sections/header");
const { default: Login_section } = require("./section");

const Login = () => {
  return (
    <div id="main-wrapper">
      <Header page="signup" />
      <div className="clearfix"></div>

      <Login_section />
      <Footer />
    </div>
  );
};

export default Login;
