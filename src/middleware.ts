import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) return NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("YOUR_PROJECT") || supabaseUrl.includes("placeholder")) {
    return NextResponse.redirect(new URL("/admin/login?reason=configuration", request.url));
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login", request.url));

  const { data: profile, error } = await supabase.from("admin_profiles").select("role").eq("id", user.id).single();
  if (error || !profile || !["super_admin", "sales_admin"].includes(profile.role)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/admin/login?reason=unauthorized", request.url));
  }

  return response;
}

export const config = { matcher: ["/admin/:path*"] };
