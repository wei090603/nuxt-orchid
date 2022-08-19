<template>
  <div>
    <nav></nav>
    文章中心

    <NuxtLink to="/user/3">跳转</NuxtLink>
  </div>
</template>


<style scoped>
.view-nav {
    position: fixed;
    top: 5rem;
    width: 100%;
    height: 3.833rem;
    z-index: 100;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    transition: all .2s;
    transform: translateZ(0);
}
</style>