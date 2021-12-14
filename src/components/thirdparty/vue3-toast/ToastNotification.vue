<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// Props for our component,
// these are the same as Notitfication interface.
const props = defineProps({
  id: { type: String, required: true },
  type: {
    type: String,
    default: 'info',
    required: false
  },
  title: { type: String, default: null, required: false },
  message: {
    type: String,
    default: 'Ooops! A message was not provided.',
    required: false
  },
  autoClose: { type: Boolean, default: true, required: false },
  duration: { type: Number, default: 5, required: false },
  canClose: { type: Boolean, default: true, required: false }
})

// Defining emits
// for closing a notification
const emit = defineEmits<{
  (e: 'close'): void
}>()

// some reactive values to manage the notification
const timer = ref<null | ReturnType<typeof setTimeout>>(null)
const startedAt = ref<number>(0)
const delay = ref<number>(0)

// setting up the automatic
// dismissing of notificaton
// after the specified duration
onMounted(() => {
  if (props.autoClose) {
    startedAt.value = Date.now()
    delay.value = props.duration * 1000
    timer.value = setTimeout(close, delay.value)
  }
})

// a computed property to set
// the icon for the notification
const toastIcon = computed(() => {
  switch (props.type) {
    case 'error':
      return 'ri-emotion-unhappy-line'
    case 'warning':
      return 'ri-error-warning-line'
    case 'success':
      return 'ri-emotion-happy-line'
    default:
      return 'ri-information-line'
  }
})

// a computed property to set
// the icon and progres bar color
// for the notification
const toastColor = computed(() => {
  switch (props.type) {
    case 'error':
      return '#ff355b'
    case 'warning':
      return '#e8b910'
    case 'success':
      return '#00cc69'
    default:
      return '#0067ff'
  }
})

// a computed property to set
// the title of the notification
const toastTitle = computed(() => {
  return props.title && props.title !== null ? props.title : props.type.toUpperCase()
})

// a method to close the
// notification and emit the action
const close = () => {
  emit('close')
}
</script>

<template>
  <div
    class="toast-notification"
    :style="`--toast-duration: ${duration}s; --toast-color: ${toastColor}`"
    :ref="id"
  >
    <div @click="close" class="close-btn" title="Close">
      <template v-if="canClose">
        <i class="ri-icon ri-lg ri-close-fill"></i>
      </template>
      <template v-else>
        <svg
          class="rotate-circle"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#0067ff"
          style="width: 16px; height: 16px; margin-top: 10px"
        >
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </template>
    </div>

    <div class="body">
      <i :class="`ri-icon ri-2x ${toastIcon}`"></i>
      <div class="vl"></div>
      <div class="content">
        <div class="content__title">{{ toastTitle }}</div>

        <p class="content__message">{{ message }}</p>
      </div>
    </div>
    <div v-if="autoClose" class="progress"></div>
  </div>
</template>

<style lang="stylus" scoped>
.toast-notification {
  font-family: Futura;
  cursor: pointer;
  max-width: 300PX;
  position: relative;
  background: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.08), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  // min-height: 100PX;
  padding-inline: 10PX;
  padding-block: 12PX;
  transition: all 0.3s ease-in-out;
  height: auto;
  border-radius: 6PX;
  min-width: 300PX;
}

.toast-notification .close-btn {
  position: absolute;
  top: 10PX;
  right: 10PX;
  display: flex;
  place-items: center;
  justify-content: center;
  height: 32PX;
  width: 32PX;
  transition: var(--all-transition);
  cursor: pointer;
}

.toast-notification .close-btn:hover {
  box-shadow: 0px 0px 10PX #e4e4e4;
  border-radius: 50%;
}

.toast-notification .body {
  display: flex;
  gap: 14PX;
  place-items: center;
}

.toast-notification .body i {
  color: var(--toast-color);
}

.toast-notification .body .vl {
  background: #e4e4e4;
  width: 1PX;
  height: 50PX;
  // flex: 1;
}

.toast-notification .body .content {
  display: flex;
  flex-direction: column;
  gap: 11PX;
  // height: 80PX;
  font-size: 16PX;
}

.toast-notification .body .content__title {
  font-size: 12PX;
  font-weight: 900;
}

.toast-notification .body .content__message {
  font-size: 16PX;
  margin: 0;
}

.toast-notification .progress {
  position: absolute;
  bottom: 0px;
  left: 0;
  height: 6PX;
  width: 100%;
  background: var(--toast-color);
  animation: progress var(--toast-duration) ease-in-out forwards;
}

@keyframes progress {
  to {
    width: 0;
  }
}

@keyframes toast-fade-in {
  to {
    opacity: 1;
  }
}

@keyframes toast-fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
