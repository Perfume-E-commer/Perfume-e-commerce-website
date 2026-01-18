<template>
  <div class="space-y-8">
    
    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Scent Notes</h3>
          <p class="text-sm text-gray-500">Define the Top, Heart, and Base notes with visual representations.</p>
        </div>
        <button 
          @click="addScentNote" 
          type="button"
          class="text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-medium transition-colors"
        >
          + Add Note
        </button>
      </div>

      <div class="space-y-4">
        <div 
          v-for="(note, index) in modelValue.scentNotes" 
          :key="index" 
          class="p-4 border border-gray-200 rounded-xl bg-gray-50/50 relative group transition-all hover:border-indigo-200 hover:shadow-sm"
        >
          <button 
            @click="removeScentNote(index)" 
            type="button"
            class="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div class="md:col-span-7 space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Type</label>
                  <select 
                    v-model="note.type" 
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Top Note">Top Note</option>
                    <option value="Heart Note">Heart Note</option>
                    <option value="Base Note">Base Note</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Scent Name</label>
                  <input 
                    v-model="note.scent" 
                    type="text" 
                    placeholder="e.g. Italian Bergamot"
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div class="md:col-span-5 flex gap-4 items-center">
              <div class="h-16 w-16 flex-shrink-0 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
                <img v-if="note.imageUrl" :src="note.imageUrl" class="h-full w-full object-cover" />
                <span v-else class="text-xs text-gray-300">No Img</span>
              </div>

              <div class="flex-1">
                 <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Note Image</label>
                 
                 <div class="flex gap-2 mb-2">
                   <button 
                     type="button" 
                     @click="toggleNoteInputType(index, 'url')"
                     :class="['text-[10px] font-bold uppercase px-2 py-0.5 rounded', noteInputTypes[index] === 'url' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-400 hover:text-gray-600']"
                   >URL</button>
                   <button 
                     type="button" 
                     @click="toggleNoteInputType(index, 'upload')"
                     :class="['text-[10px] font-bold uppercase px-2 py-0.5 rounded', noteInputTypes[index] === 'upload' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-400 hover:text-gray-600']"
                   >Upload</button>
                 </div>

                 <input 
                   v-if="noteInputTypes[index] === 'url'"
                   v-model="note.imageUrl"
                   type="text" 
                   placeholder="https://..."
                   class="w-full px-2 py-1 text-xs rounded border border-gray-200 focus:border-indigo-500 outline-none"
                 />
                 
                 <div v-else class="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      @change="(e) => handleNoteUpload(e, index)"
                      class="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    <span v-if="uploadingIndex === index" class="absolute right-0 top-0 text-[10px] text-indigo-600 font-medium">Uploading...</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="modelValue.scentNotes.length === 0" class="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
          No scent notes added yet.
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Product Story</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-3">
          <h4 class="text-sm font-bold text-gray-700 uppercase">Intro</h4>
          <input 
            v-model="modelValue.productStory.intro.title"
            type="text" 
            placeholder="Title (e.g. The Modern Woman)"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <textarea 
            v-model="modelValue.productStory.intro.content"
            rows="4" 
            placeholder="Story content..."
            class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          ></textarea>
        </div>

        <div class="space-y-3">
          <h4 class="text-sm font-bold text-gray-700 uppercase">Overture / Design</h4>
          <input 
            v-model="modelValue.productStory.overture.title"
            type="text" 
            placeholder="Title (e.g. The Design)"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <textarea 
            v-model="modelValue.productStory.overture.content"
            rows="4" 
            placeholder="Design details..."
            class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Features & Specifications</h3>
        <button 
          @click="addFeature" 
          type="button"
          class="text-sm text-indigo-600 font-medium hover:text-indigo-800"
        >
          + Add Feature
        </button>
      </div>

      <div class="space-y-3">
        <div v-for="(feature, index) in modelValue.features" :key="index" class="flex gap-4">
          <input 
            v-model="feature.title" 
            placeholder="Title (e.g. Fragrance Family)" 
            class="flex-1 min-w-0 px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input 
            v-model="feature.content" 
            placeholder="Content (e.g. Floral, Woody)" 
            class="flex-[2] min-w-0 px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button 
            @click="removeFeature(index)"
            type="button"
            class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import adminService from '@/services/adminService';

const props = defineProps<{
  modelValue: {
    scentNotes: Array<{ type: string; scent: string; imageUrl: string }>;
    productStory: {
      intro: { title: string; content: string };
      overture: { title: string; content: string };
    };
    features: Array<{ title: string; content: string }>;
  }
}>();

const emit = defineEmits(['update:modelValue']);

const uploadingIndex = ref<number | null>(null);
const noteInputTypes = ref<Record<number, 'url' | 'upload'>>({});

const addScentNote = () => {
  const newNotes = [...props.modelValue.scentNotes, { type: 'Top Note', scent: '', imageUrl: '' }];
  updateModel('scentNotes', newNotes);
  noteInputTypes.value[newNotes.length - 1] = 'url';
};

const removeScentNote = (index: number) => {
  const newNotes = [...props.modelValue.scentNotes];
  newNotes.splice(index, 1);
  updateModel('scentNotes', newNotes);
};

const toggleNoteInputType = (index: number, type: 'url' | 'upload') => {
  noteInputTypes.value[index] = type;
};

const handleNoteUpload = async (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  uploadingIndex.value = index;
  try {
    const res = await adminService.uploadImage(file);
    const newNotes = [...props.modelValue.scentNotes];
    newNotes[index].imageUrl = res.data.url;
    updateModel('scentNotes', newNotes);
  } catch (error) {
    console.error('Note image upload failed', error);
    alert('Failed to upload image.');
  } finally {
    uploadingIndex.value = null;
  }
};

// --- Features Logic ---
const addFeature = () => {
  const newFeatures = [...props.modelValue.features, { title: '', content: '' }];
  updateModel('features', newFeatures);
};

const removeFeature = (index: number) => {
  const newFeatures = [...props.modelValue.features];
  newFeatures.splice(index, 1);
  updateModel('features', newFeatures);
};

// --- Helper ---
const updateModel = (key: string, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
};
</script>