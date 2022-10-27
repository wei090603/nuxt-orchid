<template>
  <div class="app">
    <Header />
    <main>
      <slot />
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<style>
.app {
  width: 100%;
  height: inherit;
}
</style>
