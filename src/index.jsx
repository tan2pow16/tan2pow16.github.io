'use strict';

class Header extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className='center bottom-padded'>
        <h1><a class='tangent'>Tangent</a><a class='_0x10000'>65536</a>'s Lazy Tools</h1>
      </div>
    );
  }
}

class Intro extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className='intro'>
        <table>
          <tr>
            <td>
              <img height='192px' src="./img/tangent65536.png" />
            </td>
            <td className='intro-text'>
              Hi! I'm <a class='tangent'>Tangent</a><a class='_0x10000'>65536</a>.<br />
              Welcome to my peaceful digital cottage.<br />
              I use this tiny space to host some random stuff I've made.
              Maybe some tools I use so often that I decided to make my own.<br />
              Why keep wasting 3 minutes searching for online tools when you can burn 3 days making your own implementation?<br />
              ^.^
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class Links extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className='doc-body'>
        <table className='doc-body doc-table'>
          <tr>
            <td className='doc-panel doc-panel-left'>
              &gt; <a href='./pemdec.html'>ASN1 PEM Decoder Tool</a>
            </td>
            <td className='doc-panel doc-panel-right'>
              {''}
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class Footer extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let padding = [];
    let color = 0x1F;
    while(color > 0)
    {
      let colorStr = `#${`0${color.toString(16)}`.slice(-2).repeat(3)}`;
      padding.push(
        <tr>
          <td className='footer-left footer-padding' style={{
            'border-color': colorStr
          }}></td>
          <td className='footer-right footer-padding' style={{
            'border-color': colorStr
          }}></td>
        </tr>
      );
      color -= 0x2;
    }

    return (
      <div className='footer'>
        <table className='footer-table'>
          <tr>
            <td className='footer-panel footer-left'>
              <b>Credits</b><br/>
              <a href='https://reactjs.org'>React</a><br/>
              <a>... and many more underlying libraries!</a><br/>
            </td>
            <td className='footer-panel footer-right'>
              Copyright (c) 2022, <a class='tangent normal-weight'>Tangent</a><a class='_0x10000 normal-weight'>65536</a>.<br/>
              All rights reserved.
            </td>
          </tr>
          {padding}
        </table>
      </div>
    );
  }
}

ReactDOM.render([
  <Header />,
  <Intro />,
  <Links />,
  <Footer />
], document.getElementById('root'));
document.title = 'Tangent65536\'s Lazy Tools';
