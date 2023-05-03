import { IBenchmarkRecord } from './IBenchmarkRecord';

export interface IBenchmarkRecordsByVersion {
  data: Array<IBenchmarkRecord>;
  phpversion: string;
}
