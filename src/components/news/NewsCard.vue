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
    </header>
    <p class="news-card__text">{{ content.body }}...</p>
    <div class="news-card__row">
      <span class="news-card__date">{{ $moment().format('DD.MM.YYYY') }}</span>
      <a href="#" slot="extra">More</a>
    </div>
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
};
</script>
<style lang="scss">
.news-card {
  cursor: default;
  margin: 0 24px 24px 0;
  flex: 1 1 100%;
  border-radius: 4px;
  @include flex-row(stretch, stretch);
  height: 220px;
  @media screen and (min-width: $screen-desktop-large) {
    flex: 0 1 calc( 50% - 24px );
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
    padding: 16px;
  }
  &__header {
    @include flex-row(space-between, flex-end);
    margin-bottom: 16px;
  }
  &__row {
    @include flex-row(space-between, flex-end);
  }
  &__body {
    @include flex-col(flex-start, stretch);
    height: 100%;
    overflow: hidden;
  }
  &__title {
    @include text($H550, 600);
  }
  &__text {
    @include text($H300, 400);
    line-height: 1.3;
    margin-bottom: 8px;
    flex: 1 1;
    overflow: hidden;
  }
}
</style>
