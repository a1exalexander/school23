<template>
<a-modal
  v-model="visibled"
  :footer="null"
  width="80vw"
  class="about-colective-modal"
>
    
    <div class='about-colective-modal__profile'>
      <div class="about-colective-modal__avatar-wrapper">
        <a-avatar
          class="about-colective-modal__avatar"
          :size="164"
          icon="user"
          :src='img'/>
          <h1 class='about-colective-modal__title'>Петро Порошенко</h1>
      </div>
      <div class="about-colective-modal__graduetes">
        <h2 class="about-colective-modal__subtitle">Досягнення</h2>
        <about-colective-timeline/>
      </div>
    </div>
 
  <div class="about-colective-modal__info">
    <h2 class="about-colective-modal__subtitle">Новини пов'язані з викладачем</h2>
    <div class="about-colective-modal__news">
      <about-colective-news-card
        class='about-colective-modal__news-card'
        v-for='(item, index) in news'
        :key='`${item.id}${index}`'
        :news='item'
      />
    </div>
  </div>
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
  props: ["visible"],
  data() {
    return {
      img: require("@/assets/images/poroh.jpg"),
    };
  },
  methods: {
    ...mapActions("news", ["getNews"])
  },
  computed: {
    ...mapState("news", ["news"]),
    visibled: {
      set(value) {
        this.$emit("change", value);
      },
      get() {
        return this.visible;
      }
    }
  },
  created() {
    this.getNews();
  }
};
</script>
<style lang="scss">
.about-colective-modal {
  .ant-modal-body {
    padding: 32px;
  }
  .ant-modal-content {
    background-color: #f9fbff;
  }
  .about-colective-card--modal {
    margin-right: 30px;
  }
  &__info {
    @include flex-col(flex-start, stretch);
    width: 100%;
  }
  &__profile {
    @include flex-row(stretch, flex-start);
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid $N4;
  }
  &__avatar-wrapper {
    img {
      object-fit: cover;
    }
    margin-right: 24px;
    text-align: center;
  }
  &__avatar {
    background-color: #87d068;
    margin-bottom: 16px;
    text-align: center;
  }
  &__graduetes {
    flex: 1 1;
  }
  &__title {
    @include text($H800, 600, $N9);
    text-align: center;
  }
  &__subtitle {
    @include text($H700, 500, $N12);
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
    @include flex-row(space-between, stretch);
    flex-wrap: wrap;
  }
}
</style>

