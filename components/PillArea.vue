<template>
    <section class="information-section">


        <div class="content padding-left-0 padding-right-plus">
            <div class="pill-place reverse-style mobile-column">
                <div class="pill-area">
                    <h2>{{ $t('consultTitle') }}</h2>
                </div>
                <button class="btn-160-circle pill-btn btn-pop-up" @click="$emit('open-contact-form', $t('PillArea'))">{{ $t('consultBtn') }}</button>
            </div>

        </div>
    </section>
</template>


<script>
export default {
  methods: {
    setService(serviceText) {
      this.$emit('open-contact-form', serviceText)
    }
  }
}
</script>