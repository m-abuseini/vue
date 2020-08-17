<script lang="ts">
import { Bubble, mixins } from 'vue-chartjs-typescript'
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ChartsApi } from '../services/ChartService';

@Component({
    extends: Bubble,
    mixins: [mixins.reactiveProp],
})
export default class BubbleChart extends Vue {
    @Prop() private chartData: any;
    @Prop() private elementData: any;
    private options: any = {};
    private priority!: number;

  mounted() {
    this.priority = this.$store.getters.getCurrentPriority;
    console.log('checking priority within bubble chart');
    console.log(this.priority);
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
    } else if (this.chartData && typeof this.chartData === 'string') {
        this.getChartData();
    }
  }

  public renderChart!: (chartData: any, options?: any) => void

  private async getChartData(): Promise<any> {
    const fetchedData = await ChartsApi.getChartData(this.chartData);
    this.renderChart(fetchedData, this.options);
  }
}
</script>