<script setup lang="ts">
import dayjs from "dayjs";
import AppUtils from "~/utils/appUtils";
import { TMovieDetail } from "~/types/apiType";

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
    <el-row justify="space-between">
      <el-col :span="12">
        <div class="item">
          <div class="label">{{ label_1 }}:</div>
          <p class="value" v-if="!use_left_tag">
            {{ value_1 }}
          </p>
          <div class="value" v-if="use_left_tag">
            <el-button type="info" plain size="small" @click="onLeftTagClick">{{
              value_1
            }}</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12" v-if="label_2">
        <div class="item">
          <div class="label">{{ label_2 }}:</div>
          <p class="value" v-if="!use_right_tag">
            {{ value_2 }}
          </p>
          <div class="value" v-if="use_right_tag">
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
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.detail-row {
  @apply w-3/5 text-white mt-2;
}

.item {
  @apply flex items-center;

  .label {
    @apply mr-2 text-right w-20;
  }
  .value {
    @apply flex-1 ml-2;
    @apply flex;
  }
}
</style>
