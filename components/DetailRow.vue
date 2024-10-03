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

const colSpan = !props.label_2 ? 16: 12
</script>

<template>
  <div class="detail-row">
    <el-row >
    <el-col :span="colSpan">
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
      </el-col>
      <el-col v-if="label_2" :span="12">
        <el-row class="item">
          <el-col :span="9">
            <div class="label">{{ label_2 }}:</div>


          </el-col>
          <el-col :span="12">
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

          </el-col>
        </el-row>

      </el-col>
      
    </el-row>
  </div>
</template>

<style lang="scss" scoped>

.detail-row {
  @apply w-3/5 text-white mt-2;

  .rwd-row {
  @apply flex justify-between;

  }
}

.item {
  @apply flex items-center;

  .label {
    @apply mr-2 text-right w-20 ;
  }
  .value {
    @apply flex-1 ml-2;
    @apply flex;
  }
  .tag-value {
  }
}
</style>
