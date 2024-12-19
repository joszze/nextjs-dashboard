import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { password, accessToken } = await req.json();

  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(accessToken);

    if (sessionError) {
      console.error("Error exchanging code for session:", sessionError);
      return NextResponse.json("Invalid or expired token", { status: 401 });
    }

    // Now we have a session, we can safely update the user's password
    const { data: updatedUser, error: updateError } =
      await supabase.auth.updateUser({
        password,
      });

    if (updateError) {
      console.error("Error updating user:", updateError);
      return NextResponse.json("Failed to update password", { status: 500 });
    }

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json("err", { status: 401 });
  }
}
