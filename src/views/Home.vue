<template>
  <div class="home">
    <job-feed
      :loading="loading"
      :job-listings="jobList"
      :position-functions="positionFunctionFilters"
      @pageRange="getPageRange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import JobFeed from '@/components/JobFeed.vue';
import BaseApi from '@/api-requests/api';
import { IPage, PositionFunction, JobListing, JobListingFilter } from '@/models/models';

@Component({
  components: {
    JobFeed,
  },
})
export default class Home extends Vue {
  private mojobApi: BaseApi | null = null;
  positionFunctionFilters: PositionFunction[] = [];
  loading: Boolean = true;
  jobList: any = [];
  async getPageRange(filterValue:JobListingFilter) {
    this.mojobApi = new BaseApi(
      'https://test-api.mojob.io/public/',
      this.axios
    );
    this.loading = false
    const jobListResponse: IPage<JobListing> = 
        await this.mojobApi.getJobListingFunctions({page_size: filterValue.page_size,  position_function: filterValue.position_function});
    this.loading = true
    this.jobList = jobListResponse.results
  }


  /**
   * Here you can do necessary request to our
   * public test-API in order to retrieve a list of job listings and a list of
   * position function filters.
   *
   * You can test the endpoints and see the documentation at:
   * https://test-api.mojob.io/public/docs/
   *
   * @private
   */
  private async mounted() {
    // Here is an example on how to retrieve job position function filters
    this.mojobApi = new BaseApi(
      'https://test-api.mojob.io/public/',
      this.axios
    );
    try {
      this.loading = false
      const jobLocationFiltersResponsePage: IPage<PositionFunction> =
        await this.mojobApi.getPositionFunctions(100);
      const jobListResponse: IPage<JobListing> =
        await this.mojobApi.getJobListingFunctions({page_size: 5,  position_function: ''});
      this.loading = true
      if (jobLocationFiltersResponsePage.results && jobListResponse.results) {
        this.jobList = jobListResponse.results;
        this.positionFunctionFilters = jobLocationFiltersResponsePage.results;
      } else {
        console.log('Failed API response');
      }
    } catch (e) {
      console.log('Failed API response');
      console.log(e);
    }
  }
}
</script>