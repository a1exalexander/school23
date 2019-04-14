<template>
  <div class="news">
    <header class="news__header">
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
    </header>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur04 fadeIn"
      leave-active-class="animated dur04 fadeOut"
      mode="out-in">
    <main class='news__view-grid' v-if='grid'>
      <news-card v-for='n in 3' :key='`n${n}`' :content='content'/>
      <news-card v-for='k in 3' :key='`k${k}`' :content='content2'/>
      <news-card v-for='l in 3' :key='`l${l}`' :content='content3'/>
    </main>
    <main class='news__view-col' v-else>
      <news-card-row v-for='r in 5' :key='r' :content='content3'/>
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
        title: 'Card title',
        text: 'smod elit est proident aliquip voluptate esse tempor commodo pariatur.',
      },
      content3: {
        title: 'Card title',
        text: 'mod elit est proident aliquip voluptate esse tempor commodo pariatmod elit est proident aliquip voluptate esse tempor commodo pariatmod elit est proident aliquip voluptate esse tempor commodo pariatmod elit est proident aliquip voluptate esse tempor commodo pariatmod elit est proident aliquip voluptate esse tempor commodo pariatsmod elit est proident aliquip voluptate esse tempor commodo pariatur.',
      }
    }
  },
  methods: {
    handleSearch(value) {
      this.dataSource = !value ? [] : [
        value,
        value + value,
        value + value + value,
      ]
    },
    onSelect(value) {
      console.log('onSelect', value);
    }
  }
}
</script>
<style lang="scss">
.news {
  height: 100vh;
  @include flex-col(stretch, stretch);
  &__header {
    background-color: $N0;
    box-shadow: 2px 2px 3px rgba(10,10,10,.1);
    padding: 28px;
    position: relative;
    z-index: 4;
    @include flex-row(space-between, center);
  }
  &__search input {
    &:focus {
      box-shadow: none;
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
    fill: $N10;
    width: 24px;
    height: 24px;
    transition: fill ease-in-out 0.2s;
  }
  &__view-grid {
    @include flex-row(flex-start, flex-start);
    flex-wrap: wrap;
    padding: 24px 24px 24px 32px;
    flex: 1 1;
    overflow-y: auto;
  }
  &__view-col {
    padding: 24px 32px;
    flex: 1 1;
    overflow-y: auto;
  }
}
</style>
