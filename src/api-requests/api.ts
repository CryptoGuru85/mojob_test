import { AxiosStatic } from 'axios';
import { IPage, PositionFunction, JobListing,JobListingFilter } from '@/models/models';

export default class BaseApi {
  public axios!: AxiosStatic;
  protected baseUrl: string;

  constructor(url: string, axios: AxiosStatic) {
    this.baseUrl = url;
    this.axios = axios;
  }

  public getPositionFunctions = (pageSize:any): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?page_size=${pageSize}`)
      .then((response) => response.data);

  public getJobListingFunctions = (filterValue:JobListingFilter): Promise<IPage<JobListing>> =>
    this.axios
      .get(`${this.baseUrl}job/listings/?page_size=${filterValue.page_size}&use_pagination=True&position_functions=${filterValue.position_function}`)
      .then((response) => response.data);

  /**
   * TIP: Create a function called getJobListings
   * Use our public api documentation to find out what endpoint to use
   * https://test-api.mojob.io/public/docs/
   */
}
