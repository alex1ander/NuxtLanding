<template>
  <div id="pop-up" :class="{ active: active }">
    <div class="pop-up-form reverse-style">
      <div class="btn-pop-up" @click="$emit('close')">
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

<script>
import ContactForm from './ContactForm.vue';

export default {
  components: { ContactForm },

  props: {
    service: { type: String, default: '' },
    active: { type: Boolean, default: false },
  },
};
</script>
