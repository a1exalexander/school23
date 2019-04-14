<template>
<a-card
  hoverable
  class="news-card-row"
>
  <img
    alt="example"
    class="news-card-row__image"
    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    slot="cover"
  />
  <div class="news-card-row__body">
    <header class='news-card-row__header'>
      <h2 class='news-card-row__title'>{{ content.title }}</h2>
      <div class="news-card-row__row">
        <span class="news-card-row__date">24.03.2019</span>
        <a href="#" slot="extra">More</a>
      </div>
    </header>
    <p class="news-card-row__text">{{ content.text }}...</p>
  </div>
</a-card>
</template>
<script>
export default {
  name: 'NewsCardRow',
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
.news-card-row {
  cursor: default;
  margin-bottom: 24px;
  width: 100%;
  border-radius: 4px;
  height: 140px;
  @include flex-row(stretch, stretch);
  .ant-card-cover {
    flex: 0 0 30%;
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ant-card-body {
    flex: 0 0 70%;
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
    flex: 0 1 54px;
    overflow: hidden;
  }
  &__date {
    margin-right: 24px;
  }
  &__row {
    @include flex-row(flex-start, flex-end);
  }
}
</style>
