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
  height: inherit;
  /* overflow: hidden; */
}
</style>
