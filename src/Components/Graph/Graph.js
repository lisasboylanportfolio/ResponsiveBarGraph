import React, { Component } from 'react';
import './Graph.css';

import Bar from '../Bar/Bar.js'

class Graph extends Component {

  // Input Properties: 
  //      index: every element should have a key  
  //      title: text displayed in a rectangle/bar
  //      symbol: a symbol representation of the text
  //      style: inline HTML style
  // Output: A graph with vertical bars displayed within

  render() 
  {
    console.log("In Graph:render()");
    console.log("children=", this.props.children);
    console.log("props=", this.props);
    return (
      <div className="Graph">
        {
            this.props.bars.map((bar, index) => (
              <Bar
              key={index}
              title={bar[0]} 
              symbol= "$"
              style={bar[1]}
              className={`Graph-data${index}`}
              />
            ))      

        }
      </div>
    );
  }
}

export default Graph;




