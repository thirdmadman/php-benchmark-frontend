import { IBenchmarkRecord } from '../interfaces/IBenchmarkRecord';
import { IBenchmarkRecordsByVersion } from '../interfaces/IBenchmarkRecordsByVersion';
import { axiosInstance } from './axiosInstance';

export class BenchmarkRecordService {
  static getBenchmarkRecordLast() {
    return axiosInstance()
      .get('/', {
        params: {
          route: 'last_data',
        },
      })
      .then((res) => res.data as Array<IBenchmarkRecord>);
  }

  static getCurrentPhpVersions() {
    return axiosInstance()
      .get('/', {
        params: {
          route: 'current_php_versions',
        },
      })
      .then((res) => res.data as Array<string>);
  }

  static getBenchmarkRecordsByPhpVersion(version: string, limit: number) {
    return axiosInstance()
      .get('/', {
        params: {
          route: 'data_by_php_version',
          version,
          limit,
        },
      })
      .then((res) => res.data as IBenchmarkRecordsByVersion);
  }
}
