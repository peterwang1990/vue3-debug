<template>
  <transition name="mask" leave-active-class="mask-leave-active">
    <div class="modal-mask" @click="close">
      <transition
        name="custom-classes-transition"
        :enter-active-class="animation_in"
        :leave-active-class="animation_out"
      >
        <div v-if="isShow" class="modal-wrapper animated">
          <div @click.stop class="modal-content">
            <!--					<div-->
            <!--						class="modal-header">-->
            <!--						<slot-->
            <!--							name="modal-header">-->
            <!--							<button-->
            <!--								type         = "button"-->
            <!--								class        = "close"-->
            <!--								data-dismiss = "modal"-->
            <!--								aria-label   = "Close"-->
            <!--								@click       = "close">-->
            <!--								<span-->
            <!--									aria-hidden="true">-->
            <!--									&times;-->
            <!--								</span>-->
            <!--							</button>-->
            <!--							<h4-->
            <!--								class="modal-title">-->
            <!--								{{title}}-->
            <!--							</h4>-->
            <!--						</slot>-->
            <!--					</div>-->

            <div class="modal-body">
              <slot name="modal-body"> default body </slot>
            </div>

            <!--					<div-->
            <!--						class = "modal-footer">-->
            <!--						<slot-->
            <!--							name = "modal-footer">-->
            <!--							<button-->
            <!--								class  = "modal-default-button"-->
            <!--								@click = "close">-->
            <!--								OK-->
            <!--							</button>-->
            <!--						</slot>-->
            <!--					</div>-->
          </div>
          <!-- Modal-container end -->
        </div>
        <!-- Modal-wrapper end -->
      </transition>
    </div>
    <!-- Modal-mask end -->
  </transition>
</template>

<script>
export default {
  data() {
    return {
      animate: true,
      animation: ''
    }
  },
  props: {
    title: String,
    intro: String,
    outro: String,
    isShow: Boolean
  },
  computed: {
    animation_in() {
      if (this.intro === undefined) return 'default'
      if (this.intro === 'none') return ''
      return `${this.intro} animated`
    },
    animation_out() {
      if (this.outro === undefined) return 'default'
      if (this.outro === 'none') return ''
      return `${this.outro} animated`
    }
  },
  created() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 27) this.close()
    })
  },
  methods: {
    close() {
      this.$emit('close')
    },
    enter() {
      this.animation = this.animation_in
    },
    leave() {
      this.animation = this.animation_out
    }
  }
}
</script>

<!-- my-component.vue -->
<style>
@import 'light-modal.css';
@import '../../../assets/css/animate.min.css';

.mask-leave-active {
  /*transition:all 1s;*/
  transition-delay: 0.6s;
}
</style>
