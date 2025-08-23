<template>
    <section id="advantages" class="information-section">

        <div class="content top-part-section">
            <div class="two-part-content">
                <h2>{{ $t('ourAdvantagesTitle') }}</h2>
            </div>
        </div>

        <div class="content">

            <div class="servise-grid-wrapper our-advantages animScroll">
            <div class="advantage cardAnim reverse-style">
                <svg width="100" height="100" class="sprite-svg-fill"><use href="#bf-1"></use></svg>

                <h3>{{ $t('advantageTitle_1') }}</h3>
                <p>{{ $t('advantageText_1') }}</p>
                <div class="fill-overlay"></div>
            </div>
            <div class="advantage cardAnim reverse-style">
                <svg width="100" height="100" class="sprite-svg-fill"><use href="#bf-2"></use></svg>
                <h3>{{ $t('advantageTitle_2') }}</h3>
                <p>{{ $t('advantageText_2') }}</p>
            </div>
            <div class="advantage cardAnim reverse-style">
                <svg width="100" height="100" class="sprite-svg-fill"><use href="#bf-3"></use></svg>
                <h3>{{ $t('advantageTitle_3') }}</h3>
                <p>{{ $t('advantageText_3') }}</p>
            </div>
            <div class="advantage cardAnim reverse-style">
                <svg width="100" height="100" class="sprite-svg-fill"><use href="#bf-4"></use></svg>
                <h3>{{ $t('advantageTitle_4') }}</h3>
                <p>{{ $t('advantageText_4') }}</p>
            </div>
            <div class="advantage cardAnim reverse-style">
                <svg width="100" height="100" class="sprite-svg-fill"><use href="#bf-5"></use></svg>
                <h3>{{ $t('advantageTitle_5') }}</h3>
                <p>{{ $t('advantageText_5') }}</p>
            </div>
            <div class="advantage cardAnim reverse-style">
                <svg width="100" height="100" class="sprite-svg-fill"><use href="#bf-6"></use></svg>
                <h3>{{ $t('advantageTitle_6') }}</h3>
                <p>{{ $t('advantageText_6') }}</p>
            </div>
            </div>
        </div>
    </section>

</template>

<script>
  document.querySelectorAll('.advantage').forEach(box => {
    const overlay = box.querySelector('.fill-overlay');

    box.addEventListener('mousemove', (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      overlay.style.width = `${percent}%`;
    });

    box.addEventListener('mouseleave', () => {
      overlay.style.width = `0%`;
    });
  });
</script>



<style lang="scss">
$gradient-start: #3EB0D4;
$gradient-end: #9663C8;
$hover-bg: #fff;
$box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

.advantages {
  padding: 60px 20px;
  background-color: #f9f9f9;
  font-family: sans-serif;

  &__title {
    margin-bottom: 40px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
  }
}

.advantage {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 16px;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "img title"
    "text text";
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: $box-shadow;
  border: 3px solid #797CCC;
  transition: transform 0.4s ease,border 0.4s ease;

  &:hover, &.simulated-hover {
    border: 3px solid $hover-bg;
    transform: translateY(-5px);

    &::after {
      height: 200%;
      width: 200%;
    }

    h3, p {
      color: #fff;
    }

    svg {
      filter: brightness(2);
    }
  }

  img {
    grid-area: img;
    height: 40px;
    width: 40px;
  }

  h3 {
    grid-area: title;
    background: linear-gradient(180deg, $gradient-start 0%, $gradient-end 100%);
    color: transparent;
    background-clip: text;
    transition: color 0.5s;
  }

  p {
    grid-area: text;
    transition: color 0.5s;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    height: 0;
    width: 0;
    z-index: -1;
    border-radius: 100%;
    background-image: linear-gradient(135deg, $gradient-start 0%, $gradient-end 100%);
    transition: height 0.5s ease-in, width 0.5s ease-in;
  }
}

svg {
  .svg-el-2 {
    fill: rgb(230, 225, 225);
  }
  .svg-el-1 {
    fill: rgb(105, 115, 172);
  }
  
  transition: filter 0.5s ease-in;
}


</style>