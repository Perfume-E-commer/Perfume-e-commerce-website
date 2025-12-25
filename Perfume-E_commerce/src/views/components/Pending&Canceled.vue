<template>
  <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
    <h3 class="text-gray-900 text-xl font-medium mb-2">{{ total_name }}</h3>
    <p class="text-gray-400 text-xs mb-4">Last 7 days</p>
    <div class="flex justify-center items-start mb-4">
      <!-- Pending Column -->
      <div class="w-1/2 border-r border-gray-200 pr-6">
        <div class="text-gray-600 text-sm mb-1">Pending</div>
        <div class="flex items-center gap-2">
          <div class="text-2xl font-bold text-gray-900">{{ pending_count }}</div>
          <p class="text-green-500 text-xs">user {{ pending_users }}</p>
        </div>
      </div>

      <!-- Canceled Column -->
      <div class="w-1/2 border-l border-gray-200 pl-6">
        <div class="text-gray-600 text-sm mb-1">Canceled</div>
        <div class="flex items-center gap-2">
          <div class="text-2xl font-bold " :class="rateColorClass">{{ canceled_count }}</div>
          <div class="flex items-center justify-center text-sm" :class="rateColorClass">
            <i :class="rateIconClass" class="mr-1"></i>
            <span>{{ canceled_percentage }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <ButtonDetail :detailLink="detailLink" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import ButtonDetail from './ButtonDetail.vue'
export default {
  name: 'PendingCanceled',
  components: {
    ButtonDetail,
  },
  props: {
    total_name: {
      type: String,
      required: true,
    },
    pending_count: {
      type: Number,
      required: true,
    },
    pending_users: {
      type: Number,
      required: true,
    },
    canceled_count: {
      type: Number,
      required: true,
    },
    canceled_percentage: {
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
      const percentage = props.canceled_percentage
      return (
        percentage.includes('↑') ||
        percentage.toLowerCase().includes('up') ||
        (percentage.includes('%') && parseFloat(percentage) > 0)
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
      detailLink,
      rateColorClass,
      rateIconClass,
    }
  },
}
</script>
