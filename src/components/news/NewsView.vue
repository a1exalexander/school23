<template>
<transition
    name="custom-classes-transition"
    enter-active-class="animated dur02 fadeIn"
    leave-active-class="animated dur02 fadeOut"
    mode="out-in">
  <main class='news__view-grid' v-if='grid' key='cards'>
    <template v-if='!loading'>
      <news-card v-for='(content, index) in news' :key='`${content.id}${index}`' :content='content'/>
    </template>
    <template v-else>
      <a-skeleton
        :avatar='{ shape: "square" }'
        active :paragraph="{rows: 4}"
        class='news__skeleton-card'
        v-for='n in 6'
        :key='n'/>
    </template>
  </main>
  <main class='news__view-table' v-else key='table'>
    <news-list/>
  </main>
</transition>
</template>
<script>
import NewsCard from '@/components/news/NewsCard.vue';
import NewsList from '@/components/news/NewsList.vue';
import '@/components/news/news.scss';
import { mapState } from 'vuex';

export default {
  name: 'NewsView',
  props: ['grid'],
  components: {
    NewsCard,
    NewsList,
  },
  computed: {
    ...mapState('news', [
      'loading',
      'news',
    ]),
  },
}
</script>