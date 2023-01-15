import React, { Component } from 'react'
import QrReader from 'react-web-qr-reader'
import { withRouter} from "react-router-dom"
class Test extends Component {

  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      result: 'No result',
      link:"add-user/"
    }

    this.handleScan = this.handleScan.bind(this)
  }

  handleScan(data){
    console.log("hi")

    if (data){
      console.log("running");
      var data2 = JSON.stringify(data.data);
      this.setState({
        result: data2.replace(/\"/g,"")
      })
      }
    }
  
  handleError(err){
    console.error(err)
  }

  handleClick = () => {
    console.log("waht", this.props.history)

  }
  
  render(){
    const previewStyle = {  
      height: 250,
      width: 250,
    }
    
    return(
      <div>
      <div>
        <p>The result is: {this.state.result}</p>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
      </div>
      <div>
        {this.state.result !== 'No result' &&
      <a href={`${this.state.link}${this.state.result}`}>
        <button>Click Me</button>
      </a>
  }
      </div>
      </div>
      )
  }
}


export default Test
