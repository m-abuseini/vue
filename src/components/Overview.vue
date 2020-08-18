<template >
  <div class="overview" v-if="!loading">
    <h4>
      {{elementData.title}} 
      <span>
        ({{data.headerPercentage}})
      </span>
    </h4>
    <p class="body">
      {{data.bodyContent}}
    </p>
    <p class="overviewFooter">
      {{data.footer}}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState(['currentPriority'])
})
export default class Overview extends Vue {
  @Prop() private msg!: string;
  @Prop() private data: any;
  @Prop() private elementData: any;
  public loading = true;
  @Watch('currentPriority') 
    onCurrentPriorityChanged(current: number, old: number) {
        if (this.elementData.priority === current) {
            this.loading = false;
            this.$store.dispatch('componentLoaded');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.overview{width: 100%;position: relative;}
.overview h4{ font-weight: bold;border-bottom: 1px solid #CCC;font-size: 1.3em;padding: 10px 0 15px;text-align: left;margin: 0;}
.overview h4 span{font-weight: normal;font-size: 0.7em;}
.overview p.body{font-size: 1.2em;margin: 1em 1em 1.6em;}
.overview p.overviewFooter{font-size: 0.9em;text-align: left;margin: 0;}
</style>
