<template>
  <div class="space-y-8">
    <!-- Scent Profile & Notes Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="flex items-center gap-3 mb-8">
        <div class="p-2 bg-purple-50 rounded-lg">
          <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Scent Profile & Notes</h2>
          <p class="text-sm text-gray-500 mt-1">Define the perfume's scent characteristics and notes pyramid</p>
        </div>
      </div>

      <!-- Scent Family & Occasion - Stacked Vertically -->
      <div class="space-y-5 mb-8">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Scent Family</label>
          <div class="relative">
            <select 
              :value="modelValue.scent"
              @change="updateField('scent', ($event.target as HTMLSelectElement).value)"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none bg-white hover:border-gray-400 transition-colors"
            >
              <option value="" disabled>Select scent family</option>
              <option v-for="s in scents" :key="s" :value="s">{{ s }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Occasion</label>
          <div class="relative">
            <select 
              :value="modelValue.occasion"
              @change="updateField('occasion', ($event.target as HTMLSelectElement).value)"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none bg-white hover:border-gray-400 transition-colors"
            >
              <option value="" disabled>Select occasion</option>
              <option v-for="o in occasions" :key="o" :value="o">{{ o }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Perfume Pyramid - Stacked Vertically -->
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-4">The Perfume Pyramid</label>
          <div class="space-y-6">
            <div v-for="type in noteTypes" :key="type" 
                 class="p-5 rounded-xl border border-gray-200 bg-gray-50">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  {{ type }}
                </h4>
                <span class="text-xs text-gray-500 bg-white px-2.5 py-1 rounded-full">
                  {{ getNotesByType(type).length }} notes
                </span>
              </div>
              
              <!-- Image for this note type -->
              <div class="mb-4">
                <div v-if="getNote(type).imageUrl" class="relative group h-60 w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <img :src="getNote(type).imageUrl" class="w-full h-full object-cover" />
                  <button 
                    @click="updateNoteImage(type, '')" 
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <input 
                  v-else
                  type="text" 
                  placeholder="Paste image URL for this note..." 
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-purple-500 outline-none placeholder:text-gray-400"
                  @change="updateNoteImage(type, ($event.target as HTMLInputElement).value)"
                />
              </div>

              <!-- Notes Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="(note, idx) in getNotesByType(type)" :key="idx" 
                  class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm bg-white border border-gray-200 text-gray-700 shadow-sm hover:border-purple-300 transition-colors">
                  {{ note }}
                  <button 
                    @click="removeNote(type, idx)" 
                    class="text-gray-400 hover:text-red-500 transition-colors p-0.5 rounded-full hover:bg-red-50"
                    aria-label="Remove note"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>

              <!-- Add Note Input -->
              <div class="relative">
                <input 
                  type="text" 
                  @keydown.enter.prevent="addNote(type, $event)"
                  placeholder="Type a scent note and press Enter..."
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder:text-gray-400 hover:border-gray-400 transition-colors"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span class="text-xs text-gray-400">Enter ↵</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features & Settings Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="flex items-center gap-3 mb-8">
        <div class="p-2 bg-blue-50 rounded-lg">
          <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Features & Settings</h2>
          <p class="text-sm text-gray-500 mt-1">Configure product features and visibility settings</p>
        </div>
      </div>

      <!-- Key Features Section -->
      <div class="mb-10">
        <div class="flex items-center justify-between mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Key Features</label>
            <p class="text-sm text-gray-500">Highlight important product characteristics</p>
          </div>
          <button 
            @click="addFeature" 
            type="button" 
            class="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-100 transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Feature
          </button>
        </div>
        
        <!-- Empty State -->
        <div v-if="!modelValue.features?.length" class="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          <svg class="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-sm text-gray-500">No features added yet</p>
        </div>

        <!-- Features List -->
        <div v-else class="space-y-4">
          <div v-for="(feat, index) in modelValue.features" :key="index" 
               class="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:border-gray-300 transition-colors">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1 space-y-3">
                <input 
                  v-model="feat.name" 
                  placeholder="Feature title (e.g., Long-lasting)"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-purple-500 outline-none bg-white"
                />
                <input 
                  v-model="feat.description" 
                  placeholder="Description"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-purple-500 outline-none bg-white"
                />
              </div>
              <button 
                @click="removeFeature(index)" 
                class="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Remove feature"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Section - Stacked Vertically -->
      <div class="space-y-4 pt-6 border-t border-gray-100">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">Product Settings</h3>
        
        <div class="space-y-3">
          <label class="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-700">Active (Visible in store)</span>
                <p class="text-xs text-gray-500 mt-0.5">Product will be visible to customers</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              :checked="modelValue.isActive" 
              @change="updateField('isActive', ($event.target as HTMLInputElement).checked)" 
              class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
          </label>

          <label class="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-700">Featured Product</span>
                <p class="text-xs text-gray-500 mt-0.5">Show in featured section</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              :checked="modelValue.isFeatured" 
              @change="updateField('isFeatured', ($event.target as HTMLInputElement).checked)" 
              class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
          </label>

          <label class="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-700">On Sale Badge</span>
                <p class="text-xs text-gray-500 mt-0.5">Display sale indicator</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              :checked="modelValue.isOnSale" 
              @change="updateField('isOnSale', ($event.target as HTMLInputElement).checked)" 
              class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
          </label>

          <label class="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-700">Tax Included</span>
                <p class="text-xs text-gray-500 mt-0.5">Price includes all taxes</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              :checked="modelValue.taxIncluded" 
              @change="updateField('taxIncluded', ($event.target as HTMLInputElement).checked)" 
              class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ScentNote } from '@/types/Product'

const props = defineProps<{
  modelValue: Product,
  scents: string[],
  occasions: string[]
}>()

const emit = defineEmits(['update:modelValue'])

const noteTypes = ['Top Note', 'Heart Note', 'Base Note']

// --- Logic ---

const updateField = (field: keyof Product, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

// Helper to get full note object for a specific type
const getNote = (type: string) => {
  return props.modelValue.scentNotes?.find(n => n.type === type) || { type, scent: '', imageUrl: '' }
}

// Helper to get notes array for a specific type (safe access)
const getNotesByType = (type: string) => {
  const note = getNote(type)
  return note.scent ? note.scent.split(',').map(s => s.trim()).filter(s => s) : []
}

// Update note image URL
const updateNoteImage = (type: string, imageUrl: string) => {
  let currentScentNotes = props.modelValue.scentNotes ? [...props.modelValue.scentNotes] : []
  const existingIndex = currentScentNotes.findIndex(n => n.type === type)
  
  if (existingIndex >= 0) {
    // Update existing note with new image
    currentScentNotes[existingIndex] = { 
      ...currentScentNotes[existingIndex], 
      imageUrl 
    }
  } else {
    // Create new note with image
    currentScentNotes.push({ 
      type: type as any, 
      scent: '',
      imageUrl 
    })
  }

  updateField('scentNotes', currentScentNotes)
}

// Add a note when user hits Enter
const addNote = (type: string, event: Event) => {
  const input = event.target as HTMLInputElement
  const val = input.value.trim()
  if (!val) return

  let currentScentNotes = props.modelValue.scentNotes ? [...props.modelValue.scentNotes] : []
  const existingIndex = currentScentNotes.findIndex(n => n.type === type)
  
  if (existingIndex >= 0) {
    // Get current scent string and append new note
    const currentScent = currentScentNotes[existingIndex].scent || ''
    const newScent = currentScent ? `${currentScent}, ${val}` : val
    
    currentScentNotes[existingIndex] = { 
      ...currentScentNotes[existingIndex], 
      scent: newScent 
    }
  } else {
    // Create new note
    currentScentNotes.push({ 
      type: type as any, 
      scent: val,
      imageUrl: ''
    })
  }

  updateField('scentNotes', currentScentNotes)
  input.value = '' // clear input
}

const removeNote = (type: string, noteIndex: number) => {
  let currentScentNotes = props.modelValue.scentNotes ? [...props.modelValue.scentNotes] : []
  const typeIndex = currentScentNotes.findIndex(n => n.type === type)

  if (typeIndex >= 0) {
    const currentScent = currentScentNotes[typeIndex].scent || ''
    const scentArray = currentScent.split(',').map(s => s.trim()).filter(s => s)
    scentArray.splice(noteIndex, 1)
    
    currentScentNotes[typeIndex] = { 
      ...currentScentNotes[typeIndex], 
      scent: scentArray.join(', ') 
    }
    updateField('scentNotes', currentScentNotes)
  }
}

const addFeature = () => {
  const currentFeatures = props.modelValue.features ? [...props.modelValue.features] : []
  currentFeatures.push({ name: '', description: '' })
  updateField('features', currentFeatures)
}

const removeFeature = (index: number) => {
  const currentFeatures = props.modelValue.features ? [...props.modelValue.features] : []
  currentFeatures.splice(index, 1)
  updateField('features', currentFeatures)
}
</script>