import { supabase } from "./supabaseClient";

const getCurrentSession = async () => {
  try {
    const data = await supabase.auth.getSession();
    // if (error) {
    //   throw error;
    // }
    return data;
  } catch (error) {
    console.error('Error getting session:', error.message);
    return null;
  }
};

export default getCurrentSession;