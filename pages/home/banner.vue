<template>
  <!-- <n-carousel show-arrow autoplay>
    <template v-if="data.length > 0">
      <img
        v-for="(item, index) in data"
        :key="index"
        class="carousel-img"
        :src="imgUrl + item.picture"
      />
    </template>

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
  </n-carousel> -->

  <n-carousel show-arrow autoplay>
    <img
      v-for="(item, index) in data"
      :key="index"
      class="carousel-img rounded cursor-pointer"
      :src="imgUrl + item.picture"
      @click=""
    />
  </n-carousel>
</template>

<script lang="ts" setup>
import { getAdvertise } from '@/api/home';

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const { data } = await getAdvertise({ position: 'home' });
</script>

<style lang="less" scoped>
.n-carousel {
  flex: 1;
}

.carousel-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
}

// .custom-arrow {
//   display: flex;
//   position: absolute;
//   bottom: 25px;
//   right: 10px;
// }

// .custom-arrow button {
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   width: 28px;
//   height: 28px;
//   margin-right: 12px;
//   color: #fff;
//   background-color: rgba(255, 255, 255, 0.1);
//   border-width: 0;
//   border-radius: 8px;
//   transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   cursor: pointer;
// }

// .custom-arrow button:hover {
//   background-color: rgba(255, 255, 255, 0.2);
// }

// .custom-arrow button:active {
//   transform: scale(0.95);
//   transform-origin: center;
// }

// .custom-dots {
//   display: flex;
//   margin: 0;
//   padding: 0;
//   position: absolute;
//   bottom: 20px;
//   left: 20px;
// }

// .custom-dots li {
//   display: inline-block;
//   width: 12px;
//   height: 4px;
//   margin: 0 3px;
//   border-radius: 4px;
//   background-color: rgba(255, 255, 255, 0.4);
//   transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   cursor: pointer;
// }

// .custom-dots li.is-active {
//   width: 40px;
//   background: #fff;
// }
</style>
