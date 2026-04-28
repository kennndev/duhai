import "server-only";
import Anthropic from "@anthropic-ai/sdk";

export async function callAnthropic(prompt: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_PRIMARY_MODEL;

  if (!apiKey || !model) {
    throw new Error("Anthropic environment variables are not configured.");
  }

  const client = new Anthropic({ apiKey });
  const response = await client.messages.create({
    model,
    max_tokens: 1800,
    temperature: 0.1,
    messages: [{ role: "user", content: prompt }]
  });

  const first = response.content[0];
  if (!first || first.type !== "text") {
    throw new Error("Anthropic returned no text content.");
  }

  return {
    text: first.text,
    model,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens
  };
}
