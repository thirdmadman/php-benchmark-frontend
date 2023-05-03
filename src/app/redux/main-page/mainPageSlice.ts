import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import IMainPageState from '../../interfaces/IMainPageState';
import { BenchmarkRecordService } from '../../services/BenchmarkRecordService';
import { LocalStorageProvider } from '../../services/LocalStorageProvider';
import type { RootState } from '../store';

const initialState: IMainPageState = {
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

export const loadGraphData = createAsyncThunk('mainPage/loadGraphData', async () => {
  if (!LocalStorageProvider.getData()?.authData) {
    return null;
  }

  const cardsArray = await BenchmarkRecordService.getBenchmarkRecordLast()
    .then((res) => res)
    .catch(() => {});

  const getAllPhpRawData = (data: Array<string>) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    Promise.allSettled(
      data.map((phpVersion) => BenchmarkRecordService.getBenchmarkRecordsByPhpVersion(phpVersion, 500)),
    );

  const loadedGraphData = await BenchmarkRecordService.getCurrentPhpVersions()
    .then(getAllPhpRawData)
    .then((recordsByVersion) => {
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

      return graphData;
    })
    .catch(() => {});
  if (!cardsArray || !loadedGraphData) {
    return null;
  }

  return { cardsArray, loadedGraphData };
});

export const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    handleMount: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(loadGraphData.fulfilled, (state, action) => {
      if (action.payload?.cardsArray) {
        state.cards = { array: action.payload.cardsArray, isLoading: false };
      }
      if (action.payload?.loadedGraphData) {
        state.graphData = { graphs: action.payload.loadedGraphData, isLoading: false };
      }
    });
  },
});

export const { handleMount } = mainPageSlice.actions;

export const selectMainPage = (state: RootState) => state.mainPage;

export default mainPageSlice.reducer;
