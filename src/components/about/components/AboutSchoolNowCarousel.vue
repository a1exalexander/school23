<template>
<div class='about-school-now-carousel'>
  <a-carousel arrows>
    <div
      slot="prevArrow"
      class="custom-slick-arrow"
      style="left: 10px;zIndex: 1"
    >
      <a-icon type="left-circle" />
    </div>
    <div
      slot="nextArrow"
      class="custom-slick-arrow"
      style="right: 10px"
    >
      <a-icon type="right-circle" />
    </div>
    <div v-for='image in 10'
      :key='image'>
      <img
      class="about-school-now-carousel__img"
      :src="`https://picsum.photos/id/${image}/1000/350`"
      alt="picsum">
    </div>
  </a-carousel>
</div>
</template>
<script>
export default {
  name: 'AboutSchoolNowCarousel'
}
</script>
<style lang="scss">
/* For demo */
.about-school-now-carousel {
  max-width: calc(100vw - 290px);
  padding: 22px 40px 0;
  margin-bottom: 50px;
  .ant-carousel {
    width: 100%;
    
  }
  .ant-carousel .slick-slide {
    text-align: center;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
    max-height: 350px;
  }

  .ant-carousel .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31,45,61,.11);
    opacity: 0.3;
  }
  .ant-carousel .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel .custom-slick-arrow:hover {
    opacity: 0.5;
  }

  .ant-carousel .slick-slide  h3 {
    color: #fff;
  }
  &__img {
    width: 100%;
    height: auto;
  }
}
</style>
