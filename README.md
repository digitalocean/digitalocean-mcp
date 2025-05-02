# DigitalOcean MCP Server

[![npm version](https://img.shields.io/npm/v/@digitalocean/mcp.svg)](https://www.npmjs.com/package/@digitalocean/mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

This MCP server exposes DigitalOcean App Platform functionality through standardized tools that can be used by any MCP client, including [Claude Desktop](https://claude.ai/download) and [Cursor](https://docs.cursor.com/context/model-context-protocol). It enables AI assistants to directly manage your DigitalOcean apps without needing to write code or remember complex API endpoints.

---

## Table of Contents

- [DigitalOcean MCP Server](#digitalocean-mcp-server)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [Common Config Snippet](#common-config-snippet)
    - [Claude Desktop Setup](#claude-desktop-setup)
    - [Cursor Setup](#cursor-setup)
  - [Usage Examples](#usage-examples)
  - [Available Tools](#available-tools)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

- **App Management**: create, update, delete, restart  
- **Deployment Control**: list, create, get details, cancel  
- **Logs & Metrics**: fetch build/app logs, bandwidth stats  
- **Infrastructure Info**: supported regions, instance sizes  
- **Spec Validation**: validate app specs and rollbacks  
- **Alerts & Rollbacks**: configure alerts, manage rollbacks  

---

## Prerequisites

- **Node.js** (≥ 12) & **npm**  
- A [DigitalOcean Personal Access Token](https://cloud.digitalocean.com/account/api/tokens) with **App Platform** scopes  
- Your MCP client of choice:
  - [Claude Desktop](https://claude.ai/download) (v1.9+)
  - [Cursor](https://docs.cursor.com/context/model-context-protocol)

---

## Installation

```bash
npm install -g @digitalocean/mcp
# or run via npx:
npx @digitalocean/mcp
````

---

## Configuration

### Common Config Snippet

Add this to your MCP client’s JSON:

```json
{
  "mcpServers": {
    "digitalocean": {
      "command": "npx",
      "args": ["@digitalocean/mcp"],
      "env": {
        "DIGITALOCEAN_API_TOKEN": "YOUR_DO_TOKEN"
      }
    }
  }
}
```

* **command**: how to launch the server (`npx` or full path)
* **args**: the package name
* **env**: insert your DO token here

### Claude Desktop Setup

1. In Claude Desktop: **Settings → Developer → Edit Config**
2. Paste the **Common Config Snippet** into `claude_desktop_config.json`
3. Replace `YOUR_DO_TOKEN` with your token
4. Save and **restart** Claude Desktop
5. You should see a new MCP server named “digitalocean” in the UI

### Cursor Setup

1. In Cursor: **Settings → MCP → Add a new global MCP server**
2. Cursor will open `~/.cursor/mcp.json`
3. Paste the **Common Config Snippet**
4. Replace `YOUR_DO_TOKEN`
5. Save and **enable** “digitalocean” in Cursor’s MCP settings

---

## Usage Examples

Once configured, just ask your AI assistant—no code needed:

```text
“How many DigitalOcean apps do I have?”
“List all my apps on DigitalOcean”
“Show logs for the ‘web’ component of my ‘api-service’ app”
“Create a new Flask app with Python 3.9, 1 CPU, 1 GB RAM from github.com/you/flask-app”
“Cancel the current deployment for my ‘staging-env’ app”
“What regions can I deploy my apps to?”
```

The client will call the MCP server under the hood and return JSON (or plain-English summaries).

---

## Available Tools

| Category        | Commands                                                                              |
| --------------- | ------------------------------------------------------------------------------------- |
| **Apps**        | `list_apps`, `create_app`, `get_app`, `update_app`, `delete_app`, `restart_app`       |
| **Deployments** | `list_deployments`, `create_deployment`, `get_deployment`, `cancel_deployment`        |
| **Logs**        | `retrieve_active_deployment_logs`, `download_logs`                                    |
| **Infra**       | `list_app_regions`, `list_instance_sizes`                                             |
| **Alerts**      | `list_app_alerts`, `update_app_alert_destinations`                                    |
| **Rollbacks**   | `validate_app_rollback`, `rollback_app`, `commit_app_rollback`, `revert_app_rollback` |
| **Metrics**     | `get_app_bandwidth_daily_metrics`, `get_all_app_bandwidth_daily_metrics`              |
| **Validation**  | `validate_app_spec`                                                                   |

*For the full list and parameter details, see the package’s README after installing.*

---

## Troubleshooting

* **Server fails to start**

  * Run `npx @digitalocean/mcp` in your shell—check for errors.
  * Ensure your token has App Platform permissions.

* **“digitalocean” doesn’t appear in MCP client**

  * Verify you edited the correct JSON file (Claude vs. Cursor).
  * Restart the client after saving changes.

* **Permission errors on API calls**

  * Double-check your token scopes.
  * Generate a fresh token with full App Platform access.

* **Unexpected JSON parsing errors**

  * Make sure your JSON is valid—no stray commas or comments.
  * Confirm your MCP client version supports external servers.

---

## Contributing

1. Fork this repo
2. Create a branch (`git checkout -b feature/awesome-tool`)
3. Make your changes and add tests
4. Submit a Pull Request

We welcome bug fixes, new features, and improved docs.

---

## License

This project is licensed under the [MIT License](LICENSE).
