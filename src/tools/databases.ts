import { createClient } from "../api";
import { DOMcpServer, ToolArgs } from "../DOMcpServer";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import {
  get_Databases_get_ca,
  get_Databases_get_cluster,
  get_Databases_list,
  get_Databases_list_clusters,
  get_Databases_list_connectionPools,
  get_Databases_list_firewall_rules,
  get_Databases_list_kafka_topics,
  get_Databases_list_users,
  post_Databases_create_cluster,
  put_Databases_update_firewall_rules,
} from "../specs/digitalocean-openapi.yaml.zod";
const GetDatabaseOptions: ToolArgs = {
  name: "get_database_options",
  description: `
    Get a list of all database options available for creating a database cluster.
    This includes available regions, versions, and sizes for each database engine.
  `,
  cb: async (extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get("/v2/databases/options");

      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
        isError: true,
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error getting database options: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const ListDatabasesCluster: ToolArgs<
  typeof get_Databases_list_clusters.parameters.shape
> = {
  name: "list_databases_cluster",
  description: `
    List all database clusters in your account. This includes information about
    each cluster's configuration, status, and connection details.
  `,
  parameters: get_Databases_list_clusters.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get("/v2/databases", params);

      const databases = res.databases ?? [];
      if (databases.length === 0) {
        return {
          content: [{ type: "text", text: "No database clusters found" }],
          isError: true,
        };
      }

      const content: CallToolResult["content"] = [];
      databases.forEach((db) => {
        content.push({
          type: "text",
          text: `
          Database Cluster ID: ${db.id}
          Name: ${db.name}
          Engine: ${db.engine}
          Version: ${db.version}
          Region: ${db.region}
          Status: ${db.status}
          Created At: ${db.created_at}
          Number of Nodes: ${db.num_nodes}
          Connection URI: ${db.connection?.uri || "N/A"}
  `,
        });
      });

      return {
        content,
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error listing database clusters: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const CreateDatabaseCluster: ToolArgs<
  typeof post_Databases_create_cluster.parameters.shape
> = {
  name: "create_database_cluster",
  description: `Create a new database cluster.`,
  parameters: post_Databases_create_cluster.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.post("/v2/databases", params);
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error creating database cluster: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const GetDatabaseCluster: ToolArgs<
  typeof get_Databases_get_cluster.parameters.shape
> = {
  name: "get_database_cluster",
  description: `Get information about a specific database cluster.`,
  parameters: get_Databases_get_cluster.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(
        "/v2/databases/{database_cluster_uuid}",
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error getting database cluster: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const GetDatabaseClusterCertificate: ToolArgs<
  typeof get_Databases_get_ca.parameters.shape
> = {
  name: "get_database_cluster_certificate",
  description: `Get the certificate for a specific database cluster.`,
  parameters: get_Databases_get_ca.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(
        "/v2/databases/{database_cluster_uuid}/ca",
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting database cluster certificate: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
};

const ListDatabaseFirewallRules: ToolArgs<
  typeof get_Databases_list_firewall_rules.parameters.shape
> = {
  name: "list_database_firewall_rules",
  description: `List all firewall (trusted sources) rules for a specific database cluster.`,
  parameters: get_Databases_list_firewall_rules.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(
        "/v2/databases/{database_cluster_uuid}/firewall",
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing database firewall rules: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
};

const UpdateDatabaseFirewallRules: ToolArgs<
  typeof put_Databases_update_firewall_rules.parameters.shape
> = {
  name: "update_database_firewall_rules",
  description: `Update the firewall (trusted sources) rules for a specific database cluster.`,
  parameters: put_Databases_update_firewall_rules.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.put(
        "/v2/databases/{database_cluster_uuid}/firewall",
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error updating database firewall rules: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
};

const ListDatabaseClusterUsers: ToolArgs<
  typeof get_Databases_list_users.parameters.shape
> = {
  name: "list_database_cluster_users",
  description: `List all users for a specific database cluster.`,
  parameters: get_Databases_list_users.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(
        "/v2/databases/{database_cluster_uuid}/users",
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error listing database users: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const ListDatabaseClusterDatabases: ToolArgs<
  typeof get_Databases_list.parameters.shape
> = {
  name: "list_database_cluster_databases",
  description: `List all databases for a specific database cluster.`,
  parameters: get_Databases_list.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(
        "/v2/databases/{database_cluster_uuid}/dbs",
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
        _meta: res,
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing database cluster databases: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
};

const ListDatabaseConnectionPools: ToolArgs<
  typeof get_Databases_list_connectionPools.parameters.shape
> = {
  name: "list_database_connection_pools",
  description: `List all connection pools for a specific database cluster.`,
  parameters: get_Databases_list_connectionPools.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(
        "/v2/databases/{database_cluster_uuid}/pools",
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing database connection pools: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
};

const ListDatabaseTopics: ToolArgs<
  typeof get_Databases_list_kafka_topics.parameters.shape
> = {
  name: "list_database_topics",
  description: `List all topics for a specific database kafka cluster.`,
  parameters: get_Databases_list_kafka_topics.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(
        "/v2/databases/{database_cluster_uuid}/topics",
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error listing database topics: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

export function registerDatabaseTools(server: DOMcpServer) {
  server.registerTool(GetDatabaseOptions);
  server.registerTool(ListDatabasesCluster);
  server.registerTool(CreateDatabaseCluster);
  server.registerTool(ListDatabaseFirewallRules);
  server.registerTool(UpdateDatabaseFirewallRules);
  server.registerTool(GetDatabaseCluster);
  server.registerTool(ListDatabaseClusterUsers);
  server.registerTool(ListDatabaseClusterDatabases);
  server.registerTool(GetDatabaseClusterCertificate);
  server.registerTool(ListDatabaseConnectionPools);
  server.registerTool(ListDatabaseTopics);
}
