<template>
  <div class="about-colective-news-card">
    <h2 class="about-colective-news-card__title">{{ news.title }}</h2>
    <p class="about-colective-news-card__text">{{ news.body }}</p>
    <a href="#" @click='openNews' class="about-colective-news-card__link">Дізнатися більше</a>
  </div>
</template>
<script>
export default {
  name: 'AboutColectiveNewsCard',
  props: {
    news: {
      type: Object,
      required: true,
    }
  },
  methods: {
    openNews() {
      const { id } = this;
      console.log(id);
    }
  }
}
</script>
<style lang="scss">
.about-colective-news-card {
  background-color: $N0;
  box-shadow: $shadow;
  padding: 16px 24px;
  border-radius: 4px;
  margin-bottom: 16px;
  @include flex-col;
  transition: box-shadow ease 0.2s;
  cursor: default;
  @include media($screen-desktop) {
    &:hover {
      box-shadow: $shadow-hovered;
    }
  }
  &__title {
    @include text($H600, 500, $N12);
    margin-bottom: 12px;
  }
  &__text {
    flex: 1 1;
    margin-bottom: 16px;
  }
  &__link {
    cursor: pointer;
  }
}
</style>

