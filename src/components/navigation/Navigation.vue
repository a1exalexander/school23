<template>
<div class="navigation">
  <!-- <a href='https://goo.gl/maps/KC5KayS3K1m' target='_blank' class="navigation__location">
    <span
      title="Олександрійська вулиця, 18, Кременчук, Полтавська область, 39600"
      class="navigation__location-text"
      >м. Кременчук
    </span>
  </a> -->
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
import IconMapColor from '@/components/common/icons/IconMapColor.vue';

export default {
  name: 'Navigation',
  components: {
    IconMapColor,
  },
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
  padding-top: 84px;
  overflow-y: auto;
  background-color: $N0;
  position: relative;
  z-index: 2;
  overflow-x: hidden;
  box-shadow: 2px 0 3px rgba(10,10,10,.1);
  // @include flex-col(space-between, stretch);
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
  &__location-text {
    // padding-bottom: 4px;
    // @include text($H500, 500);
  }
  &__location {
    padding: 12px 24px;
    @include flex-row(flex-start, flex-start);
    margin-bottom: 4px;
  }
  &__location-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    margin-right: 12px;
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
