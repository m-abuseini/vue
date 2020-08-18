<script lang="ts">
import { Bar, mixins } from 'vue-chartjs-typescript'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ChartsApi } from '../services/ChartService';
import { mapState } from 'vuex';

@Component({
    extends: Bar,
    mixins: [mixins.reactiveProp],
    computed: mapState(['currentPriority'])
})
export default class BarChart extends Vue {
    @Prop() private chartData!: any;
    @Prop() private elementData!: any;
    private options: any = {};
    @Watch('currentPriority') 
    onCurrentPriorityChanged(current: number, old: number) {
        if (this.elementData.priority === current) {
            this.options.title = {
                display: this.elementData.title ? true : false,
                text: this.elementData.title
            };
            if (this.elementData.options) {
                this.options = { ...this.options, ...this.elementData.options};
            }
            this.options.responsive = true;
            this.options.maintainAspectRatio = false;
            if (this.chartData && typeof this.chartData === 'object') {
                this.renderChart(this.chartData, this.options);
                this.$store.dispatch('componentLoaded');
            } else if (this.chartData && typeof this.chartData === 'string') {
                this.getChartData();
            }
        }
    }

  public renderChart!: (chartData: any, options?: any) => void

  private async getChartData(): Promise<any> {
    const fetchedData = await ChartsApi.getChartData(this.chartData);
    this.renderChart(fetchedData, this.options);
    this.$store.dispatch('componentLoaded');
  }
}
</script>