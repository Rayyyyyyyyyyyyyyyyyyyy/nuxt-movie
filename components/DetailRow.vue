<script setup lang="ts">
const props = defineProps({
  label_1: {
    type: String,
    default: "",
  },
  label_2: {
    type: String,
    default: "",
  },
  value_1: {
    type: String,
    default: "",
  },
  value_2: {
    type: String,
    default: "",
  },
  tag_list: {
    type: Array,
    default: [],
  },
  use_left_tag: {
    type: Boolean,
    default: false,
  },
  use_right_tag: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["leftTagClickEmit", "rightTagClickEmit"]);
const onLeftTagClick = () => {
  emits("leftTagClickEmit");
};
const onRightTagClick = (tagId: string) => {
  emits("rightTagClickEmit", tagId);
};
</script>

<template>
  <div class="detail-row">
    <div class="item">
      <div class="label">{{ label_1 }}:</div>
      <p v-if="!use_left_tag" class="value">
        {{ value_1 }}
      </p>
      <div v-if="use_left_tag" class="value">
        <el-button type="info" plain size="small" @click="onLeftTagClick">{{
          value_1
        }}</el-button>
      </div>
    </div>
    <div class="item" v-if="label_2">
      <div class="label">{{ label_2 }}:</div>
      <p v-if="!use_right_tag" class="value">
        {{ value_2 }}
      </p>
      <div v-if="use_right_tag" class="value tag-value">
        <el-button
          v-for="tag in tag_list"
          :key="tag.id"
          type="info"
          plain
          size="small"
          @click="onRightTagClick(tag.id)"
          >{{ tag.name }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-row {
  @apply w-3/5 text-white mt-2;
  @apply grid grid-rows-1 grid-cols-2 gap-4;

  @media screen and (max-width: 1440px) {
    @apply grid-cols-1 float-left;
  }
}

.item {
  @apply grid grid-rows-1 grid-cols-12 gap-4;

  .label {
    @apply mr-2 text-right col-span-5;
    @media screen and (max-width: 1440px) {
      @apply col-span-3;
    }
  }
  .value {
    @apply ml-2;
    @apply flex col-span-7;
  }
  .tag-value {
  }
}
</style>
