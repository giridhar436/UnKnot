import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { askContextEngine } from "@/lib/services/context-engine";

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { question } = body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_INPUT", message: "Question is required" } },
        { status: 400 }
      );
    }

    console.log(`[Ask API] Request from user ${user.id}: "${question.trim()}"`);

    const analysis = await askContextEngine(user.id, question.trim());

    console.log(`[Ask API] Success — answer length: ${analysis.answer.length} chars`);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Ask API] Failed:", message);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message:
            process.env.NODE_ENV === "development"
              ? `Ask UnKnot failed: ${message}`
              : "Failed to process your question",
        },
      },
      { status: 500 }
    );
  }
}
