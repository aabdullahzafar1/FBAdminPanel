import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import '../pages/Pages.css'
import firebase from "firebase/app";
import "firebase/firestore";

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }
  

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
      <div className="chart">
        <Bar
        redraw
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Sales of The Year',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

        <Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Sales of the Week',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

      </div>
    )
  }
}

export default Chart;