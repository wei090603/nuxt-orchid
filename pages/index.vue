<template>
  <div class="wrapper">
    <n-carousel show-arrow autoplay>
      <img v-for="(item, index) in advertiseList" :key="index"
        class="carousel-img"
        :src="imgUrl + item.picture"
        :alt="item.title"
      />
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <button type="button" class="curtom-arrow--left" @click="prev">
            <n-icon><ArrowBack /></n-icon>
          </button>
          <button type="button" class="curtom-arrow--right" @click="next">
            <n-icon><ArrowForward /></n-icon>
          </button>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>
  </div>
</template>

<script setup lang="ts">
import { NIcon, NCarousel } from "naive-ui";
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { advertise } from "~~/api/home";

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL

useHead({
  title: '兰花交流',
  
})

const data = await advertise({ position: 'home'});
const advertiseList = data.value;

</script>

<style scoped>

.wrapper {
  margin-top: 20px;
}

.carousel-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</style>
