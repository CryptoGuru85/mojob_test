<template>
  <div>
    <div v-for="(model, index) in positionFunctions" :key="index">
      <div class="item" @click="toggle(index)">
        <input type="checkbox" id="positionName" name="positionName">
        <label for="positionName">{{ model.name }}</label><br>
      </div>
      <div v-show="isOpen[index]" v-if="isFolder" >
        <div class="sub-item"  v-for="(model, index) in model.children" :key="index">
          <input type="checkbox" id="child" name="child" :value="model.id" v-model="filterValue">
          <label for="child">{{ model.name }}</label><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { PositionFunction } from '@/models/models';

@Component
export default class Tree extends Vue {
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  positionFunctions!: PositionFunction[];
  isOpen: boolean[] = new Array(100).fill(false);;
  filterValue: string [] = []
  index: number | null | undefined = null;
  set isFolder(index:number | null | undefined) {
    this.index = index
  }
  get isFolder(): number | null | undefined {
    if(this.index == null) {
      return 0
    } else {
      return this.positionFunctions[this.index].children && this.positionFunctions[this.index].children?.length
    }
  }
  toggle(index: number) {
    this.isFolder = index
    if (this.isFolder) {
      this.isOpen[index] = !this.isOpen[index]
    }
  }
  @Watch('filterValue')
  onPropertyChanged(value: string[]) {
    this.$emit("positionFilter", value.toString())
  }
}
</script>
