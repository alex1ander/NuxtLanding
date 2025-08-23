<template>
  <div class="dropdown-list" ref="dropdown" :class="{ active: isDropdownActive }">
    <div class="dropdown-head text-with-svg btn-backarea mobile-circle" @click="toggleDropdown">
      <svg width="30" height="30" class="sprite-svg-fill">
        <use href="#earth"></use>
      </svg>
      <span class="lang-code">{{ $t('currentLanguageCode') }}</span>
    </div>
    <div class="dropdown-body" @click.stop>
      <ul class="selected-list animated-list">
        <li class="cursor-hover" :class="{ active: locale.value === 'ua' }" @click.stop="switchLanguage('ua')"> 
          Українська
          <svg v-if="locale.value === 'ua'" width="16" height="16" class="sprite-svg-fill">
            <use href="#check"></use>
          </svg>
        </li>
        <li class="cursor-hover"  :class="{ active: locale.value === 'ru' }" @click.stop="switchLanguage('ru')">
          Русский
          <svg v-if="locale.value === 'ru'" width="24" height="24" class="sprite-svg-fill">
            <use href="#check"></use>
          </svg>
        </li>
        <li class="cursor-hover"  :class="{ active: locale.value === 'en' }" @click.stop="switchLanguage('en')">
          English
          <svg v-if="locale.value === 'en'" width="24" height="24" class="sprite-svg-fill">
            <use href="#check"></use>
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isDropdownActive: false, // по умолчанию меню скрыто
      locale: {
        value: localStorage.getItem('lang') || 'en',
      },
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownActive = !this.isDropdownActive;
    },
    switchLanguage(language) {
      this.locale.value = language;

      const currentRoute = this.$route;
      const params = { ...currentRoute.params, lang: language };

      this.$router.push({
        name: currentRoute.name,
        params,
        query: currentRoute.query,
      });

      localStorage.setItem('lang', language);
      document.documentElement.lang = language;
      this.isDropdownActive = false;
    },
    onClickOutside(event) {
      // Если клик произошёл вне компонента — закрываем дропдаун
      if (!this.$refs.dropdown.contains(event.target)) {
        this.isDropdownActive = false;
      }
    },
  },
  watch: {
    'locale.value': function(newLang) {
      this.$i18n.locale = newLang;
    },
  },
  mounted() {
    this.$i18n.locale = this.locale.value;
    document.addEventListener('click', this.onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  },
};
</script>
