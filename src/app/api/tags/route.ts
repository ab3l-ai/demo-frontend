export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const LLM_URL = process.env.NEXT_PUBLIC_LLM_URL || "http://localhost:11434";
  const res = await fetch(
    LLM_URL + "/api/tags"
  );
  return new Response(res.body, res);
}
