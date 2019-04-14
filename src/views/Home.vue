<template>
<div class="home">
  <div class="home__layer animated slow delay-2s fadeIn"></div>
  <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur1 fadeOut"
      appear
      mode="out-in">
  <div class="home__head" v-if='home'>
    <div class="home__row row">
      <div class="home__inner animated slow delay-01 fadeIn">
        <img src="@/assets/images/Kremenchuk.png" alt="logo" class="home__logo">
      </div>
      <div class="home__inner">
        <p class="home__title animated slow delay-05 fadeIn">Привіт!</p>
        <h1 class="home__title animated slow delay-1s fadeIn">Ласкаво просимо в школу №23</h1>
      </div>
    </div>
    <div class="home__row">
      <a-button
        @click.native='start'
        class="home__button animated slow delay-2s fadeIn"
        type="primary"
        :size="'large'">Увійти</a-button>
    </div>
  </div>
  </transition>
</div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      home: true,
    };
  },
  methods: {
    start() {
      this.home = false;
      localStorage.setItem('school23', 'visite');
      setTimeout(() => this.$router.push({ name: 'news' }), 1000);
    },
  },
};
</script>
<style lang="scss">
.home {
  padding: 80px 120px;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(~@/assets/images/23_bg2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  &__row {
    @include flex-row(flex-start, center);
    margin-bottom: 32px;
  }
  &__layer {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }
  &__bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  &__head {
    position: relative;
    z-index: 2;
  }
  &__title {
    @include text($H900, 500, $N0);
    margin-bottom: 16px;
    &:last-child {
      margin: 0;
    }
  }
  &__logo {
    width: 60px;
    margin-right: 24px;
  }
  &__button {
    padding: {
      right: 32px;
      left: 32px;
    }
  }
}
</style>

