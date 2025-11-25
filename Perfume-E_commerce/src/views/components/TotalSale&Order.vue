<template>
  <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
    <h3 class="text-gray-900 text-xl font-medium mb-2">{{ total_name }}</h3>
    <p class="text-gray-400 text-xs mb-4">Last 7 days</p>
    <div class="flex gap-3">
      <div class="text-3xl font-bold text-gray-900 mb-2">{{ total_value }}</div>

      <div :class="['flex items-center text-sm mb-2', rateColorClass]">
        <i :class="rateIconClass + ' mr-1'"></i>
        <span class="flex gap-1">
          <p class="text-black">{{ total_text }}</p>
          {{ rate_fluctuation }}
        </span>
      </div>
    </div>

    <p class="text-gray-400 text-xs mb-4">
      Previous 7 days <span class="text-indigo-500">({{ previous_value }})</span>
    </p>
    <div class="flex justify-end">
      <ButtonDetail :detailLink="detailLink" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import ButtonDetail from './ButtonDetail.vue'
export default {
  name: 'TotalSaleOrder',
  components: {
    ButtonDetail,
  },
  props: {
    total_name: {
      type: String,
      required: true,
    },
    total_value: {
      type: String,
      required: true,
    },
    total_text: {
      type: String,
      required: true,
    },
    rate_fluctuation: {
      type: String,
      required: true,
    },
    previous_value: {
      type: String,
      required: true,
    },
    detailLink: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // console.log(props)
    // const total_value = props.total_value

    const isPositiveRate = computed(() => {
      const fluctuation = props.rate_fluctuation
      return (
        fluctuation.includes('↑') ||
        fluctuation.toLowerCase().includes('up') ||
        parseInt(fluctuation) > 0
      )
    })

    const rateColorClass = computed(() => {
      return isPositiveRate.value ? 'text-green-500' : 'text-red-500'
    })

    const rateIconClass = computed(() => {
      return isPositiveRate.value ? 'fas fa-arrow-up' : 'fas fa-arrow-down'
    })

    const detailLink = computed(() => {
      return props.detailLink || `/details/${props.total_name.toLowerCase().replace(/\s+/g, '-')}`
    })

    return {
      //   total_value,
      rateColorClass,
      rateIconClass,
      detailLink,
    }
  },
}
</script>
