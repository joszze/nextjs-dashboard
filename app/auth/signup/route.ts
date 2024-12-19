import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { name, email, password } = await req.json();

  try {
    // Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: { name },
        },
      },
    );

    if (signUpError) {
      console.error("Sign Up Error:", signUpError);
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    const user = signUpData.user;
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: "User creation failed." },
        { status: 400 },
      );
    }

    // Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 3); // 3-day trial

    // Insert subscription record
    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from("subscriptions")
      .insert([
        {
          user_id: user.id,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          status: "trial", // Initial status
        },
      ]);

    if (subscriptionError) {
      console.error("Subscription Creation Error:", subscriptionError);
      // Optionally, delete the created user if subscription creation fails
      await supabase.auth.admin.deleteUser(user.id);
      return NextResponse.json(
        { error: subscriptionError.message },
        { status: 400 },
      );
    }

    console.log("User and Subscription Created:", user, subscriptionData);

    return NextResponse.json(
      { user, subscription: subscriptionData },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
