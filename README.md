# DigitalOcean MCP Server

[![npm version](https://img.shields.io/npm/v/@digitalocean/mcp.svg)](https://www.npmjs.com/package/@digitalocean/mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

This MCP server exposes DigitalOcean App Platform functionality through standardized tools that can be used by any MCP client, including [Claude Desktop](https://claude.ai/download) and [Cursor](https://docs.cursor.com/context/model-context-protocol). It enables AI assistants to directly manage your DigitalOcean apps without writing code or memorizing API endpoints.


---

## 📚 Table of Contents

* [🚀 What Can You Do With It?](#-what-can-you-do-with-it)
* [🧰 Prerequisites](#-prerequisites)
* [⚙️ Setting up your DigitalOcean MCP Server](#️-setting-up-your-digitalocean-mcp-server)

  * [Generate Your API Token](#1-generate-your-api-token)
  * [Add the Server to Your MCP Client](#2-add-the-server-to-your-mcp-client)
  * [Claude Desktop](#claude-desktop)
  * [Cursor](#cursor)
  * [Windsurf Setup](#windsurf-setup)
* [💬 Example Prompts](#-example-prompts)
* [🛠 Available Tools](#available-tools)
* [🧯 Troubleshooting](#troubleshooting)
* [🤝 Contributing](#contributing)
* [📄 License](#license)

---
## 🚀 What Can You Do With It?

You can now do things like:

- Deploy a new app from a GitHub repo
- Quickly redeploy an existing app with the latest changes
- See logs, restart components, or delete old environments
- Check available regions and create apps based on what’s supported
- Build and deploy an app from scratch, entirely through your assistant

...and more!

---

## 🧰 Prerequisites
To use the DigitalOcean MCP Server, you’ll need:

- **Node.js** (≥ 12) & **npm**  
- A [DigitalOcean Personal Access Token](https://cloud.digitalocean.com/account/api/tokens) with **App Platform** scopes  
- A supported MCP client:
  - [Claude Desktop](https://claude.ai/download) (v1.9+)
  - [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview)
  - [Cursor](https://docs.cursor.com/context/model-context-protocol)
  - [Windsurf](https://windsurf.com)
- (Optional but helpful): [GitHub CLI (gh)](https://cli.github.com) -  useful for cloning repos, creating projects, and working with GitHub-based apps.

> 💡 You do not need to install anything—this server runs via npx, with just a one-line config added to your MCP client.


---

## ⚙️ Setting up your DigitalOcean MCP Server

### 1. Generate Your API Token
Head to [DigitalOcean’s API settings](https://cloud.digitalocean.com/account/api/tokens) and create a new **Personal Access Token** with **App Platform** permissions.

### 2. Add the Server to Your MCP Client
Add this JSON snippet to your client’s MCP config file:

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

Here’s what each part of the snippet does:

- * **command**: how to launch the server (`npx` or full path)
- * **args**: the package name
- * **env**: insert your DO token here

Then follow the instructions for your specific tool:

### Claude Desktop

1. Go to **Settings → Developer → Edit Config**
2. Add the snippet above to `claude_desktop_config.json`
3. Replace `YOUR_DO_TOKEN` with your token
4. Save and **restart Claude Desktop**
5. You'll see “digitalocean” listed as an available server

![Claude Desktop MCP Setup](https://github.com/user-attachments/assets/15ff8aed-c2ff-4bba-a0cc-0efabfdb0bcd)
*Setting up DigitalOcean MCP Server in Claude Desktop*


### Cursor

1. Go to **Settings → Cursor Settings → MCP → Add a new global MCP server**
2. Cursor will open `~/.cursor/mcp.json`
3. Add the snippet above to this json file
4. Replace `YOUR_DO_TOKEN` with your token
5. Save, and return to MCP Settings.
6. You should now see “digitalocean” in Cursor’s MCP settings

![Cursor MCP Setup](https://github.com/user-attachments/assets/da87617b-a368-4ffb-a5f1-2d3fa9a168a4)
*Setting up DigitalOcean MCP Server in Cursor*

### Windsurf Setup

1. In Windsurf: **Settings → Windsurf Settings → Cascade → MCP → Add Server → Add custom server**
2. Windsurf will open `~/.codeium/windsurf/mcp_config.json`
3. Add the snippet above to this json file
4. Replace `YOUR_DO_TOKEN` with your token
5. Save, and return to MCP Settings.
6. You should now see “digitalocean” in Windsurf's MCP settings

![Windsurf MCP Setup](https://github.com/user-attachments/assets/4408c955-34bd-4f51-92a9-b971bebbd785)

*Setting up DigitalOcean MCP Server in Windsurf*

---
## 💬 Example Prompts

Once it’s configured, try asking your assistant:

```
“List all active apps on my account”
“Create a new app from https://github.com/do-community/do-one-click-deploy-flask with 1GB RAM in NYC3”
“Show logs for checkout-service”
“Cancel the current deployment for marketing-site”
“Delete the old `staging-env` app”
```

The assistant will send the request → the MCP server talks to DigitalOcean → you get structured results, ready to act on.

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

---

## Troubleshooting

### The server doesn’t appear in your client?
- Make sure your JSON config is saved and valid
- Restart your MCP client (Claude, Cursor, Windsurf)

### Token not working?
- Check that it has App Platform access
- Try generating a fresh one

### JSON errors?
- No trailing commas
- No comments allowed in JSON

You can also test the server directly by running:

```
npx @digitalocean/mcp
```

---

## Contributing
We’d love your help improving this! Bug reports, new features, and docs improvements are all welcome.

1. Fork this repo
2. Create a branch (`git checkout -b feature/awesome-tool`)
3. Open a PR

---

## License

This project is licensed under the [MIT License](LICENSE).
