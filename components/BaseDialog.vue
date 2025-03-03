<script setup lang="ts">
import { reactive } from "@vue/reactivity";

const props = defineProps({
  dialog_visible: {
    type: Boolean,
    default: false,
  },
  dialog_title: {
    type: String,
  },
  dialog_width: {
    type: String,
    default: "450px",
  },
  show_footer: {
    type: Boolean,
    default: true,
  },
  use_before_fun: {
    type: Boolean,
    default: false,
  },
  use_custom_footer: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["closeEmit", "beforeCloseEmit", "submitEmit"]);

const doCancel = () => {
  emits("closeEmit");
};

const handleClose = () => {
  props.use_before_fun ? emits("beforeCloseEmit") : doCancel();
};
const doSubmit = () => {
  emits("submitEmit");
};
</script>

<template>
  <el-dialog
    :model-value="dialog_visible"
    :title="dialog_title"
    :width="dialog_width"
    :before-close="handleClose"
  >
    <slot></slot>
    <template #footer v-if="show_footer">
      <div class="default-footer" v-if="!use_custom_footer">
        <el-button type="info" @click="doCancel"> cancel</el-button>
        <el-button class="submit-btn" @click="doSubmit"> submit</el-button>
      </div>

      <slot name="homemade_footer"> </slot>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.submit-btn {
  @apply bg-success text-white;
}
</style>
