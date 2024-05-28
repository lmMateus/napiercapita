"use server"

import { supabase } from "./supabaseClient";

const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Error signing out:', error.message);
    return false;
  }
};

export default signOutUser;