import React from "react";

class Socials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="fixed_on_page_box" id="fixed_socials">
        <div className="icon_whatsapp mb-3">
          <a
            style={{ color: "#fff" }}
            href="https://wa.me/+2348060515686/?text=Hello,%20I%20like%20to%20enquire%20about%20GIIT%20courses%20and%20training?"
            target="_blank"
          >
            <img src="https://giit.com.ng/assets/images/icon_whatsapp.png?1666193786" />
          </a>
        </div>

        <div className="icon_facebook mb-3">
          <a
            style={{ color: "#fff" }}
            target="_blank"
            href="https://www.facebook.com/giitnigeria"
          >
            <img
              src="https://giit.com.ng/assets/images/icon_facebook.png?1666193786"
              className="img-fluid"
            />
          </a>
        </div>
        <div className="icon_twitter pl3 mb-3">
          <a
            style={{ color: "#fff" }}
            target="_blank"
            href="https://www.twitter.com/giitnigeria"
          >
            <img src="https://giit.com.ng/assets/images/icon_twitter.png?1666193786" />
          </a>
        </div>
        <div className="icon_linkedin pl3 mb-3">
          <a
            style={{ color: "#fff" }}
            target="_blank"
            href="https://www.linkedin.com/in/giit-africa-6074b796"
          >
            <img src="https://giit.com.ng/assets/images/icon_linkedin.png?1666193786" />
          </a>
        </div>
      </div>
    );
  }
}

export default Socials;
