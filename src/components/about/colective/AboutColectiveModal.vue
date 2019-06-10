<template>
<a-modal
  :visible="true"
  :footer="null"
  width="80vw"
  class="about-colective-modal"
  @cancel="handleCancel"
> 
<a-skeleton
  :loading="loading"
  :title="{width: '300px'}"
  :paragraph="{rows: 12}"
  class="about-colective-modal__skeleton"
  active
  avatar>
  <div>
    <div class='about-colective-modal__profile'>
      <div class="about-colective-modal__avatar-wrapper">
        <avatar
          :username="teacher.name"
          :size="164"
          :src='teacher.ava'
          class="about-colective-modal__avatar"
          color="#fff"/>
        <h1 class='about-colective-modal__title'>{{ teacher.name }}</h1>
        <p class='about-colective-modal__job'>{{ teacher.company }}</p>
      </div>
      <div class="about-colective-modal__graduetes">
        <h2 class="about-colective-modal__subtitle">Досягнення</h2>
        <about-colective-timeline class='about-colective-modal__timeline'/>
      </div>
    </div>
  <div class="about-colective-modal__info">
    <h2 class="about-colective-modal__subtitle">Новини пов'язані з викладачем</h2>
    <div class="about-colective-modal__news">
      <about-colective-news-card
        class='about-colective-modal__news-card'
        v-for='(item, index) in newsList'
        :key='`${item.id}${index}`'
        :news='item'
      />
    </div>
  </div>
  </div>
</a-skeleton>
</a-modal>
</template>
<script>
import AboutColectiveNewsCard from "./AboutColectiveNewsCard.vue";
import AboutColectiveTimeline from './AboutColectiveTimeline.vue';
import { mapState, mapActions } from "vuex";

export default {
  name: "AboutTeacherModal",
  components: {
    AboutColectiveNewsCard,
    AboutColectiveTimeline,
  },
  props: ["visible", 'id'],
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    ...mapActions({
      getNews: "news/getNews",
      getTeacher: "about/getTeacher",
    }),
    handleCancel() {
      this.$emit('close');
    },
  },
  computed: {
    ...mapState({
      news: state => state.news.news,
      teacher: state => state.about.teacher,
    }),
    newsList() {
      const data = this.news.filter((el, idx) => idx < 5);
      return data;
    }
  },
  async created() {
    await this.getNews();
    await this.getTeacher(this.id);
    this.loading = false;
  }
};
</script>
<style lang="scss">
.about-colective-modal {
  .ant-skeleton-active {
    padding: 24px 32px;
  }
  .ant-skeleton-avatar  {
    $size: 164px;
    width: $size;
    height: $size;
    margin-right: 24px;
  }
  .ant-modal-body {
    padding: 32px;
  }
  .ant-modal-content {
    background-color: $BG-COLOR;
  }
  .about-colective-card--modal {
    margin-right: 30px;
  }
  .about-colective-timeline {
    padding-left: 0;
  }
  .ant-modal-close-x {
    $size: 32px;
    width: $size;
    height: $size;
    position: relative;
    top: -4px !important;
    right: 2px;
  }
  &__info {
    @include flex-col(flex-start, stretch);
    width: 100%;
  }
  &__profile {
    @include flex-row(stretch, flex-start);
    margin-bottom: 24px;
    padding-bottom: 24px;
    background-color: $N0;
    border-radius: 6px;
    box-shadow: $shadow;
  }
  &__avatar-wrapper {
    padding: 24px 24px 0;
    width: 260px;
    border-radius: 6px;
    margin-right: 24px;
    text-align: center;
    @include flex-col(flex-start, center);
    img {
      object-fit: cover;
    }
  }
  &__avatar {
    background-color: #87d068;
    margin-bottom: 16px;
    text-align: center;
    background-size: cover !important;
    background-position: center !important;
  }
  &__graduetes {
    border-radius: 6px;
    padding: 24px 16px 16px;
    flex: 1 1;
  }

  &__title {
    @include text($H700, 600, $N14);
    text-align: center;
    margin-bottom: 16px;
  }
  &__job {
    @include text($H500, 500, $N12);
    text-align: center;
  }
  &__subtitle {
    @include text($H700, 500, $N14);
    margin-bottom: 16px;
  }
  &__news-card {
    flex: 0 0 32%;
    margin-right: 2%;
    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
  &__graduetes-item {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__news {
    @include flex-row(flex-start, stretch);
    flex-wrap: wrap;
  }
}
</style>

