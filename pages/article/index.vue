<template>
  <div class="wrapper">
    <ArticleCategory />
    <div class="main">
      <div class="container">
        <ArticleList />

        <Function />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.wrapper {
  padding-top: 100px;
}

.main {
  padding-top: 10px;
  margin-bottom: 5px;
  .container {
    display: flex;
    justify-content: space-between;
    width: 1250px;
    margin: 0 auto;

    // .function {
    //   flex: 1;
    //   margin-left: 20px;
    //   .sticky {
    //     position: sticky;
    //     top: 110px;
    //     .sign-box {
    //       width: 280px;
    //       margin-bottom: 20px;
    //       padding: 0 10px 20px;
    //       background-color: var(--Yuexing-bg);
    //       border-radius: 3px;
    //       box-shadow: 0 1px 3px rgb(26 26 26 / 20%);
    //       transition: all 0.3s;
    //     }
    //   }
    // }
  }
}
</style>
