import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, ProductPage } from '@/types/clientProduct'
import { productService } from '@/Services/productService'

function transformBackendProduct(backendData: any): Product {
  return {
    id: backendData.id,
    name: backendData.name,
    price: backendData.price,
    image: backendData.imageUrl,
    descriptions: backendData.description,
    variants: (backendData.variants || []).map((v: any) => ({
      id: v.id || v.size,
      size: v.size,
      imageUrl: v.imageUrl,
      price: v.price,
      stock: v.stock,
    })),
    averageRating: backendData.averageRating || 0,
    totalReviews: backendData.totalReviews || 0,
    productStorys: {
      intro: backendData.productStory?.intro || { title: '', content: '' },
      overture: backendData.productStory?.overture || { title: '', content: '' },
      keyNotes: [],
      features: backendData.features || [],
      scentNotes: (backendData.scentNotes || []).map((note: any) => ({
        type: note.type,
        scent: note.scent,
        image: note.imageUrl,
      })),
    },
    brand: backendData.brand,
    category: backendData.category,
    scent: backendData.scent,
    occasion: backendData.occasion,
  }
}

export const useProductStore = defineStore('product', () => {
  // State
  const products = ref<Product[]>([])
  const allProducts = ref<Product[]>([]) // Store all products for filtering
  const currentProduct = ref<Product | null>(null)
  const activeFilters = ref<Record<string, string[]>>({})
  const sortOption = ref<string | null>(null)

  const pagination = ref({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    last: false,
  })

  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasProducts = computed(() => products.value.length > 0)
  const totalProducts = computed(() => pagination.value.totalElements)

  async function fetchAllProducts() {
    loading.value = true
    error.value = null
    try {
      const response = await productService.getAllProducts()
      console.log('Fetched products:', response.data)
      const data = response.data
      const transformedProducts = Array.isArray(data)
        ? data.map(transformBackendProduct)
        : data.content.map(transformBackendProduct)
      allProducts.value = transformedProducts
      products.value = transformedProducts
    } catch (err: any) {
      console.error('Error fetching products:', err)
      error.value = err.response?.data?.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  async function fetchProducts(page: number = 0, size: number = 16) {
    loading.value = true
    error.value = null

    try {
      const response = await productService.getPaginationProducts(page, size)
      const data: ProductPage = response.data

      products.value = data.content.map(transformBackendProduct)
      pagination.value = {
        page: data.number,
        size: data.size,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        last: data.last,
      }
    } catch (err: any) {
      console.error('Error fetching products:', err)
      error.value = err.response?.data?.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id: string) {
    loading.value = true
    error.value = null
    currentProduct.value = null
    try {
      const response = await productService.getProductById(id)
      const backendData = response.data

      currentProduct.value = transformBackendProduct(backendData)
    } catch (err: any) {
      error.value = 'Failed to load product details'
    } finally {
      loading.value = false
    }
  }

  async function searchProducts(query: string) {
    loading.value = true
    try {
      const response = await productService.searchProducts(query)
      products.value = response.data
    } catch (err: any) {
      error.value = 'Search failed'
    } finally {
      loading.value = false
    }
  }

  function applyFiltersAndSort() {
    let filtered = [...allProducts.value]
    if (Object.keys(activeFilters.value).length > 0) {
      filtered = filtered.filter((product) => {
        for (const [filterType, filterValues] of Object.entries(activeFilters.value)) {
          if (filterValues.length === 0) continue

          let matches = false

          if (filterType === 'brand') {
            matches = product.brand && filterValues.includes(product.brand)
          } else if (filterType === 'category') {
            matches = product.category && filterValues.includes(product.category)
          } else if (filterType === 'scent') {
            matches = product.scent && filterValues.includes(product.scent)
          } else if (filterType === 'occasion') {
            matches = product.occasion && filterValues.includes(product.occasion)
          }
          if (!matches) {
            return false
          }
        }
        return true
      })
    }

    if (sortOption.value === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOption.value === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortOption.value === 'rating_desc') {
      filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    } else if (sortOption.value === 'rating_asc') {
      filtered.sort((a, b) => (a.averageRating || 0) - (b.averageRating || 0))
    }

    products.value = filtered
    console.log('Filtered products:', filtered.length, 'Active filters:', activeFilters.value)
  }

  function updateFilters(filters: Record<string, string[]>) {
    activeFilters.value = filters
    applyFiltersAndSort()
  }

  function updateSort(sort: string) {
    sortOption.value = sort
    applyFiltersAndSort()
  }

  function clearFilters() {
    activeFilters.value = {}
    sortOption.value = null
    products.value = allProducts.value
  }

  function searchProductsByNameOrBrand(query: string) {
    const lowerQuery = query.toLowerCase()
    // If allProducts is empty, use products array as fallback
    const searchSource = allProducts.value.length > 0 ? allProducts.value : products.value
    const searchResults = searchSource.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(lowerQuery)
      const matchesBrand = product.brand && product.brand.toLowerCase().includes(lowerQuery)
      return matchesName || matchesBrand
    })
    products.value = searchResults
    console.log(`Search results for "${query}":`, searchResults.length, searchResults)
  }

  return {
    // State
    products,
    allProducts,
    currentProduct,
    pagination,
    loading,
    error,
    activeFilters,
    sortOption,

    // Getters
    hasProducts,
    totalProducts,

    // Actions
    fetchAllProducts,
    fetchProducts,
    fetchProductById,
    searchProducts,
    updateFilters,
    updateSort,
    clearFilters,
    searchProductsByNameOrBrand,
  }
})
