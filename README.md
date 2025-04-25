# DigitalOcean MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server that provides tools to interact with DigitalOcean's [App Platform](https://www.digitalocean.com/products/app-platform) services.

## Overview

This MCP server exposes DigitalOcean App Platform functionality through standardized tools that can be used by any MCP client, including Claude Desktop and [Cursor](https://docs.cursor.com/context/model-context-protocol). It enables AI assistants to directly manage your DigitalOcean apps without needing to write code or remember complex API endpoints.

## Features

- Manage apps (create, update, delete, restart)
- Work with deployments (list, create, get, cancel)
- Access logs for apps and deployments
- Retrieve execution URLs for components
- View instance sizes and regions
- Validate app specifications
- Manage app alerts
- Handle app rollbacks
- View bandwidth metrics

## Setting up with Claude Desktop

1. Open Claude Desktop
2. Go to Settings → Developer → Edit Config
3. This will open `claude_desktop_config.json`
4. Add or update the configuration with:

```json
{
  "mcpServers": {
    "digitalocean": {
      "command": "npx",
      "args": ["@digitalocean/mcp"],
      "env": {
        "DIGITALOCEAN_API_TOKEN": "your_personal_access_token"
      }
    }
  }
}
```

5. Replace `your_personal_access_token` with your actual DigitalOcean API token
6. Save the file and restart Claude Desktop

## Setting up with Cursor

1. Go to Cursor Settings → MCP → Click on "Add a new global MCP server"
2. This will open `~/.cursor/mcp.json`
3. Add or update the configuration with the same JSON as used for Claude Desktop:

```json
{
  "mcpServers": {
    "digitalocean": {
      "command": "npx",
      "args": ["@digitalocean/mcp"],
      "env": {
        "DIGITALOCEAN_API_TOKEN": "your_personal_access_token"
      }
    }
  }
}
```

4. Replace `your_personal_access_token` with your actual DigitalOcean API token
5. Save the file and ensure the server is activated in Cursor Settings → MCP

## Using with Claude Desktop or Cursor

Once configured, you can start chatting with the AI assistant using natural language to manage your DigitalOcean App Platform resources. Here are some examples of what you can ask:

### Basic App Management

- "How many DigitalOcean apps do I have?"
- "List all my current apps on DigitalOcean"
- "Show me details for my app called 'customer-portal'"
- "Restart my app 'api-backend'"
- "Delete the app named 'test-environment'"

### Deployments

- "When was the last deployment for my 'production-website' app?"
- "Show me all deployments for my 'user-service' app"
- "Cancel the current deployment for my 'staging-env' app"
- "What's the status of the latest deployment for my 'data-processor' app?"

### Creating and Updating Apps

- "Create a new static site app on DigitalOcean that deploys from my GitHub repo yourusername/static-website"
- "Create a Flask app on DigitalOcean with the following specification: Python 3.9, 1 CPU, 1GB RAM, connected to my GitHub repo yourusername/flask-app"
- "Update my 'api-service' app to use 2GB of RAM instead of 1GB"
- "Set up a Node.js app that uses a managed PostgreSQL database"

### Logs and Debugging

- "Show me the logs for the 'web' component of my 'ecommerce' app"
- "Get the latest build logs for my 'backend-api' app"
- "What errors are showing up in my 'auth-service' deployment logs?"

### Infrastructure Information

- "What regions can I deploy my DigitalOcean apps to?"
- "List all available instance sizes for app components"
- "What's the smallest instance size I can use for a service component?"
- "Show me my bandwidth usage across all apps this month"

## Available Tools

Here's a quick overview of the available tools:

- `list_apps` - List all apps on your account
- `create_app` - Create a new app with an app specification
- `get_app` - Get details about a specific app
- `update_app` - Update an existing app
- `delete_app` - Delete an app
- `restart_app` - Restart an app
- `list_deployments` - List all deployments for an app
- `create_deployment` - Create a new deployment
- `get_deployment` - Get details about a specific deployment
- `cancel_deployment` - Cancel a deployment
- `retrieve_active_deployment_logs` - Get logs for a component of the active deployment
- `download_logs` - Download logs from a URL
- `list_app_regions` - List all regions supported by App Platform
- `list_instance_sizes` - List all instance sizes for components
- `validate_app_spec` - Validate an app specification
- `list_app_alerts` - List alerts for an app
- `update_app_alert_destinations` - Update alert destinations
- `rollback_app` - Rollback an app to a previous deployment
- `validate_app_rollback` - Validate an app rollback
- `commit_app_rollback` - Commit an app rollback
- `revert_app_rollback` - Revert an app rollback
- `get_app_bandwidth_daily_metrics` - Get bandwidth metrics for an app
- `get_all_app_bandwidth_daily_metrics` - Get bandwidth metrics for all apps

## Troubleshooting

### Common Issues

- **Authentication Problems**: Ensure your DigitalOcean API token is valid and has the necessary permissions

### If Tools Are Not Showing Up

1. Check that the MCP server icon appears in the UI
2. Verify your API token has the necessary permissions
3. Check the app logs for any error messages

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
