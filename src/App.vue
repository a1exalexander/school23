<template>
  <div id="app" class='app'>
    <navigation-bar/>
    <div class="app__row">
      <navigation/>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur02 fadeIn"
        leave-active-class="animated dur02 fadeOut"
        appear
        mode="out-in">
      <router-view class='app__view'/>
      </transition>
    </div>
  </div>
</template>
<script>
import Navigation from '@/components/navigation/Navigation.vue';
import NavigationBar from '@/components/navigation/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    NavigationBar,
  },
};
</script>
<style lang="scss">
.app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $base-font;
  background-color: $BG-COLOR;
  min-height: 100vh;
  &__row {
    @include flex-row(stretch, stretch);
  }
  &__view {
    flex: 1 1;
    padding-top: 64px;
  }
}
</style>
