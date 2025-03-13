import { createClient } from "@supabase/supabase-js";
import { useRuntimeConfig } from "#imports";
import { ElMessage } from "element-plus";

interface UserData {
  email: string;
  password: string;
}

export const useSupabase = () => {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supaBaseUrl;
  const supabaseKey = config.public.supaBaseKey;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const userTableOperations = {
    // 插入用戶數據
    async insertUser(userData: UserData) {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });
      if (!error) {
        //success
        return { status: "success" };
      } else {
        // error
        ElMessage.error(error.message);
        return { status: "error" };
      }
    },
    async loginUser(userData: UserData) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      if (!error) {
        //success
        return { status: "success" };
      } else {
        // error
        ElMessage.error(error.message);
        return { status: "error" };
      }
    },
  };

  const authOperations = {};

  return {
    supabase,
    userTableOperations,
    authOperations,
  };
};
