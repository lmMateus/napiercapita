import { supabase } from "./supabaseClient";
const getCurrentUser = async () => {
  console.log("Aqui")
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error getting user:', error.message);
    return null;
  }
};

export default getCurrentUser;