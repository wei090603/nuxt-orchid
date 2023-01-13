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
  height: 100vh;
}

main {
  width: 100%;
  min-height: 100vh;
}
</style>
