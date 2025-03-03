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

// 定義返回的數據類型
interface UserResponse {
  user_id: number;
  email: string;
  userName: string;
  created_at: string;
}

export const useSupabase = () => {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supaBaseUrl;
  const supabaseKey = config.public.supaBaseKey;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const userTableOperations = {
    // 檢查郵箱是否已存在
    async checkEmailExists(email: string) {
      const { data, error } = await supabase
        .from('user_table')
        .select('email')
        .eq('email', email);

      if (error) {
        ElMessage.error(`檢查郵箱時發生錯誤: ${error.message}`);
        return { exists: false, error };
      }

      return { exists: data && data.length > 0, error: null };
    },

    // 檢查用戶名是否已存在
    async checkUserNameExists(userName: string) {
      const { data, error } = await supabase
        .from('user_table')
        .select('userName')
        .eq('userName', userName);

      if (error) {
        ElMessage.error(`檢查用戶名時發生錯誤: ${error.message}`);
        return { exists: false, error };
      }

      return { exists: data && data.length > 0, error: null };
    },

    // 插入用戶數據
    async insertUser(userData: UserData): Promise<{ success: boolean; data?: UserResponse; error?: any }> {
      try {
        // 先檢查郵箱是否已存在
        const { exists: emailExists, error: emailError } = await this.checkEmailExists(userData.email);
        
        if (emailError) {
          return { success: false, error: emailError };
        }

        if (emailExists) {
          ElMessage.error('該郵箱已經註冊');
          return { success: false, error: new Error('該郵箱已經註冊') };
        }

        // 檢查用戶名是否已存在
        const { exists: userNameExists, error: userNameError } = await this.checkUserNameExists(userData.userName);

        if (userNameError) {
          return { success: false, error: userNameError };
        }

        if (userNameExists) {
          ElMessage.error('該用戶名已被使用');
          return { success: false, error: new Error('該用戶名已被使用') };
        }

        // 如果郵箱和用戶名都不存在，則進行插入
        const { data, error } = await supabase
          .from('user_table')
          .insert({
            user_id: Date.now(),
            created_at: new Date().toISOString(),
            email: userData.email,
            userName: userData.userName,
            password: userData.password
          })
          .select(`
            user_id,
            email,
            userName,
            created_at
          `)
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
    },

    // 獲取用戶列表（帶分頁）
    async getUserList(page = 1, pageSize = 10) {
      const { data, error, count } = await supabase
        .from('user_table')
        .select(`
          user_id,
          email,
          userName,
          created_at
        `, { count: 'exact' })
        .range((page - 1) * pageSize, page * pageSize - 1)
        .order('created_at', { ascending: false });

      if (error) {
        ElMessage.error(`獲取用戶列表失敗: ${error.message}`);
        return { success: false, error };
      }

      return {
        success: true,
        data,
        pagination: {
          total: count,
          current: page,
          pageSize
        }
      };
    }
  };

  const authOperations = {};

  return {
    supabase,
    userTableOperations,
    authOperations,
  };
};
