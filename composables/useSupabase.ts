import { createClient, SupabaseClient } from "@supabase/supabase-js";

interface UserData {
  email: string;
  password: string;
}

interface AuthResult {
  status: "success" | "error";
  message?: string;
}

// 單例模式：確保只創建一個 Supabase client
let supabaseClient: SupabaseClient | null = null;

const getSupabaseClient = () => {
  if (!supabaseClient) {
    const config = useRuntimeConfig();
    const supabaseUrl = config.public.supabaseUrl as string;
    const supabaseKey = config.public.supabaseKey as string;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase URL or Key is not configured");
    }

    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
};

export const useSupabase = () => {
  const supabase = getSupabaseClient();

  const userTableOperations = {
    async insertUser(userData: UserData): Promise<AuthResult> {
      const { error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        return { status: "error", message: error.message };
      }
      return { status: "success" };
    },

    async loginUser(userData: UserData): Promise<AuthResult> {
      const { error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        return { status: "error", message: error.message };
      }
      return { status: "success" };
    },

    async logoutUser(): Promise<AuthResult> {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { status: "error", message: error.message };
      }
      return { status: "success" };
    },
  };

  return {
    supabase,
    userTableOperations,
  };
};

