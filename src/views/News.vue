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
    <news-view :grid='grid'/>
  </div>
</template>
<script>
import NewsView from '@/components/news/NewsView.vue';
import '@/components/news/news.scss';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'News',
  components: {
    NewsView,
  },
  data() {
    return {
      grid: true,
      dataSource: [],
    }
  },
  methods: {
    ...mapActions('news', [
      'getNews',
    ]),
    handleSearch(value) {
      this.dataSource = !value ? [] : [
        value,
        value + value,
        value + value + value,
      ]
    },
    fetchData() {
      this.getNews()
        .then()
        .catch((error) => this.$message.error(error))
    },
    onSelect(value) {
      console.log('onSelect', value);
    },
  },
  computed: {
    ...mapState('news', [
      'loading',
      'news',
    ]),
  },
  watch: {
    grid() {
      this.fetchData()
    }
  },
  beforeMount() {
    this.fetchData()
  }
}
</script>
