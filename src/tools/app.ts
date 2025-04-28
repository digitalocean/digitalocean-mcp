import {
  delete_Apps_delete,
  get_Apps_get,
  get_Apps_get_deployment,
  get_Apps_get_instanceSize,
  get_Apps_list,
  get_Apps_list_alerts,
  get_Apps_list_deployments,
  post_Apps_assign_alertDestinations,
  post_Apps_cancel_deployment,
  post_Apps_commit_rollback,
  post_Apps_create,
  post_Apps_create_deployment,
  post_Apps_create_rollback,
  post_Apps_revert_rollback,
  post_Apps_validate_appSpec,
  post_Apps_validate_rollback,
  put_Apps_update,
} from "../specs/digitalocean-openapi.yaml.zod";
import { createClient } from "../api";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { DOMcpServer, ToolArgs } from "../DOMcpServer";

const ListApps: ToolArgs<typeof get_Apps_list.parameters.shape> = {
  name: "list_apps",
  description: `
    List all apps on your account. Information about the current active
    deployment as well as any in progress ones will also be included for
    each app.
    `,
  parameters: get_Apps_list.parameters.shape,
  cb: async (params, extra) => {
    const { client } = createClient(extra);
    const res = await client.get("/v2/apps", {
      query: params.query,
    });

    const apps = res.apps ?? [];
    if (apps.length === 0) {
      return {
        content: [{ type: "text", text: "No apps found" }],
        isError: true,
      };
    }

    const content: CallToolResult["content"] = [];
    apps.forEach((app) => {
      content.push({
        type: "text",
        text: `App ID: ${app.id}\nName: ${app.spec.name}\nRegion: ${app.spec.region}\n`,
      });
    });

    return {
      content,
      _meta: {
        links: res.links,
        meta: res.meta,
      },
    };
  },
};

const CreateApp: ToolArgs<typeof post_Apps_create.parameters.shape> = {
  name: "create_app",
  description: `
    Create a new app by submitting an app specification. For documentation
    on app specifications ("AppSpec" objects), please refer to [the product
    documentation](https://docs.digitalocean.com/products/app-platform/reference/app-spec/).
  `,
  parameters: post_Apps_create.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.post("/v2/apps", params);
      return {
        content: [{ type: "text", text: JSON.stringify(res.app, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error creating app: ${error}` }],
        isError: true,
      };
    }
  },
};

const GetApp: ToolArgs<typeof get_Apps_get.parameters.shape> = {
  name: "get_app",
  description: "Get an app by ID",
  parameters: get_Apps_get.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(`/v2/apps/{id}`, {
        query: {},
        path: params.path,
      });

      return {
        content: [{ type: "text", text: JSON.stringify(res.app, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error getting app: ${error}` }],
      };
    }
  },
};

const UpdateApp: ToolArgs<typeof put_Apps_update.parameters.shape> = {
  name: "update_app",
  description: `
    Update an existing app by submitting a new app specification. For
    documentation on app specifications ("AppSpec" objects), please refer to
    [the product documentation](https://docs.digitalocean.com/products/app-platform/reference/app-spec/).
  `,
  parameters: put_Apps_update.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.put(`/v2/apps/{id}`, params);
      const app = res.app;
      return {
        content: [{ type: "text", text: JSON.stringify(app, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error updating app: ${error}` }],
        isError: true,
      };
    }
  },
};

const DeleteApp: ToolArgs<typeof delete_Apps_delete.parameters.shape> = {
  name: "delete_app",
  description: "Delete an app by ID",
  parameters: delete_Apps_delete.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.delete(`/v2/apps/{id}`, params);
      return {
        content: [{ type: "text", text: "Add successfully deleted" }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error deleting app: ${error}` }],
        isError: true,
      };
    }
  },
};

const GetDeploymentLogsUrlSchema = z.object({
  deployment_id: z
    .string()
    .describe(
      "The ID of the deployment. If not provided, the active deployment will be used."
    )
    .optional(),
  type: z.enum(["BUILD", "DEPLOY", "RUN", "RUN_RESTARTED"]),
  app_id: z.string().describe("The ID of the app."),
});
const GetDeploymentLogsUrl: ToolArgs<typeof GetDeploymentLogsUrlSchema.shape> =
  {
    name: "get_deployment_logs_url",
    description: `
    Gets the URL of the logs for a deployment. Before fetching the logs, you need to
    get the URL of the logs. 
  `,
    parameters: GetDeploymentLogsUrlSchema.shape,
    cb: async (params, extra) => {
      try {
        const { client } = createClient(extra);
        let content: CallToolResult["content"] = [];
        if (params.deployment_id) {
          const res = await client.get(
            `/v2/apps/{app_id}/deployments/{deployment_id}/logs`,
            {
              query: {
                type: params.type,
              },
              path: {
                app_id: params.app_id,
                deployment_id: params.deployment_id,
              },
            }
          );
          content.push({
            type: "text",
            text: JSON.stringify(res, null, 2),
          });
        } else {
          const res = await client.get(`/v2/apps/{app_id}/logs`, {
            query: {
              type: params.type,
            },
            path: {
              app_id: params.app_id,
            },
          });
          content.push({
            type: "text",
            text: JSON.stringify(res, null, 2),
          });
        }
        return {
          content,
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error getting logs: ${error}` }],
        };
      }
    },
  };
const DownloadLogsSchema = z.object({
  url: z.string().describe("The URL to the bucket containing the logs"),
});

const DownloadLogs: ToolArgs<typeof DownloadLogsSchema.shape> = {
  name: "download_logs",
  description: `
    Give the URL of the logs, download the logs and return them as a string.
  `,
  parameters: DownloadLogsSchema.shape,
  cb: async (params, extra) => {
    try {
      const res = await fetch(params.url);
      const text = await res.text();
      return {
        content: [{ type: "text", text }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error getting logs: ${error}` }],
        isError: true,
      };
    }
  },
};

const ListDeployments: ToolArgs<
  typeof get_Apps_list_deployments.parameters.shape
> = {
  name: "list_deployments",
  description: "List all deployments for an app",
  parameters: get_Apps_list_deployments.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(`/v2/apps/{app_id}/deployments`, params);
      const deployments = res.deployments ?? [];
      const content: CallToolResult["content"] = [];
      deployments.forEach((deployment) => {
        content.push({
          type: "text",
          text: `Deployment ID: ${deployment.id}\nStatus: ${deployment.phase}\nCreated At: ${deployment.created_at}\nUpdated At: ${deployment.updated_at}\n    `,
        });
      });

      content.push({
        type: "text",
        text: `${JSON.stringify(res.links, null, 2)}`,
      });
      return {
        content,
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error listing deployments: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const CreateDeployment: ToolArgs<
  typeof post_Apps_create_deployment.parameters.shape
> = {
  name: "create_deployment",
  description: "Create a new deployment for an app",
  parameters: post_Apps_create_deployment.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.post(`/v2/apps/{app_id}/deployments`, params);
      const deployment = res.deployment;
      return {
        content: [{ type: "text", text: JSON.stringify(deployment) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error creating deployment: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const GetDeployment: ToolArgs<typeof get_Apps_get_deployment.parameters.shape> =
  {
    name: "get_deployment",
    description: "Get a deployment by ID",
    parameters: get_Apps_get_deployment.parameters.shape,
    cb: async (params, extra) => {
      try {
        const { client } = createClient(extra);
        const res = await client.get(
          `/v2/apps/{app_id}/deployments/{deployment_id}`,
          params
        );
        const deployment = res.deployment;
        return {
          content: [{ type: "text", text: JSON.stringify(deployment) }],
        };
      } catch (error) {
        return {
          content: [
            { type: "text", text: `Error getting deployment: ${error}` },
          ],
          isError: true,
        };
      }
    },
  };

const CancelDeployment: ToolArgs<
  typeof post_Apps_cancel_deployment.parameters.shape
> = {
  name: "cancel_deployment",
  description: "Cancel a deployment by ID",
  parameters: post_Apps_cancel_deployment.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.post(
        `/v2/apps/{app_id}/deployments/{deployment_id}/cancel`,
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error canceling deployment: ${error}` },
        ],
      };
    }
  },
};

const ListInstanceSizes: ToolArgs = {
  name: "list_instance_sizes",
  description:
    "List all instance sizes for `service`, `worker`, and `job` components supported by App Platform.",
  parameters: undefined,
  cb: async (extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get("/v2/apps/tiers/instance_sizes");
      const instanceSizes = res.instance_sizes ?? [];
      const content: CallToolResult["content"] = [];
      instanceSizes.forEach((instanceSize) => {
        content.push({
          type: "text",
          text: `${JSON.stringify(instanceSize, null, 2)}`,
        });
      });
      return {
        content,
        _meta: {
          instanceSizes,
        },
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error listing instance sizes: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const GetInstanceSizeBySlug: ToolArgs<
  typeof get_Apps_get_instanceSize.parameters.shape
> = {
  name: "get_instance_size_by_slug",
  description:
    "Retrieve information about a specific instance size slug for `service`,`worker`, and `job` components.",
  parameters: get_Apps_get_instanceSize.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(
        `/v2/apps/tiers/instance_sizes/{slug}`,
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res.instance_size) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error getting instance size: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const ListRegions: ToolArgs = {
  name: "list_app_regions",
  description: "List all regions supported by App Platform.",
  cb: async (extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get("/v2/apps/regions");
      const regions = res.regions ?? [];
      const content: CallToolResult["content"] = [];
      regions.forEach((region) => {
        content.push({
          type: "text",
          text: `Region: ${region.label}
            Slug: ${region.slug}
            Continent: ${region.continent}
            Default: ${region.default ? "Yes" : "No"}
            Disabled: ${region.disabled ? "Yes" : "No"}
            `,
        });
      });
      return {
        content,
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error listing regions: ${error}` }],
        isError: true,
      };
    }
  },
};

const ValidateAppSpec: ToolArgs<
  typeof post_Apps_validate_appSpec.parameters.shape
> = {
  name: "validate_app_spec",
  description: `
    Propose and validate a spec for a new or existing app. The request returns some
    information about the proposed app, including app cost and upgrade cost.
    If an existing app ID is specified, the app spec is treated as a
    proposed update to the existing app.
  `,
  parameters: post_Apps_validate_appSpec.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.post("/v2/apps/propose", params);
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error validating app spec: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const ListAppAlerts: ToolArgs<typeof get_Apps_list_alerts.parameters.shape> = {
  name: "list_app_alerts",
  description: `
    List alerts associated to the app and any components. This includes
    configuration information about the alerts including emails, slack
    webhooks, and triggering events or conditions.
  `,
  parameters: get_Apps_list_alerts.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.get(`/v2/apps/{app_id}/alerts`, params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(res, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error listing app alerts: ${error}` }],
        isError: true,
      };
    }
  },
};

const UpdateAppAlertDestinations: ToolArgs<
  typeof post_Apps_assign_alertDestinations.parameters.shape
> = {
  name: "update_app_alert_destinations",
  description: "Update alert destinations for an app",
  parameters: post_Apps_assign_alertDestinations.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.post(
        `/v2/apps/{app_id}/alerts/{alert_id}/destinations`,
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error updating alert destinations: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const RollbackApp: ToolArgs<typeof post_Apps_create_rollback.parameters.shape> =
  {
    name: "rollback_app",
    description: `
    Rollback an app to a previous deployment. A new deployment will be
    created to perform the rollback.
    The app will be pinned to the rollback deployment preventing any new
    deployments from being created, either manually or through Auto Deploy on Push webhooks. 
    To resume deployments, the rollback must beeither committed or reverted.
    It is recommended to use the Validate App Rollback endpoint to double check if the rollback is valid and if there are any warnings.
  `,
    parameters: post_Apps_create_rollback.parameters.shape,
    cb: async (params, extra) => {
      try {
        const { client } = createClient(extra);
        const res = await client.post(`/v2/apps/{app_id}/rollback`, params);
        return {
          content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error rolling back app: ${error}` }],
          isError: true,
        };
      }
    },
  };

const ValidateAppRollback: ToolArgs<
  typeof post_Apps_validate_rollback.parameters.shape
> = {
  name: "validate_app_rollback",
  description: `
  Check whether an app can be rolled back to a specific deployment. This
  endpoint can also be used to check if there are any warnings or validation conditions that will
  cause the rollback to proceed under un-ideal circumstances. For example, if a component must be rebuilt
  as part of the rollback causing it to take longer than usual.
  `,
  parameters: post_Apps_validate_rollback.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.post(
        `/v2/apps/{app_id}/rollback/validate`,
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error validating app rollback: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const CommitAppRollback: ToolArgs<
  typeof post_Apps_commit_rollback.parameters.shape
> = {
  name: "commit_app_rollback",
  description: `
  Commit an app rollback. This action permanently applies the rollback and
  unpins the app to resume new deployments.
  `,
  parameters: post_Apps_commit_rollback.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      await client.post(`/v2/apps/{app_id}/rollback/commit`, params);
      return {
        content: [
          { type: "text", text: "App rollback committed successfully." },
        ],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error committing app rollback: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

const RevertAppRollback: ToolArgs<
  typeof post_Apps_revert_rollback.parameters.shape
> = {
  name: "revert_app_rollback",
  description: `
  Revert an app rollback. This action reverts the active rollback by
  creating a new deployment from the latest app spec prior to the 
  rollback and unpins the app to resume new deployments.
  `,
  parameters: post_Apps_revert_rollback.parameters.shape,
  cb: async (params, extra) => {
    try {
      const { client } = createClient(extra);
      const res = await client.post(
        `/v2/apps/{app_id}/rollback/revert`,
        params
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error reverting app rollback: ${error}` },
        ],
        isError: true,
      };
    }
  },
};

export function registerAppTools(server: DOMcpServer) {
  server.registerTool(ListApps);
  server.registerTool(CreateApp);
  server.registerTool(GetApp);
  server.registerTool(UpdateApp);
  server.registerTool(DeleteApp);
  server.registerTool(GetDeploymentLogsUrl);
  server.registerTool(DownloadLogs); // Custom tool to download logs
  server.registerTool(ListDeployments);
  server.registerTool(CreateDeployment);
  server.registerTool(GetDeployment);
  server.registerTool(CancelDeployment);
  server.registerTool(ListInstanceSizes);
  server.registerTool(GetInstanceSizeBySlug);
  server.registerTool(ListRegions);
  server.registerTool(ValidateAppSpec);
  server.registerTool(ListAppAlerts);
  server.registerTool(UpdateAppAlertDestinations);
  server.registerTool(RollbackApp);
  server.registerTool(ValidateAppRollback);
  server.registerTool(CommitAppRollback);
  server.registerTool(RevertAppRollback);
}
