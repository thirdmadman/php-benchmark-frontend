import React, { Component } from 'react';
import { IBenchmarkRecordsByVersion } from '../../interfaces/IBenchmarkRecordsByVersion';
import { BenchmarkRecordService } from '../../services/BenchmarkRecordService';
import BenchmarkRecordCard from '../BenchmarkRecordCard';
import Graph from '../Graph';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';
import { PopupsAndBanners } from '../PopupsAndBanners';

export default class MainPage extends Component {
  state = {
    cards: {
      array: [
        {
          benchmark_version: 0,
          calculation_total: 0,
          id: '0',
          ifelse: 0,
          loops: 0,
          math: 0,
          php_version: 0,
          platform: '0',
          server_addr: '0',
          server_name: '0',
          string: '0',
          timestamp: '0',
          total: 0,
          xdebug: 0,
        },
      ],
      isLoading: true,
    },
    rowData: [
      {
        data: [
          {
            benchmark_version: 0.1,
            calculation_total: 0,
            id: '0',
            ifelse: 0,
            loops: 0,
            math: 0,
            php_version: 0,
            platform: '0',
            server_addr: '0',
            server_name: '0',
            string: '0',
            timestamp: '0',
            total: 0,
            xdebug: 0,
          },
        ],
        phpversion: '0.0',
      },
    ] as Array<IBenchmarkRecordsByVersion>,
    graphData: {
      graphs: [
        {
          x: [1, 2, 3, 2],
          y: [2, 6, 3, 6],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
      ] as Array<Plotly.Data>,
      isLoading: true,
    },
  };

  filterFunction = (arrayX: Array<number>) => {
    const newData = [];
    newData.push(arrayX[0]);
    for (let i = 1; i < arrayX.length - 2; i++) {
      const mean = (arrayX[i] * 1.0 + arrayX[i - 1] * 1.0 + arrayX[i + 1] * 1.0) / 3.0;
      newData.push(mean);
    }
    newData.push(arrayX[arrayX.length - 1]);

    return newData;
  };

  simpleFilter = (graphData: Array<Plotly.PlotData>) => {
    const filtredData = graphData.map((element) => ({
      name: element.name,
      x: [...(element.x as Array<string>)],
      y: this.filterFunction([...(element.y as Array<number>)]),
      type: 'scatter',
      line: {
        shape: 'spline',
      },
    }));

    return filtredData as Array<Plotly.Data>;
  };

  componentDidMount() {
    BenchmarkRecordService.getBenchmarkRecordLast()
      .then((res) => {
        this.setState({
          cards: { array: res, isLoading: false },
        });
      })
      .catch(() => {});

    BenchmarkRecordService.getCurrentPhpVersions()
      .then((data) =>
        Promise.allSettled(
          data.map((phpVersion) => BenchmarkRecordService.getBenchmarkRecordsByPhpVersion(phpVersion, 500)),
        ),
      )
      .then((recordsByVersion) => {
        this.setState({ rowData: recordsByVersion });

        const rowData = recordsByVersion.map((recordByVersion) => {
          if (recordByVersion.status === 'fulfilled') {
            return recordByVersion.value;
          }

          return null;
        });

        const graphData = rowData.map((record) => {
          if (record) {
            const xPoints = record.data.map((pointData) => pointData.timestamp);
            const yPoints = record.data.map((pointData) => pointData.total);

            return {
              x: xPoints,
              y: yPoints,
              type: 'scatter',
              mode: 'lines+markers',
              name: record.phpversion,
            } as Plotly.Data;
          }
        });

        this.setState({
          graphData: { graphs: graphData, isLoading: false },
        });
      })
      .catch(() => {});
  }

  render() {
    const renderCards = () => {
      if (this.state.cards.isLoading) {
        return [1, 2, 3].map((el) => (
          <BenchmarkRecordCard key={el} benchmarkRecord={this.state.cards.array[0]} isLoading={true} />
        ));
      } else {
        return this.state.cards.array.map((card) => (
          <BenchmarkRecordCard key={card.id} benchmarkRecord={card} isLoading={false} />
        ));
      }
    };

    return (
      <div className="container">
        <PageHeader title={'Statistic'} />
        <PopupsAndBanners />
        <div className="display-4 my-3 text-center">Graph</div>
        <Graph
          graphData={this.simpleFilter(this.state.graphData.graphs as Array<Plotly.PlotData>)}
          isLoading={this.state.graphData.isLoading}
          title={'Bench results'}
        />
        <div className="display-4 my-3 text-center">Last results</div>
        <div className="cards-container text-center">{renderCards()}</div>
        <PageFooter />
      </div>
    );
  }
}
