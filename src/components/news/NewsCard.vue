<template>
<a-card
  hoverable
  class="news-card"
>
  <img
    alt="example"
    class="news-card__image"
    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    slot="cover"
  />
  <div class="news-card__body">
    <header class='news-card__header'>
      <h2 class='news-card__title'>{{ content.title }}</h2>
      <a href="#" slot="extra">More</a>
    </header>
    <p class="news-card__text">{{ content.text }}...</p>
    <span class="news-card__date">24.03.2019</span>
  </div>
</a-card>
</template>
<script>
export default {
  name: 'NewsCard',
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
};
</script>
<style lang="scss">
.news-card {
  cursor: default;
  margin-bottom: 24px;
  flex: 1 1 100%;
  border-radius: 4px;
  @include flex-row(stretch, stretch);
  height: 220px;
  @media screen and (min-width: $screen-tablet) {
    flex: 0 1 calc( 50% - 24px );
    margin: 0 24px 24px 0;
  }
  @media screen and (min-width: $screen-retina) {
    flex: 0 1 calc( 33% - 24px );
  }
  .ant-card-cover {
    flex: 0 0 45%;
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ant-card-body {
    flex: 0 0 55%;
  }
  &__header {
    @include flex-row(space-between, flex-end);
    margin-bottom: 16px;
  }
  &__body {
    @include flex-col(flex-start, stretch);
    overflow: hidden;
  }
  &__title {
    @include text($H550, 600);
    height: 16px;
    overflow: hidden;
  }
  &__text {
    @include text($H300, 400);
    margin-bottom: 8px;
    flex: 0 1 104px;
    overflow: hidden;
  }
}
</style>
