'use strict';

class Header extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return(
      <div className='center bottom-padded'>
        <h1>HTML ASN1 PEM KEY DECODER</h1>
        <a>Decode PEM-encoded ASN1 Keys</a>
      </div>
    );
  }
}

class Tools extends React.Component
{
  #updateInput;
  #updatePasswd;
  #doParsing;
  #outputCallIn;
  #outputCallback;

  constructor(props)
  {
    super(props);

    this.state = {
      input: ''
    };

    this.#updateInput = this.#updateInput0.bind(this);
    this.#updatePasswd = this.#updatePasswd0.bind(this);
    this.#doParsing = this.#doParsing0.bind(this);
    this.#outputCallIn = this.#outputCallIn0.bind(this);
  }

  #updateInput0(evt)
  {
    let str = evt.target.value;
    // Only updating the internal input cache.
    // Don't use setState as a render update is not needed!
    this.state.input = str;
  }

  #updatePasswd0(evt)
  {
    let str = evt.target.value;
    // Only updating the internal input cache.
    // Don't use setState as a render update is not needed!
    this.state.passwd = str.length > 0 ? str : null;
  }

  #doParsing0()
  {
    let ret = null;
    try
    {
      ret = parseKeys({
        key: this.state.input,
        passphrase: this.state.passwd
      });
    }
    catch(err)
    {
      console.error(err);
    }
    this.#outputCallback(ret);
  }

  #outputCallIn0(cb)
  {
    this.#outputCallback = cb;
  }

  render()
  {
    return([
      <table className='tools'>
        <tr>
          <th className='tools-header tools-panel-left'>Input</th>
          <th className='tools-header tools-panel-right'>Output</th>
        </tr>
        <tr>
          <td className='center tools-panel tools-panel-left'><InputPanel
            updateInput={this.#updateInput}
            updatePasswd={this.#updatePasswd}
            doParsing={this.#doParsing}
          /></td>
          <td className='center tools-panel tools-panel-right'><OutputPanel
            outputCallIn={this.#outputCallIn}
          /></td>
        </tr>
      </table>
    ]);
  }
}

class InputPanel extends React.Component
{
  #placeholder;

  constructor(props)
  {
    super(props);

    this.#placeholder = '-----BEGIN RSA PRIVATE KEY-----\nMIGrAgEAAiEA2Korfvz/SeLAxY3tRF8la5XAkQlzHOZ7RAvdLZH/th8CAwEAAQIg\nYNKTA3m9/9+0M9R77mzyhDHy+AwHGYEkMmXkSrDykPECEQDuMmD7uz66i9U27ObQ\nNku3AhEA6NvMvwed57R8s/8EeuK42QIRANyQzfmMI8P95AueRwUaofUCEQCqSQKj\nuDg7V3vSTW3DR8WRAhBqRey/FLy8U7OUJvD4NUni\n-----END RSA PRIVATE KEY-----';
    this.props.updateInput({
      target: {
        value: this.#placeholder
      }
    });
  }

  render()
  {
    return([
      <textarea
        className='tool-item input-block bottom-padded-thin'
        rows={24}
        placeholder={this.#placeholder}
        onChange={this.props.updateInput}>
      </textarea>,
      <br />,
      <div className='tool-item bottom-padded-thin fix-left'>
        <a>Password (if any): </a>
        <input
          className='input-block input-field'
          type="text"
          name="passwd"
          onChange={this.props.updatePasswd}>
        </input>
      </div>,
      <button
        className='input-submit'
        onClick={this.props.doParsing}>
        Decode
      </button>
    ]);
  }
}

class OutputPanel extends React.Component
{
  #selectFormat;
  #formatBN;
  #setOutput;
  static #ec_curves = new Map();

  static
  {
    OutputPanel.#ec_curves.set('1.3.132.0.10', {
      name: 'secp256k1',
      length: 256
    });
    OutputPanel.#ec_curves.set('1.3.132.0.33', {
      name: 'P-224',
      length: 224
    });
    OutputPanel.#ec_curves.set('1.2.840.10045.3.1.1', {
      name: 'P-192',
      length: 192
    });
    OutputPanel.#ec_curves.set('1.2.840.10045.3.1.7', {
      name: 'P-256',
      length: 256
    });
    OutputPanel.#ec_curves.set('1.3.132.0.34', {
      name: 'P-384',
      length: 384
    });
    OutputPanel.#ec_curves.set('1.3.132.0.35', {
      name: 'P-521',
      length: 521
    });
  }

  constructor(props)
  {
    super(props);

    this.state = {
      format: 'hex',
      keyObj: null,
      renderEntries: null
    };
    
    this.setState(this.state);

    this.#selectFormat = this.#selectFormat0.bind(this);
    this.#formatBN = this.#formatBN0.bind(this);
    this.#setOutput = this.#setOutput0.bind(this);

    props.outputCallIn(this.#setOutput);
  }

  #selectFormat0(evt)
  {
    this.state.format = evt.target.value;
    if(this.state.keyObj)
    {
      this.#setOutput(this.state.keyObj);
    }
  }

  #formatBN0(bn)
  {
    let cache;
    switch(this.state.format)
    {
      case 'dec':
      {
        cache = bn.toString();
        break;
      }
      case 'base64':
      {
        cache = bn.toBuffer().toString('base64');
        break;
      }
      case 'hex':
      default:
      {
        cache = bn.toString(16);
        break;
      }
    }

    let arr = cache.match(/.{1,48}/g);
    let ret = [arr[0]];
    for(let i = 1 ; i < arr.length ; i++)
    {
      ret.push(<br />, arr[i]);
    }

    return ret;
  }

  static #bitlen(bn)
  {
    let ret = bn.length * 26;
    let cache = bn.words[bn.length - 1];
    let flag = 1 << 25;
    while(!(cache & flag))
    {
      ret--;
      flag >>= 1;
    }
    return ret;
  }

  static #parseCoords(buf, bitLen)
  {
    let byteLen = (bitLen + 7) >> 3;
    let bufLen = buf.length;
    if(bufLen < byteLen)
    {
      return null;
    }

    let x = null, y = null;
    let hasY = (bufLen >= byteLen * 2);

    switch(bufLen % byteLen)
    {
      case 1:
      {
        if(buf[0] != 0x04) // Public key identifier
        {
          return null;
        }

        x = new BN(buf.subarray(1, byteLen + 1));
        if(hasY)
        {
          y = new BN(buf.subarray(byteLen + 1, 2 * byteLen + 1));
        }

        break;
      }
      case 0:
      {
        x = new BN(buf.subarray(0, byteLen));
        if(hasY)
        {
          y = new BN(buf.subarray(byteLen, 2 * byteLen));
        }

        break;
      }
      default:
      {
        return null;
      }
    }

    return {
      x: x,
      y: y
    }
  }

  #setOutput0(keyObj)
  {
    let renderEntries = [];

    if(keyObj)
    {
      renderEntries.push({
        name: 'Key Type',
        value: null
      });

      this.state.keyObj = keyObj;
      if(keyObj['modulus']) // RSA
      {
        renderEntries.push({
          name: 'Length (bits)',
          value: OutputPanel.#bitlen(keyObj['modulus'])
        }, {
          name: 'Modulus',
          value: this.#formatBN(keyObj['modulus'])
        }, {
          name: 'Public Exponent',
          value: this.#formatBN(keyObj['publicExponent'])
        });

        if(keyObj['privateExponent']) // Private key
        {
          renderEntries[0].value = 'RSA Private Key';

          renderEntries.push({
            name: 'Private Exponent',
            value: this.#formatBN(keyObj['privateExponent'])
          }, {
            name: 'Prime 1',
            value: this.#formatBN(keyObj['prime1'])
          }, {
            name: 'Prime 2',
            value: this.#formatBN(keyObj['prime2'])
          }, {
            name: 'Exponent 1',
            value: this.#formatBN(keyObj['exponent1'])
          }, {
            name: 'Exponent 2',
            value: this.#formatBN(keyObj['exponent2'])
          }, {
            name: 'Coefficient',
            value: this.#formatBN(keyObj['coefficient'])
          });
        }
        else
        {
          renderEntries[0].value = 'RSA Public Key';
        }
      }
      else if(keyObj['curve']) // EC, seems like for private key only somehow
      {
        renderEntries[0].value = 'EC Private Key';
        
        let curveOID = keyObj['curve'].join('.');
        let curveType = OutputPanel.#ec_curves.get(curveOID);
        if(curveType)
        {
          renderEntries.push({
            name: 'Curve Name',
            value: curveType.name
          }, {
            name: 'Length (bits)',
            value: curveType.length
          });
        }
        else
        {
          renderEntries.push({
            name: 'Curve OID',
            value: curveOID
          });
        }

        renderEntries.push({
          name: 'Private Key',
          value: this.#formatBN(new BN(keyObj['privateKey']))
        });
      }
      else if(keyObj['type'] === 'ec') // Seems like EC with only public key.
      {
        renderEntries[0].value = 'EC Public Key';

        let dat = keyObj['data'];

        let curveOID = dat['algorithm']['curve'].join('.');
        let curveType = OutputPanel.#ec_curves.get(curveOID);
        if(curveType)
        {
          renderEntries.push({
            name: 'Curve Name',
            value: curveType.name
          }, {
            name: 'Length (bits)',
            value: curveType.length
          });

          let pubKeyBuf = dat['subjectPublicKey']['data'];
          let coords = OutputPanel.#parseCoords(pubKeyBuf, curveType.length);
          if(coords)
          {
            renderEntries.push({
              name: 'Public X',
              value: this.#formatBN(coords['x'])
            });

            if(coords['y'])
            {
              renderEntries.push({
                name: 'Public Y',
                value: this.#formatBN(coords['y'])
              });
            }
          }
          else
          {
            renderEntries.push({
              name: 'Public Key',
              value: this.#formatBN(new BN(pubKeyBuf))
            });
          }
        }
        else
        {
          renderEntries.push({
            name: 'Curve OID',
            value: curveOID
          }, {
            name: 'Public Key',
            value: this.#formatBN(new BN(pubKeyBuf))
          });
        }
      }
      else // Error, invalid key type
      {
        renderEntries['error'] = 1;
      }
    }
    else // Error
    {
      renderEntries['error'] = -1;
    }

    this.setState({
      renderEntries: renderEntries
    });
  }

  static #assemble(entries)
  {
    if(!entries)
    {
      return '';
    }

    if(entries.error)
    {
      let msg;
      switch(entries.error)
      {
        case -1:
        {
          msg = 'Invalid input format or password!';
          break;
        }
        case 1:
        {
          msg = 'Invalid key type!';
          break;
        }
        default:
        {
          msg = 'Unknown error! Please open an issue!';
          break;
        }
      }
      return (<a className='error-msg'>{msg}</a>);
    }

    let ret = [];
    for(let i = 0 ; i < entries.length ; i++)
    {
      ret.push(
        <tr className={`output-row-${i & 1}`}>
          <td className='center output-name output-entry'>{entries[i].name}</td>
          <td className='output-value output-entry'>{entries[i].value}</td>
        </tr>
      );
    }

    return (
      <table className='output-table'>
        <tr className='output-header'>
          <th className='output-entry output-header'>Tag</th>
          <th className='output-entry output-header'>Value</th>
        </tr>
        {ret}
      </table>
    );
  }

  render()
  {
    let ret = [
      <div className='tool-item center bottom-padded-mid fix-left'>
        <a>Format: </a>
        <select onChange={this.#selectFormat}>
          <option value='dec'>Decimal</option>
          <option value='hex' selected>Hexadecimal</option>
          <option value='base64'>Base64</option>
        </select>
      </div>,
      <div className='center output-table tool-item'>
        {OutputPanel.#assemble(this.state.renderEntries)}
      </div>
    ];
    return ret;
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
    let color = 0x2F;
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
      color -= 0x4;
    }

    return (
      <div className='footer'>
        <table className='footer-table'>
          <tr>
            <td className='footer-panel footer-left'>
              <b>Credits</b><br/>
              <a href='https://reactjs.org'>React</a><br/>
              <a href='https://www.npmjs.com/package/parse-asn1'>Parse-ASN1</a><br/>
              <a href='https://browserify.org'>Browserify</a><br/>
              <a>... and many more underlying libraries!</a><br/>
            </td>
            <td className='footer-panel footer-right'>
              Copyright (c) 2022, <a class='tangent'>Tangent</a><a class='_0x10000'>65536</a>.<br/>
              All rights reserved.<br/><br/>
              <a href='/'>Home Page</a>
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
  <Tools />,
  <Footer />
], document.getElementById('root'));
document.title = 'ASN1 PEM Key Tool';
