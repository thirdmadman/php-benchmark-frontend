import { Component } from 'react';
import { IBenchmarkRecord } from '../../interfaces/IBenchmarkRecord';
// import { IBenchmarkRecordsByVersion } from '../../interfaces/IBenchmarkRecordsByVersion';
import { BenchmarkRecordService } from '../../services/BenchmarkRecordService';
import BenchmarkRecordCard from '../BenchmarkRecordCard';
import Graph from '../Graph';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';
import { PopupsAndBanners } from '../PopupsAndBanners';

type MainPageState = {
  cards: {
    array: Array<IBenchmarkRecord>;
    isLoading: boolean;
  };
  // rowData: Array<IBenchmarkRecordsByVersion>;
  graphData: {
    graphs: Array<Plotly.Data>;
    isLoading: boolean;
  };
};
// eslint-disable-next-line @typescript-eslint/ban-types
export default class MainPage extends Component<{}, MainPageState> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(props: {}) {
    super(props);
    this.state = {
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
      // rowData: [
      //   {
      //     data: [
      //       {
      //         benchmark_version: 0.1,
      //         calculation_total: 0,
      //         id: '0',
      //         ifelse: 0,
      //         loops: 0,
      //         math: 0,
      //         php_version: 0,
      //         platform: '0',
      //         server_addr: '0',
      //         server_name: '0',
      //         string: '0',
      //         timestamp: '0',
      //         total: 0,
      //         xdebug: 0,
      //       },
      //     ],
      //     phpversion: '0.0',
      //   },
      // ] as Array<IBenchmarkRecordsByVersion>,
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
  }

  componentDidMount() {
    BenchmarkRecordService.getBenchmarkRecordLast()
      .then((res) => {
        this.setState({
          cards: { array: res, isLoading: false },
        });
      })
      .catch(() => {});

    const getAllPhpRawData = (data: Array<string>) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      Promise.allSettled(
        data.map((phpVersion) => BenchmarkRecordService.getBenchmarkRecordsByPhpVersion(phpVersion, 500)),
      );

    BenchmarkRecordService.getCurrentPhpVersions()
      .then(getAllPhpRawData)
      .then((recordsByVersion) => {
        // this.setState({ rowData: recordsByVersion });

        const rowData = recordsByVersion.map((recordByVersion) => {
          if (recordByVersion.status === 'fulfilled') {
            return recordByVersion.value;
          }

          return null;
        });

        const graphData = rowData
          .map((record) => {
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
            return null;
          })
          .filter((el) => el !== null) as Array<Plotly.Data>;

        this.setState({
          graphData: { graphs: graphData, isLoading: false },
        });
      })
      .catch(() => {});
  }

  render() {
    const { cards, graphData } = this.state;
    const { graphs, isLoading } = graphData;

    const renderCards = () => {
      const { array } = cards;
      const isLoadingCard = cards.isLoading;

      if (isLoadingCard && array) {
        return [1, 2, 3].map((el) => <BenchmarkRecordCard key={el} benchmarkRecord={array[0]} isLoading />);
      }
      return array.map((card) => <BenchmarkRecordCard key={card.id} benchmarkRecord={card} isLoading={false} />);
    };

    const simpleFilter = (inputGraphData: Array<Plotly.PlotData>) => {
      const filterFunction = (arrayX: Array<number>) => {
        const newData = [];
        newData.push(arrayX[0]);
        for (let i = 1; i < arrayX.length - 2; i++) {
          const mean = (arrayX[i] * 1.0 + arrayX[i - 1] * 1.0 + arrayX[i + 1] * 1.0) / 3.0;
          newData.push(mean);
        }
        newData.push(arrayX[arrayX.length - 1]);

        return newData;
      };

      const filteredData = inputGraphData.map((element) => ({
        name: element.name,
        x: [...(element.x as Array<string>)],
        y: filterFunction([...(element.y as Array<number>)]),
        type: 'scatter',
        line: {
          shape: 'spline',
        },
      }));

      return filteredData as Array<Plotly.Data>;
    };

    return (
      <div className="container">
        <PageHeader title="Statistic" />
        <PopupsAndBanners />
        <div className="display-4 my-3 text-center">Graph</div>
        <Graph graphData={simpleFilter(graphs as Array<Plotly.PlotData>)} isLoading={isLoading} title="Bench results" />
        <div className="display-4 my-3 text-center">Last results</div>
        <div className="cards-container text-center">{renderCards()}</div>
        <PageFooter />
      </div>
    );
  }
}
