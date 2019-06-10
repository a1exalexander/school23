<template>
  <div class="about-history">
    <a-carousel arrows dotsClass="slick-dots slick-thumb">
      <a slot="customPaging" slot-scope="props">
        <img :src="getImgUrl(props.i)" />
        <span class="about-history__year">{{ year }}</span>
      </a>
      <div
        v-for="item in 4"
        :key="item">
        <div class="about-history__slide">
          <div class="about-history__img-wrapper">
            <img :src="getImg(item)"/>
          </div>
          <div class="about-history__descr">
            <h2 class="about-history__title">Lorem, ipsum.</h2>
            <p class="about-history__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, nemo error! Est harum tempore beatae inventore nulla eaque iure iusto perferendis libero blanditiis exercitationem sed a voluptatem aliquam, quasi consectetur amet totam, hic voluptatum. Minima, deleniti quasi odit illo neque nihil cumque molestiae voluptatum maiores laudantium maxime, recusandae eaque numquam?</p>
            <a-button type="primary">Дізнатися більше</a-button>
          </div>
        </div>
      </div>
    </a-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: 1991
    };
  },
  methods: {
    getImgUrl(i) {
      return require(`@/assets/images/about_history/abstract${i + 1}.jpg`);
    },
    getImg(item) {
      return require(`@/assets/images/about_history/abstract${item}.jpg`);
    }
  }
};
</script>
<style lang="scss">
.about-history {
  background-color: $N0;
  padding: 24px 32px 64px;
  &__slide {
    @include flex-row(flex-start, stretch);
    padding: 0 0 40px;
    min-height: calc(100vh - 250px);
  }
  &__descr {
    @include flex-col;
    height: auto;
    padding: 0 24px;
  }
  &__img-wrapper {
    display: block;
    flex-basis: 50%;
    min-width: 50%;
    width: 100%;
  }
  &__title {
    margin-bottom: 16px;
  }
  &__text {
    flex: 1 1;
  }
  &__year {
    color: $N15;
  }
  .slick-dots {
    height: auto;
  }
  .slick-slide img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .slick-thumb {
    bottom: -45px;
  }
  .slick-thumb li {
    width: 60px;
    height: 45px;
  }
  .slick-thumb li img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
    object-fit: cover;
  }
  .slick-thumb li.slick-active img {
    filter: grayscale(0%);
  }
}
</style>

