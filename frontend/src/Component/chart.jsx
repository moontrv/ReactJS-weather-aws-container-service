//import _ from 'lodash';
import React from 'react';
//import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { Bar } from 'react-chartjs-2';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    }
  }

  //   componentWillMount(){
  //   this.getChartData();
  // }


  async defaultProps() {
    displayTitle: true;
    displayLegend: true;
    legendPosition: 'right';
    location: { this.props.city };
  }

  render() {
    return (
      <div className="chart">
        <p className="chart-p">Chart with times and temperature</p>
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: this.props.location,
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />

      </div>
    )
  }
}

export default Chart;
