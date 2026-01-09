<template>
  <div class="w-full h-full flex items-center justify-center">
    <apexchart 
      type="donut" 
      height="300" 
      :options="chartOptions" 
      :series="chartSeries"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  stats: {
    completedCount: number;
    pendingCount: number;
    cancelledCount: number;
  }
}>();

// Logic: Map the stats directly to the chart series
const chartSeries = computed(() => [
  props.stats.completedCount, 
  props.stats.pendingCount, 
  props.stats.cancelledCount
]);

const chartOptions = {
  labels: ['Paid', 'Pending', 'Cancelled/Failed'],
  colors: ['#10B981', '#F59E0B', '#EF4444'], // Green, Yellow, Red
  chart: {
    type: 'donut',
  },
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            formatter: function (w: any) {
              return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
            }
          }
        }
      }
    }
  },
  legend: {
    position: 'bottom'
  }
};
</script>