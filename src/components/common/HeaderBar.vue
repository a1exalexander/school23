<template>
  <header
      class="header-bar"
      :class='{"header-bar--fix": fixedNav !== 0}'
      @scroll="handleNav">
      <slot/>
  </header>
</template>
<script>
export default {
  name: 'HeaderNav',
  data() {
    return {
      fixedNav: 0,
    }
  },
  methods: {
    handleNav(event) {
      this.fixedNav = event.target.scrollTop;
    },
  }
}
</script>
<style lang="scss">
.header-bar {
  width: 100%;
  background-color: $N0;
    box-shadow: 2px 2px 3px rgba(10,10,10,.1);
    padding: 12px 24px;
    position: sticky;
    position: -webkit-sticky;
    height: 64px;
    flex-shrink: 0;
    top: -64px;
    z-index: 11;
    @include flex-row(space-between, center);
    @extend %transition-box;
    transition-duration: 0.4s;
    border-top: 1px solid $N3;
    border-left: 1px solid $N3;
    &--fix {
      background-color: $N0;
      border-color: white;
    }
}
</style>

