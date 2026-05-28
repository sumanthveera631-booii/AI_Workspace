import { NextResponse } from "next/server";

const GROQ_API_ENDPOINT = "https://api.groq.com/openai/v1";

function normalizeModel(model: string) {
  const value = model?.toLowerCase() || "";

  if (value.includes("openai/")) {
    return model;
  }

  if (value.includes("gpt-4o") || value.includes("gpt-4") || value.includes("gpt-3.5") || value.includes("chatgpt")) {
    return "openai/gpt-oss-20b";
  }

  return model || "openai/gpt-oss-20b";
}

export async function POST(request: Request) {
  // Support multiple env names: GROQ_API_KEY, groq_api_key, NEXT_PUBLIC_GROQ_API_KEY
  const apiKey = process.env.GROQ_API_KEY || process.env.groq_api_key || process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GROQ API key. Set GROQ_API_KEY or groq_api_key in your environment." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const model = normalizeModel(body?.model || "groq-1.0");

  const prompt = messages
    .map((message: { role: string; content: string }) => {
      const role = message.role === "assistant" ? "Assistant" : "User";
      return `${role}: ${message.content}`;
    })
    .join("\n");

  try {
    const response = await fetch(`${GROQ_API_ENDPOINT}/responses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: prompt,
        max_output_tokens: 500,
        temperature: 0.7,
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Groq API request failed.", status: response.status, details: responseText },
        { status: response.status }
      );
    }

    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = null;
    }

    const content =
      data?.output_text ||
      data?.outputs?.[0]?.content?.[0]?.text ||
      data?.output?.[0]?.content?.[0]?.text ||
      data?.choices?.[0]?.message?.content ||
      responseText ||
      "Groq AI returned no usable text.";

    return NextResponse.json({ text: content });
  } catch (error) {
    return NextResponse.json(
      {
        error: "AI request failed.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
