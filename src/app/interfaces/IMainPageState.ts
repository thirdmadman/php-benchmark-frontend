import { IBenchmarkRecord } from './IBenchmarkRecord';

export default interface IMainPageState {
  cards: {
    array: Array<IBenchmarkRecord>;
    isLoading: boolean;
  };
  graphData: {
    graphs: Array<Plotly.Data>;
    isLoading: boolean;
  };
}
