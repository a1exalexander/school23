<template>
  <div class="about-colective-timeline">
      <a-timeline :pending="loading">
        <a-timeline-item
          v-for='(award, index) in awards'
          :key='`a${index}`'
        >
          <icon-awards
            class="about-colective-timeline__icon"
            slot="dot"
          />
          {{ award }}
        </a-timeline-item>
      </a-timeline>
    </div>
</template>
<script>
import IconAwards from "@/components/common/icons/IconAwards.vue";
import { setTimeout } from 'timers';

export default {
  name: 'AboutColectiveTimeline',
  components: {
    IconAwards,
  },
  data() {
    return {
      awards: [],
    }
  },
  methods: {
    fetch() {
      const awards = [
        "Вчитель року 2015 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quasi.",
        "Вчитель року 2016 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quasi.",
        "Вчитель року 2017 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quasi.",
        "Вчитель року 2018 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quasi."
      ];
      setTimeout(() => this.awards = [...awards], 1500);
    }
  },
  computed: {
    loading() {
      return !this.awards.length;
    }
  },
  mounted() {
    this.fetch();
  }
}
</script>
<style lang="scss">
.about-colective-timeline {
  background-color: $N0;
  padding: 24px 24px 0;
  border-radius: 4px;
  .ant-timeline-item-content {
    margin-left: 24px;
  }
  .ant-timeline-item-last .ant-timeline-item-content {
    min-height: auto;
  }
  .ant-timeline-item-head {
    background-color: inherit;
  }
  &__icon {
    $size: 22px;
    width: $size;
    height: $size;
  }
}
</style>
