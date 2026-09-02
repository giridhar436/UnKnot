import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/documents",
  "/categories",
  "/ask",
  "/finance",
  "/investments",
  "/reminders",
  "/settings",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Refresh session for every request
  const response = await updateSession(request);

  // Check if route is protected
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtected) {
    const {
      data: { user },
    } = await (
      await import("@/lib/supabase/server")
    )
      .createClient()
      .then((supabase) => supabase.auth.getUser());

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  if (authRoutes.includes(pathname)) {
    const {
      data: { user },
    } = await (
      await import("@/lib/supabase/server")
    )
      .createClient()
      .then((supabase) => supabase.auth.getUser());

    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
