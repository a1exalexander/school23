<template>
<div class='about'>
  <header-bar class='about__nav'>
    <a-tabs
    class='about__tabs'
    :activeKey='$route.name'
    @change="changeTab">
      <a-tab-pane
      key="school-now">
        <span
        slot="tab"
        >
         <a-icon type="layout" />
          Школа сьогодні
        </span>
      </a-tab-pane>
      <a-tab-pane
      key="colective">
        <span slot="tab">
          <a-icon type="database" />
          Педагогічний колектив
        </span>
      </a-tab-pane>
       <a-tab-pane key="history">
        <span slot="tab">
          <a-icon type="hourglass" />
          Історія школи
        </span>
      </a-tab-pane>
       <a-tab-pane key="song">
        <span slot="tab">
          <a-icon type="sound" />
          Гімн школи
        </span>
      </a-tab-pane>
    </a-tabs>
  </header-bar>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur02 fadeIn"
    leave-active-class="animated dur02 fadeOut"
    appear
    mode="out-in">
  <router-view/>
  </transition>
</div>
</template>
<script>
export default {
  name: 'About',
  methods: {
    changeTab(tab) {
      this.$router.push({name: tab})
    }
  }
}
</script>

<style lang="scss">
.about {
overflow-y: scroll;
  &__nav {
    justify-content: center;
    padding-bottom: 0;
    margin-bottom: 16px;
  }
  &__tabs {
    margin: 0;
    position: relative;
    bottom: -4px;
  }
  .ant-tabs-bar.ant-tabs-top-bar {
    margin-bottom: 0;
  }
}
</style>

