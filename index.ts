import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { config } from './config';

// Create an MCP server
const server = new McpServer({
  name: "Smallest.ai MCP Server",
  version: "1.0.0"
});

// Knowledge Base Management Tools
server.tool(
  "listKnowledgeBases",
  {}, // Empty object for no parameters
  async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/knowledgebase`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error fetching knowledge bases:', error);
      return {
        content: [{ type: "text", text: `Error: ${errorMessage}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "createKnowledgeBase",
  {
    name: z.string(),
    description: z.string()
  },
  async (args) => {
    try {
      const response = await fetch(`${config.BASE_URL}/knowledgebase`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: args.name, description: args.description })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error creating knowledge base:', error);
      return {
        content: [{ type: "text", text: `Error: ${errorMessage}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "getKnowledgeBase",
  {
    id: z.string()
  },
  async (args) => {
    try {
      const response = await fetch(`${config.BASE_URL}/knowledgebase/${args.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error fetching knowledge base:', error);
      return {
        content: [{ type: "text", text: `Error: ${errorMessage}` }],
        isError: true
      };
    }
  }
);

// Add a resource for documentation
server.resource(
  "documentation",
  "docs://smallest.ai",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: `Smallest.ai API Documentation
      
Available Tools:
1. listKnowledgeBases - List all knowledge bases
2. createKnowledgeBase - Create a new knowledge base
3. getKnowledgeBase - Get details of a specific knowledge base

Usage Examples:
- To list all knowledge bases: Call listKnowledgeBases without parameters
- To create a knowledge base: Call createKnowledgeBase with name and description
- To get a knowledge base: Call getKnowledgeBase with the knowledge base ID`
    }]
  })
);

// Add a prompt for common operations
server.prompt(
  "createKnowledgeBasePrompt",
  {
    name: z.string(),
    description: z.string()
  },
  ({ name, description }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please create a new knowledge base with the following details:
Name: ${name}
Description: ${description}

Use the createKnowledgeBase tool to create this knowledge base.`
      }
    }]
  })
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);