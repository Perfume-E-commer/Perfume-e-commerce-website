<template>
  <div class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
    <!-- sorting by click which button -->
    <div class="flex flex-wrap gap-2 p-2 bg-[#E9E7F8] rounded-lg w-full lg:w-auto">
      <button
        v-for="item in dataSorting"
        :key="item.id"
        :text="item.text"
        @click="handleClick(item.text)"
        class="px-3 py-2 sm:px-4 text-sm sm:text-base rounded-lg font-medium transition-colors whitespace-nowrap"
        :class="
          isReactive(item.text)
            ? 'bg-white text-black shadow-md'
            : ' text-gray-500 hover:bg-[#DAD7F5]'
        "
      >
        {{ item.text }}
      </button>
    </div>
    <div class="flex gap-2 flex-wrap sm:flex-nowrap w-full lg:w-auto">
      <SearchProduct
        placeholderdata="Search for products"
        class="rounded-3xl flex-1 sm:flex-initial min-w-0"
      />
      <div class="hidden sm:flex gap-2">
        <ButtonRectangle
          textColor="#280559"
          btncolor="#FFFFFF"
          padding="px-4 py-2"
          rounded="rounded-lg"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 6.70898H2.5C2.15833 6.70898 1.875 6.36898 1.875 5.95898C1.875 5.54898 2.15833 5.20898 2.5 5.20898H17.5C17.8417 5.20898 18.125 5.54898 18.125 5.95898C18.125 6.36898 17.8417 6.70898 17.5 6.70898Z"
              fill="#4B5563"
            />
            <path
              d="M15 10.875H5C4.65833 10.875 4.375 10.535 4.375 10.125C4.375 9.715 4.65833 9.375 5 9.375H15C15.3417 9.375 15.625 9.715 15.625 10.125C15.625 10.535 15.3417 10.875 15 10.875Z"
              fill="#4B5563"
            />
            <path
              d="M11.6693 15.041H8.33594C7.99427 15.041 7.71094 14.701 7.71094 14.291C7.71094 13.881 7.99427 13.541 8.33594 13.541H11.6693C12.0109 13.541 12.2943 13.881 12.2943 14.291C12.2943 14.701 12.0109 15.041 11.6693 15.041Z"
              fill="#4B5563"
            />
          </svg>
        </ButtonRectangle>
        <ButtonRectangle
          textColor="#280559"
          btncolor="#FFFFFF"
          padding="px-4 py-2"
          rounded="rounded-lg"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66536 16.6673V5.83398M6.66536 16.6673L3.33203 13.334M6.66536 16.6673L9.9987 13.334M13.332 3.33398V14.1673M13.332 3.33398L16.6654 6.66732M13.332 3.33398L9.9987 6.66732"
              stroke="#4B5563"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </ButtonRectangle>
        <ButtonRectangle
          textColor="#280559"
          btncolor="#FFFFFF"
          padding="px-4 py-2"
          rounded="rounded-lg"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 10C6 9.46957 5.78929 8.96086 5.41421 8.58579C5.03914 8.21071 4.53043 8 4 8C3.46957 8 2.96086 8.21071 2.58579 8.58579C2.21071 8.96086 2 9.46957 2 10C2 10.5304 2.21071 11.0391 2.58579 11.4142C2.96086 11.7893 3.46957 12 4 12C4.53043 12 5.03914 11.7893 5.41421 11.4142C5.78929 11.0391 6 10.5304 6 10ZM12 10C12 9.46957 11.7893 8.96086 11.4142 8.58579C11.0391 8.21071 10.5304 8 10 8C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10C8 10.5304 8.21071 11.0391 8.58579 11.4142C8.96086 11.7893 9.46957 12 10 12C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10ZM16 8C16.5304 8 17.0391 8.21071 17.4142 8.58579C17.7893 8.96086 18 9.46957 18 10C18 10.5304 17.7893 11.0391 17.4142 11.4142C17.0391 11.7893 16.5304 12 16 12C15.4696 12 14.9609 11.7893 14.5858 11.4142C14.2107 11.0391 14 10.5304 14 10C14 9.46957 14.2107 8.96086 14.5858 8.58579C14.9609 8.21071 15.4696 8 16 8Z"
              fill="#4B5563"
            />
          </svg>
        </ButtonRectangle>
      </div>
      <!-- Mobile menu button -->
      <button @click="toggleMobileMenu" class="sm:hidden p-2 bg-white rounded-lg">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 10C6 9.46957 5.78929 8.96086 5.41421 8.58579C5.03914 8.21071 4.53043 8 4 8C3.46957 8 2.96086 8.21071 2.58579 8.58579C2.21071 8.96086 2 9.46957 2 10C2 10.5304 2.21071 11.0391 2.58579 11.4142C2.96086 11.7893 3.46957 12 4 12C4.53043 12 5.03914 11.7893 5.41421 11.4142C5.78929 11.0391 6 10.5304 6 10ZM12 10C12 9.46957 11.7893 8.96086 11.4142 8.58579C11.0391 8.21071 10.5304 8 10 8C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10C8 10.5304 8.21071 11.0391 8.58579 11.4142C8.96086 11.7893 9.46957 12 10 12C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10ZM16 8C16.5304 8 17.0391 8.21071 17.4142 8.58579C17.7893 8.96086 18 9.46957 18 10C18 10.5304 17.7893 11.0391 17.4142 11.4142C17.0391 11.7893 16.5304 12 16 12C15.4696 12 14.9609 11.7893 14.5858 11.4142C14.2107 11.0391 14 10.5304 14 10C14 9.46957 14.2107 8.96086 14.5858 8.58579C14.9609 8.21071 15.4696 8 16 8Z"
            fill="#4B5563"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile filter menu -->
    <div
      v-if="showMobileMenu"
      class="sm:hidden flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg"
    >
      <ButtonRectangle
        textColor="#280559"
        btncolor="#F3F4F6"
        padding="px-4 py-2"
        rounded="rounded-lg"
        class="w-full justify-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2"
        >
          <path
            d="M17.5 6.70898H2.5C2.15833 6.70898 1.875 6.36898 1.875 5.95898C1.875 5.54898 2.15833 5.20898 2.5 5.20898H17.5C17.8417 5.20898 18.125 5.54898 18.125 5.95898C18.125 6.36898 17.8417 6.70898 17.5 6.70898Z"
            fill="#4B5563"
          />
          <path
            d="M15 10.875H5C4.65833 10.875 4.375 10.535 4.375 10.125C4.375 9.715 4.65833 9.375 5 9.375H15C15.3417 9.375 15.625 9.715 15.625 10.125C15.625 10.535 15.3417 10.875 15 10.875Z"
            fill="#4B5563"
          />
          <path
            d="M11.6693 15.041H8.33594C7.99427 15.041 7.71094 14.701 7.71094 14.291C7.71094 13.881 7.99427 13.541 8.33594 13.541H11.6693C12.0109 13.541 12.2943 13.881 12.2943 14.291C12.2943 14.701 12.0109 15.041 11.6693 15.041Z"
            fill="#4B5563"
          />
        </svg>
        <span>Filter</span>
      </ButtonRectangle>
      <ButtonRectangle
        textColor="#280559"
        btncolor="#F3F4F6"
        padding="px-4 py-2"
        rounded="rounded-lg"
        class="w-full justify-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2"
        >
          <path
            d="M6.66536 16.6673V5.83398M6.66536 16.6673L3.33203 13.334M6.66536 16.6673L9.9987 13.334M13.332 3.33398V14.1673M13.332 3.33398L16.6654 6.66732M13.332 3.33398L9.9987 6.66732"
            stroke="#4B5563"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Sort</span>
      </ButtonRectangle>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import SearchProduct from './SearchProduct.vue'
import ButtonRectangle from './ButtonRectangle.vue'
export default {
  name: 'NavFilter',
  components: { SearchProduct, ButtonRectangle },
  setup() {
    const dataSorting = ref([
      { id: 1, text: 'All orders' },
      { id: 2, text: 'Completed' },
      { id: 3, text: 'Pending' },
      { id: 4, text: 'Cancelled' },
    ])

    const reactiveButton = ref('All orders')
    const showMobileMenu = ref(false)

    const handleClick = (text: string) => {
      reactiveButton.value = text
    }

    const isReactive = (text: string) => {
      return reactiveButton.value === text
    }

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    return {
      dataSorting,
      handleClick,
      isReactive,
      showMobileMenu,
      toggleMobileMenu,
    }
  },
}
</script>
