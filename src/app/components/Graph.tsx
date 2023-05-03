import { Component } from 'react';
import * as Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import IGraphProp from '../interfaces/IGraphProp';

const Plot = createPlotlyComponent(Plotly);

export default class Graph extends Component<IGraphProp> {
  render() {
    const { isLoading, graphData, title } = this.props;

    return isLoading ? (
      <Skeleton width="100%" height="50vh" />
    ) : (
      <Plot
        data={graphData}
        layout={{ title, legend: { orientation: 'h' } }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}
