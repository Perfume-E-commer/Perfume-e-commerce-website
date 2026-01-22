<template>
  <div class="w-full h-full">
    <apexchart
      :height="height"
      type="area"
      :options="chartOptions"
      :series="chartSeries"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

export default defineComponent({
  name: 'ApexCharts',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    height: {
      type: [Number, String],
      default: 350,
    },
    data: {
      type: Array as () => number[], // Revenue numbers
      default: () => [],
    },
    labels: {
      type: Array as () => string[], // Dates
      default: () => [],
    },
  },
  setup(props) {
    const { data, labels } = toRefs(props)
    const chartSeries = computed(() => [
      {
        name: 'Revenue',
        data: data.value,
      },
    ])
    const chartOptions = computed<ApexOptions>(() => ({
      chart: {
        id: 'revenue-chart',
        type: 'area',
        // toolbar: { show: false },
        // zoom: { enabled: false },
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: true,
          tools: {
            download: true, // export PNG / SVG / CSV
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
          export: {
            csv: {
              filename: 'sales-data',
            },
            svg: {
              filename: 'sales-chart',
            },
            png: {
              filename: 'sales-chart',
            },
          },
        },
      },
      colors: ['#4F46E5'], // Indigo-600
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 90, 100],
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: labels.value, // Uses real dates
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: { colors: '#9CA3AF', fontSize: '12px' },
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => {
            return '$' + value
          },
          style: { colors: '#9CA3AF', fontSize: '12px' },
        },
      },
      grid: {
        borderColor: '#f1f5f9',
        strokeDashArray: 4,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return '$' + val.toFixed(2)
          },
        },
      },
    }))

    return { chartOptions, chartSeries }
  },
})
</script>
