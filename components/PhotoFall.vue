<script setup lang="ts">
const props = defineProps({
  fall_title: {
    type: String,
    default: "",
  },
  image_list: {
    type: Array,
    default: [],
  },
  col_span: {
    type: Number,
    default: 4,
  },
});
const state = reactive({
  photoVisible: false,
  nowIndex: 0,
});
const openPhotoDialog = (nowIndex: number) => {
  state.nowIndex = nowIndex;
  state.photoVisible = true;
};
</script>

<template>
  <div class="fall">
    <div class="fall-header">
      <p class="title">{{ fall_title }}</p>
      <p class="count">
        {{
          $t("{numberOfImages} Images", {
            numberOfImages: image_list.length,
          })
        }}
      </p>
    </div>

    <div
      class="img-list"
      :class="{
        'grid-cols-4': col_span == 4,
        'grid-cols-5': col_span == 5,
      }"
    >
      <div
        class="image-box"
        v-for="(item, ind) in image_list"
        @click="openPhotoDialog(ind)"
      >
        <NuxtImg
          :key="ind"
          :src="item.fileUrl"
          alt=""
          format="webp"
          class="image-item"
        />
      </div>
    </div>
  </div>

  <el-dialog
    v-if="state.photoVisible"
    v-model="state.photoVisible"
    title=""
    class="screen-dialog"
    width="800px"
    destroy-on-close
  >
    <el-carousel
      indicator-position="outside"
      :initial-index="state.nowIndex"
      :autoplay="false"
      class="photo-carousel"
    >
      <el-carousel-item v-for="(item, ind) in image_list" :key="ind">
        <div class="carousel-item">
          <NuxtImg
            :key="ind"
            :src="item.fileUrl"
            alt=""
            format="webp"
            class="image-item"
          />
        </div>
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>

<style lang="scss" scoped>
.fall {
  @apply flex flex-col items-start mt-10;

  .fall-header {
    @apply flex items-center text-white mb-4;
    .title {
      @apply text-2xl;
    }
    .count {
      @apply opacity-60 ml-4;
    }
  }
  .img-list {
    @apply grid auto-rows-auto  gap-5;

    .image-box {
      @apply cursor-pointer;

      .image-item {
        &:hover {
          @apply transition duration-150 ease-in-out;
          transform: scale(1.1);
        }
      }
    }
  }
}
.photo-carousel {
  .carousel-item {
    width: 650px;
    height: 550px;

    img {
      @apply w-full h-full object-contain;
    }
  }
  ::v-deep() {
    .el-carousel__item {
      @apply bg-black;
      @apply flex items-center justify-center;
    }
    .el-carousel__container {
      min-height: 550px;
    }
    .el-carousel__indicators--outside {
      @apply hidden;
    }
  }
}
</style>
