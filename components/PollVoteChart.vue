<template>
  <v-card elevation="0" class="ma-3 mx-auto">
    <v-card-title>
      Results
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class="align-center justify-centerc">
        <apexchart width="340" type="bar" :options="chartOptions" :series="series"></apexchart>
      </div>
    </v-card-text>
  </v-card>
</template>
  
<script>
export default {
  props: ['countPerAnswer', 'choices'],
  data: () => ({
    series: [{
      data: []
    }],
    chartOptions: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: [],
      },
      legend: {
        show: false
      }
    },
  }),
  // data: () => ({
  //   series: [],
  //   chartOptions: {
  //     chart: {
  //       width: 340,
  //       type: 'donut',
  //     },
  //     labels: []
  //   },
  // }),
  async mounted() {
    this.series.push({'data': this.countPerAnswer})

    for (let i = 0; i < this.choices.length; i++) {
      this.chartOptions.xaxis.categories.push(this.choices[i])
    }
  }
}
</script>
  
  