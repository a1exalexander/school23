<template>
  <div class="news" >
    <header-bar>
      <a-auto-complete
        :dataSource="dataSource"
        class="news__search"
        @select="onSelect"
        @search="handleSearch"
        placeholder="Пошук...">
        <a-input>
          <a-icon slot="suffix" type="search" class="certain-category-icon" />
        </a-input>
      </a-auto-complete>
      <div class="news__toggle">
        <label class="news__toggle-button">
          <input
            class="news__toggle-input"
            type="radio"
            name="grid"
            :value='false'
            v-model='grid'>
          <a-icon type="bars" class='news__toggle-icon'/>
        </label>
        <label class="news__toggle-button">
          <input
            class="news__toggle-input"
            type="radio"
            name="grid"
            :value='true'
            v-model='grid'>
          <a-icon type="appstore" class='news__toggle-icon'/>
        </label>
      </div>
    </header-bar>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur04 fadeIn"
      leave-active-class="animated dur04 fadeOut"
      mode="out-in">
    <main class='news__view-grid' v-if='grid'>
      <news-card v-for='n in 6' :key='`n${n}`' :content='content'/>
      <news-card v-for='k in 6' :key='`k${k}`' :content='content2'/>
      <news-card v-for='l in 6' :key='`l${l}`' :content='content3'/>
    </main>
    <main class='news__view-col' v-else>
      <news-card-row v-for='r in 20' :key='r' :content='content3'/>
    </main>
    </transition>
  </div>
</template>
<script>
import NewsCard from '@/components/news/NewsCard.vue';
import NewsCardRow from '@/components/news/NewsCardRow.vue';

export default {
  name: 'News',
  components: {
    NewsCard,
    NewsCardRow,
  },
  data() {
    return {
      grid: true,
      dataSource: [],
      content: {
        title: 'Card title',
        text: 'Magna elit voluptate quis veniam ad labore. Magna elit voluptate quis veniam ad labore.Eiusmod elit est proident aliquip voluptate esse tempor commodo pariatur.',
      },
      content2: {
        title: 'Card title 2',
        text: 'smod elit est proident aliquip voluptate esse tempor commodo pariatur.',
      },
      content3: {
        title: 'Card title 3',
        text: 'mod elit est proident aliquip voluptate esse tempor commodo pariatmod elit est proident aliquip voluptate esse tempor commodo pariatmod elit est proident aliquip voluptate esse tempor commodo pariatmod elit est proident aliquip voluptate esse tempor commodo pariatmod elit est proident aliquip voluptate esse tempor commodo pariatsmod elit est proident aliquip voluptate esse tempor commodo pariatur.',
      }
    }
  },
  methods: {
    // handleNav(event) {
    //   this.fixedNav = event.target.scrollTop;
    // },
    handleSearch(value) {
      this.dataSource = !value ? [] : [
        value,
        value + value,
        value + value + value,
      ]
    },
    onSelect(value) {
      console.log('onSelect', value);
    },
  },
  computed: {

  },
}
</script>
<style lang="scss">
$news: news;
.#{$news} {
  &__search {
    width: 240px;
    input {
      &:focus {
        box-shadow: none;
      }
    }
  }
  &__toggle-button {
    display: inline-block;
    position: relative;
    cursor: pointer;
    z-index: 2;
    margin-right: 16px;
    &:hover svg {
      fill: $B1;
    }
    &:focus svg {
      fill: $B2;
    }
    &:active svg {
      fill: $B4;
    }
  }
  &__toggle-input {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  &__toggle-icon svg {
    fill: $N11;
    width: 24px;
    height: 24px;
    transition: fill ease-in-out 0.2s;
  }
  &__view-grid {
    @include flex-row(flex-start, flex-start);
    flex-wrap: wrap;
    padding: 24px 0 24px 32px;
    flex: 1 1;
  }
  &__view-col {
    padding: 24px 32px;
    flex: 1 1;
  }
}
</style>
