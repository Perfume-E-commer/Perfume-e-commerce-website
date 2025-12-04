<template>
  <div>
    <apexchart height="250" type="area" :options="options" :series="series"></apexchart>
  </div>
</template>
<!-- <script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ApexCharts',
  setup() {
    const options = ref({
      chart: {
        id: 'vuechart-example',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    })

    const series = ref([
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        borderColor: document.documentElement.style.getPropertyValue('--primary-indigo-600'),
        tension: 0.4,
        backgroundColor: document.documentElement.style.getPropertyValue('--primary-indigo-100'),
      },
    ])

    return { options, series }
  },
})
</script> -->

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ChartVue from 'vue3-apexcharts'

export default defineComponent({
  name: 'ApexCharts',

  setup() {
    const options = ref({
      chart: {
        id: 'sales-chart',
        height: 350,
        type: 'area',
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
      colors: ['#4F46E5', '#9CA3AF'],
      stroke: {
        curve: 'smooth',
        width: 3,
        lineCap: 'round',
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
      markers: {
        size: 5,
        hover: {
          size: 7,
        },
      },
      grid: {
        borderColor: '#f1f5f9',
        strokeDashArray: 5,
        padding: {
          top: 10,
          right: 10,
          bottom: 0,
          left: 10,
        },
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value + 'k'
          },
          style: {
            colors: '#6b7280',
            fontSize: '12px',
          },
        },
        min: 0,
        max: 50,
        tickAmount: 5,
      },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        y: {
          formatter: function (val: number) {
            return val + 'k'
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
    })

    const series = ref([
      {
        name: 'This Week',
        data: [8, 12, 18, 25, 14, 32, 28],
      },
      {
        name: 'Last Week',
        data: [5, 8, 12, 18, 22, 25, 20],
      },
    ])

    return { options, series }
  },
})
</script>
