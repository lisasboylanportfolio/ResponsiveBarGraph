import React, { Component } from 'react';
import './BaseValue.css';

class BaseValue extends Component 
{

  render()
  {
        console.log("In BasaeValue:render()");
        console.log("children=", this.props.children);
        console.log("props=", this.props);
        return (
          <div>
            <h2 className="BaseValue">Base Currency:</h2>
            <select
              basecode={this.props.baseCode} 
              className="BaseCode" 
              onChange={this.props.onBaseCodeChange}>
              
              <option value="USD">USD</option>
              <option value="AUD">AUD</option>
              <option value="SGD">SGD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        )
   }
}
export default BaseValue
