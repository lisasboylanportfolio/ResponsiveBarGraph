import React, { Component } from 'react';
import './App.css';

import Graph      from './Components/Graph/Graph.js';
import BaseValue from './Components/BaseValue/BaseValue.js';

function buildBar(rates)
{
    // rates is an arraay of objects
    // the objects are {countryCode:rate}
    // we want [countryCode:style]
    console.log("In Apps.buildBar()");
        
    const bars = Object.entries(rates);
    
    bars.forEach(entry => {
          console.log("entry=", entry[1]);
          const value = entry[1];
          
         // format value to be x.xx
         const formatValue = parseFloat(value).toFixed(2) * 30;
         const style = {"height" :  formatValue + '%'}; // format the JSX style height attribute          
         entry[1]=style;
         console.log("key-", entry[1]);
    });
    console.log("buildBars.bars=", bars);
    return (bars);
}


function getFetchUrl(baseCode)
{
    // Remove new base from comparator
    console.log("In App.getFetchUrl(()");
    
    // Currently displayed currencies;
    let symbols = ["BGN", "SGD", "AUD", "EUR", "USD"];
    let comparator = "BGN,SGD,AUD,EUR,USD";
    
    // Get the requested base currency
    console.log("App.getFetchUrl().baseCode:", baseCode);
        
    // find the code in symbols
    let i = 0;    
    while ((symbols[i++].valueOf() !== baseCode) && ( i < symbols.length))  {/*do nothing*/} 
    
    i--;  // reposition counter to new baseCode
    if (symbols[i] === baseCode)
    {
        comparator = symbols.splice(i,1);  // remove element
    }
    console.log("App.getFetchUrl().symbols:", comparator);
    
    let fetchString='https://api.exchangeratesapi.io/2018-11-01?base=' + baseCode + "&symbols=" + symbols;
    console.log("App.getFetchUrl().fetchString=", fetchString);
    return(fetchString);
}

class App extends Component 
{

  state = {
    baseCode:"",
    bars:[],
  }


  // Add data during initial page load. Kind of like constructor
  componentDidMount = () => {
    console.log("App.componentDidMount.state:", this.state);
    const url = "https://api.exchangeratesapi.io/latest?base=USD&symbols=BGN,GBP,AUD,EUR"
    this.getData(url, "USD");
  }

  render() 
  {
    console.log("App.render()");

    return (
      <div>
        <h1 className="Title"> Currency Comparator</h1>
          <BaseValue
              basecode={this.state.baseCode}
              onBaseCodeChange = {this.onBaseCodeChange.bind(this)}
          />
          <Graph 
                className="Graph"
                bars={this.state.bars}        
           />
      </div>
    );
  }
 
  onBaseCodeChange=(ev) =>{
     console.log("In onBaseCodeChange");
     console.log("ev=", ev);
      const code = ev.target.value;
      const url =  getFetchUrl(code);
   
      // Make request
    this.getData(url, code);
  }
   //onBaseCodeChange (ev)
   //{
   //   console.log("In App.onBaseCodeChange()");    
   //   const code = ev.target.value;
   //   const url =  getFetchUrl(code);
   //
      // Make request
   //   this.getData(url, code);
  //} 

  getData(url,code)
  { 
    console.log("In App.GetData()");
  
     fetch(url)
     .then(response => response.json())
     .then ( (data) => {
           console.log("Got Data");
           console.log("Data=", data);
           console.log("Rates=", data.rates);
           const results = buildBar(data.rates);
           console.log("results=", results);
           this.setState({
              bars:results,
              baseCode:code,
           });
       });
  } 
}

export default App;
