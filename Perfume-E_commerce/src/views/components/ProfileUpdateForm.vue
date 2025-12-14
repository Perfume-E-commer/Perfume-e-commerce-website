<template>
  <div class="bg-white shadow-lg rounded-xl border border-gray-100">
    <div class="flex justify-between items-center p-6 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900">Profile Update</h2>
      <button
        class="flex items-center text-sm font-medium text-[#280559] hover:text-purple-700 transition duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        Edit
      </button>
    </div>

    <form @submit.prevent="updateProfile" class="p-6 space-y-6">
      <div class="flex items-center space-x-4 pb-4 border-b border-gray-100">
        <div class="w-16 h-16 rounded-full overflow-hidden">
          <img :src="formData.avatar" alt="Profile Avatar" class="w-full h-full object-cover" />
        </div>

        <div class="flex space-x-2">
          <button
            type="button"
            class="py-2 px-4 bg-[#280559] hover:bg-[#1f044a] text-white text-sm font-medium rounded-lg transition duration-150"
          >
            Upload New
          </button>
          <button
            type="button"
            class="py-2 px-4 text-gray-700 border border-gray-300 hover:bg-gray-50 text-sm font-medium rounded-lg transition duration-150"
          >
            Delete
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField id="first-name" label="First Name" v-model="formData.firstName" />
        <InputField id="last-name" label="Last Name" v-model="formData.lastName" />
        <InputField id="postcode" label="Postcode" v-model="formData.postcode" />

        <div class="space-y-1">
          <label for="phone-number" class="block text-sm font-medium text-gray-700"
            >Phone Number</label
          >
          <div
            class="flex rounded-lg shadow-sm border border-gray-300 focus-within:ring-1 focus-within:ring-[#280559] focus-within:border-[#280559]"
          >
            <input
              type="tel"
              id="phone-number"
              v-model="formData.phoneNumber"
              class="block w-full py-2 px-3 rounded-l-lg focus:outline-none"
            />
            <select
              v-model="formData.countryCode"
              class="py-2 px-2 rounded-r-lg border-l border-gray-300 bg-gray-50 focus:ring-[#280559] focus:border-[#280559] text-sm"
            >
              <option value="KH">🇰🇭</option>
              <option value="US">🇺🇸</option>
              <option value="VN">🇻🇳</option>
            </select>
          </div>
        </div>

        <InputField id="email" label="E-mail" v-model="formData.email" :readonly="true" />

        <div class="space-y-1">
          <label for="dob" class="block text-sm font-medium text-gray-700">Date of Birth</label>
          <div class="relative flex items-center">
            <input
              type="text"
              id="dob"
              v-model="formData.dob"
              placeholder="12- January- 1999"
              class="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-[#280559] focus:border-[#280559]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 absolute right-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          v-model="formData.address"
          placeholder="Street 57, Sangkat Boeung Keng Kang I, Khan Boeung Keng Kang, Phnom Penh"
          class="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-[#280559] focus:border-[#280559]"
        />
        <div class="pt-2">
          <button
            type="button"
            class="flex items-center justify-center w-full md:w-auto py-2 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Address
          </button>
        </div>
      </div>

      <div class="space-y-1 pt-4">
        <label class="block text-sm font-medium text-gray-700">Credit Card</label>
        <div class="flex items-center space-x-3 w-full py-2 px-3 border border-gray-300 rounded-lg">
          <svg
            width="38"
            height="24"
            viewBox="0 0 38 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="26" cy="12" r="12" fill="#F9E813" />
            <circle cx="12" cy="12" r="12" fill="#F5172E" fill-opacity="0.8" />
          </svg>

          <span class="text-gray-900 font-mono flex-grow">843-4359-4444</span>
          <select class="text-sm font-medium text-gray-700 border-none bg-white focus:ring-0">
            <option>Primary</option>
            <option>Secondary</option>
          </select>
        </div>
        <div class="pt-2">
          <button
            type="button"
            class="flex items-center justify-center w-full md:w-auto py-2 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Card
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, defineComponent } from 'vue'
import InputField from './InputField.vue'
const props = defineComponent({
  props: {
    id: String,
    label: String,
    modelValue: [String, Number],
    readonly: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
  },
  emits: ['update:modelValue'],
  template: `
    <div class="space-y-1">
      <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <input 
        :type="type" 
        :id="id" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)" 
        :readonly="readonly"
        :class="[
            'w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-[#280559] focus:border-[#280559]',
            { 'bg-gray-50 text-gray-500 pointer-events-none': readonly }
        ]"
      />
    </div>
  `,
})

const formData = reactive({
  avatar: '/me.jpg', // Placeholder image
  firstName: 'Heng',
  lastName: 'Nguonhour',
  postcode: '12302',
  phoneNumber: '+855 12 345 6789',
  countryCode: 'KH',
  email: 'students@gmail.com',
  dob: '12- January- 1999',
  address: 'Street 57, Sangkat Boeung Keng Kang I, Khan Boeung Keng Kang, Phnom Penh',
  creditCard: '843-4359-4444',
})

const updateProfile = () => {
  // Logic for updating profile (API call, validation, etc.)
  console.log('Updating Profile with data:', formData)
}
</script>
