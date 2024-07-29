"use client";

import Loadindicator from "@/src/components/loadindicator";
import { post_request } from "@/src/utils/services";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import bg from "../../assets/img/loginbg4.jpg";

class Signup_section extends React.Component {
  constructor(props) {
    super(props);

    this.state = { password: "" };
  }

  toggle_reavel_password = () =>
    this.setState({ reveal_password: !this.state.reveal_password });

  sign_up = async () => {
    let { firstname, lastname, email, password, loading } = this.state;

    if (
      !firstname ||
      !lastname ||
      !password ||
      !email_regex.test(email) ||
      loading
    )
      return;

    if (password.length < 6)
      return this.setState({ message: "Password must be above 5 characters" });

    this.setState({ loading: true });

    let user = { firstname, lastname, email, password };

    let res = await post_request("signup", user);
    if (!res._id) return this.setState({ message: res, loading: false });

    user._id = res._id;
    user.created = res.created;
    this.reset_state();

    document.getElementById("click_verify").click();
  };

  reset_state = () =>
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      loading: false,
    });

  render() {
    let {
      firstname,
      lastname,
      loading,
      email,
      message,
      password,
      reveal_password,
    } = this.state;

    return (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
              <form>
                <div className="crs_log_wrap">
                  <div className="crs_log__thumb">
                    <Image src={bg} className="img-fluid" alt="" />
                  </div>
                  <div className="crs_log__caption">
                    <div className="rcs_log_123">
                      <div className="rcs_ico">
                        <i className="fas fa-user"></i>
                      </div>
                    </div>

                    <div className="rcs_log_124">
                      <div className="Lpo09">
                        <h4>Register Your Account</h4>
                      </div>
                      <div className="form-group row mb-0">
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              value={firstname}
                              onChange={({ target }) =>
                                this.setState({
                                  firstname: target.value,
                                  message: "",
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              value={lastname}
                              onChange={({ target }) =>
                                this.setState({
                                  lastname: target.value,
                                  message: "",
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="you@mail.com"
                          value={email}
                          onChange={({ target }) =>
                            this.setState({
                              email: target.value,
                              message: "",
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type={reveal_password ? "text" : "password"}
                          className="form-control"
                          placeholder="*******"
                          value={password}
                          onChange={({ target }) =>
                            this.setState({
                              password: target.value,
                              message: "",
                            })
                          }
                        />
                      </div>
                      {message ? (
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      ) : null}

                      <div className="form-group">
                        <Link
                          id="click_verify"
                          href={`/verify_email?addr=${email}`}
                        ></Link>
                        {loading ? (
                          <Loadindicator />
                        ) : (
                          <button
                            type="button"
                            className="btn full-width btn-md theme-bg text-white"
                            onClick={this.sign_up}
                          >
                            Sign Up
                          </button>
                        )}
                      </div>
                    </div>
                    {/* <div className="rcs_log_125">
                    <span>Or SignUp with Social Info</span>
                  </div> */}
                    {/* <div className="rcs_log_126">
                    <ul className="social_log_45 row">
                      <li className="col-xl-4 col-lg-4 col-md-4 col-4">
                        <Link href="javascript:void(0);" className="sl_btn">
                          <i className="ti-facebook text-info"></i>Facebook
                        </Link>
                      </li>
                      <li className="col-xl-4 col-lg-4 col-md-4 col-4">
                        <Link href="javascript:void(0);" className="sl_btn">
                          <i className="ti-google text-danger"></i>Google
                        </Link>
                      </li>
                      <li className="col-xl-4 col-lg-4 col-md-4 col-4">
                        <Link href="javascript:void(0);" className="sl_btn">
                          <i className="ti-twitter theme-cl"></i>Twitter
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                  </div>
                  <div className="crs_log__footer d-flex justify-content-between">
                    <div className="fhg_45">
                      <p className="musrt">
                        Already have account?{" "}
                        <Link href="/login" className="theme-cl">
                          Login
                        </Link>
                      </p>
                    </div>
                    <div className="fhg_45">
                      <p className="musrt">
                        <Link href="/forgot_password" className="text-danger">
                          Forgot Password?
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Signup_section;
