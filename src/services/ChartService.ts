import axios from 'axios';

export abstract class ChartsApi {
    private static chartAxios = axios.create();
  
    static async getChartData(url: string): Promise<any>{
      const response = await this.chartAxios.get(url);
      return response.data;
    }
  }