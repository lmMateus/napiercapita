import { NextResponse } from 'next/server';
// import { supabase } from './lib/supabaseClient';
import { updateSession } from './utils/supabase/middleware';
import { createClient } from './utils/supabase/server';
import { getUser } from './app/login/api/login';

export async function middleware(req) {
  const res = NextResponse.next();
  const data = await getUser()
   if (data.data.user == null) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return await updateSession(req);
}

export const config = {
  matcher: ['/titulos', '/gerenciar-titulos', '/cadastro_titulos', '/dashboard', '/perfil', '/relatorio'],
};
