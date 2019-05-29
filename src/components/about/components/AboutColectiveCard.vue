<template>
  <div class="about-colective-card">
    <img
    src="@/assets/images/poroh.jpg"
    alt="John"
    class="about-colective-card__img">
    <h1 class="about-colective-card__title">Петро Порошенко</h1>
    <p class="about-colective-card__job">Викладач права</p>
    <div class="about-colective-card__social">
      <a href="#" class="about-colective-card__link"><a-icon type="twitter"/></a>
      <a href="#" class="about-colective-card__link"><a-icon type="mail"/></a>
      <a href="#" class="about-colective-card__link"><a-icon type="facebook"/></a>
    </div>
    <about-colective-modal></about-colective-modal>
  </div>
</template>
<script>
import AboutColectiveModal from '@/components/about/components/AboutColectiveModal.vue';

export default {
  name: 'AboutColectiveCard',
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
  @include flex-col(flex-start, center);
  padding-bottom: 20px;
  background-color: $N0;

  &__img {
    width: 100%;
    margin-bottom: 8px;
    object-fit: contain;
  }

  &__title {
  margin-bottom: 8px;
  }

  &__job {
  color: grey;
  font-size: 18px;
  margin-bottom: 8px;
  }

  &__social {
    margin-bottom: 12px;
  }

  &__link {
    text-decoration: none;
    font-size: 20px;
    color: $B4;
    margin-right: 16px;
  }

  &__btn {
    width: 80%;
  }
}
</style>

