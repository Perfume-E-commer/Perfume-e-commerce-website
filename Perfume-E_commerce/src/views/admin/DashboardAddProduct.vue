<template>
  <div>
    <!-- Success/Error Messages -->
    <div
      v-if="successMessage"
      class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
    >
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ errorMessage }}
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        <p class="mt-4 text-gray-700">Processing...</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between">
      <h1 class="flex items-center justify-center font-bold text-2xl">
        {{ isEditMode ? 'Edit Product' : 'Add New Product' }}
      </h1>
      <div class="flex flex-wrap items-center gap-4">
        <!-- From Uiverse.io by sudhucodes -->
        <div
          class="flex items-center border w-full md:w-80 focus-within:border-indigo-500 transition duration-300 pr-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search for products"
            name="search"
            class="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 30 30"
            fill="#6B7280"
          >
            <path
              d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
            ></path>
          </svg>
        </div>
        <ButtonRectangle
          textColor="white"
          btncolor="#280559"
          padding="px-6 py-3"
          rounded="rounded-lg"
        >
          <RouterLink to="/maindashboard/dashboardcategories" class="flex items-center gap-2">
            Publish Products
          </RouterLink>
        </ButtonRectangle>
        <ButtonRectangle
          textColor="black"
          btncolor="#FFFFFF"
          padding="px-6 py-3"
          rounded="rounded-lg"
        >
          <RouterLink to="/maindashboard/dashboardcategories" class="flex items-center gap-2">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.55 12.75V9.15C3.55 8.70817 3.90817 8.35 4.35 8.35H9.95C10.3918 8.35 10.75 8.70817 10.75 9.15V13.15M9.15 3.95L4.35 3.95C3.90817 3.95 3.55 3.59183 3.55 3.15L3.55 0.75M13.1483 3.54831L10.7517 1.15169C10.4945 0.894492 10.1457 0.750002 9.78194 0.75H2.12143C1.364 0.75 0.75 1.364 0.75 2.12143V12.1786C0.75 12.936 1.364 13.55 2.12143 13.55H12.1786C12.936 13.55 13.55 12.936 13.55 12.1786V4.51806C13.55 4.15433 13.4055 3.80551 13.1483 3.54831Z"
                stroke="#023337"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>

            Save to draft
          </RouterLink>
        </ButtonRectangle>
        <ButtonRectangle
          textColor="gray"
          btncolor="#FFFFFF"
          padding="px-6 py-3"
          rounded="rounded-lg"
        >
          <RouterLink to="/maindashboard/dashboardcategories" class="flex items-center gap-2">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6 5.8C11.6 5.24771 11.1523 4.8 10.6 4.8C10.0477 4.8 9.6 5.24771 9.6 5.8L10.6 5.8L11.6 5.8ZM9.6 15.4C9.6 15.9523 10.0477 16.4 10.6 16.4C11.1523 16.4 11.6 15.9523 11.6 15.4H10.6H9.6ZM15.4 11.6C15.9523 11.6 16.4 11.1523 16.4 10.6C16.4 10.0477 15.9523 9.6 15.4 9.6V10.6V11.6ZM5.8 9.6C5.24771 9.6 4.8 10.0477 4.8 10.6C4.8 11.1523 5.24771 11.6 5.8 11.6V10.6V9.6ZM20.2 10.6H19.2C19.2 15.3496 15.3496 19.2 10.6 19.2V20.2V21.2C16.4542 21.2 21.2 16.4542 21.2 10.6H20.2ZM10.6 20.2V19.2C5.85035 19.2 2 15.3496 2 10.6H1H0C0 16.4542 4.74578 21.2 10.6 21.2V20.2ZM1 10.6H2C2 5.85035 5.85035 2 10.6 2V1V0C4.74578 0 0 4.74578 0 10.6H1ZM10.6 1V2C15.3496 2 19.2 5.85035 19.2 10.6H20.2H21.2C21.2 4.74578 16.4542 0 10.6 0V1ZM10.6 5.8L9.6 5.8L9.6 10.6L10.6 10.6L11.6 10.6L11.6 5.8L10.6 5.8ZM10.6 10.6H9.6V15.4H10.6H11.6V10.6H10.6ZM15.4 10.6V9.6H10.6V10.6V11.6H15.4V10.6ZM10.6 10.6V9.6H5.8V10.6V11.6H10.6V10.6Z"
                fill="#6A717F"
              />
            </svg>
          </RouterLink>
        </ButtonRectangle>
      </div>
    </div>
    <div class="flex flex-wrap justify-between gap-2 mt-6 pb-5">
      <!-- form input information product and its price with discount -->
      <div
        class="w-full md:w-[60%] bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
      >
        <p class="text-gray-800 text-2xl font-bold">Basic Details</p>
        <br />

        <div class="flex flex-col gap-2 w-full">
          <div class="flex flex-col gap-2">
            <label for="productName" class="text-gray-700 font-medium">Product Name</label>
            <input
              type="text"
              id="productName"
              v-model="formData.name"
              class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product name"
            />
          </div>

          <div class="grid md:grid-cols-2 gap-4 md:gap-6">
            <div class="w-full gap-2">
              <label for="productPrice" class="text-gray-700 font-medium">Brand</label>
              <select
                name="brand"
                id="brandId "
                v-model="formData.brand"
                class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option disabled value="" selected>Select a brand</option>
                <option v-for="brands in brand" :key="brands.id" :value="brands.name">
                  {{ brands.name }}
                </option>
              </select>
            </div>
            <div class="w-full gap-2">
              <!-- select category -->
              <label for="productCategory" class="text-gray-700 font-medium">Category</label>
              <select
                name="category"
                id="categoryId "
                v-model="formData.category"
                class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option disabled value="" selected>Select a category</option>
                <option
                  v-for="categories in category"
                  :key="categories.id"
                  :value="categories.name"
                >
                  {{ categories.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-4 md:gap-6">
            <div class="w-full gap-2">
              <label for="productPrice" class="text-gray-700 font-medium">Scent</label>
              <select
                name="scent"
                id="scentId "
                v-model="formData.scent"
                class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option disabled value="" selected>Select a scent</option>
                <option v-for="scent in scents" :key="scent.id" :value="scent.name">
                  {{ scent.name }}
                </option>
              </select>
            </div>
            <div class="w-full gap-2">
              <!-- select category -->
              <label for="productCategory" class="text-gray-700 font-medium">Occassion</label>
              <select
                name="occassion"
                id="occassionId "
                v-model="formData.occasion"
                class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option disabled value="" selected>Select an occassion</option>
                <option v-for="occasion in occasions" :key="occasion.id" :value="occasion.name">
                  {{ occasion.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- 
          <div class="flex flex-col gap-2">
            <label for="productDiscount" class="text-gray-700 font-medium">Discount (%)</label>
            <input
              type="number"
              id="productDiscount"
              class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter discount percentage"
            />
          </div> -->
        </div>

        <br />
        <p class="text-gray-800 text-2xl font-bold">Pricing</p>
        <br />

        <div class="flex flex-col gap-2 w-full">
          <label for="productPrice" class="text-gray-700 font-medium">Product Price</label>
          <div
            class="flex items-center border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <!-- v-model="price" -->
            <input
              type="text"
              v-model="formData.price"
              class="flex p-2 w-full"
              placeholder="$0.00"
            />

            <!-- Divider -->
            <div class="h-6 w-px bg-gray-300 mx-3"></div>

            <!-- Right: Flag Dropdown -->
            <div class="relative flex items-center">
              <!-- v-model="selectedCountry" -->
              <select
                v-model="currency"
                class="appearance-none bg-transparent pr-6 cursor-pointer focus:outline-none text-base"
              >
                <option value="us" selected>🇺🇸</option>
                <option value="kh">🇰🇭</option>
                <option value="uk">🇬🇧</option>
                <option value="fr">🇫🇷</option>
                <option value="de">🇩🇪</option>
              </select>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-gray-500 absolute right-0 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div class="flex flex-col w-full gap-2">
            <label for="productSummary" class="text-gray-700 font-medium">Product Summary</label>
            <textarea
              name="productSummary"
              id="productSummary"
              v-model="formData.summary"
              rows="4"
              class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product summary"
            ></textarea>
          </div>
          <div class="flex flex-col w-full gap-2">
            <label for="productDescription" class="text-gray-700 font-medium"
              >Product Description</label
            >
            <textarea
              name="productDescription"
              id="productDescription"
              v-model="formData.description"
              rows="4"
              class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product description"
            ></textarea>
          </div>
        </div>

        <br />
        <p class="text-gray-800 text-2xl font-bold">Inventory</p>
        <br />

        <div class="flex flex-col gap-2 w-full">
          <div class="grid md:grid-cols-2 gap-4 md:gap-6">
            <div class="w-full flex flex-col gap-2">
              <label for="stockQuantity" class="text-gray-700 font-medium">Stock Quantity</label>
              <input
                type="number"
                id="stockQuantity"
                v-model="formData.stock"
                class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter stock quantity"
              />
            </div>
            <div class="w-full flex flex-col gap-2">
              <label for="stockStatus" class="text-gray-700 font-medium">Stock Status</label>
              <select
                name="stockStatus"
                id="stockStatus"
                v-model="formData.isActive"
                class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option disabled value="" selected>In stock</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
                <option value="preOrder">Pre-order</option>
              </select>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-4 md:gap-6">
            <div class="w-full flex flex-col gap-2">
              <label for="productPrice" class="text-gray-700 font-medium"
                >Discounted Price <span class="text-gray-400">(Optional)</span></label
              >
              <div
                class="mb-6 flex border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div class="flex w-[75%] items-center p-2 space-x-2">
                  <!-- it change too when I change currency of type of price-->
                  <span
                    v-if="currency"
                    class="text-gray-50 p-1 px-2 rounded-md border-gray-300 bg-indigo-400"
                    >{{ currencySymbol }}</span
                  >
                  <input
                    type="number"
                    v-model="formData.discountedPrice"
                    class="p-2 outline-none w-full"
                    placeholder="15"
                  />
                </div>
                <div class="text-sm flex items-center text-gray-500">
                  | Sale = {{ currencySymbol }}<span class="font-medium">{{ salePrice }}</span>
                </div>
              </div>
            </div>
            <div class="w-full flex flex-col gap-2">
              <!-- select category -->
              <label for="productCategory" class="text-gray-700 font-medium">Tax Included</label>
              <div class="flex flex-col gap-2 space-x-4">
                <label class="flex items-center">
                  <input
                    type="radio"
                    id="radioYes"
                    name="taxIncluded"
                    v-model="formData.taxIncluded"
                    :value="true"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-gray-700">Yes</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    id="radioNo"
                    name="taxIncluded"
                    v-model="formData.taxIncluded"
                    :value="false"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-4 md:gap-6">
            <div class="w-full flex flex-col gap-2">
              <label for="stockQuantity" class="text-gray-700 font-medium">Expiration</label>

              <VueDatePicker
                v-model="formData.createdDate"
                range
                placeholder="Select date range"
                :enable-time-picker="false"
              />
            </div>
            <div class="w-full flex flex-col gap-2 justify-end">
              <!-- <label for="stockQuantity" class="text-gray-700 font-medium">Expiration</label> -->

              <VueDatePicker
                v-model="expirationDate"
                range
                placeholder="Select date range"
                :enable-time-picker="false"
              />
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="link-checkbox"
              type="checkbox"
              v-model="agreeTerms"
              value=""
              class="w-4 h-4 rounded-xs bg-green-600"
            />
            <label for="link-checkbox" class="select-none ms-2 text-sm font-medium text-heading"
              >I agree with the
              <a href="#" class="text-fg-brand hover:underline">terms and conditions</a>.</label
            >
          </div>
          <div class="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div class="flex gap-4">
              <button
                v-if="isEditMode"
                @click="handleDelete"
                :disabled="isLoading"
                class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Product
              </button>
              <button
                @click="resetForm"
                :disabled="isLoading"
                class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>

            <div class="flex gap-4">
              <ButtonRectangle
                textColor="black"
                btncolor="#FFFFFF"
                padding="px-6 py-3"
                rounded="rounded-lg"
              >
                <RouterLink to="/maindashboard/dashboardcategories" class="flex items-center gap-2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.55 12.75V9.15C3.55 8.70817 3.90817 8.35 4.35 8.35H9.95C10.3918 8.35 10.75 8.70817 10.75 9.15V13.15M9.15 3.95L4.35 3.95C3.90817 3.95 3.55 3.59183 3.55 3.15L3.55 0.75M13.1483 3.54831L10.7517 1.15169C10.4945 0.894492 10.1457 0.750002 9.78194 0.75H2.12143C1.364 0.75 0.75 1.364 0.75 2.12143V12.1786C0.75 12.936 1.364 13.55 2.12143 13.55H12.1786C12.936 13.55 13.55 12.936 13.55 12.1786V4.51806C13.55 4.15433 13.4055 3.80551 13.1483 3.54831Z"
                      stroke="#023337"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  Cancel
                </RouterLink>
              </ButtonRectangle>

              <button
                @click="handleSubmit"
                :disabled="isLoading"
                class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {{ isEditMode ? 'Update Product' : 'Create Product' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- place for upload image and product category, tag and size -->
      <div
        class="w-full md:w-[38%] bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
      >
        <!-- Header -->
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Upload Product Image</h1>
        <h2 class="text-lg font-medium text-gray-600 mb-6">Product Image</h2>

        <!-- Product Image Section -->
        <div class="mb-8 border border-gray-300 rounded-2xl p-4">
          <div class="w-full flex justify-center">
            <img
              v-if="mainImage"
              :src="mainImage"
              alt="Product Image"
              class="w-60 h-60 object-contain"
            />
            <div
              v-else
              class="w-full h-60 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500"
            >
              No image selected
            </div>
          </div>
          <div class="flex justify-between mt-4">
            <button
              @click="browseInputRef?.click()"
              type="button"
              class="px-4 py-2 rounded-lg border border-gray-400 text-gray-500 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-100"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66667 15C1.20833 15 0.816111 14.8369 0.49 14.5108C0.163889 14.1847 0.000555556 13.7922 0 13.3333V1.66667C0 1.20833 0.163333 0.816111 0.49 0.49C0.816667 0.163889 1.20889 0.000555556 1.66667 0H13.3333C13.7917 0 14.1842 0.163333 14.5108 0.49C14.8375 0.816667 15.0006 1.20889 15 1.66667V13.3333C15 13.7917 14.8369 14.1842 14.5108 14.5108C14.1847 14.8375 13.7922 15.0006 13.3333 15H1.66667ZM3.33333 11.6667H11.6667C11.8333 11.6667 11.9583 11.5903 12.0417 11.4375C12.125 11.2847 12.1111 11.1389 12 11L9.70833 7.9375C9.625 7.82639 9.51389 7.77083 9.375 7.77083C9.23611 7.77083 9.125 7.82639 9.04167 7.9375L6.875 10.8333L5.33333 8.77083C5.25 8.65972 5.13889 8.60417 5 8.60417C4.86111 8.60417 4.75 8.65972 4.66667 8.77083L3 11C2.88889 11.1389 2.875 11.2847 2.95833 11.4375C3.04167 11.5903 3.16667 11.6667 3.33333 11.6667Z"
                  fill="#6A717F"
                />
              </svg>
              Browse
            </button>
            <input
              ref="browseInputRef"
              type="file"
              accept="image/*"
              @change="onBrowseImage"
              class="hidden"
            />

            <button
              @click="replaceInputRef?.click()"
              type="button"
              class="px-4 py-2 rounded-lg shadow-[0_3px_8px_rgba(0,0,0,0.24)] text-gray-800 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-100"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.62452 11.6755C0.125161 9.17613 0.125162 5.12387 2.62452 2.62452C4.20447 1.04456 6.40498 0.463367 8.44148 0.880934M12.3095 3.36174C14.1531 5.86615 13.9418 9.4092 11.6755 11.6755C10.0451 13.3058 7.75403 13.8727 5.6642 13.3761M11.0415 4.39035V1.99035L13.4415 1.99035L11.0415 4.39035ZM3.18979 9.84113V12.2411H0.789792L3.18979 9.84113Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Replace
            </button>
            <input
              ref="replaceInputRef"
              type="file"
              accept="image/*"
              @change="onReplaceImage"
              class="hidden"
            />
          </div>
          <div class="flex gap-4 mt-4">
            <div
              v-for="(img, index) in additionalImages"
              :key="index"
              @click="setMain(img)"
              class="relative cursor-pointer"
            >
              <img :src="img" alt="" class="w-20 h-20 object-cover rounded-b-xl border shadow-sm" />
              <button
                @click.stop.prevent="removeImage(index)"
                class="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.28 9.05333L9.05333 5.28M9.05333 9.05333L5.28 5.28M7.16667 13.8333C10.8333 13.8333 13.8333 10.8333 13.8333 7.16667C13.8333 3.5 10.8333 0.5 7.16667 0.5C3.5 0.5 0.5 3.5 0.5 7.16667C0.5 10.8333 3.5 13.8333 7.16667 13.8333Z"
                    stroke="#6A717F"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <label
              class="w-30 h-30 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50"
            >
              <span class="text-xl"
                ><svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5 0C4.70156 0 0 4.70156 0 10.5C0 16.2984 4.70156 21 10.5 21C16.2984 21 21 16.2984 21 10.5C21 4.70156 16.2984 0 10.5 0ZM15 11.0625C15 11.1656 14.9156 11.25 14.8125 11.25H11.25V14.8125C11.25 14.9156 11.1656 15 11.0625 15H9.9375C9.83438 15 9.75 14.9156 9.75 14.8125V11.25H6.1875C6.08437 11.25 6 11.1656 6 11.0625V9.9375C6 9.83438 6.08437 9.75 6.1875 9.75H9.75V6.1875C9.75 6.08437 9.83438 6 9.9375 6H11.0625C11.1656 6 11.25 6.08437 11.25 6.1875V9.75H14.8125C14.9156 9.75 15 9.83438 15 9.9375V11.0625Z"
                    fill="#3E2C67"
                  />
                </svg>
              </span>
              <span class="text-xs text-[#3E2C67]">Add Image</span>

              <input type="file" accept="image/*" multiple class="hidden" @change="addImages" />
            </label>
          </div>
        </div>

        <hr class="my-6 border-gray-200" />

        <!-- Product Categories -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3">Product Categories</h3>
          <div class="relative">
            <select
              v-model="categoryProduct"
              class="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="" disabled selected>Select product Category</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>

        <hr class="my-6 border-gray-200" />

        <!-- Product Tag -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3">Product Tag</h3>
          <div class="relative">
            <select
              v-model="tagProduct"
              class="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="" disabled selected>Select your product</option>
              <option>Luxury</option>
              <option>Premium</option>
              <option>Exclusive</option>
              <option>Limited Edition</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>

        <hr class="my-6 border-gray-200" />

        <!-- Product Rating -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3">Product Rating</h3>
          <div class="relative">
            <select
              v-model="ratingProduct"
              class="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="" disabled selected>Select Rating</option>
              <option>1 Star</option>
              <option>2 Stars</option>
              <option>3 Stars</option>
              <option>4 Stars</option>
              <option>5 Stars</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>

        <hr class="my-6 border-gray-200" />

        <!-- Product Size -->
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-3">Product Size</h3>
          <div class="space-y-4 grid md:grid-cols-2 gap-4 md:gap-6">
            <div class="relative">
              <select
                v-model="sizeProduct"
                class="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="" disabled selected>Select Size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="volumeProduct"
                class="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="" disabled selected>Select Volume</option>
                <option>50ml</option>
                <option>100ml</option>
                <option>150ml</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ButtonRectangle from '../components/ButtonRectangle.vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useAuthStore } from '@/stores/authStore'
import { productService } from '@/Services/apiProduct'
import type { Product } from '@/types/Product'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const isEditMode = ref(false)
const productId = ref<string | null>(null)

// Brand and category data
const brand = ref([
  { id: 1, name: 'Chanel' },
  { id: 2, name: 'Dior' },
  { id: 3, name: 'Gucci' },
  { id: 4, name: 'Versace' },
])

const category = ref([
  { id: 1, name: 'MEN' },
  { id: 2, name: 'WOMEN' },
])

const categories = ref(['Luxury', 'Premium', 'Exclusive', 'Limited Edition'])

const scents = ref([
  { id: 1, name: 'Floral' },
  { id: 2, name: 'Woody' },
  { id: 3, name: 'Fresh' },
  { id: 4, name: 'Oriental' },
])

const occasions = ref([
  { id: 1, name: 'Casual' },
  { id: 2, name: 'Formal' },
  { id: 3, name: 'Evening' },
  { id: 4, name: 'Daily' },
])

const formData = ref<Product>({
  name: '',
  brand: '',
  category: '',
  description: '',
  scent: '',
  occasion: '',
  gender: '',
  summary: '',
  price: 0,
  discountedPrice: 0,
  stock: 0,
  orders: 0,
  imageUrl: '',
  images: [],
  taxIncluded: false,
  isOnSale: false,
  variants: [],
  features: [],
  scentNotes: [],
})

// Additional form fields not in Product type
const currency = ref('us')
const expirationDate = ref()
const agreeTerms = ref(false)
const saveToDraft = ref(false)
const publishProducts = ref(false)
const additionalImages = ref<string[]>([])
const categoryProduct = ref('')
const tagProduct = ref('')
const ratingProduct = ref('')
const sizeProduct = ref('')
const volumeProduct = ref('')

const currencySymbol = computed(() => {
  const symbols: Record<string, string> = {
    us: '$',
    kh: '៛',
    uk: '£',
    fr: '€',
    de: '€',
  }
  return symbols[currency.value] || '$'
})

// Load product if editing
onMounted(async () => {
  const id = route.params.id
  if (id && typeof id === 'string') {
    isEditMode.value = true
    productId.value = id
    await loadProduct(id)
  }
})

const loadProduct = async (id: string) => {
  try {
    if (!authStore.token) {
      errorMessage.value = 'You must be logged in to view products'
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    isLoading.value = true
    const response = await productService.getProductById(id)
    const product = response.data

    // Populate form with existing product data
    Object.assign(formData.value, product)

    // Set images
    if (product.imageUrl) {
      mainImage.value = product.imageUrl
    }
    if (product.images && product.images.length > 0) {
      additionalImages.value = product.images
    }
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Failed to load product'
    console.error('Error loading product:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  try {
    errorMessage.value = ''
    successMessage.value = ''

    // Check authentication
    if (!authStore.token) {
      errorMessage.value = 'You must be logged in as an admin to perform this action'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      return
    }

    // Validation
    if (!formData.value.name || !formData.value.brand || !formData.value.category) {
      errorMessage.value = 'Please fill in all required fields (Name, Brand, Category)'
      return
    }

    if (!formData.value.price || formData.value.price <= 0) {
      errorMessage.value = 'Please enter a valid price (greater than 0)'
      return
    }

    if (
      formData.value.stock === null ||
      formData.value.stock === undefined ||
      formData.value.stock < 0
    ) {
      errorMessage.value = 'Please enter a valid stock quantity (0 or greater)'
      return
    }

    // Ensure numeric fields are numbers, not strings
    formData.value.price = Number(formData.value.price)
    formData.value.stock = Number(formData.value.stock)
    if (formData.value.discountedPrice) {
      formData.value.discountedPrice = Number(formData.value.discountedPrice)
    }
    if (formData.value.orders) {
      formData.value.orders = Number(formData.value.orders)
    }

    isLoading.value = true

    // Sync images to formData
    if (mainImage.value) {
      formData.value.imageUrl = mainImage.value
    }
    // Ensure images is always an array
    formData.value.images = additionalImages.value || []

    // Ensure optional arrays are not undefined
    if (!formData.value.variants) formData.value.variants = []
    if (!formData.value.features) formData.value.features = []
    if (!formData.value.scentNotes) formData.value.scentNotes = []

    if (isEditMode.value && productId.value) {
      await updateProduct(productId.value)
    } else {
      await createProduct()
    }
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'An error occurred'
    console.error('Error submitting form:', error)
  } finally {
    isLoading.value = false
  }
}

const createProduct = async () => {
  try {
    const response = await productService.createProduct(formData.value)
    successMessage.value = 'Product created successfully!'
    console.log('Product created successfully:', response)

    // Reset form after successful creation
    setTimeout(() => {
      router.push('/maindashboard/dashboardcategories')
    }, 1500)
  } catch (error: any) {
    if (error.response?.status === 401) {
      errorMessage.value = 'Unauthorized: Please login as admin'
      setTimeout(() => router.push('/login'), 2000)
    }
    throw error
  }
}

const updateProduct = async (id: string) => {
  try {
    const response = await productService.updateProduct(id, formData.value)
    successMessage.value = 'Product updated successfully!'
    console.log('Product updated successfully:', response)

    setTimeout(() => {
      router.push('/maindashboard/dashboardcategories')
    }, 1500)
  } catch (error: any) {
    throw error
  }
}

const handleDelete = async () => {
  if (!productId.value) return

  if (!authStore.token) {
    errorMessage.value = 'You must be logged in as admin to delete products'
    setTimeout(() => router.push('/login'), 2000)
    return
  }

  if (!confirm('Are you sure you want to delete this product?')) {
    return
  }

  try {
    isLoading.value = true
    await productService.deleteProduct(productId.value)
    successMessage.value = 'Product deleted successfully!'

    setTimeout(() => {
      router.push('/maindashboard/dashboardcategories')
    }, 1500)
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Failed to delete product'
    console.error('Error deleting product:', error)
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  formData.value = {
    name: '',
    brand: '',
    category: '',
    description: '',
    scent: '',
    occasion: '',
    gender: '',
    summary: '',
    price: 0,
    discountedPrice: 0,
    stock: 0,
    orders: 0,
    imageUrl: '',
    images: [],
    taxIncluded: false,
    isOnSale: false,
    variants: [],
    features: [],
    scentNotes: [],
  }
  mainImage.value = null
  additionalImages.value = []
  errorMessage.value = ''
  successMessage.value = ''
}

const mainImage = ref<string | null>(null)
const images = ref<string[]>([])
const browseInputRef = ref<HTMLInputElement | null>(null)
const replaceInputRef = ref<HTMLInputElement | null>(null)

// Browse: Add new image (only if no main image exists)
const onBrowseImage = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files ? target.files[0] : null
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      if (!mainImage.value) {
        // Set as main image if no main image exists
        mainImage.value = imageUrl
      } else {
        // Add to additional images if main image already exists
        additionalImages.value.push(imageUrl)
      }
    }
    reader.readAsDataURL(file)
  }
  // Reset input so same file can be selected again
  target.value = ''
}

// Replace: Replace the current main image
const onReplaceImage = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files ? target.files[0] : null
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      mainImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
  // Reset input so same file can be selected again
  target.value = ''
}

const onMainImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files ? target.files[0] : null
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      mainImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
const addImages = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = (e) => {
        additionalImages.value.push(e.target?.result as string)
      }
      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }
}
const setMain = (img: string) => {
  mainImage.value = img
}
const removeImage = (index: number) => {
  const imgToRemove = additionalImages.value[index]
  additionalImages.value.splice(index, 1)
  if (mainImage.value === imgToRemove) {
    mainImage.value = additionalImages.value[0] || null
  }
}

const dateRange = ref()

const salePrice = computed(() => {
  // Calculate sale price based on discountedPrice and taxIncluded
  return formData.value.discountedPrice || 0
})
</script>
