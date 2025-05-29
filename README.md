
![image](https://i.imgur.com/TJ2tT4g.png)   
# MCP-Smallest.ai

A Model Context Protocol (MCP) server implementation for Smallest.ai API integration. This project provides a standardized interface for interacting with Smallest.ai's knowledge base management system.

## Architecture

### System Overview
![Untitled-2025-03-21-0340(6)](https://github.com/user-attachments/assets/76cddefa-5ff6-4c1f-b3f5-55ea91393fbe)
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client App     │◄────┤   MCP Server    │◄────┤  Smallest.ai    │
│                 │     │                 │     │    API          │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Component Details

#### 1. Client Application Layer
- Implements MCP client protocol
- Handles request formatting
- Manages response parsing
- Provides error handling

#### 2. MCP Server Layer
- **Protocol Handler**
  - Manages MCP protocol communication
  - Handles client connections
  - Routes requests to appropriate tools

- **Tool Implementation**
  - Knowledge base management tools
  - Parameter validation
  - Response formatting
  - Error handling

- **API Integration**
  - Smallest.ai API communication
  - Authentication management
  - Request/response handling

#### 3. Smallest.ai API Layer
- Knowledge base management
- Data storage and retrieval
- Authentication and authorization

### Data Flow
```
1. Client Request
   └─► MCP Protocol Validation
       └─► Tool Parameter Validation
           └─► API Request Formation
               └─► Smallest.ai API Call
                   └─► Response Processing
                       └─► Client Response
```

### Security Architecture
```
┌─────────────────┐
│  Client Auth    │
└────────┬────────┘
         │
┌────────▼────────┐
│  MCP Validation │
└────────┬────────┘
         │
┌────────▼────────┐
│  API Auth       │
└────────┬────────┘
         │
┌────────▼────────┐
│  Smallest.ai    │
└─────────────────┘
```

## Overview

This project implements an MCP server that acts as a middleware between clients and the Smallest.ai API. It provides a standardized way to interact with Smallest.ai's knowledge base management features through the Model Context Protocol.

## Architecture

```
[Client Application] <---> [MCP Server] <---> [Smallest.ai API]
```

### Components

1. **MCP Server**
   - Handles client requests
   - Manages API communication
   - Provides standardized responses
   - Implements error handling

2. **Knowledge Base Tools**
   - `listKnowledgeBases`: Lists all knowledge bases
   - `createKnowledgeBase`: Creates new knowledge bases
   - `getKnowledgeBase`: Retrieves specific knowledge base details

3. **Documentation Resource**
   - Available at `docs://smallest.ai`
   - Provides usage instructions and examples

## Prerequisites

- Node.js 18+ or Bun runtime
- Smallest.ai API key
- TypeScript knowledge

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/MCP-smallest.ai.git
cd MCP-smallest.ai
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env` file in the root directory:
```env
SMALLEST_AI_API_KEY=your_api_key_here
```

## Configuration

Create a `config.ts` file with your Smallest.ai API configuration:

```typescript
export const config = {
    API_KEY: process.env.SMALLEST_AI_API_KEY,
    BASE_URL: 'https://atoms-api.smallest.ai/api/v1'
};
```

## Usage

### Starting the Server

```bash
bun run index.ts
```

### Testing the Server

```bash
bun run test-client.ts
```

### Available Tools

1. **List Knowledge Bases**
```typescript
await client.callTool({
  name: "listKnowledgeBases",
  arguments: {}
});
```

2. **Create Knowledge Base**
```typescript
await client.callTool({
  name: "createKnowledgeBase",
  arguments: {
    name: "My Knowledge Base",
    description: "Description of the knowledge base"
  }
});
```

3. **Get Knowledge Base**
```typescript
await client.callTool({
  name: "getKnowledgeBase",
  arguments: {
    id: "knowledge_base_id"
  }
});
```

## Response Format

All responses follow this structure:
```typescript
{
  content: [{
    type: "text",
    text: JSON.stringify(data, null, 2)
  }]
}
```

## Error Handling

The server implements comprehensive error handling:
- HTTP errors
- API errors
- Parameter validation errors
- Type-safe error responses

## Development

### Project Structure
```
MCP-smallest.ai/
├── index.ts           # MCP server implementation
├── test-client.ts     # Test client implementation
├── config.ts          # Configuration file
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

### Adding New Tools

1. Define the tool in `index.ts`:
```typescript
server.tool(
  "toolName",
  {
    param1: z.string(),
    param2: z.number()
  },
  async (args) => {
    // Implementation
  }
);
```

2. Update documentation in the resource:
```typescript
server.resource(
  "documentation",
  "docs://smallest.ai",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: `Updated documentation...`
    }]
  })
);
```

## Security

- API keys are stored in environment variables
- All requests are authenticated
- Parameter validation is implemented
- Error messages are sanitized

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io)
- [Smallest.ai API](https://smallest.ai)
- [Bun Runtime](https://bun.sh)
[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/vinayaktiwari1103-mcp-smallest-ai-badge.png)](https://mseep.ai/app/vinayaktiwari1103-mcp-smallest-ai)
