"use client";

import React from "react";

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  a_day = 60 * 60 * 24 * 1000;

  an_hour = 60 * 60 * 1000;

  a_minute = 60 * 1000;

  componentDidMount = () => {
    let { timestamp } = this.props;

    this.counter = setInterval(() => {
      let difference = timestamp - Date.now();
      let days = Math.floor(difference / this.a_day);
      difference = difference - days * this.a_day;

      let hours = Math.floor(difference / this.an_hour);
      difference = difference - hours * this.an_hour;

      let minutes = Math.floor(difference / this.a_minute);
      difference = difference - minutes * this.a_minute;

      this.setState({
        days,
        hours,
        minutes,
        seconds: Math.floor(difference / 1000),
        start: true,
      });
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.counter);
  };

  render() {
    let { timestamp } = this.props;
    let { hours, seconds, minutes, days, start } = this.state;

    if (timestamp < Date.now() || !start) return null;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: 28,
        }}
      >
        <span>{`${days} d`}</span>&nbsp;:&nbsp;
        <span>{`${Number(hours).toString().padStart(2, "0")} hrs`}</span>
        &nbsp;:&nbsp;
        <span>{`${Number(minutes).toString().padStart(2, "0")} mins`}</span>
        &nbsp;:&nbsp;
        <span>{`${Number(seconds).toString().padStart(2, "0")} secs`}</span>
      </div>
    );
  }
}

export default Countdown;
