// OpenRouter API configuration
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

// List of models to try in order of preference (OpenRouter format)
// Using verified OpenRouter model IDs - these are confirmed to work
const MODEL_PRIORITY = [
  "google/gemini-flash-1.5",                    // Fast and widely available
  "google/gemini-pro-1.5",                     // More capable
  "anthropic/claude-3.5-sonnet",              // Reliable alternative
  "openai/gpt-4o-mini",                       // OpenAI fallback
  "openai/gpt-3.5-turbo",                     // Cheaper OpenAI option
  "meta-llama/llama-3.1-8b-instruct:free",    // Free option
]

/**
 * Fetches available models from OpenRouter (for debugging)
 */
export async function getAvailableModels(): Promise<string[]> {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) return []
    
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    })
    
    if (!response.ok) return []
    
    const data = await response.json()
    return data.data?.map((model: any) => model.id) || []
  } catch (error) {
    console.error("Error fetching available models:", error)
    return []
  }
}

/**
 * Helper function to check if error is a model not found error
 */
function isModelNotFoundError(error: any): boolean {
  if (!error) return false
  const errorMessage = error?.message || ""
  const errorResponse = error?.response || {}
  return (
    error?.status === 404 ||
    error?.statusCode === 404 ||
    errorMessage.includes("not found") ||
    errorMessage.includes("is not found") ||
    errorMessage.includes("not supported") ||
    errorMessage.includes("model_not_found") ||
    errorResponse?.error?.code === "model_not_found"
  )
}

export async function generateText(prompt: string): Promise<string> {
  // Prioritize OPENROUTER_API_KEY - we're using OpenRouter now, not Gemini
  const openRouterKey = process.env.OPENROUTER_API_KEY
  const geminiKey = process.env.GEMINI_API_KEY
  
  // Debug: Log what we found
  if (!openRouterKey && !geminiKey) {
    console.error("❌ API Key Missing!")
    throw new Error(
      "OPENROUTER_API_KEY is not configured in your .env file.\n\n" +
      "Please add this line to your .env file:\n" +
      'OPENROUTER_API_KEY="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"\n\n' +
      "Then restart your dev server with: npm run dev"
    )
  }

  // Use OpenRouter key if available, otherwise warn about using Gemini key
  let apiKey: string
  if (openRouterKey) {
    apiKey = openRouterKey
    console.log("🔑 Using OpenRouter API key:", apiKey.substring(0, 15) + "...")
  } else if (geminiKey) {
    // This is wrong - we need OpenRouter key, not Gemini key
    console.error("❌ WRONG API KEY TYPE!")
    console.error("   Found: GEMINI_API_KEY (AIza...) - This won't work with OpenRouter!")
    console.error("   Need: OPENROUTER_API_KEY (sk-or-v1-...)")
    throw new Error(
      "❌ You're using a Gemini API key, but this app now uses OpenRouter!\n\n" +
      "The Gemini API key (AIza...) won't work with OpenRouter.\n\n" +
      "Please add this to your .env file:\n" +
      'OPENROUTER_API_KEY="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"\n\n' +
      "Then restart your dev server: npm run dev"
    )
  } else {
    throw new Error("No API key found")
  }

  // Validate OpenRouter key format
  if (!apiKey.startsWith("sk-or-v1-")) {
    console.error("❌ Invalid OpenRouter API key format!")
    console.error("   Your key starts with:", apiKey.substring(0, 15))
    console.error("   Expected format: sk-or-v1-...")
    throw new Error(
      "Invalid OpenRouter API key format. Keys should start with 'sk-or-v1-'.\n\n" +
      "Your key starts with: " + apiKey.substring(0, 15) + "...\n\n" +
      "Please check your .env file and make sure OPENROUTER_API_KEY is set correctly."
    )
  }

  let lastError: any = null

  // Try each model in priority order
  for (const modelName of MODEL_PRIORITY) {
    try {
      // Ensure API key is not empty
      if (!apiKey || apiKey.trim() === "") {
        throw new Error("API key is empty or invalid")
      }

      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey.trim()}`,
          "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
          "X-Title": "WorkHub Career Copilot",
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error: any = new Error(errorData?.error?.message || `HTTP ${response.status}`)
        error.status = response.status
        error.response = errorData
        throw error
      }

      const data = await response.json()
      const text = data.choices?.[0]?.message?.content

      if (!text) {
        throw new Error("No response text from OpenRouter API")
      }

      // If we get here, the model worked
      if (modelName !== MODEL_PRIORITY[0]) {
        console.log(`✅ Using fallback model: ${modelName}`)
      }
      return text
    } catch (error: any) {
      lastError = error
      // If it's a model not found error, try next model
      if (isModelNotFoundError(error)) {
        console.warn(`⚠️  Model ${modelName} not available, trying next...`)
        continue
      }
      // For other errors (auth, rate limit, etc.), throw immediately
      console.error(`❌ OpenRouter API error with model ${modelName}:`, error)
      throw error
    }
  }

  // If all models failed, provide detailed error message
  console.error("❌ All models failed:", lastError)
  const errorMessage = lastError?.message || "Unknown error"
  
  throw new Error(
    `🚫 All AI models unavailable with your OpenRouter API key.\n\n` +
    `Possible issues:\n` +
    `1. ❌ Invalid API key - Your key might be incorrect or expired\n` +
    `2. 💳 Insufficient credits - Your OpenRouter account might be out of credits\n` +
    `3. 🔒 API key restrictions - Your key might have restrictions\n` +
    `4. 🌐 Network/API issue - OpenRouter API might be temporarily unavailable\n\n` +
    `💡 Solutions:\n` +
    `• Verify your API key in .env: OPENROUTER_API_KEY="your-key-here"\n` +
    `• Check your OpenRouter dashboard: https://openrouter.ai/keys\n` +
    `• Ensure you have credits/balance in your OpenRouter account\n` +
    `• Try again in a few moments if it's a temporary issue\n\n` +
    `Last error: ${errorMessage}`
  )
}

/**
 * Extracts JSON from text response, handling markdown code blocks
 */
export function extractJSON(text: string): any {
  try {
    // Try to parse directly first
    return JSON.parse(text)
  } catch {
    // If that fails, try to extract JSON from markdown code blocks
    const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || text.match(/(\{[\s\S]*\})/)
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1])
      } catch {
        // If still fails, try to find the first valid JSON object
        const braceMatch = text.match(/\{[\s\S]*\}/)
        if (braceMatch) {
          return JSON.parse(braceMatch[0])
        }
      }
    }
    throw new Error("Could not extract valid JSON from response")
  }
}

