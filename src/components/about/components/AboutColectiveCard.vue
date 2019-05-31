<template>
  <div class="about-colective-card">
    <img
    src="@/assets/images/poroh.jpg"
    alt="John"
    class="about-colective-card__img"
    @click='visible = true'>
    <div class="about-colective-card__body">
      <h3 class="about-colective-card__title">Петро Порошенко</h3>
      <p class="about-colective-card__job">Викладач права</p>
      <div class="about-colective-card__social">
        <a href="#" class="about-colective-card__link"><a-icon type="twitter"/></a>
        <a href="#" class="about-colective-card__link"><a-icon type="mail"/></a>
        <a href="#" class="about-colective-card__link"><a-icon type="facebook"/></a>
      </div>
    </div>
    
    <about-colective-modal :visible='visible' @change='(e) => {visible = e}'></about-colective-modal>
  </div>
</template>
<script>
import AboutColectiveModal from '@/components/about/components/AboutColectiveModal.vue';

export default {
  name: 'AboutColectiveCard',
  data() {
    return {
      visible: false,
    }
  },
  components: {
    AboutColectiveModal,
  }
}
</script>

<style lang="scss">
.about-colective-card {
  box-shadow: $shadow;
  max-width: 250px;
  text-align: center;
  border-radius: 4px;
  height: 280px;
  overflow: hidden;
  @include flex-col(flex-start, center);
  background-color: $N0;
  transition: box-shadow ease 0.2s;
  &:hover {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  }
  &__img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    cursor: pointer;
    transition: filter ease 0.2s;
    &:hover {
      filter: brightness(0.9);
    }
  }
  &__body {
    width: 100%;
    height: 100px;
    padding: 12px;
  }
  &__title {
    @include text($H600, 500, $N15);
    margin-bottom: 6px;
  }

  &__job {
    @include text($H400, 500, $N9);
    margin-bottom: 6px;
  }

  &__social {
    // margin-bottom: 12px;
  }

  &__link {
    text-decoration: none;
    font-size: 16px;
    color: $B3;
    margin-right: 16px;
  }

  &__btn {
    width: 80%;
  }
}
</style>

