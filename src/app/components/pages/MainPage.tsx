import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import BenchmarkRecordCard from '../BenchmarkRecordCard';
import Graph from '../Graph';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';
import { PopupsAndBanners } from '../PopupsAndBanners';
import IMainPageState from '../../interfaces/IMainPageState';
import { loadGraphData } from '../../redux/main-page/mainPageSlice';
import { RootState } from '../../redux/store';

const mapStateToProps = (state: RootState) => ({
  ...state.mainPage,
});

const mapDispatchToProps = {
  loadGraphDataAction: loadGraphData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

class MainPage extends Component<Props, IMainPageState> {
  async componentDidMount() {
    const { loadGraphDataAction } = this.props;
    try {
      await loadGraphDataAction();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { cards, graphData } = this.props;
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
        <PageHeader />
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

export default connector(MainPage);
