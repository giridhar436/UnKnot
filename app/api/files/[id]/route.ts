import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      );
    }

    const { id } = await params;

    const { data: file, error } = await supabase
      .from("files")
      .select("secure_url, cloudinary_public_id")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !file) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "File not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      url: file.secure_url,
    });
  } catch (error) {
    console.error("File API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to retrieve file" },
      },
      { status: 500 }
    );
  }
}
