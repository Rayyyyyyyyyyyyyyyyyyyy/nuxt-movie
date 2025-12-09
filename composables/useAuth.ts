import type { User, Session } from "@supabase/supabase-js";
import { useSupabase } from "./useSupabase";

// 全局用戶狀態
const currentUser = ref<User | null>(null);
const currentSession = ref<Session | null>(null);
const isAuthenticated = computed(() => !!currentUser.value);
const isLoading = ref(true);

export const useAuth = () => {
  const { supabase, userTableOperations } = useSupabase();

  // 初始化：檢查當前登入狀態
  const initAuth = async () => {
    isLoading.value = true;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        currentSession.value = session;
        currentUser.value = session.user;
      }
    } catch (error) {
      console.error("Failed to get session:", error);
    } finally {
      isLoading.value = false;
    }

    // 監聽 auth 狀態變化
    supabase.auth.onAuthStateChange((event, session) => {
      currentSession.value = session;
      currentUser.value = session?.user ?? null;
    });
  };

  // 登入
  const login = async (email: string, password: string) => {
    const result = await userTableOperations.loginUser({ email, password });
    if (result.status === "success") {
      // 登入成功後重新獲取 session
      const { data: { session } } = await supabase.auth.getSession();
      currentSession.value = session;
      currentUser.value = session?.user ?? null;
    }
    return result;
  };

  // 註冊
  const signUp = async (email: string, password: string) => {
    return await userTableOperations.insertUser({ email, password });
  };

  // 登出
  const logout = async () => {
    const result = await userTableOperations.logoutUser();
    if (result.status === "success") {
      currentUser.value = null;
      currentSession.value = null;
    }
    return result;
  };

  // 獲取用戶顯示名稱
  const displayName = computed(() => {
    if (!currentUser.value) return null;
    return currentUser.value.email?.split("@")[0] ?? "User";
  });

  return {
    // 狀態
    currentUser: readonly(currentUser),
    currentSession: readonly(currentSession),
    isAuthenticated,
    isLoading: readonly(isLoading),
    displayName,

    // 方法
    initAuth,
    login,
    signUp,
    logout,
  };
};

