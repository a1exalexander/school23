<template>
<div class="navigation">
  <div class="navigation__header">
    <router-link to='/'>
      <img src="@/assets/images/Kremenchuk.png" alt="logo" class="navigation__logo">
    </router-link>
    <h1 class="navigation__title">Школа 23</h1>
  </div>
  <a-menu
    mode="inline"
    :openKeys="openKeys"
    @openChange="onOpenChange"
    class="navigation__inner"
  >
    <a-menu-item key="1"><a-icon type="mail" /><span>Новини</span></a-menu-item>
    <a-sub-menu key="sub1">
      <span slot="title"><a-icon type="appstore" /><span>Про школу</span></span>
      <a-menu-item key="2">Школа сьогодні</a-menu-item>
      <a-menu-item key="3">Педагогічний колектив</a-menu-item>
      <a-menu-item key="4">Історія школи</a-menu-item>
      <a-menu-item key="5">Гімн школи</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title"><a-icon type="setting" /><span>Навчально-виховна робота</span></span>
      <a-menu-item key="6">Режим роботи школи</a-menu-item>
      <a-menu-item key="7">Роздклад уроків</a-menu-item>
      <a-menu-item key="8">Методичні рекомендації</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <span slot="title"><a-icon type="setting" /><span>Виховна робота</span></span>
      <a-menu-item key="9">Бібліотека</a-menu-item>
      <a-menu-item key="10">Учнівське самоврядування</a-menu-item>
      <a-menu-item key="11">Сторінка психолога</a-menu-item>
      <a-menu-item key="12">Пришкільний табір</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="13"><a-icon type="mail" /><span>ЗНО-ДПА</span></a-menu-item>
    <a-menu-item key="14"><a-icon type="mail" /><span>Публічна інформація</span></a-menu-item>
    <a-menu-item key="15"><a-icon type="mail" /><span>Контактна інформація</span></a-menu-item>
  </a-menu>
</div>
</template>
<script>
export default {
  name: 'Navigation',
  data () {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
      openKeys: [],
    }
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
  },
}

</script>
<style lang="scss">
.navigation {
  width: 290px;
  height: 100vh;
  overflow-y: auto;
  background-color: $N0;
  position: relative;
  z-index: 2;
  overflow-x: hidden;
  box-shadow: 2px 0 2px rgba(10,10,10,.1);
  // border-right: 1px solid $N2;
  .ant-menu-submenu > .ant-menu {
    background-color: $N0;
  }
  &__inner {
    border: none !important;
  }
  &__header {
    background-color: $N0;
    @include flex-row(flex-start, center);
    padding: 16px 24px;
    position: sticky;
    top: 0;
    z-index: 2;
  }
  &__logo {
    width: 40px;
    margin-right: 16px;
  }
  &__title {
    margin: 0;
    line-height: 1;
    font-weight: 500;
  }
}
</style>
