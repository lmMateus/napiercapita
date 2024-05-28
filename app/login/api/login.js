'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(email, senha) {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    console.error('Login error:', error.message);
    redirect('/error');
  }

  revalidatePath('/titulos', 'layout');
  redirect('/titulos');
}

export async function getUser() {
  const supabase = await createClient();
  return await supabase.auth.getUser();
}

