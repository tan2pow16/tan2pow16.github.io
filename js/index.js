'use strict';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "center bottom-padded"
    }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("a", {
      class: "tangent"
    }, "Tangent"), /*#__PURE__*/React.createElement("a", {
      class: "_0x10000"
    }, "65536"), "'s Lazy Tools"));
  }
}
class Intro extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "intro"
    }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("img", {
      height: "192px",
      src: "./img/tangent65536.png"
    })), /*#__PURE__*/React.createElement("td", {
      className: "intro-text"
    }, "Hi! I'm ", /*#__PURE__*/React.createElement("a", {
      class: "tangent"
    }, "Tangent"), /*#__PURE__*/React.createElement("a", {
      class: "_0x10000"
    }, "65536"), ".", /*#__PURE__*/React.createElement("br", null), "Welcome to my peaceful digital cottage.", /*#__PURE__*/React.createElement("br", null), "I use this tiny space to host some random stuff I've made. Maybe some tools I use so often that I decided to make my own.", /*#__PURE__*/React.createElement("br", null), "Why keep wasting 3 minutes searching for online tools when you can burn 3 days making your own implementation?", /*#__PURE__*/React.createElement("br", null), "^.^"))));
  }
}
class Links extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "doc-body"
    }, /*#__PURE__*/React.createElement("table", {
      className: "doc-body doc-table"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      className: "doc-panel doc-panel-left"
    }, "> ", /*#__PURE__*/React.createElement("a", {
      href: "./pemdec.html"
    }, "ASN1 PEM Decoder Tool")), /*#__PURE__*/React.createElement("td", {
      className: "doc-panel doc-panel-right"
    }, ''))));
  }
}
class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padding = [];
    let color = 0x1F;
    while (color > 0) {
      let colorStr = `#${`0${color.toString(16)}`.slice(-2).repeat(3)}`;
      padding.push( /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
        className: "footer-left footer-padding",
        style: {
          'border-color': colorStr
        }
      }), /*#__PURE__*/React.createElement("td", {
        className: "footer-right footer-padding",
        style: {
          'border-color': colorStr
        }
      })));
      color -= 0x2;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "footer"
    }, /*#__PURE__*/React.createElement("table", {
      className: "footer-table"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      className: "footer-panel footer-left"
    }, /*#__PURE__*/React.createElement("b", null, "Credits"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
      href: "https://reactjs.org"
    }, "React"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", null, "... and many more underlying libraries!"), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("td", {
      className: "footer-panel footer-right"
    }, "Copyright (c) 2022, ", /*#__PURE__*/React.createElement("a", {
      class: "tangent normal-weight"
    }, "Tangent"), /*#__PURE__*/React.createElement("a", {
      class: "_0x10000 normal-weight"
    }, "65536"), ".", /*#__PURE__*/React.createElement("br", null), "All rights reserved.")), padding));
  }
}
ReactDOM.render([/*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Intro, null), /*#__PURE__*/React.createElement(Links, null), /*#__PURE__*/React.createElement(Footer, null)], document.getElementById('root'));
document.title = 'Tangent65536\'s Lazy Tools';