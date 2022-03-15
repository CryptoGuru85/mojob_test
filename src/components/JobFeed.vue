<template>
  <div>
    <div class="mojob-logo">
      <img alt="logo" src="../assets/img/mojob.png" />
    </div>
    <div class="job-feed-panel">
      <div class="control-panel">
        <button @click="isEnabled = !isEnabled" class="filter-list" @blur="handleBlur">
          <div>Filter by Position</div>
          <div class="triangle-down"></div>
        </button>
        <div v-show="isEnabled" class="filter-modal" >
          <PositionFilter :positionFunctions="positionFunctions" @positionFilter="filterModal"/>
        </div>
        <div 
          @mouseover="isFilter = true"
          @mouseleave="isFilter = false"
          class="size-select-modal"
        >
          <button class="page-size-btn"> {{ pageSize }} <div class="triangle-down select-arrow"/></button>
          <div 
            v-if="isFilter" 
            @click="isFilter = false"
            class="size-filter"
          >
            <div 
              v-for="(sizeType, index) in sizeArray" 
              @click="pageSize = sizeType" 
              :key="index" 
              class="select-item"
            >
              <div :class="pageSize === sizeType ? 'active-item' : ''">
                {{sizeType}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading">
        <div v-if="!isEmpty">
          <div  v-for="(job, index) in jobListings" :key="index" class="job-feed-item" >
            <div class="position-title">
              {{job.job.title}}
            </div>
            <div class="description-text">
              <div>{{job.job.unit.display_name}}</div>
              <div><span>&#8226;</span>{{job.job.position_function.name_en}}</div>
              <div><span>&#8226;</span>{{job.job.due_date}}</div>
            </div>
          </div>
        </div>
        <div v-if="isEmpty">We couldn’t find a suitable job opportunity for you</div>
      </div>
      <span v-else class="loader"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { JobListing, PositionFunction } from '@/models/models';
import PositionFilter from '@/components/PositionFilter.vue';
@Component({
  components: {
    PositionFilter,
  },
})
export default class JobFeed extends Vue {
  @Prop({ default: () => [], type: Array as () => JobListing[] })
  jobListings!: JobListing[];
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  positionFunctions!: PositionFunction[];
  @Prop(Boolean) 
  loading!: Boolean
  pageSize: string = '5 per page';
  isEnabled: Boolean = false;
  isFilter: Boolean = false;
  sizeArray: string[] = ['5 per page', '25 per page', 'Display all']
  filterModal(value:string) {
     this.$emit('pageRange', {page_size: 100,  position_function: value} );
  }
  handleBlur() {
    setTimeout(() => this.isEnabled = false, 10000);
  }
  get isEmpty() {
    return this.jobListings.length == 0
  }
  @Watch('pageSize')
  onPropertyChanged(value: string) {
    let size;
    if(value == this.sizeArray[0]) { size = 5; } 
    if(value == this.sizeArray[1]) { size = 25; } 
    if(value == this.sizeArray[2]) { size = 100; }
    this.$emit('pageRange', {page_size: size,  position_function: ''} );
  }
}
</script>


