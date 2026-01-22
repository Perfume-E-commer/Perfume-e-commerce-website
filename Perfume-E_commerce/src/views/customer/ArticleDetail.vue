<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const allArticles = [
  {
    id: 1,
    image: '/Image/HomePage/Green1.png',
    title: 'The smoothing Symphony of Muguet Perfume: Unlocking the secrets of a Fragrant Elixir',
    description:
      'Muguet, with its enchanting aroma and rich history, has been cherished for centuries as a symbol of relaxation, healing, and timeless beauty. In the world of perfumery, lavender plays a key role in creating captivating fragrances loved by many.',
    fullContent: `
      <p>Muguet, also known as Lily of the Valley, is one of the most beloved and iconic flowers in the world of perfumery. Its delicate, fresh, and green floral scent has captivated perfumers and fragrance lovers for centuries.</p>
      
      <h3>The History of Muguet in Perfumery</h3>
      <p>The use of Muguet in perfumery dates back to ancient times. In France, it has been a symbol of spring and good luck, traditionally given on May 1st as a token of happiness. This cultural significance has made it a cherished note in many classic and contemporary fragrances.</p>
      
      <h3>The Scent Profile</h3>
      <p>Muguet offers a unique olfactory experience that combines:</p>
      <ul>
        <li><strong>Fresh green notes</strong> - reminiscent of dewy morning gardens</li>
        <li><strong>Delicate floral sweetness</strong> - soft and feminine</li>
        <li><strong>Watery transparency</strong> - clean and pure</li>
        <li><strong>Subtle powdery undertones</strong> - adding depth and elegance</li>
      </ul>
      
      <h3>Famous Muguet Fragrances</h3>
      <p>Many legendary perfumes have featured Muguet as a star ingredient, including Dior's Diorissimo, created by Edmond Roudnitska in 1956, which remains one of the most faithful representations of the flower.</p>
      
      <h3>How to Wear Muguet Fragrances</h3>
      <p>Muguet-based perfumes are perfect for spring and summer, daytime wear, and occasions where you want to project an image of freshness and elegance. They pair beautifully with light, flowing fabrics and pastel colors.</p>
    `,
    author: 'ScentHaven Editorial',
    date: 'January 15, 2026',
    readTime: '5 min read',
    category: 'Fragrance Education',
  },
  {
    id: 2,
    image: '/Image/HomePage/Dior-Sauvage-Eau-De-Parfum.png',
    title: 'The Art of Curating a Luxury Perfume Collection: A Symphony of Scents and Stories',
    description:
      "A luxury perfume collection is of Fragrances, it is a reflection of one's taste. Personality, and experience. Each bottle holds a unique olfactory journey, crafted with the finest ingredient and artistic mastery.",
    fullContent: `
      <p>Building a luxury perfume collection is an art form that goes beyond simply accumulating bottles. It's about curating a sensory wardrobe that reflects your personality, occasions, and moods.</p>
      
      <h3>Understanding Fragrance Families</h3>
      <p>A well-rounded collection should include representatives from different fragrance families:</p>
      <ul>
        <li><strong>Floral</strong> - romantic and feminine classics</li>
        <li><strong>Oriental</strong> - warm, spicy, and sensual</li>
        <li><strong>Woody</strong> - sophisticated and grounding</li>
        <li><strong>Fresh</strong> - clean, citrus, and aquatic notes</li>
        <li><strong>Gourmand</strong> - sweet, edible-inspired scents</li>
      </ul>
      
      <h3>Investing in Quality</h3>
      <p>When building a luxury collection, focus on quality over quantity. Look for perfumes with:</p>
      <ul>
        <li>High-quality natural ingredients</li>
        <li>Excellent longevity and projection</li>
        <li>Unique compositions from master perfumers</li>
        <li>Beautiful, collectible bottles</li>
      </ul>
      
      <h3>Storing Your Collection</h3>
      <p>Proper storage is essential to preserve your fragrances. Keep them away from direct sunlight, extreme temperatures, and humidity. A cool, dark drawer or cabinet is ideal.</p>
      
      <h3>Building Over Time</h3>
      <p>A great collection is built gradually. Take time to explore, sample, and understand what truly resonates with you before making purchases. Each addition should bring joy and serve a purpose in your olfactory wardrobe.</p>
    `,
    author: 'ScentHaven Editorial',
    date: 'January 10, 2026',
    readTime: '7 min read',
    category: 'Collection Guide',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1400&h=700&fit=crop',
    title: 'The Timeless Elegance of Archies Perfumes: Unveiling the Queen of Flowers in Fragrance',
    description:
      'Rose, often referred to as the "Queen of Flowers". has held as special place in human culture and history for centuries. Beyond it\'s captivating beauty, this iconic bloom has also inspired perfumes to create some of the most timeless and exquisite fragrance in the world.',
    fullContent: `
      <p>Rose has been called the "Queen of Flowers" for good reason. Its complex, multifaceted scent has inspired countless perfumers throughout history, and it remains one of the most popular and versatile notes in perfumery today.</p>
      
      <h3>The Many Faces of Rose</h3>
      <p>Not all roses smell the same. Different varieties offer distinct olfactory profiles:</p>
      <ul>
        <li><strong>Damask Rose</strong> - rich, honeyed, and deeply romantic</li>
        <li><strong>Bulgarian Rose</strong> - fresh, dewy, and green</li>
        <li><strong>Turkish Rose</strong> - spicy and slightly fruity</li>
        <li><strong>Centifolia Rose</strong> - powdery and elegant</li>
      </ul>
      
      <h3>Rose in Modern Perfumery</h3>
      <p>Contemporary perfumers have found innovative ways to present rose, pairing it with unexpected notes like oud, leather, pepper, and even cannabis. These modern interpretations have made rose fragrances appealing to all genders.</p>
      
      <h3>The Extraction Process</h3>
      <p>It takes approximately 10,000 pounds of rose petals to produce just one pound of rose essential oil, making it one of the most precious ingredients in perfumery. This labor-intensive process contributes to the luxurious nature of rose-based fragrances.</p>
      
      <h3>Iconic Rose Perfumes</h3>
      <p>From classic compositions like Joy by Jean Patou to modern masterpieces like Portrait of a Lady by Frederic Malle, rose continues to be the heart of some of the world's most beloved fragrances.</p>
    `,
    author: 'ScentHaven Editorial',
    date: 'January 5, 2026',
    readTime: '6 min read',
    category: 'Ingredient Spotlight',
  },
]

const articleId = computed(() => Number(route.params.id))
const article = computed(() => allArticles.find((a) => a.id === articleId.value))
const relatedArticles = computed(() => allArticles.filter((a) => a.id !== articleId.value))

const goBack = () => {
  router.back()
}

const shareOnFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')
}

const shareOnTwitter = () => {
  window.open(
    `https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.value?.title}`,
    '_blank',
  )
}

const shareOnLinkedIn = () => {
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
    '_blank',
  )
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <header class="bg-white z-50">
      <Navbar />
    </header>

    <main class="flex-1 pt-20 md:pt-24">
      <div v-if="!article" class="min-h-[60vh] flex items-center justify-center px-4">
        <div class="text-center">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 luxurious-roman-regular">
            Article Not Found
          </h1>
          <p class="text-gray-500 mb-8 max-w-md mx-auto">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <router-link
            to="/"
            class="inline-flex items-center gap-2 px-6 py-3 bg-[#280559] text-white rounded-full hover:bg-[#280559]/90 transition-all duration-300 luxurious-roman-regular"
          >
            <ArrowLeft class="w-4 h-4" />
            Back to Home
          </router-link>
        </div>
      </div>

      <template v-else>
        <div class="relative">
          <div class="absolute top-10 left-4 md:left-8 z-10">
            <button
              @click="goBack"
              class="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-[#280559] rounded-full shadow-lg hover:bg-white transition-all duration-300 luxurious-roman-regular text-sm font-medium"
            >
              <ArrowLeft class="w-4 h-4" />
              <span class="hidden sm:inline">Back</span>
            </button>
          </div>

          <div class="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] relative overflow-hidden">
            <img :src="article.image" :alt="article.title" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
            ></div>

            <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-16">
              <div class="max-w-4xl mx-auto">
                <span
                  class="inline-block px-4 py-1.5 bg-[#280559] text-white text-xs md:text-sm font-medium rounded-full mb-4 luxurious-roman-regular"
                >
                  {{ article.category }}
                </span>

                <h1
                  class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white luxurious-roman-regular leading-tight mb-4"
                >
                  {{ article.title }}
                </h1>

                <div class="flex flex-wrap items-center gap-3 md:gap-6 text-white/80 text-sm">
                  <div class="flex items-center gap-2">
                    <User class="w-4 h-4" />
                    <span class="luxurious-roman-regular">{{ article.author }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Calendar class="w-4 h-4" />
                    <span class="luxurious-roman-regular">{{ article.date }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Clock class="w-4 h-4" />
                    <span class="luxurious-roman-regular">{{ article.readTime }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <p
            class="text-lg md:text-xl text-gray-700 luxurious-roman-regular leading-relaxed mb-10 font-medium border-l-4 border-[#280559] pl-6 italic"
          >
            {{ article.description }}
          </p>

          <div class="article-content luxurious-roman-regular" v-html="article.fullContent"></div>

          <div class="mt-12 pt-8 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex items-center gap-2 text-gray-600">
                <Share2 class="w-5 h-5" />
                <span class="font-medium luxurious-roman-regular">Share this article</span>
              </div>
              <div class="flex gap-3">
                <button
                  @click="shareOnFacebook"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-[#280559] text-white hover:bg-[#280559]/90 transition-all duration-300 hover:scale-110"
                  title="Share on Facebook"
                >
                  <Facebook class="w-5 h-5" />
                </button>
                <button
                  @click="shareOnTwitter"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-[#280559] text-white hover:bg-[#280559]/90 transition-all duration-300 hover:scale-110"
                  title="Share on Twitter"
                >
                  <Twitter class="w-5 h-5" />
                </button>
                <button
                  @click="shareOnLinkedIn"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-[#280559] text-white hover:bg-[#280559]/90 transition-all duration-300 hover:scale-110"
                  title="Share on LinkedIn"
                >
                  <Linkedin class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Articles -->
        <div class="bg-gray-50 py-12 md:py-16">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3
              class="text-2xl md:text-3xl font-bold text-[#280559] mb-8 luxurious-roman-regular text-center"
            >
              Continue Reading
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <router-link
                v-for="relatedArticle in relatedArticles"
                :key="relatedArticle.id"
                :to="`/article/${relatedArticle.id}`"
                class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div class="relative h-48 md:h-56 overflow-hidden">
                  <img
                    :src="relatedArticle.image"
                    :alt="relatedArticle.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute top-4 left-4">
                    <span
                      class="px-3 py-1 bg-[#280559] text-white text-xs rounded-full luxurious-roman-regular"
                    >
                      {{ relatedArticle.category }}
                    </span>
                  </div>
                </div>
                <div class="p-5 md:p-6">
                  <h4
                    class="font-semibold text-gray-800 group-hover:text-[#280559] transition-colors luxurious-roman-regular text-lg mb-3 line-clamp-2"
                  >
                    {{ relatedArticle.title }}
                  </h4>
                  <p class="text-gray-500 text-sm luxurious-roman-regular line-clamp-2 mb-4">
                    {{ relatedArticle.description }}
                  </p>
                  <div class="flex items-center justify-between text-sm text-gray-400">
                    <span class="luxurious-roman-regular">{{ relatedArticle.date }}</span>
                    <span class="luxurious-roman-regular">{{ relatedArticle.readTime }}</span>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- Back to Home -->
            <div class="text-center mt-10">
              <router-link
                to="/"
                class="inline-flex items-center gap-2 px-8 py-3 bg-[#280559] text-white rounded-full hover:bg-[#280559]/90 transition-all duration-300 luxurious-roman-regular font-medium"
              >
                Back to Home
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </main>

    <footer class="bg-gray-50">
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.article-content :deep(h3) {
  font-size: 1.375rem;
  font-weight: 700;
  color: #280559;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #280559;
  display: inline-block;
}

.article-content :deep(p) {
  color: #4b5563;
  line-height: 1.9;
  margin-bottom: 1.25rem;
  font-size: 1.0625rem;
}

.article-content :deep(ul) {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
}

.article-content :deep(li) {
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 0.75rem;
  padding-left: 1.75rem;
  position: relative;
}

.article-content :deep(li)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 8px;
  height: 8px;
  background-color: #280559;
  border-radius: 50%;
}

.article-content :deep(strong) {
  color: #280559;
  font-weight: 600;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .article-content :deep(h3) {
    font-size: 1.25rem;
  }

  .article-content :deep(p) {
    font-size: 1rem;
    line-height: 1.8;
  }
}
</style>
