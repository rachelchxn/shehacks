import React, { Component } from 'react'
import QrReader from 'react-web-qr-reader'

class Test extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    console.log("hi")
    if (data){
      console.log("data is a thing")
      this.setState({
        result: JSON.stringify(data.data)
      })
    }
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {  
      height: 250,
      width: 250,
  
    }
    return(
      <div>
        <p>The result is: {this.state.result}</p>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
      </div>
      )
  }
}

export default Test
