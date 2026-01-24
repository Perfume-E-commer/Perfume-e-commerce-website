import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/clientProduct'
import productService from '@/services/productService'

function transformBackendProduct(backendData: any): Product {
  return {
    id: backendData.id,
    name: backendData.name,
    price: backendData.price,
    image:
      backendData.variants && backendData.variants.length > 0
        ? backendData.variants[0].imageUrl
        : '',
    stock: backendData.stock || 0,
    summary: backendData.summary || '',
    images: backendData.images || [],
    descriptions: backendData.description,
    variants: (backendData.variants || []).map((v: any) => ({
      id: v.id || v.size,
      size: v.size,
      imageUrl: v.imageUrl,
      price: v.price,
      stock: v.stock,
    })),
    averageRating: (() => {
      const raw = Number(backendData.averageRating) || 0
      return Math.max(0, Math.min(5, raw))
    })(),
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
    isFeatured: backendData.isFeatured || false,
    isOnSale: backendData.isOnSale || false,
  }
}

export const useProductStore = defineStore('product', () => {
  // State
  const products = ref<Product[]>([])
  const allProducts = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const activeFilters = ref<Record<string, string[]>>({})
  const sortOption = ref<string | null>(null)

  const pagination = ref({
    page: 0,
    size: 12,
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

  // async function fetchProducts(page: number = 0, size: number = 12) {
  //   loading.value = true
  //   error.value = null

  //   try {
  //     const response = await productService.getPaginationProducts(page, size)
  //     const data = response.data

  //     let products_content = data.content || data

  //     let pageInfo = {
  //       page: page,
  //       size: size,
  //       totalElements: 0,
  //       totalPages: 0,
  //       last: false,
  //     }

  //     if (data.page) {
  //       let totalElements = data.page.totalElements ?? 0
  //       let totalPages = data.page.totalPages ?? 0
  //       if (products_content && Array.isArray(products_content) && products_content.length > 0) {
  //         if (products_content.length < size && page > 0) {
  //           totalElements = page * size + products_content.length
  //           totalPages = Math.ceil(totalElements / size)
  //         }
  //       }

  //       pageInfo = {
  //         page: data.page.number ?? page,
  //         size: data.page.size ?? size,
  //         totalElements: totalElements,
  //         totalPages: totalPages,
  //         last: data.page.last ?? false,
  //       }
  //     } else {
  //       pageInfo = {
  //         page: page,
  //         size: data.size ?? size,
  //         totalElements: data.totalElements ?? 0,
  //         totalPages: data.totalPages ?? 0,
  //         last: data.last ?? false,
  //       }
  //     }

  //     const transformedProducts = products_content.map(transformBackendProduct)
  //     products.value = transformedProducts

  //     if (page === 0) {
  //       allProducts.value = transformedProducts
  //     }

  //     pagination.value = pageInfo
  //   } catch (err: any) {
  //     console.error('Error fetching products:', err)
  //     error.value = err.response?.data?.message || 'Failed to fetch products'
  //   } finally {
  //     loading.value = false
  //   }
  // }

  async function fetchProducts(page: number = 0, size: number = 12) {
    loading.value = true
    error.value = null

    try {
      const response = await productService.getPaginationProducts(page, size)
      const data = response.data

      console.log(`Debug Page ${page}:`, data)

      // 1. Extract content safely
      let products_content = data.content || data || []

      // 2. Extract pagination info safely
      let currentTotalPages = 0
      let currentTotalElements = 0
      let isLast = false

      if (data.page) {
        currentTotalPages = data.page.totalPages ?? 0
        currentTotalElements = data.page.totalElements ?? 0
        isLast = data.page.last ?? false
      } else {
        currentTotalPages = data.totalPages ?? 0
        currentTotalElements = data.totalElements ?? 0
        isLast = data.last ?? false
      }

      if (products_content.length === 0 && page > 0) {
        console.warn('Backend returned no products for page', page)
      }

      const transformedProducts = products_content.map(transformBackendProduct)
      products.value = transformedProducts

      if (page === 0) {
        allProducts.value = transformedProducts
      }
      pagination.value = {
        page: page,
        size: size,
        totalElements: currentTotalElements,
        totalPages: currentTotalPages,
        last: isLast,
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
            matches = !!(product.brand && filterValues.includes(product.brand))
          } else if (filterType === 'category') {
            matches = !!(product.category && filterValues.includes(product.category))
          } else if (filterType === 'scent') {
            matches = !!(product.scent && filterValues.includes(product.scent))
          } else if (filterType === 'occasion') {
            matches = !!(product.occasion && filterValues.includes(product.occasion))
          } else if (filterType === 'price') {
            // filterValues expected as [min, max]
            const min = Number(filterValues[0]) || 0
            const max = Number(filterValues[1]) || Number.POSITIVE_INFINITY
            matches =
              typeof product.price === 'number' && product.price >= min && product.price <= max
          } else if (filterType === 'rating') {
            // filterValues are strings '0'..'5'
            const avg = Number(product.averageRating) || 0
            const star = avg === 0 ? 0 : Math.floor(avg)
            matches = filterValues.includes(String(star))
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
    } else if (sortOption.value && sortOption.value.startsWith('rating_eq_')) {
      // sort so products with exact floored star count come first
      const parts = sortOption.value.split('_')
      const target = Number(parts.pop())
      filtered.sort((a, b) => {
        const aAvg = Number(a.averageRating) || 0
        const bAvg = Number(b.averageRating) || 0
        const aStar = aAvg === 0 ? 0 : Math.floor(aAvg)
        const bStar = bAvg === 0 ? 0 : Math.floor(bAvg)
        const aMatch = aStar === target ? 0 : 1
        const bMatch = bStar === target ? 0 : 1
        if (aMatch !== bMatch) return aMatch - bMatch
        // secondary sort by average rating desc
        return bAvg - aAvg
      })
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
    products,
    allProducts,
    currentProduct,
    pagination,
    loading,
    error,
    activeFilters,
    sortOption,

    hasProducts,
    totalProducts,

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
