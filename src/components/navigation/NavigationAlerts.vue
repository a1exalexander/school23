<template>
 <a-popover
        placement="bottomRight"
        title="Термінові оголошення"
        trigger="hover"
        :visible="hovered"
        @visibleChange="handleHoverChange"
        class='nav-alerts'>
        <div slot="content">
          <div class='nav-alerts__content'>
            <a-tag
              class='nav-alerts__tag'
              v-for='(item, index) in alerts'
              :key='`${item.id}${index}`'
              :color="type[item.type]">{{ item.title }}
            </a-tag>
          </div>
        </div>
        <a-popover
          placement="bottomRight"
          title="Термінові оголошення"
          trigger="click"
          :visible="clicked"
          @visibleChange="handleClickChange"
        >
          <div slot="content">
            <div class='nav-alerts__content'>
             <a-alert
              class='nav-alerts__alert' 
              v-for='(item, index) in alerts'
              :key='`${item.id}${index}`'
              :message="item.title"
              :description="item.body"
              :style="alertType[item.type]"/>
            </div>
            <a @click="hide">Close</a>
          </div>
          <a-badge :numberStyle="{backgroundColor: count?type.error:type.warning}" :count="count" showZero>
            <a-button type="primary" :disabled='!count'>Оголошення</a-button>
          </a-badge>
        </a-popover>
      </a-popover>
  
</template>
<script>

export default {
  name: 'NavigationAlerts',
  data() {
    return {
      count: 2,
      clicked: false,
      hovered: false,
      type: {
        warning: '#ffab00',
        error: '#ff2727',
        success: '#52c41a',
        danger: '#f50',
        info: '#2db7f5',
        active: '#1fd16f',
      },
      alertType: {
        warning: {
          backgroundColor: 'rgba(255, 170, 0, 0.05)',
          borderColor: '#ffab00'
        },
        error: {
          backgroundColor: 'rgba(255, 39, 39, 0.05)',
          borderColor: '#ff2727'
        },
        success: {
          backgroundColor: 'rgba(83, 196, 26, 0.05)',
          borderColor: '#52c41a'
        },
        danger: {
          backgroundColor: 'rgba(255, 85, 0, 0.05)',
          borderColor: '#f50'
        },
        info: {
          backgroundColor: 'rgba(45, 181, 245, 0.05)',
          borderColor: '#2db7f5'
        },
        active: {
          backgroundColor: 'rgba(31, 208, 110, 0.1)',
          borderColor: '#1fd16f'
        },
      },
      alerts: [
        {body:'delectus aut autem', id: 1, title: 'Вчителям', type: 'info'},
        {body:'quis ut nam facilis et officia qui', id: 1, title: 'Учням', type: 'active'},
        {body:'laboriosam mollitia et enim quasi adipisci quia provident illumi', id: 1, title: 'Батькам', type: 'success'},
        {body:'qui ullam ratione quibusdam voluptatem quia omnis', id: 1, title: 'Усім', type: 'warning'},
        {body:'qui ullam ratione quibusdam voluptatem quia omnis', id: 1, title: 'Терміново', type: 'danger'},
      ]
    };
  },
  methods: {
    hide () {
      this.clicked = false
      this.hovered = false
    },
    handleHoverChange (visible) {
      this.clicked = false
      this.hovered = visible
    },
    handleClickChange (visible) {
      this.clicked = visible
      this.hovered = false
    },
  },
};
</script>
<style lang="scss">
.nav-alerts {
  &__content {
    @include flex-col;
  }
  &__tag {
    margin-bottom: 4px !important;
  }
  &__alert {
    width: 100%;
    margin-bottom: 4px !important;
  }
  .ant-popover-inner-content {
    padding: 24px !important;
  }
}
</style>
