import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
};

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

function validate(payload: ContactPayload) {
  const errors: Record<string, string> = {};

  if (!payload.name?.trim()) {
    errors.name = "Name is required.";
  }

  if (!payload.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(payload.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!payload.projectType?.trim()) {
    errors.projectType = "Project type is required.";
  }

  if (!payload.message?.trim()) {
    errors.message = "Message is required.";
  } else if (payload.message.trim().length < 20) {
    errors.message = "Please provide at least 20 characters.";
  }

  return errors;
}

export async function POST(req: Request) {
  let payload: ContactPayload;

  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const errors = validate(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please fix the highlighted fields.",
        errors,
      },
      { status: 400 },
    );
  }

  // Hook this to CRM/email provider or internal lead pipeline.
  return NextResponse.json({
    ok: true,
    message: "Message received. We will get back to you shortly.",
  });
}
