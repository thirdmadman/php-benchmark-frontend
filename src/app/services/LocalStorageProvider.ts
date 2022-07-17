import { IConfigs } from '../interfaces/IConfigs';

export class LocalStorageProvider {
  static localStorageItemName = 'benchmark';

  public static setData(data: IConfigs) {
    localStorage.setItem(LocalStorageProvider.localStorageItemName, JSON.stringify(data));
  }

  public static isNotEmpty() {
    const localStorageData = localStorage.getItem(LocalStorageProvider.localStorageItemName);
    return localStorageData && localStorageData[0] === '{';
  }

  public static destroy() {
    localStorage.removeItem(LocalStorageProvider.localStorageItemName);
  }

  public static getData(): IConfigs | null {
    const data = localStorage.getItem(LocalStorageProvider.localStorageItemName);
    let localStorageKeysNumber = 0;
    let dataIConfigs = null;
    if (data) {
      dataIConfigs = JSON.parse(data) as IConfigs;
      localStorageKeysNumber = Object.keys(dataIConfigs).length;
    }

    if (LocalStorageProvider.isNotEmpty()) {
      if (localStorageKeysNumber > 0) {
        return dataIConfigs;
      }
    } else {
      const generatedData = LocalStorageProvider.generateData();
      LocalStorageProvider.setData(generatedData);
      return generatedData;
    }
    return null;
  }

  private static generateData() {
    const configs = {
      isExists: false,
      authData: '',
    };
    return configs as IConfigs;
  }
}
