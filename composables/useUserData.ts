import { useSupabase } from "./useSupabase";

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  media_id: number;
  media_type: "movie" | "tv";
  title: string;
  poster_path: string | null;
  vote_average: number | null;
  created_at: string;
}

export const useUserData = () => {
  const { supabase } = useSupabase();
  const { currentUser } = useAuth();

  // 獲取用戶個人資料
  const getProfile = async (): Promise<Profile | null> => {
    if (!currentUser.value) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", currentUser.value.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
    return data;
  };

  // 更新用戶個人資料
  const updateProfile = async (updates: Partial<Profile>): Promise<{ success: boolean; message?: string }> => {
    if (!currentUser.value) {
      return { success: false, message: "未登入" };
    }

    const { error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", currentUser.value.id);

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true };
  };

  // 獲取收藏列表
  const getFavorites = async (): Promise<Favorite[]> => {
    if (!currentUser.value) return [];

    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", currentUser.value.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
    return data || [];
  };

  // 添加收藏
  const addFavorite = async (item: {
    media_id: number;
    media_type: "movie" | "tv";
    title: string;
    poster_path?: string;
    vote_average?: number;
  }): Promise<{ success: boolean; message?: string }> => {
    if (!currentUser.value) {
      return { success: false, message: "請先登入" };
    }

    const { error } = await supabase.from("favorites").insert({
      user_id: currentUser.value.id,
      media_id: item.media_id,
      media_type: item.media_type,
      title: item.title,
      poster_path: item.poster_path || null,
      vote_average: item.vote_average || null,
    });

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "已經收藏過了" };
      }
      return { success: false, message: error.message };
    }
    return { success: true };
  };

  // 移除收藏
  const removeFavorite = async (mediaId: number, mediaType: "movie" | "tv"): Promise<{ success: boolean; message?: string }> => {
    if (!currentUser.value) {
      return { success: false, message: "請先登入" };
    }

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", currentUser.value.id)
      .eq("media_id", mediaId)
      .eq("media_type", mediaType);

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true };
  };

  // 檢查是否已收藏
  const isFavorited = async (mediaId: number, mediaType: "movie" | "tv"): Promise<boolean> => {
    if (!currentUser.value) return false;

    const { data } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", currentUser.value.id)
      .eq("media_id", mediaId)
      .eq("media_type", mediaType)
      .single();

    return !!data;
  };

  return {
    getProfile,
    updateProfile,
    getFavorites,
    addFavorite,
    removeFavorite,
    isFavorited,
  };
};

