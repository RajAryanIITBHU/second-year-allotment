const API_URL =
  "https://Phi-4-ndonn.eastus2.models.ai.azure.com/v1/chat/completions";
const API_KEY = "eN6OkrwiQ4B6PFdjccDncrEb77eo7fQ1"; // Keep this secure!

async function callAzureML() {
  const requestData = {
    model: "Phi-4",
    messages: [
      { role: "system", content: "You are an AI assistant." },
      { role: "user", content: "Tell me about space exploration." },
    ],
    temperature: 0.7,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("AI Response:", JSON.parse(responseData));
  } catch (error) {
    console.error("Error calling Azure ML API:", error);
  }
}

callAzureML();
