<template>
  <button @click="show = !show">Menu</button>
  <transition name="fade">
    <MenuApp v-show="show" />
  </transition>
  <div>
    <Modal />
  </div>
</template>

<script>
import MenuApp from "./components/MenuApp.vue";
import Modal from "./components/Modal.vue";
export default {
  name: "App",
  components: { MenuApp, Modal },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.5s ease;
}
</style>
