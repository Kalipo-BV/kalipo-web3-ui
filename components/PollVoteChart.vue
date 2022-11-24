<template>
  <v-card elevation="0" max-width="400" class="mt-4 rounded-lg float-left">
    <v-card-title>
      Total votes: {{this.totalVotes}}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class="align-center justify-center">
        <apexchart width="280" type="bar" :options="chartOptions" :series="series"></apexchart>
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
      fill: {
        colors: ["#0565E3"]
      },
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
    totalVotes: 0
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
    for (let i = 0; i < this.countPerAnswer.length; i++) {
      this.totalVotes += this.countPerAnswer[i];
    }

    this.series.push({'data': this.countPerAnswer})

    for (let i = 0; i < this.choices.length; i++) {
      this.chartOptions.xaxis.categories.push(this.choices[i])
    }
  }
}
</script>

