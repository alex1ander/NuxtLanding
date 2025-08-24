<template>
  <div id="pop-up" :class="{ active: modelValue }">
    <div class="pop-up-form reverse-style">
      <div class="btn-pop-up" @click="$emit('update:modelValue', false)">
        <svg width="13" height="13" class="sprite-svg-fill">
          <use href="#close"></use>
        </svg>
      </div>
      <div class="pop-up-container">
        <ContactForm :service="service" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactForm from './ContactForm.vue'

const props = defineProps<{
  service?: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>
