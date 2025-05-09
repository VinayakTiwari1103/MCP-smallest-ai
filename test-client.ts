import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

interface ToolResponse {
  content?: Array<{
    type: string;
    text: string;
  }>;
  isError?: boolean;
}

interface KnowledgeBaseData {
  data?: {
    id: string;
    name: string;
    description: string;
  };
}

async function main() {
  console.log("Starting MCP test client...");

  const transport = new StdioClientTransport({
    command: "bun",
    args: ["run", "index.ts"]
  });

  const client = new Client({
    name: "test-client",
    version: "1.0.0"
  });

  try {
    console.log("Connecting to MCP server...");
    await client.connect(transport);
    console.log("Connected successfully!");

    // Test listing knowledge bases
    console.log("\nTesting listKnowledgeBases...");
    const listResult = await client.callTool({
      name: "listKnowledgeBases",
      arguments: {}
    }) as ToolResponse;
    console.log("List Knowledge Bases Result:", listResult);

    // Test creating a knowledge base
    console.log("\nTesting createKnowledgeBase...");
    const createResult = await client.callTool({
      name: "createKnowledgeBase",
      arguments: {
        name: "Test Knowledge Base",
        description: "Created via MCP test client"
      }
    }) as ToolResponse;
    console.log("Create Knowledge Base Result:", createResult);

    // If we got an ID from the create result, test getting that knowledge base
    if (createResult.content?.[0]?.text) {
      const data = JSON.parse(createResult.content[0].text) as KnowledgeBaseData;
      if (data.data?.id) {
        console.log("\nTesting getKnowledgeBase...");
        const getResult = await client.callTool({
          name: "getKnowledgeBase",
          arguments: {
            id: data.data.id
          }
        }) as ToolResponse;
        console.log("Get Knowledge Base Result:", getResult);
      }
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    console.log("\nTest completed!");
    process.exit(0);
  }
}

main(); 