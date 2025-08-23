<template>
    <section class="information-section">

        <div class="content">


            <div class="two-part-content mobile-column threeBlockAnim">

                <div class="info-wrapper" style="flex:4;">
                    <div class="info">
                        <h2 class="topAnim">{{ $t('questionTitle') }}</h2>
                        <div class="section-text leftAnim">
                            <p>{{ $t('questionText') }}</p>
                        </div>
                    </div>
                </div>


                <ContactForm class="rightAnim"/>


            </div>

        </div>

    </section>
</template>

<script>
    import ContactForm from './ContactForm.vue';

    export default {
        components: {
            ContactForm,
        },
    };
</script>
