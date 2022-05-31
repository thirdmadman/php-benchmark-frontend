import React, { Component } from 'react';
import { IBenchmarkRecord } from '../interfaces/IBenchmarkRecord';

interface BenchmarkRecordProp {
  benchmarkRecord: IBenchmarkRecord;
}

export default class BenchmarkRecordCard extends Component<BenchmarkRecordProp> {
  render() {
    const benchmarkRecord = this.props.benchmarkRecord;
    return (
      <div className="card d-inline-block align-items-center m-2" style={{ width: '12rem' }}>
        <div className="card-body ">
          <h5 className="card-title">PHP ver {benchmarkRecord.php_version}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Tested at {benchmarkRecord.timestamp}</h6>
          <p className="card-text">math {benchmarkRecord.math}</p> <p className="card-text">string 1.671333</p>
          <p className="card-text">loops {benchmarkRecord.loops}</p>{' '}
          <p className="card-text">ifelse {benchmarkRecord.ifelse}</p>
          <p className="card-text fw-bold">total {benchmarkRecord.total}</p>
          <a href="" className="card-link">
            View graphs
          </a>
        </div>
      </div>
    );
  }
}
