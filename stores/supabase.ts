import { createClient } from "@supabase/supabase-js";
import { useRuntimeConfig } from "#imports";
import { ElMessage } from "element-plus";

interface SignUpData {
  email: string;
  password: string;
  userName: string;
}

interface UserData {
  email: string;
  password: string;
  userName: string;
}

export const useSupabase = () => {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supaBaseUrl;
  const supabaseKey = config.public.supaBaseKey;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const userTableOperations = {
    // 插入用戶數據
    async insertUser(userData: UserData) {
      try {
        const { data, error } = await supabase
          .from('user_table')
          .insert({
            user_id: Date.now(), // 使用時間戳作為 int8 類型的 ID
            created_at: new Date().toISOString(), // timestamptz 格式
            email: userData.email,
            userName: userData.userName,
            password: userData.password
          })
          .select()
          .single();

        if (error) {
          ElMessage.error(`插入失敗: ${error.message}`);
          return { success: false, error };
        }

        ElMessage.success('註冊成功！');
        return { success: true, data };
      } catch (e) {
        ElMessage.error('註冊過程發生錯誤，請稍後重試');
        return { success: false, error: e };
      }
    }
  };

  const authOperations = {};

  return {
    supabase,
    userTableOperations,
    authOperations,
  };
};
