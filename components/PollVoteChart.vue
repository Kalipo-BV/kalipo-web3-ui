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
    data: function() {
    return {
        series: [44, 55, 41, 17],
        chartOptions: {
            chart: {
                width: 340,
                type: 'donut',
            },
            labels: ['A','B','C','D']
        },
    }
  }
}
</script>
  
  