<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from "element-plus";

const { signUp } = useAuth();

defineProps({
  signVisible: {
    type: Boolean,
    default: false,
  },
});

const signForm = ref();
const emits = defineEmits(["closeSignForm"]);

const state = reactive({
  signForm: {
    email: "",
    password: "",
  },
  signRules: {
    email: [
      {
        required: true,
        message: "Please input email address",
        trigger: "blur",
      },
      {
        type: "email",
        message: "Please input correct email address",
        trigger: ["blur", "change"],
      },
    ],
    password: [
      {
        required: true,
        message: "Please enter your password",
        trigger: "blur",
      },
    ],
  } as FormRules,
});

const isSubmitting = ref(false);

const submitFun = async (refForm: FormInstance) => {
  if (!refForm || isSubmitting.value) return;

  await refForm.validate(async (valid) => {
    if (valid) {
      isSubmitting.value = true;
      try {
        const result = await signUp(state.signForm.email, state.signForm.password);
        if (result.status === "success") {
          ElMessage.success("註冊成功，請查看您的 Email 進行驗證");
          closeFun(refForm);
        } else if (result.message) {
          ElMessage.error(result.message);
        }
      } finally {
        isSubmitting.value = false;
      }
    }
  });
};

const closeFun = (formEl: FormInstance) => {
  if (!formEl) return;
  formEl.resetFields();
  emits("closeSignForm");
};
</script>

<template>
  <BaseDialog
    :dialog_visible="signVisible"
    dialog_title="Sign Up"
    @closeEmit="closeFun(signForm)"
    dialog_width="600"
    @submitEmit="submitFun(signForm)"
  >
    <div class="sign-wrapper">
      <el-form
        :model="state.signForm"
        label-width="150px"
        ref="signForm"
        :rules="state.signRules"
      >
        <el-form-item label="Email address" prop="email">
          <el-input
            v-model="state.signForm.email"
            placeholder="Email address"
          />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="state.signForm.password"
            placeholder="Password"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
    </div>
  </BaseDialog>
</template>

<style scoped lang="scss">
.sign-wrapper {
  @apply p-4;
}
</style>
