import { Component } from 'react';
import * as Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Plot = createPlotlyComponent(Plotly);

interface GraphProp {
  graphData: Array<Plotly.Data>;
  title: string;
  isLoading: boolean;
}

export default class Graph extends Component<GraphProp> {
  render() {
    const { isLoading, graphData, title } = this.props;

    return isLoading ? (
      <Skeleton width="100%" height="50vh" />
    ) : (
      <Plot data={graphData} layout={{ title }} useResizeHandler style={{ width: '100%', height: '100%' }} />
    );
  }
}
