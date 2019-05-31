<template>

    <a-modal
      v-model="visibled"
      :footer="null"
      width="80vw"
      class="about-colective-modal"
    >
      <div class="about-colective-card about-colective-card--modal">
        <img
        src="@/assets/images/poroh.jpg"
        alt="John"
        class="about-colective-card__img">
        <h1 class="about-colective-card__title">Петро Порошенко</h1>
        <p class="about-colective-card__job">Викладач права</p>
        <div class="about-colective-card__social">
          <a href="#" class="about-colective-card__link"><a-icon type="twitter"/></a>
          <a href="#" class="about-colective-card__link"><a-icon type="mail"/></a>
          <a href="#" class="about-colective-card__link"><a-icon type="facebook"/></a>
        </div>
      </div>
      <div class="about-colective-modal__info">
        <div class="about-colective-modal__graduetes">
          <h2 class="about-colective-modal__graduetes-title">Досягнення</h2>
          <ul class="about-colective-modal__graduetes-list">
            <li class="about-colective-modal__graduetes-item">1. Вчитель року 2016 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, ut.</li>
            <li class="about-colective-modal__graduetes-item">2. Вчитель року 2017 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, vitae!</li>
            <li class="about-colective-modal__graduetes-item">3. Вчитель року 2018 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quasi.</li>
          </ul>
        </div>
        <h2 class="about-colective-modal__news-title">Новини пов'язані з викладачем</h2>
        <div class="about-colective-modal__news">
          <div
          class="about-colective-modal__news-card"
          v-for="card in 10"
          :key='card'>
            <h2 class="about-colective-modal__news-card-title">Lorem, ipsum.</h2>
            <p class="about-colective-modal__news-card-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus blanditiis, rem praesentium maiores nulla ex repellat. Error laboriosam ullam deserunt porro, ab dolorem placeat rem quos minus consequatur harum adipisci.
            </p>
            <a href="#" class="about-colective-modal__news-card-link">Дізнатися більше</a>
          </div>
        </div>
      </div>
    </a-modal>
</template>
<script>

export default {
  name: 'AboutTeacherModal',
  props: ['visible'],
  computed: {
    visibled: {
      set(value) {
        this.$emit('change', value);
      },
      get() {
        return this.visible;
      }
    }
  }
}
</script>
<style lang="scss">
 .about-colective-modal {
   .ant-modal-body {
     @include flex-row(flex-start, flex-start);
   }
   .ant-modal-content {
     background-color: #F9FBFF;
   }
   .about-colective-card--modal {
     margin-right: 30px;
   }
   &__info {
     @include flex-col(flex-start, stretch);
     width: 100%;
   }
   &__graduetes {
     margin-bottom: 16px;
   }
   &__graduetes-title,
   &__news-title {
     @include text($H700, 500, $N12);
     margin-bottom: 16px;
   }
   &__graduetes-list,
   &__news-card {
     background-color: $N0;
     box-shadow: $shadow;
     padding: 16px 24px;
     border-radius: 4px;
   }
   &__graduetes-list{
     list-style: none;
   }
   &__graduetes-item {
     margin-bottom: 8px;
     &:last-child {
       margin-bottom: 0;
     }
   }
   &__news {
     @include flex-row(space-between, flex-start);
     flex-wrap: wrap;
   }
   &__news-card {
     flex-basis: 49%;
      margin-bottom: 16px;
   }
   &__news-card-title,
    &__news-card-text {
     margin-bottom: 16px;
   }
 }
</style>

