import { NextResponse } from 'next/server';
// import { supabase } from './lib/supabaseClient';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(req) {
  const res = NextResponse.next();
  // const data = async () => {
  //   return await supabase.auth.getUser()
  // };
  // if (!data) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  return await updateSession(req);
}

export const config = {
  matcher: ['/titulos', '/gerenciar-titulos', '/cadastro_titulos', '/dashboard', '/perfil', '/relatorio'],
};
