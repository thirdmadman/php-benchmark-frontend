import { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import * as Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import { IBenchmarkRecord } from '../interfaces/IBenchmarkRecord';

const Plot = createPlotlyComponent(Plotly);

interface BenchmarkRecordProp {
  benchmarkRecord: IBenchmarkRecord;
  isLoading: boolean;
}

export default class BenchmarkRecordCard extends Component<BenchmarkRecordProp> {
  render() {
    const { benchmarkRecord, isLoading } = this.props;

    const cutDate = (dateString: string) => {
      const date = dateString.split(' ')[0].split('-');
      const time = dateString.split(' ')[1].split(':');
      return `${date[1]}.${date[2]} ${time[0]}:${time[1]}`;
    };

    const data = [
      {
        values: [benchmarkRecord.math, benchmarkRecord.string, benchmarkRecord.loops, benchmarkRecord.ifelse],
        labels: ['math', 'string', 'loops', 'ifelse'],
        type: 'pie',
        hole: 0.6,
        textposition: 'inside',
      },
    ] as Array<Plotly.Data>;

    const layout = {
      showlegend: false,
      width: 280,
      height: 280,
      margin: {
        t: 20,
        b: 20,
        l: 20,
        r: 20,
      },
    } as Plotly.Layout;

    return (
      <div className="card d-inline-block align-items-center m-2" style={{ width: '18rem' }}>
        {isLoading ? (
          <Skeleton width="100%" height="12rem" />
        ) : (
          <Plot data={data} layout={layout} useResizeHandler style={{ width: '100%', height: '100%' }} />
        )}
        <div className="card-body ">
          <h5 className="card-title d-flex justify-content-between">
            PHP <span>{isLoading ? <Skeleton width="4rem" /> : benchmarkRecord.php_version}</span>
          </h5>
          <h6 className="card-subtitle mb-3 text-muted d-flex justify-content-between">
            tested
            <span className="text-end">
              {isLoading ? <Skeleton width="4rem" /> : cutDate(benchmarkRecord.timestamp)}
            </span>
          </h6>
          <div className="card-text d-flex justify-content-between">
            math <span>{isLoading ? <Skeleton width="4rem" /> : benchmarkRecord.math}</span>
          </div>
          <div className="card-text d-flex justify-content-between">
            string <span>{isLoading ? <Skeleton width="4rem" /> : benchmarkRecord.string}</span>
          </div>
          <div className="card-text d-flex justify-content-between">
            loops <span>{isLoading ? <Skeleton width="4rem" /> : benchmarkRecord.loops}</span>
          </div>
          <div className="card-text d-flex justify-content-between">
            ifelse <span>{isLoading ? <Skeleton width="4rem" /> : benchmarkRecord.ifelse}</span>
          </div>
          <div className="card-text fw-bold d-flex justify-content-between pt-1 mb-2">
            total <span>{isLoading ? <Skeleton width="4rem" /> : benchmarkRecord.total}</span>
          </div>
          <a href="/" className="card-link">
            {isLoading ? <Skeleton width="4rem" /> : 'View graphs'}
          </a>
        </div>
      </div>
    );
  }
}
