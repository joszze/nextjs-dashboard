import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { email, password } = await req.json();

  try {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!data.user || !data.session) {
      return NextResponse.json("err", { status: 401 });
    }

    console.log(data.user);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json("err", { status: 401 });
  }
}
