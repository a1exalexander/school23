<template>
  <div id="app" class='app'>
    <navigation v-if='$route.name !== "home"'/>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      appear
      mode="out-in">
    <router-view class='app__view'/>
    </transition>
  </div>
</template>
<script>
import Navigation from '@/components/navigation/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
};
</script>
<style lang="scss">
.app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $base-font;
  background-color: $BG-COLOR;
  @include flex-row(stretch, stretch);
  min-height: 100vh;
  &__view {
    flex: 1 1;
  }
}
</style>
