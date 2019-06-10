<template>
  <div class="about-colective-card" @click='visible = true'>
    <avatar
      :username="teacher.name"
      :customStyle="{width: 100+'%', height: 180 + 'px'}"
      :rounded="false"
      :src='img'
      class="about-colective-card__img"
      color="#fff">
    </avatar>
    <div class="about-colective-card__body">
      <h3 class="about-colective-card__title">{{ teacher.name }}</h3>
      <p class="about-colective-card__job">{{ teacher.company }}</p>
    </div>
  </div>
</template>
<script>


export default {
  name: 'AboutColectiveCard',
  props: {
    teacher: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      // img: require("@/assets/images/poroh.jpg"),
      img: null,
    }
  },
}
</script>

<style lang="scss">
.about-colective-card {
  box-shadow: $shadow;
  text-align: center;
  border-radius: 4px;
  height: 280px;
  overflow: hidden;
  @include flex-col(flex-start, center);
  background-color: $N0;
  transition: box-shadow ease 0.2s;
  &:hover {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  }
  &__img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    cursor: pointer;
    transition: filter ease 0.2s;
    background-size: cover !important;
    background-position: center !important;
    &:hover {
      filter: brightness(0.9);
    }
  }
  &__body {
    width: 100%;
    height: 100px;
    padding: 12px;
    @include flex-col(space-between, center);
  }
  &__title {
    @include text($H500, 500, $N15);
    margin-bottom: 6px;
    line-height: 1.2;
    overflow: hidden;
  }

  &__job {
    @include text($H400, 500, $N9);
    margin-bottom: 6px;
  }


  &__link {
    text-decoration: none;
    font-size: 16px;
    color: $B3;
    margin-right: 16px;
  }

  &__btn {
    width: 80%;
  }
}
</style>

