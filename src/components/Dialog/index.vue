<template>
  <div>
    <!-- 动画效果 -->
    <transition name="dialog-fade">
      <!-- 遮罩层 -->
      <div v-show="visible" class="m-dialog-wrapper" @click.self="showDialog">
        <!-- 弹框 -->
        <div class="m-dialog" :style="{ width, height }">
          <div class="m-dialog-header">
            <slot name="title">
              <span class="m-dialog-title">{{ title }}</span>
            </slot>
            <!-- <button class="m-dialog-headerbtn" @click="showDialog">
              <span>×</span>
            </button> -->
          </div>
          <div class="m-dialog-body">
            <slot name="content">
              <span>{{ content }}</span>
            </slot>
          </div>
          <div v-if="$slots.footer" class="m-dialog-footer">
            <!-- 如果插槽里面有footer就显示 -->
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: '这是提示信息'
    },
    top: {
      type: String,
      default: '50%'
    },
    width: {
      type: String,
      default: '30%'
    },
    height: {
      type: String,
      default: '30%'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showDialog() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-fade-enter-active {
  animation: run 0.5s;
}
.dialog-fade-leave-active {
  animation: run 0.5s reverse;
}
@keyframes run {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.m-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.3);
}
.m-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  box-sizing: border-box;
  width: 30%;
  text-align: center;
  &-header {
    text-align: center;
    height: 60px;
  }
}

.m-dialog-body {
  margin: 70px 0;
}
.m-dialog-footer {
  text-align: center;
}
.m-dialog-title {
  width: 60px;
  height: 60px;
}
</style>
