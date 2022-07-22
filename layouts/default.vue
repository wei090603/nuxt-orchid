<template>
  <div class="app">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style>
.app {
  width: 100%;
  height: 100vh;
  /* overflow: hidden; */
}
</style>
