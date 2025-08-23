<template>
  <div class="dropdown-list" ref="dropdown" :class="{ active: isDropdownActive }">
    <div class="dropdown-head text-with-svg btn-backarea mobile-circle" @click="toggleDropdown">
      <svg width="24" height="24" class="sprite-svg-fill">
        <use href="#call"></use>
      </svg>
      <span class="contact-label">{{ $t('phoneNumber') }}</span>
    </div>
    <div class="dropdown-body" @click.stop>
      <ul class="selected-list animated-list">
        <li
          v-for="contact in contacts"
          :key="contact.value"
          class="cursor-hover"
        >
          <a :href="contact.value" rel="noopener noreferrer">
            {{ contact.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownActive: false,
      contacts: [
        { label: '+38 012 345 67 89', value: 'tel:+380123456789' },
        { label: 'support@example.com', value: 'mailto:support@example.com' },
        { label: '+38 098 765 43 21', value: 'tel:+380987654321' },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownActive = !this.isDropdownActive;
    },
    onClickOutside(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.isDropdownActive = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  },
};
</script>

<style scoped lang="scss">
.dropdown-body {
  right: 0;
}

.selected-list li a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
</style>
