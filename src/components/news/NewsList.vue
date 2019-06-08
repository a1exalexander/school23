<template>
<div>
  <a-skeleton
    :loading='loading'
    active
    :title="{width: '300px'}"
    :paragraph="{rows: 2}"
    v-for='n in 6'
    :key='n'/>

<a-list
    class="demo-loadmore-list news-list"
    itemLayout="horizontal"
    :dataSource="news"
    v-if='!loading'
  >
    <div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
      <a-spin v-if="loadingMore" />
      <a-button v-else @click="onLoadMore">loading more</a-button>
    </div>
    
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions">more</a>
        <a-list-item-meta
          :description="item.body"
        >
          <p slot="title">{{item.title}}</p>
        </a-list-item-meta>
        <div>{{ $moment().format('DD.MM.YYYY') }}</div>
      </a-list-item>
  </a-list>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'NewsList',
  data () {
    return {
      loadingMore: false,
      showLoadingMore: true,
    }
  },
  computed: {
    ...mapState('news', [
      'loading',
      'news',
    ]),
  },
  methods: {
    ...mapActions('news', [
      'getNews',
    ]),
    async onLoadMore () {
      this.loadingMore = true;
      this.getNews();
      await this.$nextTick();
      this.loadingMore = false;
      window.dispatchEvent(new Event('resize'))
    },
  },
}

</script>
<style lang="scss">
.news-list {
  
  .ant-list-item-meta {
    flex-basis: 60%;
  }
  .ant-spin-nested-loading {
      min-height: 100px;
  }
}
.demo-loading {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
