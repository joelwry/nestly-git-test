import Contact_form from "@/src/components/contact_form";
import Footer from "@/src/sections/footer";
import Student_reviews from "@/src/sections/student_reviews";

const { default: Breadcrumb } = require("@/src/sections/breadcrumb");
const { default: Header } = require("@/src/sections/header");

const Contact = ({}) => {
  return (
    <div id="main-wrapper">
      <Header page="contact" />
      <div className="clearfix"></div>
      <Breadcrumb page_text="Contact Us" page_title="Get In Touch" />

      <section>
        <div className="container">
          <div className="row align-items-start">
            <Contact_form />
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
              <div className="lmp_caption pl-lg-5">
                <ol className="list-unstyled p-0">
                  <li className="d-flex align-items-start my-3 my-md-4">
                    <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                      <div className="position-absolute theme-cl h5 mb-0">
                        <i className="fas fa-home"></i>
                      </div>
                    </div>
                    <div className="ml-3 ml-md-4">
                      <h4>Reach Us</h4>
                      <h6>Ikeja - Head Office</h6>
                      <p>
                        3, Obafemi Awolowo way,
                        <br />
                        Ikeja, Lagos State, Nigeria,
                        <br />
                      </p>
                      <div className="mt-1 position-absolute theme-cl h5 mb-0">
                        <i className="fas fa-at"></i>
                      </div>
                      <div className="ml-3 ml-md-4">
                        <p>
                          info_ikeja@giitafrica.com
                          <br />
                          admin_ikeja@giitafrica.com
                        </p>
                      </div>

                      <h6>Lekki - branch</h6>
                      <p>
                        Road 3, Suit H72/47, Ikota Shopping Complex,
                        <br />
                        VGC, Lekki
                      </p>
                      <div className="mt-1 position-absolute theme-cl h5 mb-0">
                        <i className="fas fa-at"></i>
                      </div>
                      <div className="ml-3 ml-md-4">
                        <p>
                          info_lekki@giitafrica.com
                          <br />
                          admin_lekki@giitafrica.com
                        </p>
                      </div>

                      <h6>Ikorodu - branch</h6>
                      <p>
                        54, Oba Sekumade Road, <br />
                        Ogolonto Road, Ikorodu, Lagos.
                      </p>
                      <div className="mt-1 position-absolute theme-cl h5 mb-0">
                        <i className="fas fa-at"></i>
                      </div>
                      <div className="ml-3 ml-md-4">
                        <p>
                          info_ikorodu@giitafrica.com
                          <br />
                          admin_ikorodu@giitafrica.com
                        </p>
                      </div>

                      <h6>United Kingdom - branch</h6>
                      <p>
                        International House, 221 Bow Road, Bow London E3 2SJ,
                        United Kingdom.
                      </p>
                      <div className="mt-1 position-absolute theme-cl h5 mb-0">
                        <i className="fas fa-at"></i>
                      </div>
                      <div className="ml-3 ml-md-4">
                        <p>
                          info_uk@giitafrica.com
                          <br />
                          admin_uk@giitafrica.com
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex align-items-start my-3 my-md-4">
                    <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                      <div className="position-absolute theme-cl h5 mb-0">
                        <i className="fas fa-at"></i>
                      </div>
                    </div>
                    <div className="ml-3 ml-md-4">
                      <h4>Drop A Mail</h4>
                      <p>
                        info@giitafrica.com
                        <br />
                        admin@giitafrica.com
                        <br />
                        customercare@giitafrica.com
                      </p>
                    </div>
                  </li>
                  <li className="d-flex align-items-start my-3 my-md-4">
                    <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                      <div className="position-absolute theme-cl h5 mb-0">
                        <i className="fas fa-phone-alt"></i>
                      </div>
                    </div>
                    <div className="ml-3 ml-md-4">
                      <h4>Make a Call</h4>
                      <p>
                        +(234) 806 051 5686
                        <br />
                        +(234) 812 925 2489
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Student_reviews />
      <Footer />
    </div>
  );
};

export default Contact;
