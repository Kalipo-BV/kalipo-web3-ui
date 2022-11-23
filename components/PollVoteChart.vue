<template>
    <v-card elevation="2" class="ma-3 mx-auto">
        <v-card-title>
            Results
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <div>
                <apexchart width="340" type="donut" :options="chartOptions" :series="series"></apexchart>            
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
export default {
  props: ['countPerAnswer', 'answer'],
  data: function() {
    return {
      series:[400, 430, 448, 470, 540],
        chartOptions: {
          chart: {
            type: 'donut',
            },
        },
    }
  }
}
</script>
  
  