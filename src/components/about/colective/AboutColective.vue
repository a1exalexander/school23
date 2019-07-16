<template>
<div>
  <div class="about-colective">
    <about-colective-card
      v-for='(teacher, index) in teachers'
      :key='`${teacher.id}${index}`'
      :teacher='teacher'
      @click.native='openProfile(teacher.id)'
      class="about-colective__card">
    </about-colective-card>
  </div>
  <about-colective-modal
    v-if='visible'
    :id='userId'
    @close='visible = false'/>
  </div>
</template>
<script>
import AboutColectiveCard from './AboutColectiveCard.vue';
import AboutColectiveModal from './AboutColectiveModal.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AboutColective',
  components: {
    AboutColectiveCard,
    AboutColectiveModal,
  },
  data() {
    return {
      visible: false,
      userId: null,
    }
  },
  methods: {
    ...mapActions('about', ['getTeachers']),
    async openProfile(id) {
      this.userId = id;
      await this.$nextTick();
      this.visible = true;
    }
  },
  computed: {
    ...mapState('about', ['teachers']),
  },
  created() {
    this.getTeachers();
  }
}
</script>
<style lang="scss">
  .about-colective {
    padding: 24px 32px 64px;
    width: 100%;
    @include flex-row(flex-start, flex-start);
    flex-wrap: wrap;
    &__card {
      flex: 0 0 100%;
      margin-bottom: 20px;
      margin-right: 0;
      @media screen and (min-width: 768px) and (max-width: 959px) {
        flex-basis: 49%;
        margin-right: 1.8%;
        &:nth-child(2n+2) {
          margin-right: 0;
        }
      }
      @media screen and (min-width: 960px) and (max-width: 1279px) {
        flex-basis: 32%;
        margin-right: 2%;
        &:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
      @media screen and (min-width: 1280px) and (max-width: 1479px) {
        flex-basis: 23%;
        margin-right: 2%;
        &:nth-child(4n + 4) {
          margin-right: 0;
        }
      }
      @media screen and (min-width: 1480px) and (max-width: 1779px) {
        flex-basis: 18%;
        margin-right: 2%;
        &:nth-child(5n + 5) {
          margin-right: 0;
        }
      }
      @media screen and (min-width: 1780px) {
        flex: 0 1 240px;
        margin-right: 22px;
      }
    }
  }
</style>


