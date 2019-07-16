<template>
 <transition
  name="custom-classes-transition"
  enter-active-class="animated dur02 fadeIn"
  leave-active-class="animated dur02 fadeOut"
  appear>
  <nav class="nav-bar">
    <div class="nav-bar__inner">
      <div class="nav-bar__inner nav-bar__inner--logo">
        <router-link to='/'>
          <img src="@/assets/images/Kremenchuk.png" alt="logo" class="nav-bar__logo">
        </router-link>
        <h1 class="nav-bar__title">Школа 23</h1>
      </div>
      <div class="nav-bar__clock-wrapper">
        <span class="nav-bar__clock"></span>
      </div>
    </div>
    <div class="nav-bar__inner">
     <navigation-alerts/>
    </div>
  </nav>
 </transition>
</template>

<script>
import NavigationAlerts from './NavigationAlerts.vue';

export default {
  name: 'NavBar',
  components: {
    NavigationAlerts,
  }
}
</script>

<style lang="scss">
.nav-bar {
  background-color: $N0;
  @include flex-row(space-between, center);
  padding: 12px 32px;
  padding-left: 24px;
  height: 64px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 3;
  &__inner {
    @include flex-row(flex-start, center);
    &--logo {
      position: relative;
      // bottom: -6px;
    }
  }
  &__clock {
    @include text($H600, 500);
  }
  &__logo {
    width: 30px;
    margin-right: 16px;
  }
  &__title {
    margin: 0;
    line-height: 1;
    color: $N10;
  }
}
</style>
