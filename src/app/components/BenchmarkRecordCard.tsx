import React, { Component } from 'react';
import { IBenchmarkRecord } from '../interfaces/IBenchmarkRecord';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface BenchmarkRecordProp {
  benchmarkRecord: IBenchmarkRecord;
  isLoading: boolean;
}

export default class BenchmarkRecordCard extends Component<BenchmarkRecordProp> {
  render() {
    const benchmarkRecord = this.props.benchmarkRecord;
    const isLoading = this.props.isLoading;
    return (
      <div className="card d-inline-block align-items-center m-2" style={{ width: '12rem' }}>
        <div className="card-body ">
          <h5 className="card-title d-flex justify-content-between">
            PHP ver <span>{isLoading ? <Skeleton width={'4rem'} /> : benchmarkRecord.php_version}</span>
          </h5>
          <h6 className="card-subtitle mb-2 text-muted d-flex justify-content-between">
            Tested at
            <span className="text-end">{isLoading ? <Skeleton width={'4rem'} /> : benchmarkRecord.timestamp}</span>
          </h6>
          <p className="card-text d-flex justify-content-between">
            math <span>{isLoading ? <Skeleton width={'4rem'} /> : benchmarkRecord.math}</span>
          </p>
          <p className="card-text d-flex justify-content-between">
            string <span>{isLoading ? <Skeleton width={'4rem'} /> : benchmarkRecord.string}</span>
          </p>
          <p className="card-text d-flex justify-content-between">
            loops <span>{isLoading ? <Skeleton width={'4rem'} /> : benchmarkRecord.loops}</span>
          </p>
          <p className="card-text d-flex justify-content-between">
            ifelse <span>{isLoading ? <Skeleton width={'4rem'} /> : benchmarkRecord.ifelse}</span>
          </p>
          <p className="card-text fw-bold d-flex justify-content-between">
            total <span>{isLoading ? <Skeleton width={'4rem'} /> : benchmarkRecord.total}</span>
          </p>
          <a href="" className="card-link">
            {isLoading ? <Skeleton width={'4rem'} /> : 'View graphs'}
          </a>
        </div>
      </div>
    );
  }
}
