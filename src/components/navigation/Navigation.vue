<template>
 <transition
  name="custom-classes-transition"
  enter-active-class="animated dur02 fadeIn"
  leave-active-class="animated dur04 fadeOut"
  appear>
<div class="navigation">
  <a-menu
    mode="inline"
    :openKeys="openKeys"
    @openChange="onOpenChange"
    @click="handleClick"
    class="navigation__inner"
    :forceSubMenuRender='true'
    :selectedKeys="[current]"
  >
    <a-menu-item
    key="news">
      <icon-open-book class="navigation__icon"></icon-open-book>
      <span>Новини</span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <span
        slot="title"
        class='navigation__title'
        :class="{'active': routeAbout}">
        <icon-university class="navigation__icon"></icon-university>
        <span>Про школу</span>
      </span>
      <a-menu-item
        key="school-now">Школа сьогодні
      </a-menu-item>
      <a-menu-item
       key="colective">Педагогічний колектив
      </a-menu-item>
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
 </transition>
</template>
<script>
import IconOpenBook from '@/components/common/icons/IconOpenBook.vue';
import IconUniversity from '@/components/common/icons/IconUniversity.vue';

export default {
  name: 'Navigation',
  components: {
    IconOpenBook,
    IconUniversity,
  },
  data () {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
      current: 'news',
      openKeys: [],
    }
  },
  computed: {
    routeAbout() {
      return (this.current === 'school-now' || this.current === 'colective');
    },
    selected() {
      const { name = '1'} = this.$route;
      return [name];
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
    handleClick({ key }) {
      this.$router.push({name: key})
    },
    setMenuItem() {
      if (this.$route.name) this.current = this.$route.name;
    }
  },
  beforeMount() {
    this.setMenuItem();
  },
  watch: {
    '$route.name'() {
      this.setMenuItem()
    }
  }
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
  &__icon {
    $size: 18px;
    width: $size;
    height: $size;
    margin-right: 8px;
  }
  // @include flex-col(space-between, stretch);
  // border-right: 1px solid $N2;
  .ant-menu-submenu > .ant-menu {
    background-color: $N0;
  }
  &__inner {
    border: none !important;
  }
  .ant-menu-item.ant-menu-item-selected {
    svg {
      fill: #1890ff;
    }
  }
  &__title {
    transition: color ease 0.2s;
    svg {
      transition: fill ease 0.2s;
    }
    &.active {
      color: #1890ff;
      svg {
        fill: #1890ff;
      }
    }
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
