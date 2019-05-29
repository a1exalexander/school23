<template>
  <div class="about-colective">
    <about-colective-card
    v-for='card in 10'
    :key='card'
    class="about-colective__card"></about-colective-card>
  </div>
</template>
<script>
import AboutColectiveCard from '@/components/about/components/AboutColectiveCard.vue';

export default {
  name: 'AboutColective',
  components: {
    AboutColectiveCard,
  }
}
</script>
<style lang="scss">
  .about-colective {
    padding: 24px 32px;
    @include flex-row(flex-start, flex-start);
    flex-wrap: wrap;
    &__card {
      flex-basis: 33%;
      margin-bottom: 20px;
      margin-right: 20px;
    }
  }
</style>


