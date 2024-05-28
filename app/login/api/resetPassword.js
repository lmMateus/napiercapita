"use server"

import { supabase } from "../../../lib/supabaseClient";

const sendPasswordResetEmail = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/login', //redirecionar para a página de e-mail enviado
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    return null;
  }
};

export default sendPasswordResetEmail;