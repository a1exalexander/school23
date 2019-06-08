<template>
<transition
  name="custom-classes-transition"
  enter-active-class="animated dur04 fadeIn"
  leave-active-class="animated dur02 fadeOut"
  appear>
  <video-bg
  :sources="[video]"
  :img="img"
  class="home">
  <!-- If you want to add content here, a slot is waiting! -->
 
  <div class="home__layer animated slow fadeIn"></div>
  <transition
      name="custom-classes-transition"
      enter-active-class="animated dur04 fadeIn"
      leave-active-class="animated dur04 fadeOut"
      appear>
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
 </video-bg>
</transition>
</template>
<script>
import VideoBg from 'vue-videobg';

export default {
  name: 'Home',
  data() {
    return {
      home: true,
      video: require('@/assets/video/school.mp4'),
      img: require('@/assets/images/23_bg2.jpg'),
    };
  },
  components: {
    VideoBg,
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
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  // z-index: 10;
  // background-image: url(~@/assets/images/23_bg2.jpg);
  background-color: #1D334A;
  background-repeat: no-repeat;
  background-size: cover;
  .VideoBg__content {
    padding: 80px 120px;
  }
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

