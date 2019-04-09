import React, { Component } from 'react';
import "./Bar.css";

class Bar extends Component {
  state= {
    showAlert:false,
  }

       
  render()
  {
    console.log("In Bar.render()");
    console.log("children=", this.props.children);
    console.log("props=", this.props);
 
    return(
        <div className={this.props.className} onClick={this.showAlert} style={this.props.style}>
        {this.props.title}
        </div>      
    )
  }

showAlert=(ev) =>{
  this.showAlert ? alert("You may choose a different Base Currency from the selection box above."): ev.preventDefault();
  this.setState({
       showAlert:true
   });
}

}
export default Bar;


