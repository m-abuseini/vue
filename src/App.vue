<template>
  <div id="app">
    
    <section class="grid-container">
      <header class="header"></header>
      <main v-if="elements" v-bind="options" class="main">
        <HelloWorld msg="Yousef Sawalha"/>
        <!-- :style="{width: ele.width + 'px', height: ele.height + 'px'}" -->
        <div class="content" v-for="ele in elements" v-bind:key="ele.id"  :class="ele.size" :order="ele.order">
          <!-- :width="ele.width" :height="ele.height" -->
          <BarChart v-if="ele.type === 'bar'" :chartData="ele.data ? ele.data : ele.dataSource" :elementData="ele" ></BarChart>
          <PieChart v-if="ele.type === 'pie'" :chartData="ele.data ? ele.data : ele.dataSource" :elementData="ele"></PieChart>
          <LineChart v-if="ele.type === 'line'" :chartData="ele.data ? ele.data : ele.dataSource" :elementData="ele"></LineChart>
          <RadarChart v-if="ele.type === 'radar'" :chartData="ele.data ? ele.data : ele.dataSource" :elementData="ele"></RadarChart>
          <BubbleChart v-if="ele.type === 'bubble'" :chartData="ele.data ? ele.data : ele.dataSource" :elementData="ele"></BubbleChart>
          <Overview v-if="ele.type === 'overview'" :data="ele.data ? ele.data : ele.dataSource" :elementData="ele"></Overview>
        </div>
      </main>
    <div class="clear"></div>
    <footer class="footer"></footer>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import BarChart from './components/BarChart.vue';
import PieChart from './components/PieChart.vue';
import LineChart from './components/LineChart.vue';
import RadarChart from './components/RadarChart.vue';
import BubbleChart from './components/BubbleChart.vue';
import Overview from './components/Overview.vue';
import config from './conf/conf.json';

@Component({
  components: {
    HelloWorld,
    BarChart,
    PieChart,
    LineChart,
    RadarChart,
    BubbleChart,
    Overview
  },
})
export default class App extends Vue {
  private elements: Array<any> = config.elements;
  private options = {
    itemClassName: 'content',
    itemMargin: 10,
  }

  mounted() {
    this.elements.sort((a: any, b: any) => {return a.order - b.order});
  }

}
</script>

<style lang="scss">
html, body{background: #eee;margin: 0;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  margin: 0;
}

.content {
  height: 100%;
  width: 100%;
  // border: 2px solid #42b983;
  border-radius: 5px;
  background: #FFF;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
}

// .mainContentSection{max-width: 1280px;margin: 10px auto;}

.clear{clear: both;}

.grid-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 80px 1fr 80px;
    grid-template-areas:
      "header"
      "main"
      "footer";
    height: 100vh;
  }

  /* Give every child element its grid name */
  .header {
    grid-area: header;
    background-color: #648ca6;
    margin-bottom: 30px;
  }

  .footer {
    grid-area: footer;
    background-color: #648ca6;
    margin-top: 30px;
  }
  .header, .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background-color: #648ca6;
  }

  .main {
    grid-area: main;
    background-color: #eee;
    // margin: 20px;
    // column-count: 1;
    grid-gap: 20px;
    // margin: 20px 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    // grid-auto-flow: dense;
  }

  .main-header {
    display: flex;
    justify-content: space-between;
    background-color: #e3e4e6;
    color: slategray;
    grid-column: span 2;
    grid-row: span 2;
    padding: 0 20px;
  }

  .card{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #fff;
    margin-bottom: 20px;
    -webkit-column-break-inside: avoid;
    padding: 10px;
    box-sizing: border-box;
    grid-column-end: span 1;
    overflow: hidden;
  }

  .card.full{
    grid-column: 1 / -1;
  }
  .card.half{
    grid-column-end: span 2;
  }

  /* Non-mobile styles, 750px breakpoint */
  @media only screen and (min-width: 46.875em) {
    // .grid-container {
    //   grid-template-columns: 240px 1fr; /* Show the side nav for non-mobile screens */
    //   grid-template-areas:
    //     "header"
    //     "main"
    //     "footer";
    // }
    .main{grid-template-columns: repeat(4, 1fr);}
    .main-header{grid-column: span 4;}
  }

  /* Medium-sized screen breakpoint (tablet, 1050px) */
  @media only screen and (min-width: 65.625em) {
    .main{grid-template-columns: repeat(4, 1fr);}
  }
</style>
