import React from 'react';
import { Component } from 'react';
import * as Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

interface GraphProp {
  graphData: Array<Plotly.Data>;
  title: string;
}

export default class Graph extends Component<GraphProp> {
  render() {
    return (
      <Plot
        data={this.props.graphData}
        layout={{ title: this.props.title }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}
