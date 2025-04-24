import { z } from "zod";

export type error = z.infer<typeof error>;
export const error = z.object({
  id: z.string(),
  message: z.string(),
  request_id: z.union([z.string(), z.undefined()]).optional(),
});

export type oneClicks = z.infer<typeof oneClicks>;
export const oneClicks = z.object({
  slug: z.string(),
  type: z.string(),
});

export type oneClicks_create = z.infer<typeof oneClicks_create>;
export const oneClicks_create = z.object({
  addon_slugs: z.array(z.string()),
  cluster_uuid: z.string(),
});

export type account = z.infer<typeof account>;
export const account = z.object({
  droplet_limit: z.number(),
  floating_ip_limit: z.number(),
  email: z.string(),
  name: z.union([z.string(), z.undefined()]).optional(),
  uuid: z.string(),
  email_verified: z.boolean(),
  status: z.union([z.literal("active"), z.literal("warning"), z.literal("locked")]),
  status_message: z.string(),
  team: z
    .union([
      z.object({
        uuid: z.string().optional(),
        name: z.string().optional(),
      }),
      z.undefined(),
    ])
    .optional(),
});

export type ssh_key_id = z.infer<typeof ssh_key_id>;
export const ssh_key_id = z.number();

export type ssh_key_fingerprint = z.infer<typeof ssh_key_fingerprint>;
export const ssh_key_fingerprint = z.string();

export type ssh_key_name = z.infer<typeof ssh_key_name>;
export const ssh_key_name = z.string();

export type sshKeys = z.infer<typeof sshKeys>;
export const sshKeys = z.object({
  id: z.union([ssh_key_id, z.undefined()]).optional(),
  fingerprint: z.union([ssh_key_fingerprint, z.undefined()]).optional(),
  public_key: z.string(),
  name: ssh_key_name,
});

export type link_to_last_page = z.infer<typeof link_to_last_page>;
export const link_to_last_page = z.object({
  last: z.string().optional(),
});

export type link_to_next_page = z.infer<typeof link_to_next_page>;
export const link_to_next_page = z.object({
  next: z.string().optional(),
});

export type forward_links = z.infer<typeof forward_links>;
export const forward_links = z.intersection(link_to_last_page, link_to_next_page);

export type link_to_first_page = z.infer<typeof link_to_first_page>;
export const link_to_first_page = z.object({
  first: z.string().optional(),
});

export type link_to_prev_page = z.infer<typeof link_to_prev_page>;
export const link_to_prev_page = z.object({
  prev: z.string().optional(),
});

export type backward_links = z.infer<typeof backward_links>;
export const backward_links = z.intersection(link_to_first_page, link_to_prev_page);

export type page_links = z.infer<typeof page_links>;
export const page_links = z.object({
  pages: z
    .union([forward_links, backward_links, z.unknown(), z.array(z.union([forward_links, backward_links, z.unknown()]))])
    .optional(),
});

export type pagination = z.infer<typeof pagination>;
export const pagination = z.object({
  links: page_links.optional(),
});

export type meta_properties = z.infer<typeof meta_properties>;
export const meta_properties = z.object({
  total: z.number().optional(),
});

export type meta = z.infer<typeof meta>;
export const meta = z.object({
  meta: z.intersection(meta_properties, z.unknown()),
});

export type region = z.infer<typeof region>;
export const region = z.object({
  name: z.string(),
  slug: z.string(),
  features: z.unknown(),
  available: z.boolean(),
  sizes: z.unknown(),
});

export type action = z.infer<typeof action>;
export const action = z.object({
  id: z.number().optional(),
  status: z.union([z.literal("in-progress"), z.literal("completed"), z.literal("errored")]).optional(),
  type: z.string().optional(),
  started_at: z.string().optional(),
  completed_at: z.union([z.string(), z.null()]).optional(),
  resource_id: z.union([z.number(), z.null()]).optional(),
  resource_type: z.string().optional(),
  region: region.optional(),
  region_slug: z.union([z.string(), z.null()]).optional(),
});

export type apps_deployment_job = z.infer<typeof apps_deployment_job>;
export const apps_deployment_job = z.object({
  name: z.string().optional(),
  source_commit_hash: z.string().optional(),
});

export type apps_deployment_functions = z.infer<typeof apps_deployment_functions>;
export const apps_deployment_functions = z.object({
  name: z.string().optional(),
  source_commit_hash: z.string().optional(),
  namespace: z.string().optional(),
});

export type apps_deployment_phase = z.infer<typeof apps_deployment_phase>;
export const apps_deployment_phase = z.union([
  z.literal("UNKNOWN"),
  z.literal("PENDING_BUILD"),
  z.literal("BUILDING"),
  z.literal("PENDING_DEPLOY"),
  z.literal("DEPLOYING"),
  z.literal("ACTIVE"),
  z.literal("SUPERSEDED"),
  z.literal("ERROR"),
  z.literal("CANCELED"),
]);

export type apps_deployment_progress_step_reason = z.infer<typeof apps_deployment_progress_step_reason>;
export const apps_deployment_progress_step_reason = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
});

export type apps_deployment_progress_step_status = z.infer<typeof apps_deployment_progress_step_status>;
export const apps_deployment_progress_step_status = z.union([
  z.literal("UNKNOWN"),
  z.literal("PENDING"),
  z.literal("RUNNING"),
  z.literal("ERROR"),
  z.literal("SUCCESS"),
]);

export type apps_deployment_progress_step = z.infer<typeof apps_deployment_progress_step>;
export const apps_deployment_progress_step = z.object({
  component_name: z.string().optional(),
  ended_at: z.string().optional(),
  message_base: z.string().optional(),
  name: z.string().optional(),
  reason: apps_deployment_progress_step_reason.optional(),
  started_at: z.string().optional(),
  status: apps_deployment_progress_step_status.optional(),
  steps: z.array(z.unknown()).optional(),
});

export type apps_deployment_progress = z.infer<typeof apps_deployment_progress>;
export const apps_deployment_progress = z.object({
  error_steps: z.number().optional(),
  pending_steps: z.number().optional(),
  running_steps: z.number().optional(),
  steps: z.array(apps_deployment_progress_step).optional(),
  success_steps: z.number().optional(),
  summary_steps: z.array(apps_deployment_progress_step).optional(),
  total_steps: z.number().optional(),
});

export type apps_deployment_service = z.infer<typeof apps_deployment_service>;
export const apps_deployment_service = z.object({
  name: z.string().optional(),
  source_commit_hash: z.string().optional(),
});

export type app_domain_spec = z.infer<typeof app_domain_spec>;
export const app_domain_spec = z.object({
  domain: z.string(),
  type: z
    .union([z.literal("UNSPECIFIED"), z.literal("DEFAULT"), z.literal("PRIMARY"), z.literal("ALIAS"), z.undefined()])
    .optional(),
  wildcard: z.union([z.boolean(), z.undefined()]).optional(),
  zone: z.union([z.string(), z.undefined()]).optional(),
  minimum_tls_version: z.union([z.literal("1.2"), z.literal("1.3"), z.undefined()]).optional(),
});

export type apps_git_source_spec = z.infer<typeof apps_git_source_spec>;
export const apps_git_source_spec = z.object({
  branch: z.string().optional(),
  repo_clone_url: z.string().optional(),
});

export type apps_github_source_spec = z.infer<typeof apps_github_source_spec>;
export const apps_github_source_spec = z.object({
  branch: z.string().optional(),
  deploy_on_push: z.boolean().optional(),
  repo: z.string().optional(),
});

export type apps_gitlab_source_spec = z.infer<typeof apps_gitlab_source_spec>;
export const apps_gitlab_source_spec = z.object({
  branch: z.string().optional(),
  deploy_on_push: z.boolean().optional(),
  repo: z.string().optional(),
});

export type apps_bitbucket_source_spec = z.infer<typeof apps_bitbucket_source_spec>;
export const apps_bitbucket_source_spec = z.object({
  branch: z.string().optional(),
  deploy_on_push: z.boolean().optional(),
  repo: z.string().optional(),
});

export type apps_image_source_spec = z.infer<typeof apps_image_source_spec>;
export const apps_image_source_spec = z.object({
  registry: z.string().optional(),
  registry_type: z.union([z.literal("DOCKER_HUB"), z.literal("DOCR"), z.literal("GHCR")]).optional(),
  registry_credentials: z.string().optional(),
  repository: z.string().optional(),
  tag: z.string().optional(),
  digest: z.string().optional(),
  deploy_on_push: z
    .object({
      enabled: z.boolean().optional(),
    })
    .optional(),
});

export type app_variable_definition = z.infer<typeof app_variable_definition>;
export const app_variable_definition = z.object({
  key: z.string(),
  scope: z
    .union([
      z.literal("UNSET"),
      z.literal("RUN_TIME"),
      z.literal("BUILD_TIME"),
      z.literal("RUN_AND_BUILD_TIME"),
      z.undefined(),
    ])
    .optional(),
  type: z.union([z.literal("GENERAL"), z.literal("SECRET"), z.undefined()]).optional(),
  value: z.union([z.string(), z.undefined()]).optional(),
});

export type app_log_destination_papertrail_spec = z.infer<typeof app_log_destination_papertrail_spec>;
export const app_log_destination_papertrail_spec = z.object({
  endpoint: z.string(),
});

export type app_log_destination_datadog_spec = z.infer<typeof app_log_destination_datadog_spec>;
export const app_log_destination_datadog_spec = z.object({
  endpoint: z.union([z.string(), z.undefined()]).optional(),
  api_key: z.string(),
});

export type app_log_destination_logtail_spec = z.infer<typeof app_log_destination_logtail_spec>;
export const app_log_destination_logtail_spec = z.object({
  token: z.union([z.string(), z.undefined()]).optional(),
});

export type app_log_destination_open_search_spec_basic_auth = z.infer<
  typeof app_log_destination_open_search_spec_basic_auth
>;
export const app_log_destination_open_search_spec_basic_auth = z.object({
  user: z.string().optional(),
  password: z.unknown().optional(),
});

export type app_log_destination_open_search_spec = z.infer<typeof app_log_destination_open_search_spec>;
export const app_log_destination_open_search_spec = z.object({
  endpoint: z.string().optional(),
  basic_auth: app_log_destination_open_search_spec_basic_auth.optional(),
  index_name: z.string().optional(),
  cluster_name: z.string().optional(),
});

export type app_log_destination_definition = z.infer<typeof app_log_destination_definition>;
export const app_log_destination_definition = z.object({
  name: z.string(),
  papertrail: z.union([app_log_destination_papertrail_spec, z.undefined()]).optional(),
  datadog: z.union([app_log_destination_datadog_spec, z.undefined()]).optional(),
  logtail: z.union([app_log_destination_logtail_spec, z.undefined()]).optional(),
  open_search: z.union([app_log_destination_open_search_spec, z.undefined()]).optional(),
});

export type app_component_base = z.infer<typeof app_component_base>;
export const app_component_base = z.object({
  name: z.string().optional(),
  git: apps_git_source_spec.optional(),
  github: apps_github_source_spec.optional(),
  gitlab: apps_gitlab_source_spec.optional(),
  bitbucket: apps_bitbucket_source_spec.optional(),
  image: apps_image_source_spec.optional(),
  dockerfile_path: z.string().optional(),
  build_command: z.string().optional(),
  run_command: z.string().optional(),
  source_dir: z.string().optional(),
  envs: z.array(app_variable_definition).optional(),
  environment_slug: z.string().optional(),
  log_destinations: z.array(app_log_destination_definition).optional(),
});

export type app_component_instance_base = z.infer<typeof app_component_instance_base>;
export const app_component_instance_base = z.object({
  instance_count: z.number().optional(),
  instance_size_slug: z
    .union([
      z.literal("apps-s-1vcpu-0.5gb"),
      z.literal("apps-s-1vcpu-1gb-fixed"),
      z.literal("apps-s-1vcpu-1gb"),
      z.literal("apps-s-1vcpu-2gb"),
      z.literal("apps-s-2vcpu-4gb"),
      z.literal("apps-d-1vcpu-0.5gb"),
      z.literal("apps-d-1vcpu-1gb"),
      z.literal("apps-d-1vcpu-2gb"),
      z.literal("apps-d-1vcpu-4gb"),
      z.literal("apps-d-2vcpu-4gb"),
      z.literal("apps-d-2vcpu-8gb"),
      z.literal("apps-d-4vcpu-8gb"),
      z.literal("apps-d-4vcpu-16gb"),
      z.literal("apps-d-8vcpu-32gb"),
      z.literal("basic-xxs"),
      z.literal("basic-xs"),
      z.literal("basic-s"),
      z.literal("basic-m"),
      z.literal("professional-xs"),
      z.literal("professional-s"),
      z.literal("professional-m"),
      z.literal("professional-1l"),
      z.literal("professional-l"),
      z.literal("professional-xl"),
    ])
    .optional(),
  autoscaling: z
    .object({
      min_instance_count: z.number().optional(),
      max_instance_count: z.number().optional(),
      metrics: z
        .object({
          cpu: z
            .object({
              percent: z.number().optional(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
});

export type apps_string_match = z.infer<typeof apps_string_match>;
export const apps_string_match = z.object({
  exact: z.string().optional(),
  prefix: z.string().optional(),
  regex: z.string().optional(),
});

export type apps_cors_policy = z.infer<typeof apps_cors_policy>;
export const apps_cors_policy = z.object({
  allow_origins: z.array(apps_string_match).optional(),
  allow_methods: z.array(z.string()).optional(),
  allow_headers: z.array(z.string()).optional(),
  expose_headers: z.array(z.string()).optional(),
  max_age: z.string().optional(),
  allow_credentials: z.boolean().optional(),
});

export type app_service_spec_health_check = z.infer<typeof app_service_spec_health_check>;
export const app_service_spec_health_check = z.object({
  failure_threshold: z.number().optional(),
  port: z.number().optional(),
  http_path: z.string().optional(),
  initial_delay_seconds: z.number().optional(),
  period_seconds: z.number().optional(),
  success_threshold: z.number().optional(),
  timeout_seconds: z.number().optional(),
});

export type app_route_spec = z.infer<typeof app_route_spec>;
export const app_route_spec = z.object({
  path: z.string().optional(),
  preserve_path_prefix: z.boolean().optional(),
});

export type app_service_spec_termination = z.infer<typeof app_service_spec_termination>;
export const app_service_spec_termination = z.object({
  drain_seconds: z.number().optional(),
  grace_period_seconds: z.number().optional(),
});

export type app_service_spec = z.infer<typeof app_service_spec>;
export const app_service_spec = z.intersection(
  app_component_base,
  z.intersection(
    app_component_instance_base,
    z.object({
      cors: z
        .union([z.intersection(apps_cors_policy, z.intersection(z.unknown(), z.unknown())), z.undefined()])
        .optional(),
      health_check: z.union([app_service_spec_health_check, z.undefined()]).optional(),
      protocol: z.union([z.literal("HTTP"), z.literal("HTTP2"), z.undefined()]).optional(),
      http_port: z.union([z.number(), z.undefined()]).optional(),
      internal_ports: z.union([z.array(z.number()), z.undefined()]).optional(),
      routes: z.union([z.array(app_route_spec), z.undefined()]).optional(),
      termination: z.union([app_service_spec_termination, z.undefined()]).optional(),
    }),
  ),
);

export type app_static_site_spec = z.infer<typeof app_static_site_spec>;
export const app_static_site_spec = z.intersection(
  app_component_base,
  z.object({
    index_document: z.string().optional(),
    error_document: z.string().optional(),
    catchall_document: z.string().optional(),
    output_dir: z.string().optional(),
    cors: z.intersection(apps_cors_policy, z.intersection(z.unknown(), z.unknown())).optional(),
    routes: z.array(app_route_spec).optional(),
  }),
);

export type app_job_spec_termination = z.infer<typeof app_job_spec_termination>;
export const app_job_spec_termination = z.object({
  grace_period_seconds: z.number().optional(),
});

export type app_job_spec = z.infer<typeof app_job_spec>;
export const app_job_spec = z.intersection(
  app_component_base,
  z.intersection(
    app_component_instance_base,
    z.object({
      kind: z
        .union([
          z.literal("UNSPECIFIED"),
          z.literal("PRE_DEPLOY"),
          z.literal("POST_DEPLOY"),
          z.literal("FAILED_DEPLOY"),
          z.undefined(),
        ])
        .optional(),
      termination: z.union([app_job_spec_termination, z.undefined()]).optional(),
    }),
  ),
);

export type app_worker_spec_termination = z.infer<typeof app_worker_spec_termination>;
export const app_worker_spec_termination = z.object({
  grace_period_seconds: z.number().optional(),
});

export type app_worker_spec = z.infer<typeof app_worker_spec>;
export const app_worker_spec = z.intersection(
  app_component_base,
  z.intersection(
    app_component_instance_base,
    z.object({
      termination: app_worker_spec_termination.optional(),
    }),
  ),
);

export type app_alert_spec_rule = z.infer<typeof app_alert_spec_rule>;
export const app_alert_spec_rule = z.union([
  z.literal("UNSPECIFIED_RULE"),
  z.literal("CPU_UTILIZATION"),
  z.literal("MEM_UTILIZATION"),
  z.literal("RESTART_COUNT"),
  z.literal("DEPLOYMENT_FAILED"),
  z.literal("DEPLOYMENT_LIVE"),
  z.literal("DOMAIN_FAILED"),
  z.literal("DOMAIN_LIVE"),
  z.literal("FUNCTIONS_ACTIVATION_COUNT"),
  z.literal("FUNCTIONS_AVERAGE_DURATION_MS"),
  z.literal("FUNCTIONS_ERROR_RATE_PER_MINUTE"),
  z.literal("FUNCTIONS_AVERAGE_WAIT_TIME_MS"),
  z.literal("FUNCTIONS_ERROR_COUNT"),
  z.literal("FUNCTIONS_GB_RATE_PER_SECOND"),
]);

export type app_alert_spec_operator = z.infer<typeof app_alert_spec_operator>;
export const app_alert_spec_operator = z.union([
  z.literal("UNSPECIFIED_OPERATOR"),
  z.literal("GREATER_THAN"),
  z.literal("LESS_THAN"),
]);

export type app_alert_spec_window = z.infer<typeof app_alert_spec_window>;
export const app_alert_spec_window = z.union([
  z.literal("UNSPECIFIED_WINDOW"),
  z.literal("FIVE_MINUTES"),
  z.literal("TEN_MINUTES"),
  z.literal("THIRTY_MINUTES"),
  z.literal("ONE_HOUR"),
]);

export type app_alert_spec = z.infer<typeof app_alert_spec>;
export const app_alert_spec = z.object({
  rule: app_alert_spec_rule.optional(),
  disabled: z.boolean().optional(),
  operator: app_alert_spec_operator.optional(),
  value: z.number().optional(),
  window: app_alert_spec_window.optional(),
});

export type app_functions_spec = z.infer<typeof app_functions_spec>;
export const app_functions_spec = z.object({
  cors: z.union([z.intersection(apps_cors_policy, z.intersection(z.unknown(), z.unknown())), z.undefined()]).optional(),
  routes: z.union([z.array(app_route_spec), z.undefined()]).optional(),
  name: z.string(),
  source_dir: z.union([z.string(), z.undefined()]).optional(),
  alerts: z.union([z.array(app_alert_spec), z.undefined()]).optional(),
  envs: z.union([z.array(app_variable_definition), z.undefined()]).optional(),
  git: z.union([apps_git_source_spec, z.undefined()]).optional(),
  github: z.union([apps_github_source_spec, z.undefined()]).optional(),
  gitlab: z.union([apps_gitlab_source_spec, z.undefined()]).optional(),
  bitbucket: z.union([apps_bitbucket_source_spec, z.undefined()]).optional(),
  log_destinations: z.union([z.array(app_log_destination_definition), z.undefined()]).optional(),
});

export type app_database_spec = z.infer<typeof app_database_spec>;
export const app_database_spec = z.object({
  cluster_name: z.union([z.string(), z.undefined()]).optional(),
  db_name: z.union([z.string(), z.undefined()]).optional(),
  db_user: z.union([z.string(), z.undefined()]).optional(),
  engine: z
    .union([
      z.literal("UNSET"),
      z.literal("MYSQL"),
      z.literal("PG"),
      z.literal("REDIS"),
      z.literal("MONGODB"),
      z.literal("KAFKA"),
      z.literal("OPENSEARCH"),
      z.undefined(),
    ])
    .optional(),
  name: z.string(),
  production: z.union([z.boolean(), z.undefined()]).optional(),
  version: z.union([z.string(), z.undefined()]).optional(),
});

export type app_ingress_spec_rule_string_match = z.infer<typeof app_ingress_spec_rule_string_match>;
export const app_ingress_spec_rule_string_match = z.object({
  prefix: z.string(),
});

export type app_ingress_spec_rule_match = z.infer<typeof app_ingress_spec_rule_match>;
export const app_ingress_spec_rule_match = z.object({
  path: app_ingress_spec_rule_string_match,
});

export type app_ingress_spec_rule_routing_component = z.infer<typeof app_ingress_spec_rule_routing_component>;
export const app_ingress_spec_rule_routing_component = z.object({
  name: z.string(),
  preserve_path_prefix: z.union([z.string(), z.undefined()]).optional(),
  rewrite: z.union([z.string(), z.undefined()]).optional(),
});

export type app_ingress_spec_rule_routing_redirect = z.infer<typeof app_ingress_spec_rule_routing_redirect>;
export const app_ingress_spec_rule_routing_redirect = z.object({
  uri: z.string().optional(),
  authority: z.string().optional(),
  port: z.number().optional(),
  scheme: z.string().optional(),
  redirect_code: z.number().optional(),
});

export type app_ingress_spec_rule = z.infer<typeof app_ingress_spec_rule>;
export const app_ingress_spec_rule = z.object({
  match: app_ingress_spec_rule_match.optional(),
  cors: apps_cors_policy.optional(),
  component: app_ingress_spec_rule_routing_component.optional(),
  redirect: app_ingress_spec_rule_routing_redirect.optional(),
});

export type app_ingress_spec = z.infer<typeof app_ingress_spec>;
export const app_ingress_spec = z.object({
  rules: z.array(app_ingress_spec_rule).optional(),
});

export type app_egress_type_spec = z.infer<typeof app_egress_type_spec>;
export const app_egress_type_spec = z.union([z.literal("AUTOASSIGN"), z.literal("DEDICATED_IP")]);

export type app_egress_spec = z.infer<typeof app_egress_spec>;
export const app_egress_spec = z.object({
  type: app_egress_type_spec.optional(),
});

export type app_maintenance_spec = z.infer<typeof app_maintenance_spec>;
export const app_maintenance_spec = z.object({
  enabled: z.boolean().optional(),
  archive: z.boolean().optional(),
  offline_page_url: z.string().optional(),
});

export type app_spec = z.infer<typeof app_spec>;
export const app_spec = z.object({
  name: z.string(),
  region: z
    .union([
      z.literal("ams"),
      z.literal("nyc"),
      z.literal("fra"),
      z.literal("sfo"),
      z.literal("sgp"),
      z.literal("blr"),
      z.literal("tor"),
      z.literal("lon"),
      z.literal("syd"),
      z.undefined(),
    ])
    .optional(),
  domains: z.union([z.array(app_domain_spec), z.undefined()]).optional(),
  services: z.union([z.array(app_service_spec), z.undefined()]).optional(),
  static_sites: z.union([z.array(app_static_site_spec), z.undefined()]).optional(),
  jobs: z.union([z.array(app_job_spec), z.undefined()]).optional(),
  workers: z.union([z.array(app_worker_spec), z.undefined()]).optional(),
  functions: z.union([z.array(app_functions_spec), z.undefined()]).optional(),
  databases: z.union([z.array(app_database_spec), z.undefined()]).optional(),
  ingress: z.union([app_ingress_spec, z.undefined()]).optional(),
  egress: z.union([app_egress_spec, z.undefined()]).optional(),
  maintenance: z.union([app_maintenance_spec, z.undefined()]).optional(),
});

export type apps_deployment_static_site = z.infer<typeof apps_deployment_static_site>;
export const apps_deployment_static_site = z.object({
  name: z.string().optional(),
  source_commit_hash: z.string().optional(),
});

export type apps_deployment_worker = z.infer<typeof apps_deployment_worker>;
export const apps_deployment_worker = z.object({
  name: z.string().optional(),
  source_commit_hash: z.string().optional(),
});

export type apps_deployment = z.infer<typeof apps_deployment>;
export const apps_deployment = z.object({
  cause: z.string().optional(),
  cloned_from: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  jobs: z.array(apps_deployment_job).optional(),
  functions: z.array(apps_deployment_functions).optional(),
  phase: apps_deployment_phase.optional(),
  phase_last_updated_at: z.string().optional(),
  progress: apps_deployment_progress.optional(),
  services: z.array(apps_deployment_service).optional(),
  spec: app_spec.optional(),
  static_sites: z.array(apps_deployment_static_site).optional(),
  tier_slug: z.string().optional(),
  updated_at: z.string().optional(),
  workers: z.array(apps_deployment_worker).optional(),
});

export type apps_domain_phase = z.infer<typeof apps_domain_phase>;
export const apps_domain_phase = z.union([
  z.literal("UNKNOWN"),
  z.literal("PENDING"),
  z.literal("CONFIGURING"),
  z.literal("ACTIVE"),
  z.literal("ERROR"),
]);

export type apps_domain_progress = z.infer<typeof apps_domain_progress>;
export const apps_domain_progress = z.object({
  steps: z.array(z.unknown()).optional(),
});

export type app_domain_validation = z.infer<typeof app_domain_validation>;
export const app_domain_validation = z.object({
  txt_name: z.string().optional(),
  txt_value: z.string().optional(),
});

export type apps_domain = z.infer<typeof apps_domain>;
export const apps_domain = z.object({
  id: z.string().optional(),
  phase: apps_domain_phase.optional(),
  progress: apps_domain_progress.optional(),
  spec: app_domain_spec.optional(),
  validations: z.array(app_domain_validation).optional(),
  rotate_validation_records: z.boolean().optional(),
  certificate_expires_at: z.string().optional(),
});

export type apps_region = z.infer<typeof apps_region>;
export const apps_region = z.object({
  continent: z.string().optional(),
  data_centers: z.array(z.string()).optional(),
  default: z.boolean().optional(),
  disabled: z.boolean().optional(),
  flag: z.string().optional(),
  label: z.string().optional(),
  reason: z.string().optional(),
  slug: z.string().optional(),
});

export type apps_dedicated_egress_ip_status = z.infer<typeof apps_dedicated_egress_ip_status>;
export const apps_dedicated_egress_ip_status = z.union([
  z.literal("UNKNOWN"),
  z.literal("ASSIGNING"),
  z.literal("ASSIGNED"),
  z.literal("REMOVED"),
]);

export type apps_dedicated_egress_ip = z.infer<typeof apps_dedicated_egress_ip>;
export const apps_dedicated_egress_ip = z.object({
  ip: z.string().optional(),
  id: z.string().optional(),
  status: apps_dedicated_egress_ip_status.optional(),
});

export type app = z.infer<typeof app>;
export const app = z.object({
  active_deployment: z.union([apps_deployment, z.undefined()]).optional(),
  created_at: z.union([z.string(), z.undefined()]).optional(),
  default_ingress: z.union([z.string(), z.undefined()]).optional(),
  domains: z.union([z.array(apps_domain), z.undefined()]).optional(),
  id: z.union([z.string(), z.undefined()]).optional(),
  in_progress_deployment: z.union([apps_deployment, z.undefined()]).optional(),
  last_deployment_created_at: z.union([z.string(), z.undefined()]).optional(),
  live_domain: z.union([z.string(), z.undefined()]).optional(),
  live_url: z.union([z.string(), z.undefined()]).optional(),
  live_url_base: z.union([z.string(), z.undefined()]).optional(),
  owner_uuid: z.union([z.string(), z.undefined()]).optional(),
  pending_deployment: z.union([z.intersection(z.unknown(), apps_deployment), z.undefined()]).optional(),
  project_id: z.union([z.string(), z.undefined()]).optional(),
  region: z.union([apps_region, z.undefined()]).optional(),
  spec: app_spec,
  tier_slug: z.union([z.string(), z.undefined()]).optional(),
  updated_at: z.union([z.string(), z.undefined()]).optional(),
  pinned_deployment: z.union([z.intersection(z.unknown(), apps_deployment), z.undefined()]).optional(),
  dedicated_ips: z.union([z.array(apps_dedicated_egress_ip), z.undefined()]).optional(),
});

export type apps_response = z.infer<typeof apps_response>;
export const apps_response = z.intersection(
  z.object({
    apps: z.array(app).optional(),
  }),
  z.intersection(pagination, meta),
);

export type apps_create_app_request = z.infer<typeof apps_create_app_request>;
export const apps_create_app_request = z.object({
  spec: app_spec,
  project_id: z.union([z.string(), z.undefined()]).optional(),
});

export type app_response = z.infer<typeof app_response>;
export const app_response = z.object({
  app: app.optional(),
});

export type apps_update_app_request = z.infer<typeof apps_update_app_request>;
export const apps_update_app_request = z.object({
  spec: app_spec,
  update_all_source_versions: z.union([z.boolean(), z.undefined()]).optional(),
});

export type apps_delete_app_response = z.infer<typeof apps_delete_app_response>;
export const apps_delete_app_response = z.object({
  id: z.string().optional(),
});

export type apps_restart_request = z.infer<typeof apps_restart_request>;
export const apps_restart_request = z.object({
  components: z.array(z.string()).optional(),
});

export type apps_deployment_response = z.infer<typeof apps_deployment_response>;
export const apps_deployment_response = z.object({
  deployment: apps_deployment.optional(),
});

export type apps_get_logs_response = z.infer<typeof apps_get_logs_response>;
export const apps_get_logs_response = z.object({
  historic_urls: z.array(z.string()).optional(),
  live_url: z.string().optional(),
});

export type apps_get_exec_response = z.infer<typeof apps_get_exec_response>;
export const apps_get_exec_response = z.object({
  url: z.string().optional(),
});

export type apps_deployments_response = z.infer<typeof apps_deployments_response>;
export const apps_deployments_response = z.intersection(
  z.object({
    deployments: z.array(apps_deployment).optional(),
  }),
  z.intersection(pagination, meta),
);

export type apps_create_deployment_request = z.infer<typeof apps_create_deployment_request>;
export const apps_create_deployment_request = z.object({
  force_build: z.boolean().optional(),
});

export type instance_size_cpu_type = z.infer<typeof instance_size_cpu_type>;
export const instance_size_cpu_type = z.union([z.literal("UNSPECIFIED"), z.literal("SHARED"), z.literal("DEDICATED")]);

export type apps_instance_size = z.infer<typeof apps_instance_size>;
export const apps_instance_size = z.object({
  bandwidth_allowance_gib: z.string().optional(),
  cpu_type: instance_size_cpu_type.optional(),
  cpus: z.string().optional(),
  deprecation_intent: z.boolean().optional(),
  memory_bytes: z.string().optional(),
  name: z.string().optional(),
  scalable: z.boolean().optional(),
  single_instance_only: z.boolean().optional(),
  slug: z.string().optional(),
  tier_downgrade_to: z.string().optional(),
  tier_slug: z.string().optional(),
  tier_upgrade_to: z.string().optional(),
  usd_per_month: z.string().optional(),
  usd_per_second: z.string().optional(),
});

export type apps_list_instance_sizes_response = z.infer<typeof apps_list_instance_sizes_response>;
export const apps_list_instance_sizes_response = z.object({
  discount_percent: z.number().optional(),
  instance_sizes: z.array(apps_instance_size).optional(),
});

export type apps_get_instance_size_response = z.infer<typeof apps_get_instance_size_response>;
export const apps_get_instance_size_response = z.object({
  instance_size: apps_instance_size.optional(),
});

export type apps_list_regions_response = z.infer<typeof apps_list_regions_response>;
export const apps_list_regions_response = z.object({
  regions: z.array(apps_region).optional(),
});

export type app_propose = z.infer<typeof app_propose>;
export const app_propose = z.object({
  spec: app_spec,
  app_id: z.union([z.string(), z.undefined()]).optional(),
});

export type app_propose_response = z.infer<typeof app_propose_response>;
export const app_propose_response = z.object({
  app_is_static: z.boolean().optional(),
  app_name_available: z.boolean().optional(),
  app_name_suggestion: z.string().optional(),
  existing_static_apps: z.string().optional(),
  spec: app_spec.optional(),
  app_cost: z.number().optional(),
  app_tier_downgrade_cost: z.number().optional(),
});

export type app_alert_email = z.infer<typeof app_alert_email>;
export const app_alert_email = z.string();

export type app_alert_slack_webhook = z.infer<typeof app_alert_slack_webhook>;
export const app_alert_slack_webhook = z.object({
  url: z.string().optional(),
  channel: z.string().optional(),
});

export type app_alert_phase = z.infer<typeof app_alert_phase>;
export const app_alert_phase = z.union([
  z.literal("UNKNOWN"),
  z.literal("PENDING"),
  z.literal("CONFIGURING"),
  z.literal("ACTIVE"),
  z.literal("ERROR"),
]);

export type app_alert_progress_step_status = z.infer<typeof app_alert_progress_step_status>;
export const app_alert_progress_step_status = z.union([
  z.literal("UNKNOWN"),
  z.literal("PENDING"),
  z.literal("RUNNING"),
  z.literal("ERROR"),
  z.literal("SUCCESS"),
]);

export type app_alert_progress_step_reason = z.infer<typeof app_alert_progress_step_reason>;
export const app_alert_progress_step_reason = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
});

export type app_alert_progress_step = z.infer<typeof app_alert_progress_step>;
export const app_alert_progress_step = z.object({
  name: z.string().optional(),
  status: app_alert_progress_step_status.optional(),
  started_at: z.string().optional(),
  ended_at: z.string().optional(),
  reason: app_alert_progress_step_reason.optional(),
});

export type app_alert_progress = z.infer<typeof app_alert_progress>;
export const app_alert_progress = z.object({
  steps: z.array(app_alert_progress_step).optional(),
});

export type app_alert = z.infer<typeof app_alert>;
export const app_alert = z.object({
  id: z.string().optional(),
  component_name: z.string().optional(),
  spec: app_alert_spec.optional(),
  emails: z.array(app_alert_email).optional(),
  slack_webhooks: z.array(app_alert_slack_webhook).optional(),
  phase: app_alert_phase.optional(),
  progress: app_alert_progress.optional(),
});

export type apps_list_alerts_response = z.infer<typeof apps_list_alerts_response>;
export const apps_list_alerts_response = z.object({
  alerts: z.array(app_alert).optional(),
});

export type apps_assign_app_alert_destinations_request = z.infer<typeof apps_assign_app_alert_destinations_request>;
export const apps_assign_app_alert_destinations_request = z.object({
  emails: z.array(app_alert_email).optional(),
  slack_webhooks: z.array(app_alert_slack_webhook).optional(),
});

export type apps_alert_response = z.infer<typeof apps_alert_response>;
export const apps_alert_response = z.object({
  alert: app_alert.optional(),
});

export type apps_rollback_app_request = z.infer<typeof apps_rollback_app_request>;
export const apps_rollback_app_request = z.object({
  deployment_id: z.string().optional(),
  skip_pin: z.boolean().optional(),
});

export type app_rollback_validation_condition = z.infer<typeof app_rollback_validation_condition>;
export const app_rollback_validation_condition = z.object({
  code: z
    .union([
      z.literal("incompatible_phase"),
      z.literal("incompatible_result"),
      z.literal("exceeded_revision_limit"),
      z.literal("app_pinned"),
      z.literal("database_config_conflict"),
      z.literal("region_conflict"),
      z.literal("static_site_requires_rebuild"),
      z.literal("image_source_missing_digest"),
    ])
    .optional(),
  message: z.string().optional(),
  components: z.array(z.string()).optional(),
});

export type app_metrics_bandwidth_usage_details = z.infer<typeof app_metrics_bandwidth_usage_details>;
export const app_metrics_bandwidth_usage_details = z.object({
  app_id: z.string().optional(),
  bandwidth_bytes: z.string().optional(),
});

export type app_metrics_bandwidth_usage = z.infer<typeof app_metrics_bandwidth_usage>;
export const app_metrics_bandwidth_usage = z.object({
  app_bandwidth_usage: z.array(app_metrics_bandwidth_usage_details).optional(),
  date: z.string().optional(),
});

export type app_metrics_bandwidth_usage_request = z.infer<typeof app_metrics_bandwidth_usage_request>;
export const app_metrics_bandwidth_usage_request = z.object({
  app_ids: z.array(z.string()),
  date: z.union([z.string(), z.undefined()]).optional(),
});

export type cdn_endpoint = z.infer<typeof cdn_endpoint>;
export const cdn_endpoint = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  origin: z.string(),
  endpoint: z.union([z.string(), z.undefined()]).optional(),
  ttl: z
    .union([z.literal(60), z.literal(600), z.literal(3600), z.literal(86400), z.literal(604800), z.undefined()])
    .optional(),
  certificate_id: z.union([z.string(), z.undefined()]).optional(),
  custom_domain: z.union([z.string(), z.undefined()]).optional(),
  created_at: z.union([z.string(), z.undefined()]).optional(),
});

export type update_endpoint = z.infer<typeof update_endpoint>;
export const update_endpoint = z.object({
  ttl: z.union([z.literal(60), z.literal(600), z.literal(3600), z.literal(86400), z.literal(604800)]).optional(),
  certificate_id: z.string().optional(),
  custom_domain: z.string().optional(),
});

export type purge_cache = z.infer<typeof purge_cache>;
export const purge_cache = z.object({
  files: z.array(z.string()),
});

export type certificate = z.infer<typeof certificate>;
export const certificate = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  not_after: z.string().optional(),
  sha1_fingerprint: z.string().optional(),
  created_at: z.string().optional(),
  dns_names: z.array(z.string()).optional(),
  state: z.union([z.literal("pending"), z.literal("verified"), z.literal("error")]).optional(),
  type: z.union([z.literal("custom"), z.literal("lets_encrypt")]).optional(),
});

export type certificate_create_base = z.infer<typeof certificate_create_base>;
export const certificate_create_base = z.object({
  name: z.string(),
  type: z.union([z.literal("custom"), z.literal("lets_encrypt"), z.undefined()]).optional(),
});

export type certificate_request_lets_encrypt = z.infer<typeof certificate_request_lets_encrypt>;
export const certificate_request_lets_encrypt = z.intersection(
  certificate_create_base,
  z.object({
    dns_names: z.array(z.string()),
  }),
);

export type certificate_request_custom = z.infer<typeof certificate_request_custom>;
export const certificate_request_custom = z.intersection(
  certificate_create_base,
  z.object({
    private_key: z.string(),
    leaf_certificate: z.string(),
    certificate_chain: z.union([z.string(), z.undefined()]).optional(),
  }),
);

export type balance = z.infer<typeof balance>;
export const balance = z.object({
  month_to_date_balance: z.string().optional(),
  account_balance: z.string().optional(),
  month_to_date_usage: z.string().optional(),
  generated_at: z.string().optional(),
});

export type billing_history = z.infer<typeof billing_history>;
export const billing_history = z.object({
  description: z.string().optional(),
  amount: z.string().optional(),
  invoice_id: z.string().optional(),
  invoice_uuid: z.string().optional(),
  date: z.string().optional(),
  type: z
    .union([
      z.literal("ACHFailure"),
      z.literal("Adjustment"),
      z.literal("AttemptFailed"),
      z.literal("Chargeback"),
      z.literal("Credit"),
      z.literal("CreditExpiration"),
      z.literal("Invoice"),
      z.literal("Payment"),
      z.literal("Refund"),
      z.literal("Reversal"),
    ])
    .optional(),
});

export type meta_optional_total = z.infer<typeof meta_optional_total>;
export const meta_optional_total = z.object({
  meta: meta_properties,
});

export type invoice_preview = z.infer<typeof invoice_preview>;
export const invoice_preview = z.object({
  invoice_uuid: z.string().optional(),
  invoice_id: z.string().optional(),
  amount: z.string().optional(),
  invoice_period: z.string().optional(),
  updated_at: z.string().optional(),
});

export type invoice_item = z.infer<typeof invoice_item>;
export const invoice_item = z.object({
  product: z.string().optional(),
  resource_uuid: z.string().optional(),
  resource_id: z.string().optional(),
  group_description: z.string().optional(),
  description: z.string().optional(),
  amount: z.string().optional(),
  duration: z.string().optional(),
  duration_unit: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  project_name: z.string().optional(),
});

export type billing_address = z.infer<typeof billing_address>;
export const billing_address = z.object({
  address_line1: z.string().optional(),
  address_line2: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postal_code: z.string().optional(),
  country_iso2_code: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type product_charge_item = z.infer<typeof product_charge_item>;
export const product_charge_item = z.object({
  amount: z.string().optional(),
  name: z.string().optional(),
  count: z.string().optional(),
});

export type product_usage_charges = z.infer<typeof product_usage_charges>;
export const product_usage_charges = z.object({
  name: z.string().optional(),
  amount: z.string().optional(),
  items: z.array(product_charge_item).optional(),
});

export type simple_charge = z.infer<typeof simple_charge>;
export const simple_charge = z.object({
  name: z.string().optional(),
  amount: z.string().optional(),
});

export type invoice_summary = z.infer<typeof invoice_summary>;
export const invoice_summary = z.object({
  invoice_uuid: z.string().optional(),
  invoice_id: z.string().optional(),
  billing_period: z.string().optional(),
  amount: z.string().optional(),
  user_name: z.string().optional(),
  user_billing_address: z.intersection(z.unknown(), billing_address).optional(),
  user_company: z.string().optional(),
  user_email: z.string().optional(),
  product_charges: z.intersection(z.unknown(), product_usage_charges).optional(),
  overages: z.intersection(z.unknown(), simple_charge).optional(),
  taxes: z.intersection(z.unknown(), simple_charge).optional(),
  credits_and_adjustments: z.intersection(z.unknown(), simple_charge).optional(),
});

export type database_region_options = z.infer<typeof database_region_options>;
export const database_region_options = z.object({
  regions: z.array(z.string()).optional(),
});

export type database_version_options = z.infer<typeof database_version_options>;
export const database_version_options = z.object({
  versions: z.array(z.string()).optional(),
});

export type database_layout_option = z.infer<typeof database_layout_option>;
export const database_layout_option = z.object({
  num_nodes: z.number().optional(),
  sizes: z.array(z.string()).optional(),
});

export type database_layout_options = z.infer<typeof database_layout_options>;
export const database_layout_options = z.object({
  layouts: z.array(database_layout_option).optional(),
});

export type database_version_availability = z.infer<typeof database_version_availability>;
export const database_version_availability = z.object({
  end_of_life: z.union([z.string(), z.null()]).optional(),
  end_of_availability: z.union([z.string(), z.null()]).optional(),
  version: z.string().optional(),
});

export type database_version_availabilities = z.infer<typeof database_version_availabilities>;
export const database_version_availabilities = z.array(database_version_availability);

export type options = z.infer<typeof options>;
export const options = z.object({
  options: z
    .object({
      kafka: z
        .intersection(database_region_options, z.intersection(database_version_options, database_layout_options))
        .optional(),
      mongodb: z
        .intersection(database_region_options, z.intersection(database_version_options, database_layout_options))
        .optional(),
      pg: z
        .intersection(database_region_options, z.intersection(database_version_options, database_layout_options))
        .optional(),
      mysql: z
        .intersection(database_region_options, z.intersection(database_version_options, database_layout_options))
        .optional(),
      redis: z
        .intersection(database_region_options, z.intersection(database_version_options, database_layout_options))
        .optional(),
      opensearch: z
        .intersection(database_region_options, z.intersection(database_version_options, database_layout_options))
        .optional(),
    })
    .optional(),
  version_availability: z
    .object({
      kafka: database_version_availabilities.optional(),
      pg: database_version_availabilities.optional(),
      mysql: database_version_availabilities.optional(),
      redis: database_version_availabilities.optional(),
      mongodb: database_version_availabilities.optional(),
      opensearch: database_version_availabilities.optional(),
    })
    .optional(),
});

export type opensearch_connection = z.infer<typeof opensearch_connection>;
export const opensearch_connection = z.object({
  uri: z.string().optional(),
  host: z.string().optional(),
  port: z.number().optional(),
  user: z.string().optional(),
  password: z.string().optional(),
  ssl: z.boolean().optional(),
});

export type database_connection = z.infer<typeof database_connection>;
export const database_connection = z.object({
  uri: z.string().optional(),
  database: z.string().optional(),
  host: z.string().optional(),
  port: z.number().optional(),
  user: z.string().optional(),
  password: z.string().optional(),
  ssl: z.boolean().optional(),
});

export type mysql_settings = z.infer<typeof mysql_settings>;
export const mysql_settings = z.object({
  auth_plugin: z.union([z.literal("mysql_native_password"), z.literal("caching_sha2_password")]),
});

export type user_settings = z.infer<typeof user_settings>;
export const user_settings = z.object({
  pg_allow_replication: z.boolean().optional(),
  opensearch_acl: z
    .array(
      z.object({
        index: z.string().optional(),
        permission: z
          .union([z.literal("deny"), z.literal("admin"), z.literal("read"), z.literal("readwrite"), z.literal("write")])
          .optional(),
      }),
    )
    .optional(),
  acl: z
    .array(
      z.object({
        id: z.union([z.string(), z.undefined()]).optional(),
        topic: z.string(),
        permission: z.union([
          z.literal("admin"),
          z.literal("consume"),
          z.literal("produce"),
          z.literal("produceconsume"),
        ]),
      }),
    )
    .optional(),
});

export type database_user = z.infer<typeof database_user>;
export const database_user = z.object({
  name: z.string(),
  role: z.union([z.literal("primary"), z.literal("normal"), z.undefined()]).optional(),
  password: z.union([z.string(), z.undefined()]).optional(),
  access_cert: z.union([z.string(), z.undefined()]).optional(),
  access_key: z.union([z.string(), z.undefined()]).optional(),
  mysql_settings: z.union([mysql_settings, z.undefined()]).optional(),
  settings: z.union([user_settings, z.undefined()]).optional(),
});

export type database_maintenance_window = z.infer<typeof database_maintenance_window>;
export const database_maintenance_window = z.union([
  z.object({
    day: z.string(),
    hour: z.string(),
    pending: z.union([z.boolean(), z.undefined()]).optional(),
    description: z.union([z.array(z.string()), z.undefined()]).optional(),
  }),
  z.null(),
]);

export type firewall_rule = z.infer<typeof firewall_rule>;
export const firewall_rule = z.object({
  uuid: z.union([z.string(), z.undefined()]).optional(),
  cluster_uuid: z.union([z.string(), z.undefined()]).optional(),
  type: z.union([z.literal("droplet"), z.literal("k8s"), z.literal("ip_addr"), z.literal("tag"), z.literal("app")]),
  value: z.string(),
  created_at: z.union([z.string(), z.undefined()]).optional(),
});

export type database_service_endpoint = z.infer<typeof database_service_endpoint>;
export const database_service_endpoint = z.object({
  host: z.string().optional(),
  port: z.number().optional(),
});

export type database_cluster = z.infer<typeof database_cluster>;
export const database_cluster = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  name: z.string(),
  engine: z.union([
    z.literal("pg"),
    z.literal("mysql"),
    z.literal("redis"),
    z.literal("mongodb"),
    z.literal("kafka"),
    z.literal("opensearch"),
  ]),
  version: z.union([z.string(), z.undefined()]).optional(),
  semantic_version: z.union([z.string(), z.undefined()]).optional(),
  num_nodes: z.number(),
  size: z.string(),
  region: z.string(),
  status: z
    .union([
      z.literal("creating"),
      z.literal("online"),
      z.literal("resizing"),
      z.literal("migrating"),
      z.literal("forking"),
      z.undefined(),
    ])
    .optional(),
  created_at: z.union([z.string(), z.undefined()]).optional(),
  private_network_uuid: z.union([z.string(), z.undefined()]).optional(),
  tags: z.union([z.array(z.string()), z.null(), z.undefined()]).optional(),
  db_names: z.union([z.array(z.string()), z.null(), z.undefined()]).optional(),
  ui_connection: z.union([z.intersection(opensearch_connection, z.unknown()), z.undefined()]).optional(),
  connection: z.union([z.intersection(database_connection, z.unknown()), z.undefined()]).optional(),
  private_connection: z.union([z.intersection(database_connection, z.unknown()), z.undefined()]).optional(),
  standby_connection: z.union([z.intersection(database_connection, z.unknown()), z.undefined()]).optional(),
  standby_private_connection: z.union([z.intersection(database_connection, z.unknown()), z.undefined()]).optional(),
  users: z.union([z.array(database_user), z.null(), z.undefined()]).optional(),
  maintenance_window: z.union([z.intersection(database_maintenance_window, z.unknown()), z.undefined()]).optional(),
  project_id: z.union([z.string(), z.undefined()]).optional(),
  rules: z.union([z.array(firewall_rule), z.undefined()]).optional(),
  version_end_of_life: z.union([z.string(), z.undefined()]).optional(),
  version_end_of_availability: z.union([z.string(), z.undefined()]).optional(),
  storage_size_mib: z.union([z.number(), z.undefined()]).optional(),
  metrics_endpoints: z.union([z.array(database_service_endpoint), z.undefined()]).optional(),
});

export type database_backup = z.infer<typeof database_backup>;
export const database_backup = z.object({
  database_name: z.string(),
  backup_created_at: z.union([z.string(), z.undefined()]).optional(),
});

export type mysql_advanced_config = z.infer<typeof mysql_advanced_config>;
export const mysql_advanced_config = z.object({
  backup_hour: z.number().optional(),
  backup_minute: z.number().optional(),
  sql_mode: z.string().optional(),
  connect_timeout: z.number().optional(),
  default_time_zone: z.string().optional(),
  group_concat_max_len: z.number().optional(),
  information_schema_stats_expiry: z.number().optional(),
  innodb_ft_min_token_size: z.number().optional(),
  innodb_ft_server_stopword_table: z.string().optional(),
  innodb_lock_wait_timeout: z.number().optional(),
  innodb_log_buffer_size: z.number().optional(),
  innodb_online_alter_log_max_size: z.number().optional(),
  innodb_print_all_deadlocks: z.boolean().optional(),
  innodb_rollback_on_timeout: z.boolean().optional(),
  interactive_timeout: z.number().optional(),
  internal_tmp_mem_storage_engine: z.union([z.literal("TempTable"), z.literal("MEMORY")]).optional(),
  net_read_timeout: z.number().optional(),
  net_write_timeout: z.number().optional(),
  sql_require_primary_key: z.boolean().optional(),
  wait_timeout: z.number().optional(),
  max_allowed_packet: z.number().optional(),
  max_heap_table_size: z.number().optional(),
  sort_buffer_size: z.number().optional(),
  tmp_table_size: z.number().optional(),
  slow_query_log: z.boolean().optional(),
  long_query_time: z.number().optional(),
  binlog_retention_period: z.number().optional(),
  innodb_change_buffer_max_size: z.number().optional(),
  innodb_flush_neighbors: z.union([z.literal(0), z.literal(1), z.literal(2)]).optional(),
  innodb_read_io_threads: z.number().optional(),
  innodb_write_io_threads: z.number().optional(),
  innodb_thread_concurrency: z.number().optional(),
  net_buffer_length: z.number().optional(),
  log_output: z
    .union([z.literal("INSIGHTS"), z.literal("TABLE"), z.literal("INSIGHTS,TABLE"), z.literal("NONE")])
    .optional(),
});

export type pgbouncer_advanced_config = z.infer<typeof pgbouncer_advanced_config>;
export const pgbouncer_advanced_config = z.object({
  server_reset_query_always: z.boolean().optional(),
  ignore_startup_parameters: z.array(z.union([z.literal("extra_float_digits"), z.literal("search_path")])).optional(),
  min_pool_size: z.number().optional(),
  server_lifetime: z.number().optional(),
  server_idle_timeout: z.number().optional(),
  autodb_pool_size: z.number().optional(),
  autodb_pool_mode: z.union([z.literal("session"), z.literal("transaction"), z.literal("statement")]).optional(),
  autodb_max_db_connections: z.number().optional(),
  autodb_idle_timeout: z.number().optional(),
});

export type timescaledb_advanced_config = z.infer<typeof timescaledb_advanced_config>;
export const timescaledb_advanced_config = z.object({
  max_background_workers: z.number().optional(),
});

export type postgres_advanced_config = z.infer<typeof postgres_advanced_config>;
export const postgres_advanced_config = z.object({
  autovacuum_freeze_max_age: z.number().optional(),
  autovacuum_max_workers: z.number().optional(),
  autovacuum_naptime: z.number().optional(),
  autovacuum_vacuum_threshold: z.number().optional(),
  autovacuum_analyze_threshold: z.number().optional(),
  autovacuum_vacuum_scale_factor: z.number().optional(),
  autovacuum_analyze_scale_factor: z.number().optional(),
  autovacuum_vacuum_cost_delay: z.number().optional(),
  autovacuum_vacuum_cost_limit: z.number().optional(),
  backup_hour: z.number().optional(),
  backup_minute: z.number().optional(),
  bgwriter_delay: z.number().optional(),
  bgwriter_flush_after: z.number().optional(),
  bgwriter_lru_maxpages: z.number().optional(),
  bgwriter_lru_multiplier: z.number().optional(),
  deadlock_timeout: z.number().optional(),
  default_toast_compression: z.union([z.literal("lz4"), z.literal("pglz")]).optional(),
  idle_in_transaction_session_timeout: z.number().optional(),
  jit: z.boolean().optional(),
  log_autovacuum_min_duration: z.number().optional(),
  log_error_verbosity: z.union([z.literal("TERSE"), z.literal("DEFAULT"), z.literal("VERBOSE")]).optional(),
  log_line_prefix: z
    .union([
      z.literal("pid=%p,user=%u,db=%d,app=%a,client=%h"),
      z.literal("%m [%p] %q[user=%u,db=%d,app=%a]"),
      z.literal("%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h"),
    ])
    .optional(),
  log_min_duration_statement: z.number().optional(),
  max_files_per_process: z.number().optional(),
  max_prepared_transactions: z.number().optional(),
  max_pred_locks_per_transaction: z.number().optional(),
  max_locks_per_transaction: z.number().optional(),
  max_stack_depth: z.number().optional(),
  max_standby_archive_delay: z.number().optional(),
  max_standby_streaming_delay: z.number().optional(),
  max_replication_slots: z.number().optional(),
  max_logical_replication_workers: z.number().optional(),
  max_parallel_workers: z.number().optional(),
  max_parallel_workers_per_gather: z.number().optional(),
  max_worker_processes: z.number().optional(),
  "pg_partman_bgw.role": z.string().optional(),
  "pg_partman_bgw.interval": z.number().optional(),
  "pg_stat_statements.track": z.union([z.literal("all"), z.literal("top"), z.literal("none")]).optional(),
  temp_file_limit: z.number().optional(),
  timezone: z.string().optional(),
  track_activity_query_size: z.number().optional(),
  track_commit_timestamp: z.union([z.literal("off"), z.literal("on")]).optional(),
  track_functions: z.union([z.literal("all"), z.literal("pl"), z.literal("none")]).optional(),
  track_io_timing: z.union([z.literal("off"), z.literal("on")]).optional(),
  max_wal_senders: z.number().optional(),
  wal_sender_timeout: z.number().optional(),
  wal_writer_delay: z.number().optional(),
  shared_buffers_percentage: z.number().optional(),
  pgbouncer: pgbouncer_advanced_config.optional(),
  work_mem: z.number().optional(),
  timescaledb: timescaledb_advanced_config.optional(),
  synchronous_replication: z.union([z.literal("off"), z.literal("quorum")]).optional(),
  stat_monitor_enable: z.boolean().optional(),
  max_failover_replication_time_lag: z.number().optional(),
});

export type redis_advanced_config = z.infer<typeof redis_advanced_config>;
export const redis_advanced_config = z.object({
  redis_maxmemory_policy: z
    .union([
      z.literal("noeviction"),
      z.literal("allkeys-lru"),
      z.literal("allkeys-random"),
      z.literal("volatile-lru"),
      z.literal("volatile-random"),
      z.literal("volatile-ttl"),
    ])
    .optional(),
  redis_pubsub_client_output_buffer_limit: z.number().optional(),
  redis_number_of_databases: z.number().optional(),
  redis_io_threads: z.number().optional(),
  redis_lfu_log_factor: z.number().optional(),
  redis_lfu_decay_time: z.number().optional(),
  redis_ssl: z.boolean().optional(),
  redis_timeout: z.number().optional(),
  redis_notify_keyspace_events: z.string().optional(),
  redis_persistence: z.union([z.literal("off"), z.literal("rdb")]).optional(),
  redis_acl_channels_default: z.union([z.literal("allchannels"), z.literal("resetchannels")]).optional(),
});

export type kafka_advanced_config = z.infer<typeof kafka_advanced_config>;
export const kafka_advanced_config = z.object({
  compression_type: z
    .union([
      z.literal("gzip"),
      z.literal("snappy"),
      z.literal("lz4"),
      z.literal("zstd"),
      z.literal("uncompressed"),
      z.literal("producer"),
    ])
    .optional(),
  group_initial_rebalance_delay_ms: z.number().optional(),
  group_min_session_timeout_ms: z.number().optional(),
  group_max_session_timeout_ms: z.number().optional(),
  connections_max_idle_ms: z.number().optional(),
  max_incremental_fetch_session_cache_slots: z.number().optional(),
  message_max_bytes: z.number().optional(),
  offsets_retention_minutes: z.number().optional(),
  log_cleaner_delete_retention_ms: z.number().optional(),
  log_cleaner_min_cleanable_ratio: z.number().optional(),
  log_cleaner_max_compaction_lag_ms: z.number().optional(),
  log_cleaner_min_compaction_lag_ms: z.number().optional(),
  log_cleanup_policy: z.union([z.literal("delete"), z.literal("compact"), z.literal("compact,delete")]).optional(),
  log_flush_interval_messages: z.number().optional(),
  log_flush_interval_ms: z.number().optional(),
  log_index_interval_bytes: z.number().optional(),
  log_index_size_max_bytes: z.number().optional(),
  log_message_downconversion_enable: z.boolean().optional(),
  log_message_timestamp_type: z.union([z.literal("CreateTime"), z.literal("LogAppendTime")]).optional(),
  log_message_timestamp_difference_max_ms: z.number().optional(),
  log_preallocate: z.boolean().optional(),
  log_retention_bytes: z.number().optional(),
  log_retention_hours: z.number().optional(),
  log_retention_ms: z.number().optional(),
  log_roll_jitter_ms: z.number().optional(),
  log_roll_ms: z.number().optional(),
  log_segment_bytes: z.number().optional(),
  log_segment_delete_delay_ms: z.number().optional(),
  auto_create_topics_enable: z.boolean().optional(),
  min_insync_replicas: z.number().optional(),
  num_partitions: z.number().optional(),
  default_replication_factor: z.number().optional(),
  replica_fetch_max_bytes: z.number().optional(),
  replica_fetch_response_max_bytes: z.number().optional(),
  max_connections_per_ip: z.number().optional(),
  producer_purgatory_purge_interval_requests: z.number().optional(),
  socket_request_max_bytes: z.number().optional(),
  transaction_state_log_segment_bytes: z.number().optional(),
  transaction_remove_expired_transaction_cleanup_interval_ms: z.number().optional(),
});

export type opensearch_advanced_config = z.infer<typeof opensearch_advanced_config>;
export const opensearch_advanced_config = z.object({
  http_max_content_length_bytes: z.number().optional(),
  http_max_header_size_bytes: z.number().optional(),
  http_max_initial_line_length_bytes: z.number().optional(),
  indices_query_bool_max_clause_count: z.number().optional(),
  indices_fielddata_cache_size_percentage: z.number().optional(),
  indices_memory_index_buffer_size_percentage: z.number().optional(),
  indices_memory_min_index_buffer_size_mb: z.number().optional(),
  indices_memory_max_index_buffer_size_mb: z.number().optional(),
  indices_queries_cache_size_percentage: z.number().optional(),
  indices_recovery_max_mb_per_sec: z.number().optional(),
  indices_recovery_max_concurrent_file_chunks: z.number().optional(),
  thread_pool_search_size: z.number().optional(),
  thread_pool_search_throttled_size: z.number().optional(),
  thread_pool_get_size: z.number().optional(),
  thread_pool_analyze_size: z.number().optional(),
  thread_pool_write_size: z.number().optional(),
  thread_pool_force_merge_size: z.number().optional(),
  thread_pool_search_queue_size: z.number().optional(),
  thread_pool_search_throttled_queue_size: z.number().optional(),
  thread_pool_get_queue_size: z.number().optional(),
  thread_pool_analyze_queue_size: z.number().optional(),
  thread_pool_write_queue_size: z.number().optional(),
  ism_enabled: z.boolean().optional(),
  ism_history_enabled: z.boolean().optional(),
  ism_history_max_age_hours: z.number().optional(),
  ism_history_max_docs: z.number().optional(),
  ism_history_rollover_check_period_hours: z.number().optional(),
  ism_history_rollover_retention_period_days: z.number().optional(),
  search_max_buckets: z.number().optional(),
  action_auto_create_index_enabled: z.boolean().optional(),
  enable_security_audit: z.boolean().optional(),
  action_destructive_requires_name: z.boolean().optional(),
  cluster_max_shards_per_node: z.number().optional(),
  override_main_response_version: z.boolean().optional(),
  script_max_compilations_rate: z.string().optional(),
  cluster_routing_allocation_node_concurrent_recoveries: z.number().optional(),
  reindex_remote_whitelist: z.array(z.string()).optional(),
  plugins_alerting_filter_by_backend_roles_enabled: z.boolean().optional(),
});

export type mongo_advanced_config = z.infer<typeof mongo_advanced_config>;
export const mongo_advanced_config = z.object({
  default_read_concern: z.union([z.literal("local"), z.literal("available"), z.literal("majority")]).optional(),
  default_write_concern: z.string().optional(),
  transaction_lifetime_limit_seconds: z.number().optional(),
  slow_op_threshold_ms: z.number().optional(),
  verbosity: z.number().optional(),
});

export type database_config = z.infer<typeof database_config>;
export const database_config = z.object({
  config: z
    .union([
      mysql_advanced_config,
      postgres_advanced_config,
      redis_advanced_config,
      mongo_advanced_config,
      kafka_advanced_config,
      opensearch_advanced_config,
      z.array(
        z.union([
          mysql_advanced_config,
          postgres_advanced_config,
          redis_advanced_config,
          mongo_advanced_config,
          kafka_advanced_config,
          opensearch_advanced_config,
        ]),
      ),
    ])
    .optional(),
});

export type ca = z.infer<typeof ca>;
export const ca = z.object({
  certificate: z.string(),
});

export type online_migration = z.infer<typeof online_migration>;
export const online_migration = z.object({
  id: z.string().optional(),
  status: z
    .union([z.literal("running"), z.literal("syncing"), z.literal("canceled"), z.literal("error"), z.literal("done")])
    .optional(),
  created_at: z.string().optional(),
});

export type source_database = z.infer<typeof source_database>;
export const source_database = z.object({
  source: z.object({
    host: z.string().optional(),
    port: z.number().optional(),
    dbname: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
  }),
  disable_ssl: z.union([z.boolean(), z.undefined()]).optional(),
  ignore_dbs: z.union([z.array(z.string()), z.undefined()]).optional(),
});

export type database_cluster_resize = z.infer<typeof database_cluster_resize>;
export const database_cluster_resize = z.object({
  size: z.string(),
  num_nodes: z.number(),
  storage_size_mib: z.union([z.number(), z.undefined()]).optional(),
});

export type backup = z.infer<typeof backup>;
export const backup = z.object({
  created_at: z.string(),
  size_gigabytes: z.number(),
});

export type database_replica = z.infer<typeof database_replica>;
export const database_replica = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  name: z.string(),
  region: z.union([z.string(), z.undefined()]).optional(),
  size: z.union([z.string(), z.undefined()]).optional(),
  status: z
    .union([
      z.literal("creating"),
      z.literal("online"),
      z.literal("resizing"),
      z.literal("migrating"),
      z.literal("forking"),
      z.undefined(),
    ])
    .optional(),
  tags: z.union([z.array(z.string()), z.undefined()]).optional(),
  created_at: z.union([z.string(), z.undefined()]).optional(),
  private_network_uuid: z.union([z.string(), z.undefined()]).optional(),
  connection: z.union([z.intersection(z.unknown(), database_connection), z.undefined()]).optional(),
  private_connection: z.union([z.intersection(z.unknown(), database_connection), z.undefined()]).optional(),
  storage_size_mib: z.union([z.number(), z.undefined()]).optional(),
});

export type events_logs = z.infer<typeof events_logs>;
export const events_logs = z.object({
  id: z.string().optional(),
  cluster_name: z.string().optional(),
  event_type: z
    .union([
      z.literal("cluster_maintenance_perform"),
      z.literal("cluster_master_promotion"),
      z.literal("cluster_create"),
      z.literal("cluster_update"),
      z.literal("cluster_delete"),
      z.literal("cluster_poweron"),
      z.literal("cluster_poweroff"),
    ])
    .optional(),
  create_time: z.string().optional(),
});

export type database = z.infer<typeof database>;
export const database = z.object({
  name: z.string(),
});

export type connection_pool = z.infer<typeof connection_pool>;
export const connection_pool = z.object({
  name: z.string(),
  mode: z.string(),
  size: z.number(),
  db: z.string(),
  user: z.union([z.string(), z.undefined()]).optional(),
  connection: z.union([z.intersection(database_connection, z.unknown()), z.undefined()]).optional(),
  private_connection: z.union([z.intersection(database_connection, z.unknown()), z.undefined()]).optional(),
  standby_connection: z.union([z.intersection(database_connection, z.unknown()), z.undefined()]).optional(),
  standby_private_connection: z.union([z.intersection(database_connection, z.unknown()), z.undefined()]).optional(),
});

export type connection_pools = z.infer<typeof connection_pools>;
export const connection_pools = z.object({
  pools: z.array(connection_pool).optional(),
});

export type connection_pool_update = z.infer<typeof connection_pool_update>;
export const connection_pool_update = z.object({
  mode: z.string(),
  size: z.number(),
  db: z.string(),
  user: z.union([z.string(), z.undefined()]).optional(),
});

export type eviction_policy_model = z.infer<typeof eviction_policy_model>;
export const eviction_policy_model = z.union([
  z.literal("noeviction"),
  z.literal("allkeys_lru"),
  z.literal("allkeys_random"),
  z.literal("volatile_lru"),
  z.literal("volatile_random"),
  z.literal("volatile_ttl"),
]);

export type sql_mode = z.infer<typeof sql_mode>;
export const sql_mode = z.object({
  sql_mode: z.string(),
});

export type version = z.infer<typeof version>;
export const version = z.string();

export type version_2 = z.infer<typeof version_2>;
export const version_2 = z.object({
  version: version.optional(),
});

export type kafka_topic_base = z.infer<typeof kafka_topic_base>;
export const kafka_topic_base = z.object({
  name: z.string().optional(),
  replication_factor: z.number().optional(),
  partition_count: z.number().optional(),
});

export type kafka_topic = z.infer<typeof kafka_topic>;
export const kafka_topic = z.intersection(
  kafka_topic_base,
  z.object({
    state: z
      .union([z.literal("active"), z.literal("configuring"), z.literal("deleting"), z.literal("unknown")])
      .optional(),
  }),
);

export type kafka_topic_config = z.infer<typeof kafka_topic_config>;
export const kafka_topic_config = z.object({
  cleanup_policy: z.union([z.literal("delete"), z.literal("compact"), z.literal("compact_delete")]).optional(),
  compression_type: z
    .union([
      z.literal("producer"),
      z.literal("gzip"),
      z.literal("snappy"),
      z.literal("Iz4"),
      z.literal("zstd"),
      z.literal("uncompressed"),
    ])
    .optional(),
  delete_retention_ms: z.number().optional(),
  file_delete_delay_ms: z.number().optional(),
  flush_messages: z.number().optional(),
  flush_ms: z.number().optional(),
  index_interval_bytes: z.number().optional(),
  max_compaction_lag_ms: z.number().optional(),
  max_message_bytes: z.number().optional(),
  message_down_conversion_enable: z.boolean().optional(),
  message_format_version: z
    .union([
      z.literal("0.8.0"),
      z.literal("0.8.1"),
      z.literal("0.8.2"),
      z.literal("0.9.0"),
      z.literal("0.10.0-IV0"),
      z.literal("0.10.0-IV1"),
      z.literal("0.10.1-IV0"),
      z.literal("0.10.1-IV1"),
      z.literal("0.10.1-IV2"),
      z.literal("0.10.2-IV0"),
      z.literal("0.11.0-IV0"),
      z.literal("0.11.0-IV1"),
      z.literal("0.11.0-IV2"),
      z.literal("1.0-IV0"),
      z.literal("1.1-IV0"),
      z.literal("2.0-IV0"),
      z.literal("2.0-IV1"),
      z.literal("2.1-IV0"),
      z.literal("2.1-IV1"),
      z.literal("2.1-IV2"),
      z.literal("2.2-IV0"),
      z.literal("2.2-IV1"),
      z.literal("2.3-IV0"),
      z.literal("2.3-IV1"),
      z.literal("2.4-IV0"),
      z.literal("2.4-IV1"),
      z.literal("2.5-IV0"),
      z.literal("2.6-IV0"),
      z.literal("2.7-IV0"),
      z.literal("2.7-IV1"),
      z.literal("2.7-IV2"),
      z.literal("2.8-IV0"),
      z.literal("2.8-IV1"),
      z.literal("3.0-IV0"),
      z.literal("3.0-IV1"),
      z.literal("3.1-IV0"),
      z.literal("3.2-IV0"),
      z.literal("3.3-IV0"),
      z.literal("3.3-IV1"),
      z.literal("3.3-IV2"),
      z.literal("3.3-IV3"),
    ])
    .optional(),
  message_timestamp_type: z.union([z.literal("create_time"), z.literal("log_append_time")]).optional(),
  min_cleanable_dirty_ratio: z.number().optional(),
  min_compaction_lag_ms: z.number().optional(),
  min_insync_replicas: z.number().optional(),
  preallocate: z.boolean().optional(),
  retention_bytes: z.number().optional(),
  retention_ms: z.number().optional(),
  segment_bytes: z.number().optional(),
  segment_jitter_ms: z.number().optional(),
  segment_ms: z.number().optional(),
});

export type kafka_topic_create = z.infer<typeof kafka_topic_create>;
export const kafka_topic_create = z.intersection(
  kafka_topic_base,
  z.object({
    config: kafka_topic_config.optional(),
  }),
);

export type kafka_topic_partition = z.infer<typeof kafka_topic_partition>;
export const kafka_topic_partition = z.object({
  size: z.number().optional(),
  id: z.number().optional(),
  in_sync_replicas: z.number().optional(),
  earliest_offset: z.number().optional(),
  consumer_groups: z
    .union([
      z.array(
        z.object({
          group_name: z.string().optional(),
          offset: z.number().optional(),
        }),
      ),
      z.null(),
    ])
    .optional(),
});

export type kafka_topic_verbose = z.infer<typeof kafka_topic_verbose>;
export const kafka_topic_verbose = z.object({
  name: z.string().optional(),
  state: z
    .union([z.literal("active"), z.literal("configuring"), z.literal("deleting"), z.literal("unknown")])
    .optional(),
  replication_factor: z.number().optional(),
  partitions: z.array(kafka_topic_partition).optional(),
  config: kafka_topic_config.optional(),
});

export type kafka_topic_update = z.infer<typeof kafka_topic_update>;
export const kafka_topic_update = z.object({
  replication_factor: z.number().optional(),
  partition_count: z.number().optional(),
  config: kafka_topic_config.optional(),
});

export type logsink_base_verbose = z.infer<typeof logsink_base_verbose>;
export const logsink_base_verbose = z.object({
  sink_id: z.string().optional(),
  sink_name: z.string().optional(),
  sink_type: z.union([z.literal("rsyslog"), z.literal("elasticsearch"), z.literal("opensearch")]).optional(),
});

export type rsyslog_logsink = z.infer<typeof rsyslog_logsink>;
export const rsyslog_logsink = z.object({
  server: z.string(),
  port: z.number(),
  tls: z.boolean(),
  format: z.union([z.literal("rfc5424"), z.literal("rfc3164"), z.literal("custom")]),
  logline: z.union([z.string(), z.undefined()]).optional(),
  sd: z.union([z.string(), z.undefined()]).optional(),
  ca: z.union([z.string(), z.undefined()]).optional(),
  key: z.union([z.string(), z.undefined()]).optional(),
  cert: z.union([z.string(), z.undefined()]).optional(),
});

export type elasticsearch_logsink = z.infer<typeof elasticsearch_logsink>;
export const elasticsearch_logsink = z.object({
  url: z.string(),
  index_prefix: z.string(),
  index_days_max: z.union([z.number(), z.undefined()]).optional(),
  timeout: z.union([z.number(), z.undefined()]).optional(),
  ca: z.union([z.string(), z.undefined()]).optional(),
});

export type opensearch_logsink = z.infer<typeof opensearch_logsink>;
export const opensearch_logsink = z.object({
  url: z.string(),
  index_prefix: z.string(),
  index_days_max: z.union([z.number(), z.undefined()]).optional(),
  timeout: z.union([z.number(), z.undefined()]).optional(),
  ca: z.union([z.string(), z.undefined()]).optional(),
});

export type logsink_verbose = z.infer<typeof logsink_verbose>;
export const logsink_verbose = z.intersection(
  logsink_base_verbose,
  z.object({
    config: z
      .union([
        rsyslog_logsink,
        elasticsearch_logsink,
        opensearch_logsink,
        z.array(z.union([rsyslog_logsink, elasticsearch_logsink, opensearch_logsink])),
      ])
      .optional(),
  }),
);

export type logsink_base = z.infer<typeof logsink_base>;
export const logsink_base = z.object({
  sink_name: z.string().optional(),
  sink_type: z.union([z.literal("rsyslog"), z.literal("elasticsearch"), z.literal("opensearch")]).optional(),
});

export type logsink_create = z.infer<typeof logsink_create>;
export const logsink_create = z.intersection(
  logsink_base,
  z.object({
    config: z
      .union([
        rsyslog_logsink,
        elasticsearch_logsink,
        opensearch_logsink,
        z.array(z.union([rsyslog_logsink, elasticsearch_logsink, opensearch_logsink])),
      ])
      .optional(),
  }),
);

export type logsink_update = z.infer<typeof logsink_update>;
export const logsink_update = z.object({
  config: z.union([
    rsyslog_logsink,
    elasticsearch_logsink,
    opensearch_logsink,
    z.array(z.union([rsyslog_logsink, elasticsearch_logsink, opensearch_logsink])),
  ]),
});

export type databases_basic_auth_credentials = z.infer<typeof databases_basic_auth_credentials>;
export const databases_basic_auth_credentials = z.object({
  basic_auth_username: z.string().optional(),
  basic_auth_password: z.string().optional(),
});

export type database_metrics_credentials = z.infer<typeof database_metrics_credentials>;
export const database_metrics_credentials = z.object({
  credentials: databases_basic_auth_credentials.optional(),
});

export type opensearch_index_base = z.infer<typeof opensearch_index_base>;
export const opensearch_index_base = z.object({
  index_name: z.string().optional(),
  number_of_shards: z.number().optional(),
  number_of_replicas: z.number().optional(),
  size: z.number().optional(),
  created_time: z.string().optional(),
});

export type opensearch_index = z.infer<typeof opensearch_index>;
export const opensearch_index = z.intersection(
  opensearch_index_base,
  z.object({
    status: z.union([z.literal("unknown"), z.literal("open"), z.literal("close"), z.literal("none")]).optional(),
    health: z
      .union([z.literal("unknown"), z.literal("green"), z.literal("yellow"), z.literal("red"), z.literal("red*")])
      .optional(),
  }),
);

export type domain = z.infer<typeof domain>;
export const domain = z.object({
  name: z.string().optional(),
  ip_address: z.string().optional(),
  ttl: z.union([z.number(), z.null()]).optional(),
  zone_file: z.union([z.string(), z.null()]).optional(),
});

export type domain_record = z.infer<typeof domain_record>;
export const domain_record = z.object({
  id: z.union([z.number(), z.undefined()]).optional(),
  type: z.string(),
  name: z.union([z.string(), z.undefined()]).optional(),
  data: z.union([z.string(), z.undefined()]).optional(),
  priority: z.union([z.number(), z.null(), z.undefined()]).optional(),
  port: z.union([z.number(), z.null(), z.undefined()]).optional(),
  ttl: z.union([z.number(), z.undefined()]).optional(),
  weight: z.union([z.number(), z.null(), z.undefined()]).optional(),
  flags: z.union([z.number(), z.null(), z.undefined()]).optional(),
  tag: z.union([z.string(), z.null(), z.undefined()]).optional(),
});

export type domain_record_a = z.infer<typeof domain_record_a>;
export const domain_record_a = z.intersection(domain_record, z.unknown());

export type domain_record_aaaa = z.infer<typeof domain_record_aaaa>;
export const domain_record_aaaa = z.intersection(domain_record, z.unknown());

export type domain_record_caa = z.infer<typeof domain_record_caa>;
export const domain_record_caa = z.intersection(domain_record, z.unknown());

export type domain_record_cname = z.infer<typeof domain_record_cname>;
export const domain_record_cname = z.intersection(domain_record, z.unknown());

export type domain_record_mx = z.infer<typeof domain_record_mx>;
export const domain_record_mx = z.intersection(domain_record, z.unknown());

export type domain_record_ns = z.infer<typeof domain_record_ns>;
export const domain_record_ns = z.intersection(domain_record, z.unknown());

export type domain_record_soa = z.infer<typeof domain_record_soa>;
export const domain_record_soa = z.intersection(domain_record, z.unknown());

export type domain_record_srv = z.infer<typeof domain_record_srv>;
export const domain_record_srv = z.intersection(domain_record, z.unknown());

export type domain_record_txt = z.infer<typeof domain_record_txt>;
export const domain_record_txt = z.intersection(domain_record, z.unknown());

export type disk_info = z.infer<typeof disk_info>;
export const disk_info = z.object({
  type: z.union([z.literal("local"), z.literal("scratch")]).optional(),
  size: z
    .object({
      amount: z.number().optional(),
      unit: z.string().optional(),
    })
    .optional(),
});

export type kernel = z.infer<typeof kernel>;
export const kernel = z.union([
  z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    version: z.string().optional(),
  }),
  z.null(),
]);

export type droplet_next_backup_window = z.infer<typeof droplet_next_backup_window>;
export const droplet_next_backup_window = z.union([
  z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  z.null(),
]);

export type image_name = z.infer<typeof image_name>;
export const image_name = z.string();

export type distribution = z.infer<typeof distribution>;
export const distribution = z.union([
  z.literal("Arch Linux"),
  z.literal("CentOS"),
  z.literal("CoreOS"),
  z.literal("Debian"),
  z.literal("Fedora"),
  z.literal("Fedora Atomic"),
  z.literal("FreeBSD"),
  z.literal("Gentoo"),
  z.literal("openSUSE"),
  z.literal("RancherOS"),
  z.literal("Rocky Linux"),
  z.literal("Ubuntu"),
  z.literal("Unknown"),
]);

export type region_slug = z.infer<typeof region_slug>;
export const region_slug = z.union([
  z.literal("ams1"),
  z.literal("ams2"),
  z.literal("ams3"),
  z.literal("blr1"),
  z.literal("fra1"),
  z.literal("lon1"),
  z.literal("nyc1"),
  z.literal("nyc2"),
  z.literal("nyc3"),
  z.literal("sfo1"),
  z.literal("sfo2"),
  z.literal("sfo3"),
  z.literal("sgp1"),
  z.literal("tor1"),
  z.literal("syd1"),
]);

export type regions_array = z.infer<typeof regions_array>;
export const regions_array = z.array(region_slug);

export type image_description = z.infer<typeof image_description>;
export const image_description = z.string();

export type tags_array = z.infer<typeof tags_array>;
export const tags_array = z.union([z.array(z.string()), z.null()]);

export type image = z.infer<typeof image>;
export const image = z.object({
  id: z.number().optional(),
  name: image_name.optional(),
  type: z
    .union([z.literal("base"), z.literal("snapshot"), z.literal("backup"), z.literal("custom"), z.literal("admin")])
    .optional(),
  distribution: distribution.optional(),
  slug: z.union([z.string(), z.null()]).optional(),
  public: z.boolean().optional(),
  regions: regions_array.optional(),
  created_at: z.string().optional(),
  min_disk_size: z.union([z.number(), z.null()]).optional(),
  size_gigabytes: z.union([z.number(), z.null()]).optional(),
  description: image_description.optional(),
  tags: tags_array.optional(),
  status: z
    .union([z.literal("NEW"), z.literal("available"), z.literal("pending"), z.literal("deleted"), z.literal("retired")])
    .optional(),
  error_message: z.string().optional(),
});

export type gpu_info = z.infer<typeof gpu_info>;
export const gpu_info = z.object({
  count: z.number().optional(),
  model: z.string().optional(),
  vram: z
    .object({
      amount: z.number().optional(),
      unit: z.string().optional(),
    })
    .optional(),
});

export type size = z.infer<typeof size>;
export const size = z.object({
  slug: z.string(),
  memory: z.number(),
  vcpus: z.number(),
  disk: z.number(),
  transfer: z.number(),
  price_monthly: z.number(),
  price_hourly: z.number(),
  regions: z.array(z.string()),
  available: z.boolean(),
  description: z.string(),
  disk_info: z.union([z.array(disk_info), z.undefined()]).optional(),
  gpu_info: z.union([gpu_info, z.undefined()]).optional(),
});

export type network_v4 = z.infer<typeof network_v4>;
export const network_v4 = z.object({
  ip_address: z.string().optional(),
  netmask: z.string().optional(),
  gateway: z.string().optional(),
  type: z.union([z.literal("public"), z.literal("private")]).optional(),
});

export type network_v6 = z.infer<typeof network_v6>;
export const network_v6 = z.object({
  ip_address: z.string().optional(),
  netmask: z.number().optional(),
  gateway: z.string().optional(),
  type: z.literal("public").optional(),
});

export type droplet = z.infer<typeof droplet>;
export const droplet = z.object({
  id: z.number(),
  name: z.string(),
  memory: z.number(),
  vcpus: z.number(),
  disk: z.number(),
  disk_info: z.union([z.array(disk_info), z.undefined()]).optional(),
  locked: z.boolean(),
  status: z.union([z.literal("new"), z.literal("active"), z.literal("off"), z.literal("archive")]),
  kernel: z.union([kernel, z.undefined()]).optional(),
  created_at: z.string(),
  features: z.array(z.string()),
  backup_ids: z.array(z.number()),
  next_backup_window: z.intersection(droplet_next_backup_window, z.unknown()),
  snapshot_ids: z.array(z.number()),
  image: image,
  volume_ids: z.array(z.string()),
  size: size,
  size_slug: z.string(),
  networks: z.object({
    v4: z.array(network_v4).optional(),
    v6: z.array(network_v6).optional(),
  }),
  region: region,
  tags: z.array(z.string()),
  vpc_uuid: z.union([z.string(), z.undefined()]).optional(),
  gpu_info: z.union([gpu_info, z.undefined()]).optional(),
});

export type droplet_backup_policy = z.infer<typeof droplet_backup_policy>;
export const droplet_backup_policy = z.object({
  plan: z.union([z.literal("daily"), z.literal("weekly")]).optional(),
  weekday: z
    .union([
      z.literal("SUN"),
      z.literal("MON"),
      z.literal("TUE"),
      z.literal("WED"),
      z.literal("THU"),
      z.literal("FRI"),
      z.literal("SAT"),
    ])
    .optional(),
  hour: z.union([z.literal(0), z.literal(4), z.literal(8), z.literal(12), z.literal(16), z.literal(20)]).optional(),
  window_length_hours: z.number().optional(),
  retention_period_days: z.number().optional(),
});

export type droplet_create = z.infer<typeof droplet_create>;
export const droplet_create = z.object({
  region: z.union([z.string(), z.undefined()]).optional(),
  size: z.string(),
  image: z.union([z.string(), z.number()]),
  ssh_keys: z
    .union([z.array(z.union([z.string(), z.number(), z.array(z.union([z.string(), z.number()]))])), z.undefined()])
    .optional(),
  backups: z.union([z.boolean(), z.undefined()]).optional(),
  backup_policy: z.union([z.intersection(droplet_backup_policy, z.unknown()), z.undefined()]).optional(),
  ipv6: z.union([z.boolean(), z.undefined()]).optional(),
  monitoring: z.union([z.boolean(), z.undefined()]).optional(),
  tags: z.union([z.array(z.string()), z.null(), z.undefined()]).optional(),
  user_data: z.union([z.string(), z.undefined()]).optional(),
  private_networking: z.union([z.boolean(), z.undefined()]).optional(),
  volumes: z.union([z.array(z.string()), z.undefined()]).optional(),
  vpc_uuid: z.union([z.string(), z.undefined()]).optional(),
  with_droplet_agent: z.union([z.boolean(), z.undefined()]).optional(),
});

export type droplet_single_create = z.infer<typeof droplet_single_create>;
export const droplet_single_create = z.intersection(
  z.object({
    name: z.string(),
  }),
  droplet_create,
);

export type droplet_multi_create = z.infer<typeof droplet_multi_create>;
export const droplet_multi_create = z.intersection(
  z.object({
    names: z.array(z.string()),
  }),
  droplet_create,
);

export type action_link = z.infer<typeof action_link>;
export const action_link = z.object({
  id: z.number().optional(),
  rel: z.string().optional(),
  href: z.string().optional(),
});

export type snapshots_base = z.infer<typeof snapshots_base>;
export const snapshots_base = z.object({
  name: z.string(),
  created_at: z.string(),
  regions: z.array(z.string()),
  min_disk_size: z.number(),
  size_gigabytes: z.number(),
});

export type droplet_snapshot = z.infer<typeof droplet_snapshot>;
export const droplet_snapshot = z.intersection(
  z.object({
    id: z.number(),
  }),
  z.intersection(
    snapshots_base,
    z.object({
      type: z.union([z.literal("snapshot"), z.literal("backup")]),
    }),
  ),
);

export type droplet_backup_policy_record = z.infer<typeof droplet_backup_policy_record>;
export const droplet_backup_policy_record = z.object({
  droplet_id: z.number().optional(),
  backup_enabled: z.boolean().optional(),
  backup_policy: z.intersection(droplet_backup_policy, z.unknown()).optional(),
  next_backup_window: z.intersection(droplet_next_backup_window, z.unknown()).optional(),
});

export type supported_droplet_backup_policy = z.infer<typeof supported_droplet_backup_policy>;
export const supported_droplet_backup_policy = z.object({
  name: z.string().optional(),
  possible_window_starts: z.array(z.number()).optional(),
  window_length_hours: z.number().optional(),
  retention_period_days: z.number().optional(),
  possible_days: z.array(z.string()).optional(),
});

export type droplet_action = z.infer<typeof droplet_action>;
export const droplet_action = z.object({
  type: z.union([
    z.literal("enable_backups"),
    z.literal("disable_backups"),
    z.literal("reboot"),
    z.literal("power_cycle"),
    z.literal("shutdown"),
    z.literal("power_off"),
    z.literal("power_on"),
    z.literal("restore"),
    z.literal("password_reset"),
    z.literal("resize"),
    z.literal("rebuild"),
    z.literal("rename"),
    z.literal("change_kernel"),
    z.literal("enable_ipv6"),
    z.literal("snapshot"),
  ]),
});

export type droplet_action_enable_backups = z.infer<typeof droplet_action_enable_backups>;
export const droplet_action_enable_backups = z.intersection(
  droplet_action,
  z.object({
    backup_policy: z.intersection(droplet_backup_policy, z.unknown()).optional(),
  }),
);

export type droplet_action_change_backup_policy = z.infer<typeof droplet_action_change_backup_policy>;
export const droplet_action_change_backup_policy = z.intersection(
  droplet_action,
  z.object({
    backup_policy: z.intersection(droplet_backup_policy, z.unknown()).optional(),
  }),
);

export type droplet_action_restore = z.infer<typeof droplet_action_restore>;
export const droplet_action_restore = z.intersection(
  droplet_action,
  z.object({
    image: z.number().optional(),
  }),
);

export type droplet_action_resize = z.infer<typeof droplet_action_resize>;
export const droplet_action_resize = z.intersection(
  droplet_action,
  z.object({
    disk: z.boolean().optional(),
    size: z.string().optional(),
  }),
);

export type droplet_action_rebuild = z.infer<typeof droplet_action_rebuild>;
export const droplet_action_rebuild = z.intersection(
  droplet_action,
  z.object({
    image: z.union([z.string(), z.number()]).optional(),
  }),
);

export type droplet_action_rename = z.infer<typeof droplet_action_rename>;
export const droplet_action_rename = z.intersection(
  droplet_action,
  z.object({
    name: z.string().optional(),
  }),
);

export type droplet_action_change_kernel = z.infer<typeof droplet_action_change_kernel>;
export const droplet_action_change_kernel = z.intersection(
  droplet_action,
  z.object({
    kernel: z.number().optional(),
  }),
);

export type droplet_action_snapshot = z.infer<typeof droplet_action_snapshot>;
export const droplet_action_snapshot = z.intersection(
  droplet_action,
  z.object({
    name: z.string().optional(),
  }),
);

export type existing_tags_array = z.infer<typeof existing_tags_array>;
export const existing_tags_array = z.union([z.array(z.string()), z.null()]);

export type firewall_rule_base = z.infer<typeof firewall_rule_base>;
export const firewall_rule_base = z.object({
  protocol: z.union([z.literal("tcp"), z.literal("udp"), z.literal("icmp")]),
  ports: z.string(),
});

export type firewall_rule_target = z.infer<typeof firewall_rule_target>;
export const firewall_rule_target = z.object({
  addresses: z.array(z.string()).optional(),
  droplet_ids: z.array(z.number()).optional(),
  load_balancer_uids: z.array(z.string()).optional(),
  kubernetes_ids: z.array(z.string()).optional(),
  tags: z.intersection(existing_tags_array, z.unknown()).optional(),
});

export type firewall_rules = z.infer<typeof firewall_rules>;
export const firewall_rules = z.object({
  inbound_rules: z
    .union([
      z.array(
        z.intersection(
          firewall_rule_base,
          z.object({
            sources: z.intersection(firewall_rule_target, z.unknown()),
          }),
        ),
      ),
      z.null(),
    ])
    .optional(),
  outbound_rules: z
    .union([
      z.array(
        z.intersection(
          firewall_rule_base,
          z.object({
            destinations: z.intersection(firewall_rule_target, z.unknown()),
          }),
        ),
      ),
      z.null(),
    ])
    .optional(),
});

export type firewall = z.infer<typeof firewall>;
export const firewall = z.intersection(
  z.object({
    id: z.string().optional(),
    status: z.union([z.literal("waiting"), z.literal("succeeded"), z.literal("failed")]).optional(),
    created_at: z.string().optional(),
    pending_changes: z
      .array(
        z.object({
          droplet_id: z.number().optional(),
          removing: z.boolean().optional(),
          status: z.string().optional(),
        }),
      )
      .optional(),
    name: z.string().optional(),
    droplet_ids: z.union([z.array(z.number()), z.null()]).optional(),
    tags: z.intersection(existing_tags_array, z.unknown()).optional(),
  }),
  firewall_rules,
);

export type associated_resource = z.infer<typeof associated_resource>;
export const associated_resource = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  cost: z.string().optional(),
});

export type selective_destroy_associated_resource = z.infer<typeof selective_destroy_associated_resource>;
export const selective_destroy_associated_resource = z.object({
  floating_ips: z.array(z.string()).optional(),
  reserved_ips: z.array(z.string()).optional(),
  snapshots: z.array(z.string()).optional(),
  volumes: z.array(z.string()).optional(),
  volume_snapshots: z.array(z.string()).optional(),
});

export type destroyed_associated_resource = z.infer<typeof destroyed_associated_resource>;
export const destroyed_associated_resource = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  destroyed_at: z.string().optional(),
  error_message: z.string().optional(),
});

export type associated_resource_status = z.infer<typeof associated_resource_status>;
export const associated_resource_status = z.object({
  droplet: destroyed_associated_resource.optional(),
  resources: z
    .object({
      reserved_ips: z.array(destroyed_associated_resource).optional(),
      floating_ips: z.array(destroyed_associated_resource).optional(),
      snapshots: z.array(destroyed_associated_resource).optional(),
      volumes: z.array(destroyed_associated_resource).optional(),
      volume_snapshots: z.array(destroyed_associated_resource).optional(),
    })
    .optional(),
  completed_at: z.string().optional(),
  failures: z.number().optional(),
});

export type autoscale_pool_static_config = z.infer<typeof autoscale_pool_static_config>;
export const autoscale_pool_static_config = z.object({
  target_number_instances: z.number(),
});

export type autoscale_pool_dynamic_config = z.infer<typeof autoscale_pool_dynamic_config>;
export const autoscale_pool_dynamic_config = z.object({
  min_instances: z.number(),
  max_instances: z.number(),
  target_cpu_utilization: z.union([z.number(), z.undefined()]).optional(),
  target_memory_utilization: z.union([z.number(), z.undefined()]).optional(),
  cooldown_minutes: z.union([z.number(), z.undefined()]).optional(),
});

export type autoscale_pool_droplet_template = z.infer<typeof autoscale_pool_droplet_template>;
export const autoscale_pool_droplet_template = z.object({
  name: z.union([z.string(), z.undefined()]).optional(),
  region: z.union([
    z.literal("nyc1"),
    z.literal("nyc2"),
    z.literal("nyc3"),
    z.literal("ams2"),
    z.literal("ams3"),
    z.literal("sfo1"),
    z.literal("sfo2"),
    z.literal("sfo3"),
    z.literal("sgp1"),
    z.literal("lon1"),
    z.literal("fra1"),
    z.literal("tor1"),
    z.literal("blr1"),
    z.literal("syd1"),
  ]),
  size: z.string(),
  image: z.string(),
  ssh_keys: z.array(z.string()),
  tags: z.union([z.array(z.string()), z.undefined()]).optional(),
  vpc_uuid: z.union([z.string(), z.undefined()]).optional(),
  with_droplet_agent: z.union([z.boolean(), z.undefined()]).optional(),
  project_id: z.union([z.string(), z.undefined()]).optional(),
  ipv6: z.union([z.boolean(), z.undefined()]).optional(),
  user_data: z.union([z.string(), z.undefined()]).optional(),
});

export type current_utilization = z.infer<typeof current_utilization>;
export const current_utilization = z.object({
  memory: z.number().optional(),
  cpu: z.number().optional(),
});

export type autoscale_pool = z.infer<typeof autoscale_pool>;
export const autoscale_pool = z.object({
  id: z.string(),
  name: z.string(),
  config: z.union([autoscale_pool_static_config, autoscale_pool_dynamic_config]),
  droplet_template: autoscale_pool_droplet_template,
  current_utilization: z.union([current_utilization, z.undefined()]).optional(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.union([z.literal("active"), z.literal("deleting"), z.literal("error")]),
  active_resources_count: z.number(),
});

export type autoscale_pool_create = z.infer<typeof autoscale_pool_create>;
export const autoscale_pool_create = z.object({
  name: z.string(),
  config: z.union([autoscale_pool_static_config, autoscale_pool_dynamic_config]),
  droplet_template: autoscale_pool_droplet_template,
});

export type member_current_utilization = z.infer<typeof member_current_utilization>;
export const member_current_utilization = z.object({
  memory: z.number().optional(),
  cpu: z.number().optional(),
});

export type member = z.infer<typeof member>;
export const member = z.object({
  droplet_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  health_status: z.string(),
  status: z.union([z.literal("provisioning"), z.literal("active"), z.literal("deleting"), z.literal("off")]),
  current_utilization: member_current_utilization,
});

export type history = z.infer<typeof history>;
export const history = z.object({
  history_event_id: z.string(),
  current_instance_count: z.number(),
  desired_instance_count: z.number(),
  reason: z.union([z.literal("CONFIGURATION_CHANGE"), z.literal("SCALE_UP"), z.literal("SCALE_DOWN")]),
  status: z.union([z.literal("in_progress"), z.literal("success"), z.literal("error")]),
  created_at: z.string(),
  updated_at: z.string(),
});

export type floating_ip = z.infer<typeof floating_ip>;
export const floating_ip = z.object({
  ip: z.string().optional(),
  region: z.intersection(region, z.unknown()).optional(),
  droplet: z.union([z.unknown(), z.null(), droplet, z.array(z.union([z.unknown(), z.null(), droplet]))]).optional(),
  locked: z.boolean().optional(),
  project_id: z.string().optional(),
});

export type floating_ip_create = z.infer<typeof floating_ip_create>;
export const floating_ip_create = z.union([
  z.object({
    droplet_id: z.number(),
  }),
  z.object({
    region: z.string(),
    project_id: z.union([z.string(), z.undefined()]).optional(),
  }),
]);

export type floatingIPsAction = z.infer<typeof floatingIPsAction>;
export const floatingIPsAction = z.object({
  type: z.union([z.literal("assign"), z.literal("unassign")]),
});

export type floating_ip_action_assign = z.infer<typeof floating_ip_action_assign>;
export const floating_ip_action_assign = z.intersection(
  floatingIPsAction,
  z.object({
    droplet_id: z.number(),
  }),
);

export type floating_ip_action_unassign = z.infer<typeof floating_ip_action_unassign>;
export const floating_ip_action_unassign = z.intersection(floatingIPsAction, z.unknown());

export type namespace_info = z.infer<typeof namespace_info>;
export const namespace_info = z.object({
  api_host: z.string().optional(),
  namespace: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  label: z.string().optional(),
  region: z.string().optional(),
  uuid: z.string().optional(),
  key: z.string().optional(),
});

export type create_namespace = z.infer<typeof create_namespace>;
export const create_namespace = z.object({
  region: z.string(),
  label: z.string(),
});

export type scheduled_details = z.infer<typeof scheduled_details>;
export const scheduled_details = z.object({
  cron: z.string(),
  body: z
    .union([
      z.object({
        name: z.string().optional(),
      }),
      z.null(),
      z.undefined(),
    ])
    .optional(),
});

export type trigger_info = z.infer<typeof trigger_info>;
export const trigger_info = z.object({
  namespace: z.string().optional(),
  name: z.string().optional(),
  function: z.string().optional(),
  type: z.string().optional(),
  is_enabled: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  scheduled_details: scheduled_details.optional(),
  scheduled_runs: z
    .object({
      last_run_at: z.union([z.string(), z.null()]).optional(),
      next_run_at: z.union([z.string(), z.null()]).optional(),
    })
    .optional(),
});

export type create_trigger = z.infer<typeof create_trigger>;
export const create_trigger = z.object({
  name: z.string(),
  function: z.string(),
  type: z.string(),
  is_enabled: z.boolean(),
  scheduled_details: scheduled_details,
});

export type update_trigger = z.infer<typeof update_trigger>;
export const update_trigger = z.object({
  is_enabled: z.boolean().optional(),
  scheduled_details: scheduled_details.optional(),
});

export type image_update = z.infer<typeof image_update>;
export const image_update = z.object({
  name: image_name.optional(),
  distribution: distribution.optional(),
  description: image_description.optional(),
});

export type image_new_custom = z.infer<typeof image_new_custom>;
export const image_new_custom = z.intersection(
  image_update,
  z.object({
    url: z.string().optional(),
    region: region_slug.optional(),
    tags: tags_array.optional(),
  }),
);

export type image_action_base = z.infer<typeof image_action_base>;
export const image_action_base = z.object({
  type: z.union([z.literal("convert"), z.literal("transfer")]),
});

export type image_action_transfer = z.infer<typeof image_action_transfer>;
export const image_action_transfer = z.intersection(
  image_action_base,
  z.object({
    region: region_slug,
  }),
);

export type kubernetes_node_pool_size = z.infer<typeof kubernetes_node_pool_size>;
export const kubernetes_node_pool_size = z.object({
  size: z.string().optional(),
});

export type kubernetes_node_pool_taint = z.infer<typeof kubernetes_node_pool_taint>;
export const kubernetes_node_pool_taint = z.object({
  key: z.string().optional(),
  value: z.string().optional(),
  effect: z.union([z.literal("NoSchedule"), z.literal("PreferNoSchedule"), z.literal("NoExecute")]).optional(),
});

export type node = z.infer<typeof node>;
export const node = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z
    .object({
      state: z
        .union([z.literal("provisioning"), z.literal("running"), z.literal("draining"), z.literal("deleting")])
        .optional(),
    })
    .optional(),
  droplet_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type kubernetes_node_pool_base = z.infer<typeof kubernetes_node_pool_base>;
export const kubernetes_node_pool_base = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  count: z.number().optional(),
  tags: z.array(z.string()).optional(),
  labels: z.union([z.unknown(), z.null()]).optional(),
  taints: z.array(kubernetes_node_pool_taint).optional(),
  auto_scale: z.boolean().optional(),
  min_nodes: z.number().optional(),
  max_nodes: z.number().optional(),
  nodes: z.array(node).optional(),
});

export type kubernetes_node_pool = z.infer<typeof kubernetes_node_pool>;
export const kubernetes_node_pool = z.intersection(kubernetes_node_pool_size, kubernetes_node_pool_base);

export type maintenance_policy = z.infer<typeof maintenance_policy>;
export const maintenance_policy = z.union([
  z.object({
    start_time: z.string().optional(),
    duration: z.string().optional(),
    day: z
      .union([
        z.literal("any"),
        z.literal("monday"),
        z.literal("tuesday"),
        z.literal("wednesday"),
        z.literal("thursday"),
        z.literal("friday"),
        z.literal("saturday"),
        z.literal("sunday"),
      ])
      .optional(),
  }),
  z.null(),
]);

export type control_plane_firewall = z.infer<typeof control_plane_firewall>;
export const control_plane_firewall = z.union([
  z.object({
    enabled: z.boolean().optional(),
    allowed_addresses: z.array(z.string()).optional(),
  }),
  z.null(),
]);

export type cluster_autoscaler_configuration = z.infer<typeof cluster_autoscaler_configuration>;
export const cluster_autoscaler_configuration = z.union([
  z.object({
    scale_down_utilization_threshold: z.number().optional(),
    scale_down_unneeded_time: z.string().optional(),
  }),
  z.null(),
]);

export type routing_agent = z.infer<typeof routing_agent>;
export const routing_agent = z.union([
  z.object({
    enabled: z.boolean().optional(),
  }),
  z.null(),
]);

export type cluster = z.infer<typeof cluster>;
export const cluster = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  name: z.string(),
  region: z.string(),
  version: z.string(),
  cluster_subnet: z.union([z.string(), z.undefined()]).optional(),
  service_subnet: z.union([z.string(), z.undefined()]).optional(),
  vpc_uuid: z.union([z.string(), z.undefined()]).optional(),
  ipv4: z.union([z.string(), z.undefined()]).optional(),
  endpoint: z.union([z.string(), z.undefined()]).optional(),
  tags: z.union([z.array(z.string()), z.undefined()]).optional(),
  node_pools: z.array(kubernetes_node_pool),
  maintenance_policy: z.union([maintenance_policy, z.undefined()]).optional(),
  auto_upgrade: z.union([z.boolean(), z.undefined()]).optional(),
  status: z
    .union([
      z.object({
        state: z
          .union([
            z.literal("running"),
            z.literal("provisioning"),
            z.literal("degraded"),
            z.literal("error"),
            z.literal("deleted"),
            z.literal("upgrading"),
            z.literal("deleting"),
          ])
          .optional(),
        message: z.string().optional(),
      }),
      z.undefined(),
    ])
    .optional(),
  created_at: z.union([z.string(), z.undefined()]).optional(),
  updated_at: z.union([z.string(), z.undefined()]).optional(),
  surge_upgrade: z.union([z.boolean(), z.undefined()]).optional(),
  ha: z.union([z.boolean(), z.undefined()]).optional(),
  registry_enabled: z.union([z.boolean(), z.undefined()]).optional(),
  control_plane_firewall: z.union([control_plane_firewall, z.undefined()]).optional(),
  cluster_autoscaler_configuration: z.union([cluster_autoscaler_configuration, z.undefined()]).optional(),
  routing_agent: z.union([routing_agent, z.undefined()]).optional(),
});

export type cluster_update = z.infer<typeof cluster_update>;
export const cluster_update = z.object({
  name: z.string(),
  tags: z.union([z.array(z.string()), z.undefined()]).optional(),
  maintenance_policy: z.union([maintenance_policy, z.undefined()]).optional(),
  auto_upgrade: z.union([z.boolean(), z.undefined()]).optional(),
  surge_upgrade: z.union([z.boolean(), z.undefined()]).optional(),
  ha: z.union([z.boolean(), z.undefined()]).optional(),
  control_plane_firewall: z.union([control_plane_firewall, z.undefined()]).optional(),
  cluster_autoscaler_configuration: z.union([cluster_autoscaler_configuration, z.undefined()]).optional(),
  routing_agent: z.union([routing_agent, z.undefined()]).optional(),
});

export type associated_kubernetes_resource = z.infer<typeof associated_kubernetes_resource>;
export const associated_kubernetes_resource = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type associated_kubernetes_resources = z.infer<typeof associated_kubernetes_resources>;
export const associated_kubernetes_resources = z.object({
  load_balancers: z.array(associated_kubernetes_resource).optional(),
  volumes: z.array(associated_kubernetes_resource).optional(),
  volume_snapshots: z.array(associated_kubernetes_resource).optional(),
});

export type destroy_associated_kubernetes_resources = z.infer<typeof destroy_associated_kubernetes_resources>;
export const destroy_associated_kubernetes_resources = z.object({
  load_balancers: z.array(z.string()).optional(),
  volumes: z.array(z.string()).optional(),
  volume_snapshots: z.array(z.string()).optional(),
});

export type credentials = z.infer<typeof credentials>;
export const credentials = z.object({
  server: z.string().optional(),
  certificate_authority_data: z.string().optional(),
  client_certificate_data: z.union([z.string(), z.null()]).optional(),
  client_key_data: z.union([z.string(), z.null()]).optional(),
  token: z.string().optional(),
  expires_at: z.string().optional(),
});

export type kubernetes_version = z.infer<typeof kubernetes_version>;
export const kubernetes_version = z.object({
  slug: z.string().optional(),
  kubernetes_version: z.string().optional(),
  supported_features: z.array(z.string()).optional(),
});

export type kubernetes_node_pool_update = z.infer<typeof kubernetes_node_pool_update>;
export const kubernetes_node_pool_update = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  count: z.number().optional(),
  tags: z.array(z.string()).optional(),
  labels: z.union([z.unknown(), z.null()]).optional(),
  taints: z.array(kubernetes_node_pool_taint).optional(),
  auto_scale: z.boolean().optional(),
  min_nodes: z.number().optional(),
  max_nodes: z.number().optional(),
  nodes: z.array(node).optional(),
});

export type user = z.infer<typeof user>;
export const user = z.object({
  kubernetes_cluster_user: z
    .object({
      username: z.string().optional(),
      groups: z.array(z.string()).optional(),
    })
    .optional(),
});

export type kubernetes_region = z.infer<typeof kubernetes_region>;
export const kubernetes_region = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
});

export type kubernetes_size = z.infer<typeof kubernetes_size>;
export const kubernetes_size = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
});

export type kubernetes_options = z.infer<typeof kubernetes_options>;
export const kubernetes_options = z.object({
  options: z
    .object({
      regions: z.array(kubernetes_region).optional(),
      versions: z.array(kubernetes_version).optional(),
      sizes: z.array(kubernetes_size).optional(),
    })
    .optional(),
});

export type clusterlint_results = z.infer<typeof clusterlint_results>;
export const clusterlint_results = z.object({
  run_id: z.string().optional(),
  requested_at: z.string().optional(),
  completed_at: z.string().optional(),
  diagnostics: z
    .array(
      z.object({
        check_name: z.string().optional(),
        severity: z.string().optional(),
        message: z.string().optional(),
        object: z
          .object({
            name: z.string().optional(),
            kind: z.string().optional(),
            namespace: z.string().optional(),
          })
          .optional(),
      }),
    )
    .optional(),
});

export type clusterlint_request = z.infer<typeof clusterlint_request>;
export const clusterlint_request = z.object({
  include_groups: z.array(z.string()).optional(),
  include_checks: z.array(z.string()).optional(),
  exclude_groups: z.array(z.string()).optional(),
  exclude_checks: z.array(z.string()).optional(),
});

export type cluster_registries = z.infer<typeof cluster_registries>;
export const cluster_registries = z.object({
  cluster_uuids: z.array(z.string()).optional(),
});

export type status_messages = z.infer<typeof status_messages>;
export const status_messages = z.object({
  message: z.string().optional(),
  timestamp: z.string().optional(),
});

export type forwarding_rule = z.infer<typeof forwarding_rule>;
export const forwarding_rule = z.object({
  entry_protocol: z.union([
    z.literal("http"),
    z.literal("https"),
    z.literal("http2"),
    z.literal("http3"),
    z.literal("tcp"),
    z.literal("udp"),
  ]),
  entry_port: z.number(),
  target_protocol: z.union([
    z.literal("http"),
    z.literal("https"),
    z.literal("http2"),
    z.literal("tcp"),
    z.literal("udp"),
  ]),
  target_port: z.number(),
  certificate_id: z.union([z.string(), z.undefined()]).optional(),
  tls_passthrough: z.union([z.boolean(), z.undefined()]).optional(),
});

export type health_check = z.infer<typeof health_check>;
export const health_check = z.object({
  protocol: z.union([z.literal("http"), z.literal("https"), z.literal("tcp")]).optional(),
  port: z.number().optional(),
  path: z.string().optional(),
  check_interval_seconds: z.number().optional(),
  response_timeout_seconds: z.number().optional(),
  unhealthy_threshold: z.number().optional(),
  healthy_threshold: z.number().optional(),
});

export type sticky_sessions = z.infer<typeof sticky_sessions>;
export const sticky_sessions = z.object({
  type: z.union([z.literal("cookies"), z.literal("none")]).optional(),
  cookie_name: z.string().optional(),
  cookie_ttl_seconds: z.number().optional(),
});

export type lb_firewall = z.infer<typeof lb_firewall>;
export const lb_firewall = z.object({
  deny: z.array(z.string()).optional(),
  allow: z.array(z.string()).optional(),
});

export type domains = z.infer<typeof domains>;
export const domains = z.object({
  name: z.string().optional(),
  is_managed: z.boolean().optional(),
  certificate_id: z.string().optional(),
});

export type glb_settings = z.infer<typeof glb_settings>;
export const glb_settings = z.object({
  target_protocol: z.union([z.literal("http"), z.literal("https"), z.literal("http2")]).optional(),
  target_port: z.number().optional(),
  cdn: z
    .object({
      is_enabled: z.boolean().optional(),
    })
    .optional(),
  region_priorities: z.unknown().optional(),
  failover_threshold: z.number().optional(),
});

export type load_balancer_base = z.infer<typeof load_balancer_base>;
export const load_balancer_base = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  name: z.union([z.string(), z.undefined()]).optional(),
  project_id: z.union([z.string(), z.undefined()]).optional(),
  ip: z.union([z.string(), z.undefined()]).optional(),
  ipv6: z.union([z.string(), z.undefined()]).optional(),
  size_unit: z.union([z.number(), z.undefined()]).optional(),
  size: z.union([z.literal("lb-small"), z.literal("lb-medium"), z.literal("lb-large"), z.undefined()]).optional(),
  algorithm: z.union([z.literal("round_robin"), z.literal("least_connections"), z.undefined()]).optional(),
  status: z.union([z.literal("new"), z.literal("active"), z.literal("errored"), z.undefined()]).optional(),
  created_at: z.union([z.string(), z.undefined()]).optional(),
  forwarding_rules: z.array(forwarding_rule),
  health_check: z.union([health_check, z.undefined()]).optional(),
  sticky_sessions: z.union([sticky_sessions, z.undefined()]).optional(),
  redirect_http_to_https: z.union([z.boolean(), z.undefined()]).optional(),
  enable_proxy_protocol: z.union([z.boolean(), z.undefined()]).optional(),
  enable_backend_keepalive: z.union([z.boolean(), z.undefined()]).optional(),
  http_idle_timeout_seconds: z.union([z.number(), z.undefined()]).optional(),
  vpc_uuid: z.union([z.string(), z.undefined()]).optional(),
  disable_lets_encrypt_dns_records: z.union([z.boolean(), z.undefined()]).optional(),
  firewall: z.union([lb_firewall, z.undefined()]).optional(),
  network: z.union([z.literal("EXTERNAL"), z.literal("INTERNAL"), z.undefined()]).optional(),
  network_stack: z.union([z.literal("IPV4"), z.literal("DUALSTACK"), z.undefined()]).optional(),
  type: z.union([z.literal("REGIONAL"), z.literal("REGIONAL_NETWORK"), z.literal("GLOBAL"), z.undefined()]).optional(),
  domains: z.union([z.array(domains), z.undefined()]).optional(),
  glb_settings: z.union([glb_settings, z.undefined()]).optional(),
  target_load_balancer_ids: z.union([z.array(z.string()), z.undefined()]).optional(),
});

export type load_balancer = z.infer<typeof load_balancer>;
export const load_balancer = z.intersection(
  load_balancer_base,
  z.intersection(
    z.object({
      region: z.intersection(z.unknown(), region).optional(),
    }),
    z.intersection(
      z.object({
        droplet_ids: z.array(z.number()).optional(),
      }),
      z.object({
        tag: z.string().optional(),
      }),
    ),
  ),
);

export type load_balancer_create = z.infer<typeof load_balancer_create>;
export const load_balancer_create = z.union([
  z.intersection(
    z.object({
      droplet_ids: z.array(z.number()).optional(),
    }),
    z.intersection(
      z.object({
        region: region_slug.optional(),
      }),
      load_balancer_base,
    ),
  ),
  z.intersection(
    z.object({
      tag: z.string().optional(),
    }),
    z.intersection(
      z.object({
        region: region_slug.optional(),
      }),
      load_balancer_base,
    ),
  ),
]);

export type slack_details = z.infer<typeof slack_details>;
export const slack_details = z.object({
  channel: z.string(),
  url: z.string(),
});

export type alerts = z.infer<typeof alerts>;
export const alerts = z.object({
  email: z.array(z.string()),
  slack: z.array(slack_details),
});

export type alert_policy = z.infer<typeof alert_policy>;
export const alert_policy = z.object({
  alerts: alerts,
  compare: z.union([z.literal("GreaterThan"), z.literal("LessThan")]),
  description: z.string(),
  enabled: z.boolean(),
  entities: z.array(z.string()),
  tags: z.array(z.string()),
  type: z.union([
    z.literal("v1/insights/droplet/load_1"),
    z.literal("v1/insights/droplet/load_5"),
    z.literal("v1/insights/droplet/load_15"),
    z.literal("v1/insights/droplet/memory_utilization_percent"),
    z.literal("v1/insights/droplet/disk_utilization_percent"),
    z.literal("v1/insights/droplet/cpu"),
    z.literal("v1/insights/droplet/disk_read"),
    z.literal("v1/insights/droplet/disk_write"),
    z.literal("v1/insights/droplet/public_outbound_bandwidth"),
    z.literal("v1/insights/droplet/public_inbound_bandwidth"),
    z.literal("v1/insights/droplet/private_outbound_bandwidth"),
    z.literal("v1/insights/droplet/private_inbound_bandwidth"),
    z.literal("v1/insights/lbaas/avg_cpu_utilization_percent"),
    z.literal("v1/insights/lbaas/connection_utilization_percent"),
    z.literal("v1/insights/lbaas/droplet_health"),
    z.literal("v1/insights/lbaas/tls_connections_per_second_utilization_percent"),
    z.literal("v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx"),
    z.literal("v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx"),
    z.literal("v1/insights/lbaas/increase_in_http_error_rate_count_5xx"),
    z.literal("v1/insights/lbaas/increase_in_http_error_rate_count_4xx"),
    z.literal("v1/insights/lbaas/high_http_request_response_time"),
    z.literal("v1/insights/lbaas/high_http_request_response_time_50p"),
    z.literal("v1/insights/lbaas/high_http_request_response_time_95p"),
    z.literal("v1/insights/lbaas/high_http_request_response_time_99p"),
    z.literal("v1/dbaas/alerts/load_15_alerts"),
    z.literal("v1/dbaas/alerts/memory_utilization_alerts"),
    z.literal("v1/dbaas/alerts/disk_utilization_alerts"),
    z.literal("v1/dbaas/alerts/cpu_alerts"),
    z.literal("v1/droplet/autoscale_alerts/current_instances"),
    z.literal("v1/droplet/autoscale_alerts/target_instances"),
    z.literal("v1/droplet/autoscale_alerts/current_cpu_utilization"),
    z.literal("v1/droplet/autoscale_alerts/target_cpu_utilization"),
    z.literal("v1/droplet/autoscale_alerts/current_memory_utilization"),
    z.literal("v1/droplet/autoscale_alerts/target_memory_utilization"),
    z.literal("v1/droplet/autoscale_alerts/scale_up"),
    z.literal("v1/droplet/autoscale_alerts/scale_down"),
  ]),
  uuid: z.string(),
  value: z.number(),
  window: z.union([z.literal("5m"), z.literal("10m"), z.literal("30m"), z.literal("1h")]),
});

export type list_alert_policy = z.infer<typeof list_alert_policy>;
export const list_alert_policy = z.object({
  policies: z.array(alert_policy),
});

export type alert_policy_request = z.infer<typeof alert_policy_request>;
export const alert_policy_request = z.object({
  alerts: alerts,
  compare: z.union([z.literal("GreaterThan"), z.literal("LessThan")]),
  description: z.string(),
  enabled: z.boolean(),
  entities: z.array(z.string()),
  tags: z.array(z.string()),
  type: z.union([
    z.literal("v1/insights/droplet/load_1"),
    z.literal("v1/insights/droplet/load_5"),
    z.literal("v1/insights/droplet/load_15"),
    z.literal("v1/insights/droplet/memory_utilization_percent"),
    z.literal("v1/insights/droplet/disk_utilization_percent"),
    z.literal("v1/insights/droplet/cpu"),
    z.literal("v1/insights/droplet/disk_read"),
    z.literal("v1/insights/droplet/disk_write"),
    z.literal("v1/insights/droplet/public_outbound_bandwidth"),
    z.literal("v1/insights/droplet/public_inbound_bandwidth"),
    z.literal("v1/insights/droplet/private_outbound_bandwidth"),
    z.literal("v1/insights/droplet/private_inbound_bandwidth"),
    z.literal("v1/insights/lbaas/avg_cpu_utilization_percent"),
    z.literal("v1/insights/lbaas/connection_utilization_percent"),
    z.literal("v1/insights/lbaas/droplet_health"),
    z.literal("v1/insights/lbaas/tls_connections_per_second_utilization_percent"),
    z.literal("v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx"),
    z.literal("v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx"),
    z.literal("v1/insights/lbaas/increase_in_http_error_rate_count_5xx"),
    z.literal("v1/insights/lbaas/increase_in_http_error_rate_count_4xx"),
    z.literal("v1/insights/lbaas/high_http_request_response_time"),
    z.literal("v1/insights/lbaas/high_http_request_response_time_50p"),
    z.literal("v1/insights/lbaas/high_http_request_response_time_95p"),
    z.literal("v1/insights/lbaas/high_http_request_response_time_99p"),
    z.literal("v1/dbaas/alerts/load_15_alerts"),
    z.literal("v1/dbaas/alerts/memory_utilization_alerts"),
    z.literal("v1/dbaas/alerts/disk_utilization_alerts"),
    z.literal("v1/dbaas/alerts/cpu_alerts"),
    z.literal("v1/droplet/autoscale_alerts/current_instances"),
    z.literal("v1/droplet/autoscale_alerts/target_instances"),
    z.literal("v1/droplet/autoscale_alerts/current_cpu_utilization"),
    z.literal("v1/droplet/autoscale_alerts/target_cpu_utilization"),
    z.literal("v1/droplet/autoscale_alerts/current_memory_utilization"),
    z.literal("v1/droplet/autoscale_alerts/target_memory_utilization"),
    z.literal("v1/droplet/autoscale_alerts/scale_up"),
    z.literal("v1/droplet/autoscale_alerts/scale_down"),
  ]),
  value: z.number(),
  window: z.union([z.literal("5m"), z.literal("10m"), z.literal("30m"), z.literal("1h")]),
});

export type metrics_result = z.infer<typeof metrics_result>;
export const metrics_result = z.object({
  metric: z.unknown(),
  values: z.array(z.array(z.union([z.number(), z.string()]))),
});

export type metrics_data = z.infer<typeof metrics_data>;
export const metrics_data = z.object({
  result: z.array(metrics_result),
  resultType: z.literal("matrix"),
});

export type metrics = z.infer<typeof metrics>;
export const metrics = z.object({
  data: metrics_data,
  status: z.union([z.literal("success"), z.literal("error")]),
});

export type opensearch_config_omit_credentials = z.infer<typeof opensearch_config_omit_credentials>;
export const opensearch_config_omit_credentials = z.object({
  id: z.string().optional(),
  endpoint: z.string().optional(),
  cluster_uuid: z.string().optional(),
  cluster_name: z.string().optional(),
  index_name: z.string().optional(),
  retention_days: z.number().optional(),
});

export type destination_omit_credentials = z.infer<typeof destination_omit_credentials>;
export const destination_omit_credentials = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  type: z.unknown().optional(),
  config: opensearch_config_omit_credentials.optional(),
});

export type opensearch_config_request = z.infer<typeof opensearch_config_request>;
export const opensearch_config_request = z.object({
  credentials: z
    .union([
      z.object({
        username: z.string().optional(),
        password: z.string().optional(),
      }),
      z.undefined(),
    ])
    .optional(),
  endpoint: z.string(),
  cluster_uuid: z.union([z.string(), z.undefined()]).optional(),
  cluster_name: z.union([z.string(), z.undefined()]).optional(),
  index_name: z.union([z.string(), z.undefined()]).optional(),
  retention_days: z.union([z.number(), z.undefined()]).optional(),
});

export type destination_request = z.infer<typeof destination_request>;
export const destination_request = z.object({
  name: z.union([z.string(), z.undefined()]).optional(),
  type: z.unknown(),
  config: opensearch_config_request,
});

export type urn = z.infer<typeof urn>;
export const urn = z.string();

export type opensearch_config = z.infer<typeof opensearch_config>;
export const opensearch_config = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  credentials: z
    .union([
      z.object({
        username: z.string().optional(),
        password: z.string().optional(),
      }),
      z.undefined(),
    ])
    .optional(),
  endpoint: z.string(),
  cluster_uuid: z.union([z.string(), z.undefined()]).optional(),
  cluster_name: z.union([z.string(), z.undefined()]).optional(),
  index_name: z.union([z.string(), z.undefined()]).optional(),
  retention_days: z.union([z.number(), z.undefined()]).optional(),
});

export type destination = z.infer<typeof destination>;
export const destination = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  name: z.union([z.string(), z.undefined()]).optional(),
  type: z.union([z.unknown(), z.undefined()]).optional(),
  config: opensearch_config,
});

export type sink_resource = z.infer<typeof sink_resource>;
export const sink_resource = z.object({
  urn: z.string(),
  name: z.union([z.string(), z.undefined()]).optional(),
});

export type sinks_response = z.infer<typeof sinks_response>;
export const sinks_response = z.object({
  destination: z.union([destination, z.undefined()]).optional(),
  resources: z.union([z.array(sink_resource), z.undefined()]).optional(),
});

export type partner_attachment = z.infer<typeof partner_attachment>;
export const partner_attachment = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  state: z.string().optional(),
  connection_bandwidth_in_mbps: z.number().optional(),
  region: z.string().optional(),
  naas_provider: z.string().optional(),
  vpc_ids: z.array(z.string()).optional(),
  bgp: z
    .object({
      local_asn: z.number().optional(),
      peer_asn: z.number().optional(),
      local_router_ip: z.string().optional(),
      peer_router_ip: z.string().optional(),
    })
    .optional(),
  created_at: z.string().optional(),
  parent_uuid: z.string().optional(),
  children: z.array(z.string()).optional(),
});

export type partner_attachment_writable = z.infer<typeof partner_attachment_writable>;
export const partner_attachment_writable = z.object({
  name: z.string(),
  connection_bandwidth_in_mbps: z.union([z.literal(1000), z.literal(2000), z.literal(5000), z.literal(10000)]),
  region: z.string(),
  naas_provider: z.string(),
  vpc_ids: z.array(z.string()),
  parent_uuid: z.union([z.string(), z.undefined()]).optional(),
  bgp: z
    .union([
      z.object({
        local_router_ip: z.string(),
        peer_router_ip: z.string(),
        peer_router_asn: z.number(),
        auth_key: z.string(),
      }),
      z.undefined(),
    ])
    .optional(),
});

export type partner_attachment_updatable = z.infer<typeof partner_attachment_updatable>;
export const partner_attachment_updatable = z.union([
  z.object({
    name: z.string(),
  }),
  z.object({
    vpc_ids: z.array(z.string()),
  }),
  z.object({
    bgp: z
      .object({
        local_router_ip: z.string(),
        peer_router_ip: z.string(),
        peer_router_asn: z.number(),
        auth_key: z.string(),
      })
      .optional(),
  }),
  z.array(
    z.union([
      z.object({
        name: z.string(),
      }),
      z.object({
        vpc_ids: z.array(z.string()),
      }),
      z.object({
        bgp: z
          .object({
            local_router_ip: z.string(),
            peer_router_ip: z.string(),
            peer_router_asn: z.number(),
            auth_key: z.string(),
          })
          .optional(),
      }),
    ]),
  ),
]);

export type partner_attachment_service_key = z.infer<typeof partner_attachment_service_key>;
export const partner_attachment_service_key = z.object({
  value: z.string().optional(),
  created_at: z.string().optional(),
  state: z.string().optional(),
});

export type partner_attachment_remote_route = z.infer<typeof partner_attachment_remote_route>;
export const partner_attachment_remote_route = z.object({
  cidr: z.string().optional(),
});

export type partner_attachment_remote_route_writable = z.infer<typeof partner_attachment_remote_route_writable>;
export const partner_attachment_remote_route_writable = z.object({
  cidr: z.string().optional(),
});

export type project_base = z.infer<typeof project_base>;
export const project_base = z.object({
  id: z.string().optional(),
  owner_uuid: z.string().optional(),
  owner_id: z.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  purpose: z.string().optional(),
  environment: z.union([z.literal("Development"), z.literal("Staging"), z.literal("Production")]).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type project = z.infer<typeof project>;
export const project = z.intersection(
  project_base,
  z.object({
    is_default: z.boolean().optional(),
  }),
);

export type resource = z.infer<typeof resource>;
export const resource = z.object({
  urn: urn.optional(),
  assigned_at: z.string().optional(),
  links: z
    .object({
      self: z.string().optional(),
    })
    .optional(),
  status: z
    .union([
      z.literal("ok"),
      z.literal("not_found"),
      z.literal("assigned"),
      z.literal("already_assigned"),
      z.literal("service_down"),
    ])
    .optional(),
});

export type project_assignment = z.infer<typeof project_assignment>;
export const project_assignment = z.object({
  resources: z.array(urn).optional(),
});

export type subscription_tier_base = z.infer<typeof subscription_tier_base>;
export const subscription_tier_base = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  included_repositories: z.number().optional(),
  included_storage_bytes: z.number().optional(),
  allow_storage_overage: z.boolean().optional(),
  included_bandwidth_bytes: z.number().optional(),
  monthly_price_in_cents: z.number().optional(),
  storage_overage_price_in_cents: z.number().optional(),
});

export type subscription = z.infer<typeof subscription>;
export const subscription = z.object({
  tier: subscription_tier_base.optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type registry = z.infer<typeof registry>;
export const registry = z.object({
  name: z.string().optional(),
  created_at: z.string().optional(),
  region: z.string().optional(),
  storage_usage_bytes: z.number().optional(),
  storage_usage_bytes_updated_at: z.string().optional(),
  subscription: z.intersection(z.unknown(), subscription).optional(),
});

export type registry_create = z.infer<typeof registry_create>;
export const registry_create = z.object({
  name: z.string(),
  subscription_tier_slug: z.union([z.literal("starter"), z.literal("basic"), z.literal("professional")]),
  region: z
    .union([
      z.literal("nyc3"),
      z.literal("sfo3"),
      z.literal("ams3"),
      z.literal("sgp1"),
      z.literal("fra1"),
      z.undefined(),
    ])
    .optional(),
});

export type docker_credentials = z.infer<typeof docker_credentials>;
export const docker_credentials = z.object({
  auths: z
    .object({
      "registry.digitalocean.com": z
        .object({
          auth: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export type validate_registry = z.infer<typeof validate_registry>;
export const validate_registry = z.object({
  name: z.string(),
});

export type repository_tag = z.infer<typeof repository_tag>;
export const repository_tag = z.object({
  registry_name: z.string().optional(),
  repository: z.string().optional(),
  tag: z.string().optional(),
  manifest_digest: z.string().optional(),
  compressed_size_bytes: z.number().optional(),
  size_bytes: z.number().optional(),
  updated_at: z.string().optional(),
});

export type repository = z.infer<typeof repository>;
export const repository = z.object({
  registry_name: z.string().optional(),
  name: z.string().optional(),
  latest_tag: repository_tag.optional(),
  tag_count: z.number().optional(),
});

export type repository_blob = z.infer<typeof repository_blob>;
export const repository_blob = z.object({
  digest: z.string().optional(),
  compressed_size_bytes: z.number().optional(),
});

export type repository_manifest = z.infer<typeof repository_manifest>;
export const repository_manifest = z.object({
  registry_name: z.string().optional(),
  repository: z.string().optional(),
  digest: z.string().optional(),
  compressed_size_bytes: z.number().optional(),
  size_bytes: z.number().optional(),
  updated_at: z.string().optional(),
  tags: z.array(z.string()).optional(),
  blobs: z.array(repository_blob).optional(),
});

export type repository_v2 = z.infer<typeof repository_v2>;
export const repository_v2 = z.object({
  registry_name: z.string().optional(),
  name: z.string().optional(),
  latest_manifest: repository_manifest.optional(),
  tag_count: z.number().optional(),
  manifest_count: z.number().optional(),
});

export type garbage_collection = z.infer<typeof garbage_collection>;
export const garbage_collection = z.object({
  uuid: z.string().optional(),
  registry_name: z.string().optional(),
  status: z
    .union([
      z.literal("requested"),
      z.literal("waiting for write JWTs to expire"),
      z.literal("scanning manifests"),
      z.literal("deleting unreferenced blobs"),
      z.literal("cancelling"),
      z.literal("failed"),
      z.literal("succeeded"),
      z.literal("cancelled"),
    ])
    .optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  blobs_deleted: z.number().optional(),
  freed_bytes: z.number().optional(),
});

export type update_registry = z.infer<typeof update_registry>;
export const update_registry = z.object({
  cancel: z.boolean().optional(),
});

export type subscription_tier_extended = z.infer<typeof subscription_tier_extended>;
export const subscription_tier_extended = z.object({
  eligible: z.boolean().optional(),
  eligibility_reasons: z.array(z.union([z.literal("OverRepositoryLimit"), z.literal("OverStorageLimit")])).optional(),
});

export type neighbor_ids = z.infer<typeof neighbor_ids>;
export const neighbor_ids = z.object({
  neighbor_ids: z.array(z.array(z.number())).optional(),
});

export type reserved_ip = z.infer<typeof reserved_ip>;
export const reserved_ip = z.object({
  ip: z.string().optional(),
  region: z.intersection(region, z.unknown()).optional(),
  droplet: z.union([z.unknown(), z.null(), droplet, z.array(z.union([z.unknown(), z.null(), droplet]))]).optional(),
  locked: z.boolean().optional(),
  project_id: z.string().optional(),
});

export type reserved_ip_create = z.infer<typeof reserved_ip_create>;
export const reserved_ip_create = z.union([
  z.object({
    droplet_id: z.number(),
  }),
  z.object({
    region: z.string(),
    project_id: z.union([z.string(), z.undefined()]).optional(),
  }),
]);

export type reserved_ip_action_type = z.infer<typeof reserved_ip_action_type>;
export const reserved_ip_action_type = z.object({
  type: z.union([z.literal("assign"), z.literal("unassign")]),
});

export type reserved_ip_action_assign = z.infer<typeof reserved_ip_action_assign>;
export const reserved_ip_action_assign = z.intersection(
  reserved_ip_action_type,
  z.object({
    droplet_id: z.number(),
  }),
);

export type reserved_ip_action_unassign = z.infer<typeof reserved_ip_action_unassign>;
export const reserved_ip_action_unassign = z.intersection(reserved_ip_action_type, z.unknown());

export type reserved_ipv6_list = z.infer<typeof reserved_ipv6_list>;
export const reserved_ipv6_list = z.object({
  reserved_ipv6s: z
    .array(
      z.object({
        ip: z.string().optional(),
        region_slug: z.string().optional(),
        reserved_at: z.string().optional(),
        droplet: z
          .union([z.unknown(), z.null(), droplet, z.array(z.union([z.unknown(), z.null(), droplet]))])
          .optional(),
      }),
    )
    .optional(),
});

export type reserved_ipv6_create = z.infer<typeof reserved_ipv6_create>;
export const reserved_ipv6_create = z.object({
  region_slug: z.string(),
});

export type reserved_ipv6 = z.infer<typeof reserved_ipv6>;
export const reserved_ipv6 = z.object({
  ip: z.string().optional(),
  reserved_at: z.string().optional(),
  region_slug: z.string().optional(),
  droplet: z.union([z.unknown(), z.null(), droplet, z.array(z.union([z.unknown(), z.null(), droplet]))]).optional(),
});

export type reserved_ipv6_action_type = z.infer<typeof reserved_ipv6_action_type>;
export const reserved_ipv6_action_type = z.object({
  type: z.union([z.literal("assign"), z.literal("unassign")]),
});

export type reserved_ipv6_action_assign = z.infer<typeof reserved_ipv6_action_assign>;
export const reserved_ipv6_action_assign = z.intersection(
  reserved_ipv6_action_type,
  z.object({
    droplet_id: z.number(),
  }),
);

export type reserved_ipv6_action_unassign = z.infer<typeof reserved_ipv6_action_unassign>;
export const reserved_ipv6_action_unassign = z.intersection(reserved_ipv6_action_type, z.unknown());

export type snapshots = z.infer<typeof snapshots>;
export const snapshots = z.intersection(
  z.object({
    id: z.string(),
  }),
  z.intersection(
    snapshots_base,
    z.object({
      resource_id: z.string(),
      resource_type: z.union([z.literal("droplet"), z.literal("volume")]),
      tags: z.union([z.array(z.string()), z.null()]),
    }),
  ),
);

export type grant = z.infer<typeof grant>;
export const grant = z.object({
  bucket: z.string(),
  permission: z.string(),
});

export type key = z.infer<typeof key>;
export const key = z.object({
  name: z.string().optional(),
  grants: z.array(grant).optional(),
  access_key: z.string().optional(),
  created_at: z.string().optional(),
});

export type key_create_response = z.infer<typeof key_create_response>;
export const key_create_response = z.intersection(
  z.object({
    secret_key: z.string().optional(),
  }),
  key,
);

export type tags_metadata = z.infer<typeof tags_metadata>;
export const tags_metadata = z.object({
  count: z.number().optional(),
  last_tagged_uri: z.string().optional(),
});

export type tags = z.infer<typeof tags>;
export const tags = z.object({
  name: z.string().optional(),
  resources: z
    .intersection(
      tags_metadata,
      z.object({
        droplets: tags_metadata.optional(),
        imgages: tags_metadata.optional(),
        volumes: tags_metadata.optional(),
        volume_snapshots: tags_metadata.optional(),
        databases: tags_metadata.optional(),
      }),
    )
    .optional(),
});

export type error_with_root_causes = z.infer<typeof error_with_root_causes>;
export const error_with_root_causes = z.object({
  error: z.string(),
  messages: z.union([z.array(z.string()), z.null(), z.undefined()]).optional(),
  root_causes: z.array(z.string()),
});

export type tags_resource = z.infer<typeof tags_resource>;
export const tags_resource = z.object({
  resources: z.array(
    z.object({
      resource_id: z.string().optional(),
      resource_type: z
        .union([z.literal("droplet"), z.literal("image"), z.literal("volume"), z.literal("volume_snapshot")])
        .optional(),
    }),
  ),
});

export type volume_base = z.infer<typeof volume_base>;
export const volume_base = z.object({
  id: z.string().optional(),
  droplet_ids: z.union([z.array(z.number()), z.null()]).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  size_gigabytes: z.number().optional(),
  created_at: z.string().optional(),
  tags: tags_array.optional(),
});

export type volume_full = z.infer<typeof volume_full>;
export const volume_full = z.intersection(
  volume_base,
  z.object({
    region: z.intersection(z.unknown(), region).optional(),
    filesystem_type: z.string().optional(),
    filesystem_label: z.string().optional(),
  }),
);

export type volume_snapshot_id = z.infer<typeof volume_snapshot_id>;
export const volume_snapshot_id = z.object({
  snapshot_id: z.string().optional(),
});

export type volume_write_file_system_type = z.infer<typeof volume_write_file_system_type>;
export const volume_write_file_system_type = z.object({
  filesystem_type: z.string().optional(),
});

export type volume_write_file_system_label = z.infer<typeof volume_write_file_system_label>;
export const volume_write_file_system_label = z.string();

export type volumes_ext4 = z.infer<typeof volumes_ext4>;
export const volumes_ext4 = z.intersection(
  volume_base,
  z.intersection(
    volume_snapshot_id,
    z.intersection(
      volume_write_file_system_type,
      z.object({
        region: region_slug,
        filesystem_label: z
          .union([z.intersection(volume_write_file_system_label, z.unknown()), z.undefined()])
          .optional(),
      }),
    ),
  ),
);

export type volumes_xfs = z.infer<typeof volumes_xfs>;
export const volumes_xfs = z.intersection(
  volume_base,
  z.intersection(
    volume_snapshot_id,
    z.intersection(
      volume_write_file_system_type,
      z.object({
        region: region_slug,
        filesystem_label: z
          .union([z.intersection(volume_write_file_system_label, z.unknown()), z.undefined()])
          .optional(),
      }),
    ),
  ),
);

export type volume_action_post_base = z.infer<typeof volume_action_post_base>;
export const volume_action_post_base = z.object({
  type: z.union([z.literal("attach"), z.literal("detach"), z.literal("resize")]),
  region: z.union([region_slug, z.undefined()]).optional(),
});

export type volume_action_droplet_id = z.infer<typeof volume_action_droplet_id>;
export const volume_action_droplet_id = z.number();

export type volume_action_post_attach = z.infer<typeof volume_action_post_attach>;
export const volume_action_post_attach = z.intersection(
  volume_action_post_base,
  z.object({
    droplet_id: volume_action_droplet_id,
    tags: z.union([tags_array, z.undefined()]).optional(),
  }),
);

export type volume_action_post_detach = z.infer<typeof volume_action_post_detach>;
export const volume_action_post_detach = z.intersection(
  volume_action_post_base,
  z.object({
    droplet_id: volume_action_droplet_id,
  }),
);

export type volumeAction = z.infer<typeof volumeAction>;
export const volumeAction = z.intersection(
  z.object({
    type: z.string().optional(),
    resource_id: z.union([z.number(), z.null()]).optional(),
  }),
  action,
);

export type volume_action_post_resize = z.infer<typeof volume_action_post_resize>;
export const volume_action_post_resize = z.intersection(
  volume_action_post_base,
  z.object({
    size_gigabytes: z.number(),
  }),
);

export type vpc_updatable = z.infer<typeof vpc_updatable>;
export const vpc_updatable = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type vpc_create = z.infer<typeof vpc_create>;
export const vpc_create = z.object({
  region: z.string().optional(),
  ip_range: z.string().optional(),
});

export type vpc_default = z.infer<typeof vpc_default>;
export const vpc_default = z.object({
  default: z.boolean().optional(),
});

export type vpc_base = z.infer<typeof vpc_base>;
export const vpc_base = z.object({
  id: z.string().optional(),
  urn: urn.optional(),
  created_at: z.string().optional(),
});

export type vpc = z.infer<typeof vpc>;
export const vpc = z.intersection(vpc_updatable, z.intersection(vpc_create, z.intersection(vpc_default, vpc_base)));

export type vpc_member = z.infer<typeof vpc_member>;
export const vpc_member = z.object({
  name: z.string().optional(),
  urn: urn.optional(),
  created_at: z.string().optional(),
});

export type vpc_peering_base = z.infer<typeof vpc_peering_base>;
export const vpc_peering_base = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  status: z.union([z.literal("PROVISIONING"), z.literal("ACTIVE"), z.literal("DELETING")]).optional(),
});

export type vpc_peering_create = z.infer<typeof vpc_peering_create>;
export const vpc_peering_create = z.object({
  vpc_ids: z.array(z.string()).optional(),
});

export type vpc_peering_updatable = z.infer<typeof vpc_peering_updatable>;
export const vpc_peering_updatable = z.object({
  name: z.string().optional(),
});

export type vpc_peering = z.infer<typeof vpc_peering>;
export const vpc_peering = z.intersection(vpc_peering_base, z.intersection(vpc_peering_create, vpc_peering_updatable));

export type check_base = z.infer<typeof check_base>;
export const check_base = z.object({
  id: z.string().optional(),
});

export type check_updatable = z.infer<typeof check_updatable>;
export const check_updatable = z.object({
  name: z.string().optional(),
  type: z.union([z.literal("ping"), z.literal("http"), z.literal("https")]).optional(),
  target: z.string().optional(),
  regions: z
    .array(z.union([z.literal("us_east"), z.literal("us_west"), z.literal("eu_west"), z.literal("se_asia")]))
    .optional(),
  enabled: z.boolean().optional(),
});

export type check = z.infer<typeof check>;
export const check = z.intersection(check_base, check_updatable);

export type region_state = z.infer<typeof region_state>;
export const region_state = z.object({
  status: z.union([z.literal("DOWN"), z.literal("UP"), z.literal("CHECKING")]).optional(),
  status_changed_at: z.string().optional(),
  thirty_day_uptime_percentage: z.number().optional(),
});

export type regional_state = z.infer<typeof regional_state>;
export const regional_state = z.object({
  us_east: region_state.optional(),
  eu_west: region_state.optional(),
});

export type previous_outage = z.infer<typeof previous_outage>;
export const previous_outage = z.object({
  region: z.string().optional(),
  started_at: z.string().optional(),
  ended_at: z.string().optional(),
  duration_seconds: z.number().optional(),
});

export type state = z.infer<typeof state>;
export const state = z.object({
  regions: regional_state.optional(),
  previous_outage: previous_outage.optional(),
});

export type alert_base = z.infer<typeof alert_base>;
export const alert_base = z.object({
  id: z.string().optional(),
});

export type notification = z.infer<typeof notification>;
export const notification = z.object({
  email: z.array(z.string()),
  slack: z.array(
    z.object({
      channel: z.string(),
      url: z.string(),
    }),
  ),
});

export type alert_updatable = z.infer<typeof alert_updatable>;
export const alert_updatable = z.object({
  name: z.string().optional(),
  type: z
    .union([z.literal("latency"), z.literal("down"), z.literal("down_global"), z.literal("ssl_expiry")])
    .optional(),
  threshold: z.number().optional(),
  comparison: z.union([z.literal("greater_than"), z.literal("less_than")]).optional(),
  notifications: notification.optional(),
  period: z
    .union([
      z.literal("2m"),
      z.literal("3m"),
      z.literal("5m"),
      z.literal("10m"),
      z.literal("15m"),
      z.literal("30m"),
      z.literal("1h"),
    ])
    .optional(),
});

export type alert = z.infer<typeof alert>;
export const alert = z.intersection(alert_base, alert_updatable);

export type apiChatbot = z.infer<typeof apiChatbot>;
export const apiChatbot = z.object({
  button_background_color: z.string().optional(),
  logo: z.string().optional(),
  name: z.string().optional(),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
  starting_message: z.string().optional(),
});

export type apiAgentChatbotIdentifier = z.infer<typeof apiAgentChatbotIdentifier>;
export const apiAgentChatbotIdentifier = z.object({
  agent_chatbot_identifier: z.string().optional(),
});

export type apiDeploymentStatus = z.infer<typeof apiDeploymentStatus>;
export const apiDeploymentStatus = z.union([
  z.literal("STATUS_UNKNOWN"),
  z.literal("STATUS_WAITING_FOR_DEPLOYMENT"),
  z.literal("STATUS_DEPLOYING"),
  z.literal("STATUS_RUNNING"),
  z.literal("STATUS_FAILED"),
  z.literal("STATUS_WAITING_FOR_UNDEPLOYMENT"),
  z.literal("STATUS_UNDEPLOYING"),
  z.literal("STATUS_UNDEPLOYMENT_FAILED"),
  z.literal("STATUS_DELETED"),
]);

export type apiDeploymentVisibility = z.infer<typeof apiDeploymentVisibility>;
export const apiDeploymentVisibility = z.union([
  z.literal("VISIBILITY_UNKNOWN"),
  z.literal("VISIBILITY_DISABLED"),
  z.literal("VISIBILITY_PLAYGROUND"),
  z.literal("VISIBILITY_PUBLIC"),
  z.literal("VISIBILITY_PRIVATE"),
]);

export type apiDeployment = z.infer<typeof apiDeployment>;
export const apiDeployment = z.object({
  created_at: z.string().optional(),
  name: z.string().optional(),
  status: apiDeploymentStatus.optional(),
  updated_at: z.string().optional(),
  url: z.string().optional(),
  uuid: z.string().optional(),
  visibility: apiDeploymentVisibility.optional(),
});

export type apiAgreement = z.infer<typeof apiAgreement>;
export const apiAgreement = z.object({
  description: z.string().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiModelProvider = z.infer<typeof apiModelProvider>;
export const apiModelProvider = z.union([
  z.literal("MODEL_PROVIDER_DIGITALOCEAN"),
  z.literal("MODEL_PROVIDER_ANTHROPIC"),
  z.literal("MODEL_PROVIDER_OPENAI"),
]);

export type apiModelUsecase = z.infer<typeof apiModelUsecase>;
export const apiModelUsecase = z.union([
  z.literal("MODEL_USECASE_UNKNOWN"),
  z.literal("MODEL_USECASE_AGENT"),
  z.literal("MODEL_USECASE_FINETUNED"),
  z.literal("MODEL_USECASE_KNOWLEDGEBASE"),
  z.literal("MODEL_USECASE_GUARDRAIL"),
  z.literal("MODEL_USECASE_REASONING"),
]);

export type apiModelVersion = z.infer<typeof apiModelVersion>;
export const apiModelVersion = z.object({
  major: z.number().optional(),
  minor: z.number().optional(),
  patch: z.number().optional(),
});

export type apiModel = z.infer<typeof apiModel>;
export const apiModel = z.object({
  agreement: apiAgreement.optional(),
  created_at: z.string().optional(),
  inference_name: z.string().optional(),
  inference_version: z.string().optional(),
  is_foundational: z.boolean().optional(),
  metadata: z.unknown().optional(),
  name: z.string().optional(),
  parent_uuid: z.string().optional(),
  provider: apiModelProvider.optional(),
  updated_at: z.string().optional(),
  upload_complete: z.boolean().optional(),
  url: z.string().optional(),
  usecases: z.array(apiModelUsecase).optional(),
  uuid: z.string().optional(),
  version: apiModelVersion.optional(),
});

export type apiRetrievalMethod = z.infer<typeof apiRetrievalMethod>;
export const apiRetrievalMethod = z.union([
  z.literal("RETRIEVAL_METHOD_UNKNOWN"),
  z.literal("RETRIEVAL_METHOD_REWRITE"),
  z.literal("RETRIEVAL_METHOD_STEP_BACK"),
  z.literal("RETRIEVAL_METHOD_SUB_QUERIES"),
  z.literal("RETRIEVAL_METHOD_NONE"),
]);

export type apiBatchJobPhase = z.infer<typeof apiBatchJobPhase>;
export const apiBatchJobPhase = z.union([
  z.literal("BATCH_JOB_PHASE_UNKNOWN"),
  z.literal("BATCH_JOB_PHASE_PENDING"),
  z.literal("BATCH_JOB_PHASE_RUNNING"),
  z.literal("BATCH_JOB_PHASE_SUCCEEDED"),
  z.literal("BATCH_JOB_PHASE_FAILED"),
  z.literal("BATCH_JOB_PHASE_ERROR"),
  z.literal("BATCH_JOB_PHASE_CANCELLED"),
]);

export type apiIndexingJob = z.infer<typeof apiIndexingJob>;
export const apiIndexingJob = z.object({
  completed_datasources: z.number().optional(),
  created_at: z.string().optional(),
  data_source_uuids: z.array(z.string()).optional(),
  finished_at: z.string().optional(),
  knowledge_base_uuid: z.string().optional(),
  phase: apiBatchJobPhase.optional(),
  started_at: z.string().optional(),
  tokens: z.number().optional(),
  total_datasources: z.number().optional(),
  updated_at: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiKnowledgeBase = z.infer<typeof apiKnowledgeBase>;
export const apiKnowledgeBase = z.object({
  added_to_agent_at: z.string().optional(),
  created_at: z.string().optional(),
  database_id: z.string().optional(),
  embedding_model_uuid: z.string().optional(),
  is_public: z.boolean().optional(),
  last_indexing_job: apiIndexingJob.optional(),
  name: z.string().optional(),
  project_id: z.string().optional(),
  region: z.string().optional(),
  tags: z.array(z.string()).optional(),
  updated_at: z.string().optional(),
  user_id: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiAgentTemplate = z.infer<typeof apiAgentTemplate>;
export const apiAgentTemplate = z.object({
  created_at: z.string().optional(),
  description: z.string().optional(),
  instruction: z.string().optional(),
  k: z.number().optional(),
  knowledge_bases: z.array(apiKnowledgeBase).optional(),
  max_tokens: z.number().optional(),
  model: apiModel.optional(),
  name: z.string().optional(),
  temperature: z.number().optional(),
  top_p: z.number().optional(),
  updated_at: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiAgentPublic = z.infer<typeof apiAgentPublic>;
export const apiAgentPublic = z.object({
  chatbot: apiChatbot.optional(),
  chatbot_identifiers: z.array(apiAgentChatbotIdentifier).optional(),
  created_at: z.string().optional(),
  deployment: apiDeployment.optional(),
  description: z.string().optional(),
  if_case: z.string().optional(),
  instruction: z.string().optional(),
  k: z.number().optional(),
  max_tokens: z.number().optional(),
  model: apiModel.optional(),
  name: z.string().optional(),
  project_id: z.string().optional(),
  region: z.string().optional(),
  retrieval_method: apiRetrievalMethod.optional(),
  route_created_at: z.string().optional(),
  route_created_by: z.string().optional(),
  route_name: z.string().optional(),
  route_uuid: z.string().optional(),
  tags: z.array(z.string()).optional(),
  temperature: z.number().optional(),
  template: apiAgentTemplate.optional(),
  top_p: z.number().optional(),
  updated_at: z.string().optional(),
  url: z.string().optional(),
  user_id: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiPages = z.infer<typeof apiPages>;
export const apiPages = z.object({
  first: z.string().optional(),
  last: z.string().optional(),
  next: z.string().optional(),
  previous: z.string().optional(),
});

export type apiLinks = z.infer<typeof apiLinks>;
export const apiLinks = z.object({
  pages: apiPages.optional(),
});

export type apiMeta = z.infer<typeof apiMeta>;
export const apiMeta = z.object({
  page: z.number().optional(),
  pages: z.number().optional(),
  total: z.number().optional(),
});

export type apiListAgentsOutputPublic = z.infer<typeof apiListAgentsOutputPublic>;
export const apiListAgentsOutputPublic = z.object({
  agents: z.array(apiAgentPublic).optional(),
  links: apiLinks.optional(),
  meta: apiMeta.optional(),
});

export type apiCreateAgentInputPublic = z.infer<typeof apiCreateAgentInputPublic>;
export const apiCreateAgentInputPublic = z.object({
  anthropic_key_uuid: z.string().optional(),
  description: z.string().optional(),
  instruction: z.string().optional(),
  knowledge_base_uuid: z.array(z.string()).optional(),
  model_uuid: z.string().optional(),
  name: z.string().optional(),
  open_ai_key_uuid: z.string().optional(),
  project_id: z.string().optional(),
  region: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type apiAnthropicAPIKeyInfo = z.infer<typeof apiAnthropicAPIKeyInfo>;
export const apiAnthropicAPIKeyInfo = z.object({
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  deleted_at: z.string().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiAgentAPIKeyInfo = z.infer<typeof apiAgentAPIKeyInfo>;
export const apiAgentAPIKeyInfo = z.object({
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  deleted_at: z.string().optional(),
  name: z.string().optional(),
  secret_key: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiAgentAPIKey = z.infer<typeof apiAgentAPIKey>;
export const apiAgentAPIKey = z.object({
  api_key: z.string().optional(),
});

export type apiAgentFunction = z.infer<typeof apiAgentFunction>;
export const apiAgentFunction = z.object({
  api_key: z.string().optional(),
  created_at: z.string().optional(),
  description: z.string().optional(),
  faas_name: z.string().optional(),
  faas_namespace: z.string().optional(),
  input_schema: z.unknown().optional(),
  name: z.string().optional(),
  output_schema: z.unknown().optional(),
  updated_at: z.string().optional(),
  url: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiGuardrailType = z.infer<typeof apiGuardrailType>;
export const apiGuardrailType = z.union([
  z.literal("GUARDRAIL_TYPE_UNKNOWN"),
  z.literal("GUARDRAIL_TYPE_JAILBREAK"),
  z.literal("GUARDRAIL_TYPE_SENSITIVE_DATA"),
  z.literal("GUARDRAIL_TYPE_CONTENT_MODERATION"),
]);

export type apiAgentGuardrail = z.infer<typeof apiAgentGuardrail>;
export const apiAgentGuardrail = z.object({
  agent_uuid: z.string().optional(),
  created_at: z.string().optional(),
  default_response: z.string().optional(),
  description: z.string().optional(),
  guardrail_uuid: z.string().optional(),
  is_attached: z.boolean().optional(),
  is_default: z.boolean().optional(),
  metadata: z.unknown().optional(),
  name: z.string().optional(),
  priority: z.number().optional(),
  type: apiGuardrailType.optional(),
  updated_at: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiOpenAIAPIKeyInfo = z.infer<typeof apiOpenAIAPIKeyInfo>;
export const apiOpenAIAPIKeyInfo = z.object({
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  deleted_at: z.string().optional(),
  models: z.array(apiModel).optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiAgent = {
  anthropic_api_key?: {
    created_at?: string;
    created_by?: string;
    deleted_at?: string;
    name?: string;
    updated_at?: string;
    uuid?: string;
  };
  api_key_infos?: Array<{
    created_at?: string;
    created_by?: string;
    deleted_at?: string;
    name?: string;
    secret_key?: string;
    uuid?: string;
  }>;
  api_keys?: Array<{
    api_key?: string;
  }>;
  chatbot?: {
    button_background_color?: string;
    logo?: string;
    name?: string;
    primary_color?: string;
    secondary_color?: string;
    starting_message?: string;
  };
  chatbot_identifiers?: Array<{
    agent_chatbot_identifier?: string;
  }>;
  child_agents?: Array<apiAgent>;
  created_at?: string;
  deployment?: {
    created_at?: string;
    name?: string;
    status?:
      | "STATUS_UNKNOWN"
      | "STATUS_WAITING_FOR_DEPLOYMENT"
      | "STATUS_DEPLOYING"
      | "STATUS_RUNNING"
      | "STATUS_FAILED"
      | "STATUS_WAITING_FOR_UNDEPLOYMENT"
      | "STATUS_UNDEPLOYING"
      | "STATUS_UNDEPLOYMENT_FAILED"
      | "STATUS_DELETED";
    updated_at?: string;
    url?: string;
    uuid?: string;
    visibility?:
      | "VISIBILITY_UNKNOWN"
      | "VISIBILITY_DISABLED"
      | "VISIBILITY_PLAYGROUND"
      | "VISIBILITY_PUBLIC"
      | "VISIBILITY_PRIVATE";
  };
  description?: string;
  functions?: Array<{
    api_key?: string;
    created_at?: string;
    description?: string;
    faas_name?: string;
    faas_namespace?: string;
    input_schema?: unknown;
    name?: string;
    output_schema?: unknown;
    updated_at?: string;
    url?: string;
    uuid?: string;
  }>;
  guardrails?: Array<{
    agent_uuid?: string;
    created_at?: string;
    default_response?: string;
    description?: string;
    guardrail_uuid?: string;
    is_attached?: boolean;
    is_default?: boolean;
    metadata?: unknown;
    name?: string;
    priority?: number;
    type?:
      | "GUARDRAIL_TYPE_UNKNOWN"
      | "GUARDRAIL_TYPE_JAILBREAK"
      | "GUARDRAIL_TYPE_SENSITIVE_DATA"
      | "GUARDRAIL_TYPE_CONTENT_MODERATION";
    updated_at?: string;
    uuid?: string;
  }>;
  if_case?: string;
  instruction?: string;
  k?: number;
  knowledge_bases?: Array<{
    added_to_agent_at?: string;
    created_at?: string;
    database_id?: string;
    embedding_model_uuid?: string;
    is_public?: boolean;
    last_indexing_job?: {
      completed_datasources?: number;
      created_at?: string;
      data_source_uuids?: Array<string>;
      finished_at?: string;
      knowledge_base_uuid?: string;
      phase?:
        | "BATCH_JOB_PHASE_UNKNOWN"
        | "BATCH_JOB_PHASE_PENDING"
        | "BATCH_JOB_PHASE_RUNNING"
        | "BATCH_JOB_PHASE_SUCCEEDED"
        | "BATCH_JOB_PHASE_FAILED"
        | "BATCH_JOB_PHASE_ERROR"
        | "BATCH_JOB_PHASE_CANCELLED";
      started_at?: string;
      tokens?: number;
      total_datasources?: number;
      updated_at?: string;
      uuid?: string;
    };
    name?: string;
    project_id?: string;
    region?: string;
    tags?: Array<string>;
    updated_at?: string;
    user_id?: string;
    uuid?: string;
  }>;
  max_tokens?: number;
  model?: {
    agreement?: {
      description?: string;
      name?: string;
      url?: string;
      uuid?: string;
    };
    created_at?: string;
    inference_name?: string;
    inference_version?: string;
    is_foundational?: boolean;
    metadata?: unknown;
    name?: string;
    parent_uuid?: string;
    provider?: "MODEL_PROVIDER_DIGITALOCEAN" | "MODEL_PROVIDER_ANTHROPIC" | "MODEL_PROVIDER_OPENAI";
    updated_at?: string;
    upload_complete?: boolean;
    url?: string;
    usecases?: Array<
      | "MODEL_USECASE_UNKNOWN"
      | "MODEL_USECASE_AGENT"
      | "MODEL_USECASE_FINETUNED"
      | "MODEL_USECASE_KNOWLEDGEBASE"
      | "MODEL_USECASE_GUARDRAIL"
      | "MODEL_USECASE_REASONING"
    >;
    uuid?: string;
    version?: {
      major?: number;
      minor?: number;
      patch?: number;
    };
  };
  name?: string;
  openai_api_key?: {
    created_at?: string;
    created_by?: string;
    deleted_at?: string;
    models?: Array<apiModel>;
    name?: string;
    updated_at?: string;
    uuid?: string;
  };
  parent_agents?: Array<apiAgent>;
  project_id?: string;
  region?: string;
  retrieval_method?:
    | "RETRIEVAL_METHOD_UNKNOWN"
    | "RETRIEVAL_METHOD_REWRITE"
    | "RETRIEVAL_METHOD_STEP_BACK"
    | "RETRIEVAL_METHOD_SUB_QUERIES"
    | "RETRIEVAL_METHOD_NONE";
  route_created_at?: string;
  route_created_by?: string;
  route_name?: string;
  route_uuid?: string;
  tags?: Array<string>;
  temperature?: number;
  template?: {
    created_at?: string;
    description?: string;
    instruction?: string;
    k?: number;
    knowledge_bases?: Array<apiKnowledgeBase>;
    max_tokens?: number;
    model?: apiModel;
    name?: string;
    temperature?: number;
    top_p?: number;
    updated_at?: string;
    uuid?: string;
  };
  top_p?: number;
  updated_at?: string;
  url?: string;
  user_id?: string;
  uuid?: string;
};
export const apiAgent: z.ZodType<apiAgent> = z.lazy(() =>
  z.object({
    anthropic_api_key: apiAnthropicAPIKeyInfo.optional(),
    api_key_infos: z.array(apiAgentAPIKeyInfo).optional(),
    api_keys: z.array(apiAgentAPIKey).optional(),
    chatbot: apiChatbot.optional(),
    chatbot_identifiers: z.array(apiAgentChatbotIdentifier).optional(),
    child_agents: z.array(apiAgent).optional(),
    created_at: z.string().optional(),
    deployment: apiDeployment.optional(),
    description: z.string().optional(),
    functions: z.array(apiAgentFunction).optional(),
    guardrails: z.array(apiAgentGuardrail).optional(),
    if_case: z.string().optional(),
    instruction: z.string().optional(),
    k: z.number().optional(),
    knowledge_bases: z.array(apiKnowledgeBase).optional(),
    max_tokens: z.number().optional(),
    model: apiModel.optional(),
    name: z.string().optional(),
    openai_api_key: apiOpenAIAPIKeyInfo.optional(),
    parent_agents: z.array(apiAgent).optional(),
    project_id: z.string().optional(),
    region: z.string().optional(),
    retrieval_method: apiRetrievalMethod.optional(),
    route_created_at: z.string().optional(),
    route_created_by: z.string().optional(),
    route_name: z.string().optional(),
    route_uuid: z.string().optional(),
    tags: z.array(z.string()).optional(),
    temperature: z.number().optional(),
    template: apiAgentTemplate.optional(),
    top_p: z.number().optional(),
    updated_at: z.string().optional(),
    url: z.string().optional(),
    user_id: z.string().optional(),
    uuid: z.string().optional(),
  }),
);
export type apiCreateAgentOutput = z.infer<typeof apiCreateAgentOutput>;
export const apiCreateAgentOutput = z.object({
  agent: apiAgent.optional(),
});

export type apiListAgentAPIKeysOutput = z.infer<typeof apiListAgentAPIKeysOutput>;
export const apiListAgentAPIKeysOutput = z.object({
  api_key_infos: z.array(apiAgentAPIKeyInfo).optional(),
  links: apiLinks.optional(),
  meta: apiMeta.optional(),
});

export type apiCreateAgentAPIKeyInputPublic = z.infer<typeof apiCreateAgentAPIKeyInputPublic>;
export const apiCreateAgentAPIKeyInputPublic = z.object({
  agent_uuid: z.string().optional(),
  name: z.string().optional(),
});

export type apiCreateAgentAPIKeyOutput = z.infer<typeof apiCreateAgentAPIKeyOutput>;
export const apiCreateAgentAPIKeyOutput = z.object({
  api_key_info: apiAgentAPIKeyInfo.optional(),
});

export type apiUpdateAgentAPIKeyInputPublic = z.infer<typeof apiUpdateAgentAPIKeyInputPublic>;
export const apiUpdateAgentAPIKeyInputPublic = z.object({
  agent_uuid: z.string().optional(),
  api_key_uuid: z.string().optional(),
  name: z.string().optional(),
});

export type apiUpdateAgentAPIKeyOutput = z.infer<typeof apiUpdateAgentAPIKeyOutput>;
export const apiUpdateAgentAPIKeyOutput = z.object({
  api_key_info: apiAgentAPIKeyInfo.optional(),
});

export type apiDeleteAgentAPIKeyOutput = z.infer<typeof apiDeleteAgentAPIKeyOutput>;
export const apiDeleteAgentAPIKeyOutput = z.object({
  api_key_info: apiAgentAPIKeyInfo.optional(),
});

export type apiRegenerateAgentAPIKeyOutput = z.infer<typeof apiRegenerateAgentAPIKeyOutput>;
export const apiRegenerateAgentAPIKeyOutput = z.object({
  api_key_info: apiAgentAPIKeyInfo.optional(),
});

export type apiLinkAgentFunctionInputPublic = z.infer<typeof apiLinkAgentFunctionInputPublic>;
export const apiLinkAgentFunctionInputPublic = z.object({
  agent_uuid: z.string().optional(),
  description: z.string().optional(),
  faas_name: z.string().optional(),
  faas_namespace: z.string().optional(),
  function_name: z.string().optional(),
  input_schema: z.unknown().optional(),
  output_schema: z.unknown().optional(),
});

export type apiLinkAgentFunctionOutput = z.infer<typeof apiLinkAgentFunctionOutput>;
export const apiLinkAgentFunctionOutput = z.object({
  agent: apiAgent.optional(),
});

export type apiUpdateAgentFunctionInputPublic = z.infer<typeof apiUpdateAgentFunctionInputPublic>;
export const apiUpdateAgentFunctionInputPublic = z.object({
  agent_uuid: z.string().optional(),
  description: z.string().optional(),
  faas_name: z.string().optional(),
  faas_namespace: z.string().optional(),
  function_name: z.string().optional(),
  function_uuid: z.string().optional(),
  input_schema: z.unknown().optional(),
  output_schema: z.unknown().optional(),
});

export type apiUpdateAgentFunctionOutput = z.infer<typeof apiUpdateAgentFunctionOutput>;
export const apiUpdateAgentFunctionOutput = z.object({
  agent: apiAgent.optional(),
});

export type apiUnlinkAgentFunctionOutput = z.infer<typeof apiUnlinkAgentFunctionOutput>;
export const apiUnlinkAgentFunctionOutput = z.object({
  agent: apiAgent.optional(),
});

export type apiLinkKnowledgeBaseOutput = z.infer<typeof apiLinkKnowledgeBaseOutput>;
export const apiLinkKnowledgeBaseOutput = z.object({
  agent: apiAgent.optional(),
});

export type apiUnlinkKnowledgeBaseOutput = z.infer<typeof apiUnlinkKnowledgeBaseOutput>;
export const apiUnlinkKnowledgeBaseOutput = z.object({
  agent: apiAgent.optional(),
});

export type apiUpdateLinkedAgentInputPublic = z.infer<typeof apiUpdateLinkedAgentInputPublic>;
export const apiUpdateLinkedAgentInputPublic = z.object({
  child_agent_uuid: z.string().optional(),
  if_case: z.string().optional(),
  parent_agent_uuid: z.string().optional(),
  route_name: z.string().optional(),
  uuid: z.string().optional(),
});

export type apiUpdateLinkedAgentOutput = z.infer<typeof apiUpdateLinkedAgentOutput>;
export const apiUpdateLinkedAgentOutput = z.object({
  child_agent_uuid: z.string().optional(),
  parent_agent_uuid: z.string().optional(),
  rollback: z.boolean().optional(),
  uuid: z.string().optional(),
});

export type apiLinkAgentInputPublic = z.infer<typeof apiLinkAgentInputPublic>;
export const apiLinkAgentInputPublic = z.object({
  child_agent_uuid: z.string().optional(),
  if_case: z.string().optional(),
  parent_agent_uuid: z.string().optional(),
  route_name: z.string().optional(),
});

export type apiLinkAgentOutput = z.infer<typeof apiLinkAgentOutput>;
export const apiLinkAgentOutput = z.object({
  child_agent_uuid: z.string().optional(),
  parent_agent_uuid: z.string().optional(),
});

export type apiUnlinkAgentOutput = z.infer<typeof apiUnlinkAgentOutput>;
export const apiUnlinkAgentOutput = z.object({
  child_agent_uuid: z.string().optional(),
  parent_agent_uuid: z.string().optional(),
});

export type apiGetAgentOutput = z.infer<typeof apiGetAgentOutput>;
export const apiGetAgentOutput = z.object({
  agent: apiAgent.optional(),
});

export type apiUpdateAgentInputPublic = z.infer<typeof apiUpdateAgentInputPublic>;
export const apiUpdateAgentInputPublic = z.object({
  anthropic_key_uuid: z.string().optional(),
  description: z.string().optional(),
  instruction: z.string().optional(),
  k: z.number().optional(),
  max_tokens: z.number().optional(),
  model_uuid: z.string().optional(),
  name: z.string().optional(),
  open_ai_key_uuid: z.string().optional(),
  project_id: z.string().optional(),
  retrieval_method: apiRetrievalMethod.optional(),
  tags: z.array(z.string()).optional(),
  temperature: z.number().optional(),
  top_p: z.number().optional(),
  uuid: z.string().optional(),
});

export type apiUpdateAgentOutput = z.infer<typeof apiUpdateAgentOutput>;
export const apiUpdateAgentOutput = z.object({
  agent: apiAgent.optional(),
});

export type apiDeleteAgentOutput = z.infer<typeof apiDeleteAgentOutput>;
export const apiDeleteAgentOutput = z.object({
  agent: apiAgent.optional(),
});

export type apiGetChildrenOutput = z.infer<typeof apiGetChildrenOutput>;
export const apiGetChildrenOutput = z.object({
  children: z.array(apiAgent).optional(),
});

export type apiUpdateAgentDeploymentVisibilityInputPublic = z.infer<
  typeof apiUpdateAgentDeploymentVisibilityInputPublic
>;
export const apiUpdateAgentDeploymentVisibilityInputPublic = z.object({
  uuid: z.string().optional(),
  visibility: apiDeploymentVisibility.optional(),
});

export type apiUpdateAgentDeploymentVisbilityOutput = z.infer<typeof apiUpdateAgentDeploymentVisbilityOutput>;
export const apiUpdateAgentDeploymentVisbilityOutput = z.object({
  agent: apiAgent.optional(),
});

export type apiListAnthropicAPIKeysOutput = z.infer<typeof apiListAnthropicAPIKeysOutput>;
export const apiListAnthropicAPIKeysOutput = z.object({
  api_key_infos: z.array(apiAnthropicAPIKeyInfo).optional(),
  links: apiLinks.optional(),
  meta: apiMeta.optional(),
});

export type apiCreateAnthropicAPIKeyInputPublic = z.infer<typeof apiCreateAnthropicAPIKeyInputPublic>;
export const apiCreateAnthropicAPIKeyInputPublic = z.object({
  api_key: z.string().optional(),
  name: z.string().optional(),
});

export type apiCreateAnthropicAPIKeyOutput = z.infer<typeof apiCreateAnthropicAPIKeyOutput>;
export const apiCreateAnthropicAPIKeyOutput = z.object({
  api_key_info: apiAnthropicAPIKeyInfo.optional(),
});

export type apiGetAnthropicAPIKeyOutput = z.infer<typeof apiGetAnthropicAPIKeyOutput>;
export const apiGetAnthropicAPIKeyOutput = z.object({
  api_key_info: apiAnthropicAPIKeyInfo.optional(),
});

export type apiUpdateAnthropicAPIKeyInputPublic = z.infer<typeof apiUpdateAnthropicAPIKeyInputPublic>;
export const apiUpdateAnthropicAPIKeyInputPublic = z.object({
  api_key: z.string().optional(),
  api_key_uuid: z.string().optional(),
  name: z.string().optional(),
});

export type apiUpdateAnthropicAPIKeyOutput = z.infer<typeof apiUpdateAnthropicAPIKeyOutput>;
export const apiUpdateAnthropicAPIKeyOutput = z.object({
  api_key_info: apiAnthropicAPIKeyInfo.optional(),
});

export type apiDeleteAnthropicAPIKeyOutput = z.infer<typeof apiDeleteAnthropicAPIKeyOutput>;
export const apiDeleteAnthropicAPIKeyOutput = z.object({
  api_key_info: apiAnthropicAPIKeyInfo.optional(),
});

export type apiListAgentsByAnthropicKeyOutput = z.infer<typeof apiListAgentsByAnthropicKeyOutput>;
export const apiListAgentsByAnthropicKeyOutput = z.object({
  agents: z.array(apiAgent).optional(),
  links: apiLinks.optional(),
  meta: apiMeta.optional(),
});

export type apiListKnowledgeBaseIndexingJobsOutput = z.infer<typeof apiListKnowledgeBaseIndexingJobsOutput>;
export const apiListKnowledgeBaseIndexingJobsOutput = z.object({
  jobs: z.array(apiIndexingJob).optional(),
  links: apiLinks.optional(),
  meta: apiMeta.optional(),
});

export type apiStartKnowledgeBaseIndexingJobInputPublic = z.infer<typeof apiStartKnowledgeBaseIndexingJobInputPublic>;
export const apiStartKnowledgeBaseIndexingJobInputPublic = z.object({
  data_source_uuids: z.array(z.string()).optional(),
  knowledge_base_uuid: z.string().optional(),
});

export type apiStartKnowledgeBaseIndexingJobOutput = z.infer<typeof apiStartKnowledgeBaseIndexingJobOutput>;
export const apiStartKnowledgeBaseIndexingJobOutput = z.object({
  job: apiIndexingJob.optional(),
});

export type apiIndexedDataSourceStatus = z.infer<typeof apiIndexedDataSourceStatus>;
export const apiIndexedDataSourceStatus = z.union([
  z.literal("DATA_SOURCE_STATUS_UNKNOWN"),
  z.literal("DATA_SOURCE_STATUS_IN_PROGRESS"),
  z.literal("DATA_SOURCE_STATUS_UPDATED"),
  z.literal("DATA_SOURCE_STATUS_PARTIALLY_UPDATED"),
  z.literal("DATA_SOURCE_STATUS_NOT_UPDATED"),
  z.literal("DATA_SOURCE_STATUS_FAILED"),
]);

export type apiIndexedDataSource = z.infer<typeof apiIndexedDataSource>;
export const apiIndexedDataSource = z.object({
  completed_at: z.string().optional(),
  data_source_uuid: z.string().optional(),
  failed_item_count: z.string().optional(),
  indexed_file_count: z.string().optional(),
  indexed_item_count: z.string().optional(),
  removed_item_count: z.string().optional(),
  skipped_item_count: z.string().optional(),
  started_at: z.string().optional(),
  status: apiIndexedDataSourceStatus.optional(),
  total_bytes: z.string().optional(),
  total_bytes_indexed: z.string().optional(),
  total_file_count: z.string().optional(),
});

export type apiListIndexingJobDataSourcesOutput = z.infer<typeof apiListIndexingJobDataSourcesOutput>;
export const apiListIndexingJobDataSourcesOutput = z.object({
  indexed_data_sources: z.array(apiIndexedDataSource).optional(),
});

export type apiGetKnowledgeBaseIndexingJobOutput = z.infer<typeof apiGetKnowledgeBaseIndexingJobOutput>;
export const apiGetKnowledgeBaseIndexingJobOutput = z.object({
  job: apiIndexingJob.optional(),
});

export type apiCancelKnowledgeBaseIndexingJobInputPublic = z.infer<typeof apiCancelKnowledgeBaseIndexingJobInputPublic>;
export const apiCancelKnowledgeBaseIndexingJobInputPublic = z.object({
  uuid: z.string().optional(),
});

export type apiCancelKnowledgeBaseIndexingJobOutput = z.infer<typeof apiCancelKnowledgeBaseIndexingJobOutput>;
export const apiCancelKnowledgeBaseIndexingJobOutput = z.object({
  job: apiIndexingJob.optional(),
});

export type apiListKnowledgeBasesOutput = z.infer<typeof apiListKnowledgeBasesOutput>;
export const apiListKnowledgeBasesOutput = z.object({
  knowledge_bases: z.array(apiKnowledgeBase).optional(),
  links: apiLinks.optional(),
  meta: apiMeta.optional(),
});

export type apiFileUploadDataSource = z.infer<typeof apiFileUploadDataSource>;
export const apiFileUploadDataSource = z.object({
  original_file_name: z.string().optional(),
  size_in_bytes: z.string().optional(),
  stored_object_key: z.string().optional(),
});

export type apiSpacesDataSource = z.infer<typeof apiSpacesDataSource>;
export const apiSpacesDataSource = z.object({
  bucket_name: z.string().optional(),
  item_path: z.string().optional(),
  region: z.string().optional(),
});

export type apiCrawlingOption = z.infer<typeof apiCrawlingOption>;
export const apiCrawlingOption = z.union([
  z.literal("UNKNOWN"),
  z.literal("SCOPED"),
  z.literal("PATH"),
  z.literal("DOMAIN"),
  z.literal("SUBDOMAINS"),
]);

export type apiWebCrawlerDataSource = z.infer<typeof apiWebCrawlerDataSource>;
export const apiWebCrawlerDataSource = z.object({
  base_url: z.string().optional(),
  crawling_option: apiCrawlingOption.optional(),
  embed_media: z.boolean().optional(),
});

export type apiKBDataSource = z.infer<typeof apiKBDataSource>;
export const apiKBDataSource = z.object({
  bucket_name: z.string().optional(),
  bucket_region: z.string().optional(),
  file_upload_data_source: apiFileUploadDataSource.optional(),
  item_path: z.string().optional(),
  spaces_data_source: apiSpacesDataSource.optional(),
  web_crawler_data_source: apiWebCrawlerDataSource.optional(),
});

export type apiCreateKnowledgeBaseInputPublic = z.infer<typeof apiCreateKnowledgeBaseInputPublic>;
export const apiCreateKnowledgeBaseInputPublic = z.object({
  database_id: z.string().optional(),
  datasources: z.array(apiKBDataSource).optional(),
  embedding_model_uuid: z.string().optional(),
  name: z.string().optional(),
  project_id: z.string().optional(),
  region: z.string().optional(),
  tags: z.array(z.string()).optional(),
  vpc_uuid: z.string().optional(),
});

export type apiCreateKnowledgeBaseOutput = z.infer<typeof apiCreateKnowledgeBaseOutput>;
export const apiCreateKnowledgeBaseOutput = z.object({
  knowledge_base: apiKnowledgeBase.optional(),
});

export type apiKnowledgeBaseDataSource = z.infer<typeof apiKnowledgeBaseDataSource>;
export const apiKnowledgeBaseDataSource = z.object({
  bucket_name: z.string().optional(),
  created_at: z.string().optional(),
  file_upload_data_source: apiFileUploadDataSource.optional(),
  item_path: z.string().optional(),
  last_indexing_job: apiIndexingJob.optional(),
  region: z.string().optional(),
  spaces_data_source: apiSpacesDataSource.optional(),
  updated_at: z.string().optional(),
  uuid: z.string().optional(),
  web_crawler_data_source: apiWebCrawlerDataSource.optional(),
});

export type apiListKnowledgeBaseDataSourcesOutput = z.infer<typeof apiListKnowledgeBaseDataSourcesOutput>;
export const apiListKnowledgeBaseDataSourcesOutput = z.object({
  knowledge_base_data_sources: z.array(apiKnowledgeBaseDataSource).optional(),
  links: apiLinks.optional(),
  meta: apiMeta.optional(),
});

export type apiCreateKnowledgeBaseDataSourceInputPublic = z.infer<typeof apiCreateKnowledgeBaseDataSourceInputPublic>;
export const apiCreateKnowledgeBaseDataSourceInputPublic = z.object({
  knowledge_base_uuid: z.string().optional(),
  spaces_data_source: apiSpacesDataSource.optional(),
  web_crawler_data_source: apiWebCrawlerDataSource.optional(),
});

export type apiCreateKnowledgeBaseDataSourceOutput = z.infer<typeof apiCreateKnowledgeBaseDataSourceOutput>;
export const apiCreateKnowledgeBaseDataSourceOutput = z.object({
  knowledge_base_data_source: apiKnowledgeBaseDataSource.optional(),
});

export type apiDeleteKnowledgeBaseDataSourceOutput = z.infer<typeof apiDeleteKnowledgeBaseDataSourceOutput>;
export const apiDeleteKnowledgeBaseDataSourceOutput = z.object({
  data_source_uuid: z.string().optional(),
  knowledge_base_uuid: z.string().optional(),
});

export type dbaasClusterStatus = z.infer<typeof dbaasClusterStatus>;
export const dbaasClusterStatus = z.union([
  z.literal("CREATING"),
  z.literal("ONLINE"),
  z.literal("POWEROFF"),
  z.literal("REBUILDING"),
  z.literal("REBALANCING"),
  z.literal("DECOMMISSIONED"),
  z.literal("FORKING"),
  z.literal("MIGRATING"),
  z.literal("RESIZING"),
  z.literal("RESTORING"),
  z.literal("POWERING_ON"),
  z.literal("UNHEALTHY"),
]);

export type apiGetKnowledgeBaseOutput = z.infer<typeof apiGetKnowledgeBaseOutput>;
export const apiGetKnowledgeBaseOutput = z.object({
  database_status: dbaasClusterStatus.optional(),
  knowledge_base: apiKnowledgeBase.optional(),
});

export type apiUpdateKnowledgeBaseInputPublic = z.infer<typeof apiUpdateKnowledgeBaseInputPublic>;
export const apiUpdateKnowledgeBaseInputPublic = z.object({
  database_id: z.string().optional(),
  embedding_model_uuid: z.string().optional(),
  name: z.string().optional(),
  project_id: z.string().optional(),
  tags: z.array(z.string()).optional(),
  uuid: z.string().optional(),
});

export type apiUpdateKnowledgeBaseOutput = z.infer<typeof apiUpdateKnowledgeBaseOutput>;
export const apiUpdateKnowledgeBaseOutput = z.object({
  knowledge_base: apiKnowledgeBase.optional(),
});

export type apiDeleteKnowledgeBaseOutput = z.infer<typeof apiDeleteKnowledgeBaseOutput>;
export const apiDeleteKnowledgeBaseOutput = z.object({
  uuid: z.string().optional(),
});

export type apiModelPublic = z.infer<typeof apiModelPublic>;
export const apiModelPublic = z.object({
  agreement: apiAgreement.optional(),
  created_at: z.string().optional(),
  is_foundational: z.boolean().optional(),
  name: z.string().optional(),
  parent_uuid: z.string().optional(),
  updated_at: z.string().optional(),
  upload_complete: z.boolean().optional(),
  url: z.string().optional(),
  uuid: z.string().optional(),
  version: apiModelVersion.optional(),
});

export type apiListModelsOutputPublic = z.infer<typeof apiListModelsOutputPublic>;
export const apiListModelsOutputPublic = z.object({
  links: apiLinks.optional(),
  meta: apiMeta.optional(),
  models: z.array(apiModelPublic).optional(),
});

export type apiListOpenAIAPIKeysOutput = z.infer<typeof apiListOpenAIAPIKeysOutput>;
export const apiListOpenAIAPIKeysOutput = z.object({
  api_key_infos: z.array(apiOpenAIAPIKeyInfo).optional(),
  links: apiLinks.optional(),
  meta: apiMeta.optional(),
});

export type apiCreateOpenAIAPIKeyInputPublic = z.infer<typeof apiCreateOpenAIAPIKeyInputPublic>;
export const apiCreateOpenAIAPIKeyInputPublic = z.object({
  api_key: z.string().optional(),
  name: z.string().optional(),
});

export type apiCreateOpenAIAPIKeyOutput = z.infer<typeof apiCreateOpenAIAPIKeyOutput>;
export const apiCreateOpenAIAPIKeyOutput = z.object({
  api_key_info: apiOpenAIAPIKeyInfo.optional(),
});

export type apiGetOpenAIAPIKeyOutput = z.infer<typeof apiGetOpenAIAPIKeyOutput>;
export const apiGetOpenAIAPIKeyOutput = z.object({
  api_key_info: apiOpenAIAPIKeyInfo.optional(),
});

export type apiUpdateOpenAIAPIKeyInputPublic = z.infer<typeof apiUpdateOpenAIAPIKeyInputPublic>;
export const apiUpdateOpenAIAPIKeyInputPublic = z.object({
  api_key: z.string().optional(),
  api_key_uuid: z.string().optional(),
  name: z.string().optional(),
});

export type apiUpdateOpenAIAPIKeyOutput = z.infer<typeof apiUpdateOpenAIAPIKeyOutput>;
export const apiUpdateOpenAIAPIKeyOutput = z.object({
  api_key_info: apiOpenAIAPIKeyInfo.optional(),
});

export type apiDeleteOpenAIAPIKeyOutput = z.infer<typeof apiDeleteOpenAIAPIKeyOutput>;
export const apiDeleteOpenAIAPIKeyOutput = z.object({
  api_key_info: apiOpenAIAPIKeyInfo.optional(),
});

export type apiListAgentsByOpenAIKeyOutput = z.infer<typeof apiListAgentsByOpenAIKeyOutput>;
export const apiListAgentsByOpenAIKeyOutput = z.object({
  agents: z.array(apiAgent).optional(),
  links: apiLinks.optional(),
  meta: apiMeta.optional(),
});

export type genaiapiRegion = z.infer<typeof genaiapiRegion>;
export const genaiapiRegion = z.object({
  inference_url: z.string().optional(),
  region: z.string().optional(),
  serves_batch: z.boolean().optional(),
  serves_inference: z.boolean().optional(),
  stream_inference_url: z.string().optional(),
});

export type apiListRegionsOutput = z.infer<typeof apiListRegionsOutput>;
export const apiListRegionsOutput = z.object({
  regions: z.array(genaiapiRegion).optional(),
});

export type get_OneClicks_list = typeof get_OneClicks_list;
export const get_OneClicks_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/1-clicks"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      type: z.union([z.literal("droplet"), z.literal("kubernetes")]).optional(),
    }),
  }),
  response: z.object({}),
};

export type post_OneClicks_install_kubernetes = typeof post_OneClicks_install_kubernetes;
export const post_OneClicks_install_kubernetes = {
  method: z.literal("POST"),
  path: z.literal("/v2/1-clicks/kubernetes"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: oneClicks_create,
  }),
  response: z.object({
    message: z.string().optional(),
  }),
};

export type get_Account_get = typeof get_Account_get;
export const get_Account_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/account"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.object({
    account: account.optional(),
  }),
};

export type get_SshKeys_list = typeof get_SshKeys_list;
export const get_SshKeys_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/account/keys"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      ssh_keys: z.array(sshKeys).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_SshKeys_create = typeof post_SshKeys_create;
export const post_SshKeys_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/account/keys"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: sshKeys,
  }),
  response: z.object({
    ssh_key: sshKeys.optional(),
  }),
};

export type get_SshKeys_get = typeof get_SshKeys_get;
export const get_SshKeys_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/account/keys/{ssh_key_identifier}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      ssh_key_identifier: z.union([
        ssh_key_id,
        ssh_key_fingerprint,
        z.array(z.union([ssh_key_id, ssh_key_fingerprint])),
      ]),
    }),
  }),
  response: z.object({
    ssh_key: sshKeys.optional(),
  }),
};

export type put_SshKeys_update = typeof put_SshKeys_update;
export const put_SshKeys_update = {
  method: z.literal("PUT"),
  path: z.literal("/v2/account/keys/{ssh_key_identifier}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      ssh_key_identifier: z.union([
        ssh_key_id,
        ssh_key_fingerprint,
        z.array(z.union([ssh_key_id, ssh_key_fingerprint])),
      ]),
    }),
    body: z.object({
      name: ssh_key_name.optional(),
    }),
  }),
  response: z.object({
    ssh_key: sshKeys.optional(),
  }),
};

export type delete_SshKeys_delete = typeof delete_SshKeys_delete;
export const delete_SshKeys_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/account/keys/{ssh_key_identifier}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      ssh_key_identifier: z.union([
        ssh_key_id,
        ssh_key_fingerprint,
        z.array(z.union([ssh_key_id, ssh_key_fingerprint])),
      ]),
    }),
  }),
  response: z.unknown(),
};

export type get_Actions_list = typeof get_Actions_list;
export const get_Actions_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      actions: z.array(action).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Actions_get = typeof get_Actions_get;
export const get_Actions_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/actions/{action_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      action_id: z.number(),
    }),
  }),
  response: z.object({
    action: action.optional(),
  }),
};

export type get_Apps_list = typeof get_Apps_list;
export const get_Apps_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
      with_projects: z.boolean().optional(),
      filter: z.string().optional(),
    }),
  }),
  response: apps_response,
};

export type post_Apps_create = typeof post_Apps_create;
export const post_Apps_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    header: z.object({
      Accept: z.union([z.literal("application/json"), z.literal("application/yaml")]).optional(),
      "Content-Type": z.union([z.literal("application/json"), z.literal("application/yaml")]).optional(),
    }),
    body: apps_create_app_request,
  }),
  response: app_response,
};

export type delete_Apps_delete = typeof delete_Apps_delete;
export const delete_Apps_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/apps/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: apps_delete_app_response,
};

export type get_Apps_get = typeof get_Apps_get;
export const get_Apps_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      name: z.string().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: app_response,
};

export type put_Apps_update = typeof put_Apps_update;
export const put_Apps_update = {
  method: z.literal("PUT"),
  path: z.literal("/v2/apps/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
    body: apps_update_app_request,
  }),
  response: app_response,
};

export type post_Apps_restart = typeof post_Apps_restart;
export const post_Apps_restart = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps/{app_id}/restart"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
    }),
    body: apps_restart_request,
  }),
  response: apps_deployment_response,
};

export type get_Apps_get_logs_active_deployment = typeof get_Apps_get_logs_active_deployment;
export const get_Apps_get_logs_active_deployment = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{app_id}/components/{component_name}/logs"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      follow: z.union([z.boolean(), z.undefined()]),
      type: z.union([
        z.literal("UNSPECIFIED"),
        z.literal("BUILD"),
        z.literal("DEPLOY"),
        z.literal("RUN"),
        z.literal("RUN_RESTARTED"),
      ]),
      pod_connection_timeout: z.union([z.string(), z.undefined()]),
    }),
    path: z.object({
      app_id: z.string(),
      component_name: z.string(),
    }),
  }),
  response: apps_get_logs_response,
};

export type get_Apps_get_exec_active_deployment = typeof get_Apps_get_exec_active_deployment;
export const get_Apps_get_exec_active_deployment = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{app_id}/components/{component_name}/exec"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
      component_name: z.string(),
    }),
  }),
  response: apps_get_exec_response,
};

export type get_Apps_list_deployments = typeof get_Apps_list_deployments;
export const get_Apps_list_deployments = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{app_id}/deployments"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
    path: z.object({
      app_id: z.string(),
    }),
  }),
  response: apps_deployments_response,
};

export type post_Apps_create_deployment = typeof post_Apps_create_deployment;
export const post_Apps_create_deployment = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps/{app_id}/deployments"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
    }),
    body: apps_create_deployment_request,
  }),
  response: apps_deployment_response,
};

export type get_Apps_get_deployment = typeof get_Apps_get_deployment;
export const get_Apps_get_deployment = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{app_id}/deployments/{deployment_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
      deployment_id: z.string(),
    }),
  }),
  response: apps_deployment_response,
};

export type post_Apps_cancel_deployment = typeof post_Apps_cancel_deployment;
export const post_Apps_cancel_deployment = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps/{app_id}/deployments/{deployment_id}/cancel"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
      deployment_id: z.string(),
    }),
  }),
  response: apps_deployment_response,
};

export type get_Apps_get_logs = typeof get_Apps_get_logs;
export const get_Apps_get_logs = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      follow: z.union([z.boolean(), z.undefined()]),
      type: z.union([
        z.literal("UNSPECIFIED"),
        z.literal("BUILD"),
        z.literal("DEPLOY"),
        z.literal("RUN"),
        z.literal("RUN_RESTARTED"),
      ]),
      pod_connection_timeout: z.union([z.string(), z.undefined()]),
    }),
    path: z.object({
      app_id: z.string(),
      deployment_id: z.string(),
      component_name: z.string(),
    }),
  }),
  response: apps_get_logs_response,
};

export type get_Apps_get_logs_aggregate = typeof get_Apps_get_logs_aggregate;
export const get_Apps_get_logs_aggregate = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{app_id}/deployments/{deployment_id}/logs"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      follow: z.union([z.boolean(), z.undefined()]),
      type: z.union([
        z.literal("UNSPECIFIED"),
        z.literal("BUILD"),
        z.literal("DEPLOY"),
        z.literal("RUN"),
        z.literal("RUN_RESTARTED"),
      ]),
      pod_connection_timeout: z.union([z.string(), z.undefined()]),
    }),
    path: z.object({
      app_id: z.string(),
      deployment_id: z.string(),
    }),
  }),
  response: apps_get_logs_response,
};

export type get_Apps_get_exec = typeof get_Apps_get_exec;
export const get_Apps_get_exec = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/exec"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
      deployment_id: z.string(),
      component_name: z.string(),
    }),
  }),
  response: apps_get_exec_response,
};

export type get_Apps_get_logs_active_deployment_aggregate = typeof get_Apps_get_logs_active_deployment_aggregate;
export const get_Apps_get_logs_active_deployment_aggregate = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{app_id}/logs"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      follow: z.union([z.boolean(), z.undefined()]),
      type: z.union([
        z.literal("UNSPECIFIED"),
        z.literal("BUILD"),
        z.literal("DEPLOY"),
        z.literal("RUN"),
        z.literal("RUN_RESTARTED"),
      ]),
      pod_connection_timeout: z.union([z.string(), z.undefined()]),
    }),
    path: z.object({
      app_id: z.string(),
    }),
  }),
  response: apps_get_logs_response,
};

export type get_Apps_list_instanceSizes = typeof get_Apps_list_instanceSizes;
export const get_Apps_list_instanceSizes = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/tiers/instance_sizes"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: apps_list_instance_sizes_response,
};

export type get_Apps_get_instanceSize = typeof get_Apps_get_instanceSize;
export const get_Apps_get_instanceSize = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/tiers/instance_sizes/{slug}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      slug: z.string(),
    }),
  }),
  response: apps_get_instance_size_response,
};

export type get_Apps_list_regions = typeof get_Apps_list_regions;
export const get_Apps_list_regions = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/regions"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: apps_list_regions_response,
};

export type post_Apps_validate_appSpec = typeof post_Apps_validate_appSpec;
export const post_Apps_validate_appSpec = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps/propose"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: app_propose,
  }),
  response: app_propose_response,
};

export type get_Apps_list_alerts = typeof get_Apps_list_alerts;
export const get_Apps_list_alerts = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{app_id}/alerts"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
    }),
  }),
  response: apps_list_alerts_response,
};

export type post_Apps_assign_alertDestinations = typeof post_Apps_assign_alertDestinations;
export const post_Apps_assign_alertDestinations = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps/{app_id}/alerts/{alert_id}/destinations"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
      alert_id: z.string(),
    }),
    body: apps_assign_app_alert_destinations_request,
  }),
  response: apps_alert_response,
};

export type post_Apps_create_rollback = typeof post_Apps_create_rollback;
export const post_Apps_create_rollback = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps/{app_id}/rollback"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
    }),
    body: apps_rollback_app_request,
  }),
  response: apps_deployment_response,
};

export type post_Apps_validate_rollback = typeof post_Apps_validate_rollback;
export const post_Apps_validate_rollback = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps/{app_id}/rollback/validate"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
    }),
    body: apps_rollback_app_request,
  }),
  response: z.object({
    valid: z.boolean().optional(),
    error: z.intersection(z.unknown(), app_rollback_validation_condition).optional(),
    warnings: z.array(app_rollback_validation_condition).optional(),
  }),
};

export type post_Apps_commit_rollback = typeof post_Apps_commit_rollback;
export const post_Apps_commit_rollback = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps/{app_id}/rollback/commit"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_Apps_revert_rollback = typeof post_Apps_revert_rollback;
export const post_Apps_revert_rollback = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps/{app_id}/rollback/revert"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      app_id: z.string(),
    }),
  }),
  response: apps_deployment_response,
};

export type get_Apps_get_metrics_bandwidth_daily = typeof get_Apps_get_metrics_bandwidth_daily;
export const get_Apps_get_metrics_bandwidth_daily = {
  method: z.literal("GET"),
  path: z.literal("/v2/apps/{app_id}/metrics/bandwidth_daily"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      date: z.string().optional(),
    }),
    path: z.object({
      app_id: z.string(),
    }),
  }),
  response: app_metrics_bandwidth_usage,
};

export type post_Apps_list_metrics_bandwidth_daily = typeof post_Apps_list_metrics_bandwidth_daily;
export const post_Apps_list_metrics_bandwidth_daily = {
  method: z.literal("POST"),
  path: z.literal("/v2/apps/metrics/bandwidth_daily"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: app_metrics_bandwidth_usage_request,
  }),
  response: app_metrics_bandwidth_usage,
};

export type get_Cdn_list_endpoints = typeof get_Cdn_list_endpoints;
export const get_Cdn_list_endpoints = {
  method: z.literal("GET"),
  path: z.literal("/v2/cdn/endpoints"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      endpoints: z.array(cdn_endpoint).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Cdn_create_endpoint = typeof post_Cdn_create_endpoint;
export const post_Cdn_create_endpoint = {
  method: z.literal("POST"),
  path: z.literal("/v2/cdn/endpoints"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: cdn_endpoint,
  }),
  response: z.object({
    endpoint: cdn_endpoint.optional(),
  }),
};

export type get_Cdn_get_endpoint = typeof get_Cdn_get_endpoint;
export const get_Cdn_get_endpoint = {
  method: z.literal("GET"),
  path: z.literal("/v2/cdn/endpoints/{cdn_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cdn_id: z.string(),
    }),
  }),
  response: z.object({
    endpoint: cdn_endpoint.optional(),
  }),
};

export type put_Cdn_update_endpoints = typeof put_Cdn_update_endpoints;
export const put_Cdn_update_endpoints = {
  method: z.literal("PUT"),
  path: z.literal("/v2/cdn/endpoints/{cdn_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cdn_id: z.string(),
    }),
    body: update_endpoint,
  }),
  response: z.object({
    endpoint: cdn_endpoint.optional(),
  }),
};

export type delete_Cdn_delete_endpoint = typeof delete_Cdn_delete_endpoint;
export const delete_Cdn_delete_endpoint = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/cdn/endpoints/{cdn_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cdn_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type delete_Cdn_purge_cache = typeof delete_Cdn_purge_cache;
export const delete_Cdn_purge_cache = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/cdn/endpoints/{cdn_id}/cache"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cdn_id: z.string(),
    }),
    body: purge_cache,
  }),
  response: z.unknown(),
};

export type get_Certificates_list = typeof get_Certificates_list;
export const get_Certificates_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/certificates"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
      name: z.string().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      certificates: z.array(certificate).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Certificates_create = typeof post_Certificates_create;
export const post_Certificates_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/certificates"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: z.union([certificate_request_lets_encrypt, certificate_request_custom]),
  }),
  response: z.object({
    certificate: certificate.optional(),
  }),
};

export type get_Certificates_get = typeof get_Certificates_get;
export const get_Certificates_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/certificates/{certificate_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      certificate_id: z.string(),
    }),
  }),
  response: z.object({
    certificate: certificate.optional(),
  }),
};

export type delete_Certificates_delete = typeof delete_Certificates_delete;
export const delete_Certificates_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/certificates/{certificate_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      certificate_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Balance_get = typeof get_Balance_get;
export const get_Balance_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/customers/my/balance"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: balance,
};

export type get_BillingHistory_list = typeof get_BillingHistory_list;
export const get_BillingHistory_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/customers/my/billing_history"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.intersection(
    z.object({
      billing_history: z.array(billing_history).optional(),
    }),
    z.intersection(pagination, meta_optional_total),
  ),
};

export type get_Invoices_list = typeof get_Invoices_list;
export const get_Invoices_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/customers/my/invoices"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      invoices: z.array(invoice_preview).optional(),
      invoice_preview: invoice_preview.optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Invoices_get_byUUID = typeof get_Invoices_get_byUUID;
export const get_Invoices_get_byUUID = {
  method: z.literal("GET"),
  path: z.literal("/v2/customers/my/invoices/{invoice_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      invoice_uuid: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      invoice_items: z.array(invoice_item).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Invoices_get_csvByUUID = typeof get_Invoices_get_csvByUUID;
export const get_Invoices_get_csvByUUID = {
  method: z.literal("GET"),
  path: z.literal("/v2/customers/my/invoices/{invoice_uuid}/csv"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      invoice_uuid: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Invoices_get_pdfByUUID = typeof get_Invoices_get_pdfByUUID;
export const get_Invoices_get_pdfByUUID = {
  method: z.literal("GET"),
  path: z.literal("/v2/customers/my/invoices/{invoice_uuid}/pdf"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      invoice_uuid: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Invoices_get_summaryByUUID = typeof get_Invoices_get_summaryByUUID;
export const get_Invoices_get_summaryByUUID = {
  method: z.literal("GET"),
  path: z.literal("/v2/customers/my/invoices/{invoice_uuid}/summary"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      invoice_uuid: z.string(),
    }),
  }),
  response: invoice_summary,
};

export type get_Databases_list_options = typeof get_Databases_list_options;
export const get_Databases_list_options = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/options"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: options,
};

export type get_Databases_list_clusters = typeof get_Databases_list_clusters;
export const get_Databases_list_clusters = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      tag_name: z.string().optional(),
    }),
  }),
  response: z.object({
    databases: z.array(database_cluster).optional(),
  }),
};

export type post_Databases_create_cluster = typeof post_Databases_create_cluster;
export const post_Databases_create_cluster = {
  method: z.literal("POST"),
  path: z.literal("/v2/databases"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: z.intersection(
      database_cluster,
      z.object({
        backup_restore: database_backup.optional(),
      }),
    ),
  }),
  response: z.object({
    database: database_cluster,
  }),
};

export type get_Databases_get_cluster = typeof get_Databases_get_cluster;
export const get_Databases_get_cluster = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    database: database_cluster,
  }),
};

export type delete_Databases_destroy_cluster = typeof delete_Databases_destroy_cluster;
export const delete_Databases_destroy_cluster = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/databases/{database_cluster_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Databases_get_config = typeof get_Databases_get_config;
export const get_Databases_get_config = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/config"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    config: z.union([
      mysql_advanced_config,
      postgres_advanced_config,
      redis_advanced_config,
      kafka_advanced_config,
      opensearch_advanced_config,
      mongo_advanced_config,
      z.array(
        z.union([
          mysql_advanced_config,
          postgres_advanced_config,
          redis_advanced_config,
          kafka_advanced_config,
          opensearch_advanced_config,
          mongo_advanced_config,
        ]),
      ),
    ]),
  }),
};

export type patch_Databases_patch_config = typeof patch_Databases_patch_config;
export const patch_Databases_patch_config = {
  method: z.literal("PATCH"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/config"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: database_config,
  }),
  response: z.unknown(),
};

export type get_Databases_get_ca = typeof get_Databases_get_ca;
export const get_Databases_get_ca = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/ca"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    ca: ca,
  }),
};

export type get_Databases_get_migrationStatus = typeof get_Databases_get_migrationStatus;
export const get_Databases_get_migrationStatus = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/online-migration"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: online_migration,
};

export type put_Databases_update_onlineMigration = typeof put_Databases_update_onlineMigration;
export const put_Databases_update_onlineMigration = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/online-migration"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: source_database,
  }),
  response: online_migration,
};

export type delete_Databases_delete_onlineMigration = typeof delete_Databases_delete_onlineMigration;
export const delete_Databases_delete_onlineMigration = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/online-migration/{migration_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      migration_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type put_Databases_update_region = typeof put_Databases_update_region;
export const put_Databases_update_region = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/migrate"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: z.object({
      region: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type put_Databases_update_clusterSize = typeof put_Databases_update_clusterSize;
export const put_Databases_update_clusterSize = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/resize"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: database_cluster_resize,
  }),
  response: z.unknown(),
};

export type get_Databases_list_firewall_rules = typeof get_Databases_list_firewall_rules;
export const get_Databases_list_firewall_rules = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/firewall"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    rules: z.array(firewall_rule).optional(),
  }),
};

export type put_Databases_update_firewall_rules = typeof put_Databases_update_firewall_rules;
export const put_Databases_update_firewall_rules = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/firewall"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: z.object({
      rules: z.array(firewall_rule).optional(),
    }),
  }),
  response: z.unknown(),
};

export type put_Databases_update_maintenanceWindow = typeof put_Databases_update_maintenanceWindow;
export const put_Databases_update_maintenanceWindow = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/maintenance"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: database_maintenance_window,
  }),
  response: z.unknown(),
};

export type put_Databases_install_update = typeof put_Databases_install_update;
export const put_Databases_install_update = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/install_update"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Databases_list_backups = typeof get_Databases_list_backups;
export const get_Databases_list_backups = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/backups"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    backups: z.array(backup),
  }),
};

export type get_Databases_list_replicas = typeof get_Databases_list_replicas;
export const get_Databases_list_replicas = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/replicas"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    replicas: z.array(database_replica).optional(),
  }),
};

export type post_Databases_create_replica = typeof post_Databases_create_replica;
export const post_Databases_create_replica = {
  method: z.literal("POST"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/replicas"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: database_replica,
  }),
  response: z.object({
    replica: database_replica.optional(),
  }),
};

export type get_Databases_list_events_logs = typeof get_Databases_list_events_logs;
export const get_Databases_list_events_logs = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/events"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    events: z.array(events_logs).optional(),
  }),
};

export type get_Databases_get_replica = typeof get_Databases_get_replica;
export const get_Databases_get_replica = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/replicas/{replica_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      replica_name: z.string(),
    }),
  }),
  response: z.object({
    replica: database_replica.optional(),
  }),
};

export type delete_Databases_destroy_replica = typeof delete_Databases_destroy_replica;
export const delete_Databases_destroy_replica = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/replicas/{replica_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      replica_name: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type put_Databases_promote_replica = typeof put_Databases_promote_replica;
export const put_Databases_promote_replica = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/replicas/{replica_name}/promote"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      replica_name: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Databases_list_users = typeof get_Databases_list_users;
export const get_Databases_list_users = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/users"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    users: z.array(database_user).optional(),
  }),
};

export type post_Databases_add_user = typeof post_Databases_add_user;
export const post_Databases_add_user = {
  method: z.literal("POST"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/users"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: z.intersection(
      database_user,
      z.object({
        readonly: z.boolean().optional(),
      }),
    ),
  }),
  response: z.object({
    user: database_user,
  }),
};

export type get_Databases_get_user = typeof get_Databases_get_user;
export const get_Databases_get_user = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/users/{username}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      username: z.string(),
    }),
  }),
  response: z.object({
    user: database_user,
  }),
};

export type delete_Databases_delete_user = typeof delete_Databases_delete_user;
export const delete_Databases_delete_user = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/users/{username}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      username: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type put_Databases_update_user = typeof put_Databases_update_user;
export const put_Databases_update_user = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/users/{username}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      username: z.string(),
    }),
    body: z.object({
      settings: user_settings.optional(),
    }),
  }),
  response: z.object({
    user: database_user,
  }),
};

export type post_Databases_reset_auth = typeof post_Databases_reset_auth;
export const post_Databases_reset_auth = {
  method: z.literal("POST"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/users/{username}/reset_auth"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      username: z.string(),
    }),
    body: z.object({
      mysql_settings: mysql_settings.optional(),
    }),
  }),
  response: z.object({
    user: database_user,
  }),
};

export type get_Databases_list = typeof get_Databases_list;
export const get_Databases_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/dbs"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    dbs: z.array(database).optional(),
  }),
};

export type post_Databases_add = typeof post_Databases_add;
export const post_Databases_add = {
  method: z.literal("POST"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/dbs"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: database,
  }),
  response: z.object({
    db: database,
  }),
};

export type get_Databases_get = typeof get_Databases_get;
export const get_Databases_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/dbs/{database_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      database_name: z.string(),
    }),
  }),
  response: z.object({
    db: database,
  }),
};

export type delete_Databases_delete = typeof delete_Databases_delete;
export const delete_Databases_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/dbs/{database_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      database_name: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Databases_list_connectionPools = typeof get_Databases_list_connectionPools;
export const get_Databases_list_connectionPools = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/pools"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: connection_pools,
};

export type post_Databases_add_connectionPool = typeof post_Databases_add_connectionPool;
export const post_Databases_add_connectionPool = {
  method: z.literal("POST"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/pools"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: connection_pool,
  }),
  response: z.object({
    pool: connection_pool,
  }),
};

export type get_Databases_get_connectionPool = typeof get_Databases_get_connectionPool;
export const get_Databases_get_connectionPool = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/pools/{pool_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      pool_name: z.string(),
    }),
  }),
  response: z.object({
    pool: connection_pool,
  }),
};

export type put_Databases_update_connectionPool = typeof put_Databases_update_connectionPool;
export const put_Databases_update_connectionPool = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/pools/{pool_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      pool_name: z.string(),
    }),
    body: connection_pool_update,
  }),
  response: z.unknown(),
};

export type delete_Databases_delete_connectionPool = typeof delete_Databases_delete_connectionPool;
export const delete_Databases_delete_connectionPool = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/pools/{pool_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      pool_name: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Databases_get_evictionPolicy = typeof get_Databases_get_evictionPolicy;
export const get_Databases_get_evictionPolicy = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/eviction_policy"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    eviction_policy: eviction_policy_model,
  }),
};

export type put_Databases_update_evictionPolicy = typeof put_Databases_update_evictionPolicy;
export const put_Databases_update_evictionPolicy = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/eviction_policy"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: z.object({
      eviction_policy: eviction_policy_model,
    }),
  }),
  response: z.unknown(),
};

export type get_Databases_get_sql_mode = typeof get_Databases_get_sql_mode;
export const get_Databases_get_sql_mode = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/sql_mode"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: sql_mode,
};

export type put_Databases_update_sql_mode = typeof put_Databases_update_sql_mode;
export const put_Databases_update_sql_mode = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/sql_mode"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: sql_mode,
  }),
  response: z.unknown(),
};

export type put_Databases_update_major_version = typeof put_Databases_update_major_version;
export const put_Databases_update_major_version = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/upgrade"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: version_2,
  }),
  response: z.unknown(),
};

export type get_Databases_list_kafka_topics = typeof get_Databases_list_kafka_topics;
export const get_Databases_list_kafka_topics = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/topics"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    topics: z.array(kafka_topic).optional(),
  }),
};

export type post_Databases_create_kafka_topic = typeof post_Databases_create_kafka_topic;
export const post_Databases_create_kafka_topic = {
  method: z.literal("POST"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/topics"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: kafka_topic_create,
  }),
  response: z.object({
    topic: kafka_topic_verbose.optional(),
  }),
};

export type get_Databases_get_kafka_topic = typeof get_Databases_get_kafka_topic;
export const get_Databases_get_kafka_topic = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/topics/{topic_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      topic_name: z.string(),
    }),
  }),
  response: z.object({
    topic: kafka_topic_verbose.optional(),
  }),
};

export type put_Databases_update_kafka_topic = typeof put_Databases_update_kafka_topic;
export const put_Databases_update_kafka_topic = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/topics/{topic_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      topic_name: z.string(),
    }),
    body: kafka_topic_update,
  }),
  response: z.object({
    topic: kafka_topic_verbose.optional(),
  }),
};

export type delete_Databases_delete_kafka_topic = typeof delete_Databases_delete_kafka_topic;
export const delete_Databases_delete_kafka_topic = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/topics/{topic_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      topic_name: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Databases_list_logsink = typeof get_Databases_list_logsink;
export const get_Databases_list_logsink = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/logsink"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    sinks: z.array(logsink_verbose).optional(),
  }),
};

export type post_Databases_create_logsink = typeof post_Databases_create_logsink;
export const post_Databases_create_logsink = {
  method: z.literal("POST"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/logsink"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
    body: logsink_create,
  }),
  response: z.object({
    sink: logsink_verbose.optional(),
  }),
};

export type get_Databases_get_logsink = typeof get_Databases_get_logsink;
export const get_Databases_get_logsink = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      logsink_id: z.string(),
    }),
  }),
  response: z.object({
    sink: logsink_verbose.optional(),
  }),
};

export type put_Databases_update_logsink = typeof put_Databases_update_logsink;
export const put_Databases_update_logsink = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      logsink_id: z.string(),
    }),
    body: logsink_update,
  }),
  response: z.unknown(),
};

export type delete_Databases_delete_logsink = typeof delete_Databases_delete_logsink;
export const delete_Databases_delete_logsink = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      logsink_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Databases_get_cluster_metrics_credentials = typeof get_Databases_get_cluster_metrics_credentials;
export const get_Databases_get_cluster_metrics_credentials = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/metrics/credentials"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.object({
    credentials: database_metrics_credentials.optional(),
  }),
};

export type put_Databases_update_cluster_metrics_credentials = typeof put_Databases_update_cluster_metrics_credentials;
export const put_Databases_update_cluster_metrics_credentials = {
  method: z.literal("PUT"),
  path: z.literal("/v2/databases/metrics/credentials"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: database_metrics_credentials,
  }),
  response: z.unknown(),
};

export type get_Databases_list_opeasearch_indexes = typeof get_Databases_list_opeasearch_indexes;
export const get_Databases_list_opeasearch_indexes = {
  method: z.literal("GET"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/indexes"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
    }),
  }),
  response: z.object({
    indexes: z.array(opensearch_index).optional(),
  }),
};

export type delete_Databases_delete_opensearch_index = typeof delete_Databases_delete_opensearch_index;
export const delete_Databases_delete_opensearch_index = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/databases/{database_cluster_uuid}/indexes/{index_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      database_cluster_uuid: z.string(),
      index_name: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Domains_list = typeof get_Domains_list;
export const get_Domains_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/domains"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      domains: z.array(domain),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Domains_create = typeof post_Domains_create;
export const post_Domains_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/domains"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: domain,
  }),
  response: z.object({
    domain: domain.optional(),
  }),
};

export type get_Domains_get = typeof get_Domains_get;
export const get_Domains_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/domains/{domain_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      domain_name: z.string(),
    }),
  }),
  response: z.object({
    domain: domain.optional(),
  }),
};

export type delete_Domains_delete = typeof delete_Domains_delete;
export const delete_Domains_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/domains/{domain_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      domain_name: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Domains_list_records = typeof get_Domains_list_records;
export const get_Domains_list_records = {
  method: z.literal("GET"),
  path: z.literal("/v2/domains/{domain_name}/records"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      name: z.string().optional(),
      type: z
        .union([
          z.literal("A"),
          z.literal("AAAA"),
          z.literal("CAA"),
          z.literal("CNAME"),
          z.literal("MX"),
          z.literal("NS"),
          z.literal("SOA"),
          z.literal("SRV"),
          z.literal("TXT"),
        ])
        .optional(),
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      domain_name: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      domain_records: z.array(domain_record).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Domains_create_record = typeof post_Domains_create_record;
export const post_Domains_create_record = {
  method: z.literal("POST"),
  path: z.literal("/v2/domains/{domain_name}/records"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      domain_name: z.string(),
    }),
    body: z.union([
      domain_record_a,
      domain_record_aaaa,
      domain_record_caa,
      domain_record_cname,
      domain_record_mx,
      domain_record_ns,
      domain_record_soa,
      domain_record_srv,
      domain_record_txt,
      z.array(
        z.union([
          domain_record_a,
          domain_record_aaaa,
          domain_record_caa,
          domain_record_cname,
          domain_record_mx,
          domain_record_ns,
          domain_record_soa,
          domain_record_srv,
          domain_record_txt,
        ]),
      ),
    ]),
  }),
  response: z.object({
    domain_record: domain_record.optional(),
  }),
};

export type get_Domains_get_record = typeof get_Domains_get_record;
export const get_Domains_get_record = {
  method: z.literal("GET"),
  path: z.literal("/v2/domains/{domain_name}/records/{domain_record_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      domain_name: z.string(),
      domain_record_id: z.number(),
    }),
  }),
  response: z.object({
    domain_record: domain_record.optional(),
  }),
};

export type patch_Domains_patch_record = typeof patch_Domains_patch_record;
export const patch_Domains_patch_record = {
  method: z.literal("PATCH"),
  path: z.literal("/v2/domains/{domain_name}/records/{domain_record_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      domain_name: z.string(),
      domain_record_id: z.number(),
    }),
    body: domain_record,
  }),
  response: z.object({
    domain_record: domain_record.optional(),
  }),
};

export type put_Domains_update_record = typeof put_Domains_update_record;
export const put_Domains_update_record = {
  method: z.literal("PUT"),
  path: z.literal("/v2/domains/{domain_name}/records/{domain_record_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      domain_name: z.string(),
      domain_record_id: z.number(),
    }),
    body: domain_record,
  }),
  response: z.object({
    domain_record: domain_record.optional(),
  }),
};

export type delete_Domains_delete_record = typeof delete_Domains_delete_record;
export const delete_Domains_delete_record = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/domains/{domain_name}/records/{domain_record_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      domain_name: z.string(),
      domain_record_id: z.number(),
    }),
  }),
  response: z.unknown(),
};

export type get_Droplets_list = typeof get_Droplets_list;
export const get_Droplets_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
      tag_name: z.string().optional(),
      name: z.string().optional(),
      type: z.union([z.literal("droplets"), z.literal("gpus")]).optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      droplets: z.array(droplet).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Droplets_create = typeof post_Droplets_create;
export const post_Droplets_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/droplets"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: z.union([droplet_single_create, droplet_multi_create]),
  }),
  response: z.union([
    z.object({
      droplet: droplet,
      links: z.object({
        actions: z.array(action_link).optional(),
      }),
    }),
    z.object({
      droplets: z.array(droplet),
      links: z.object({
        actions: z.array(action_link).optional(),
      }),
    }),
  ]),
};

export type delete_Droplets_destroy_byTag = typeof delete_Droplets_destroy_byTag;
export const delete_Droplets_destroy_byTag = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/droplets"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      tag_name: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Droplets_get = typeof get_Droplets_get;
export const get_Droplets_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.object({
    droplet: droplet.optional(),
  }),
};

export type delete_Droplets_destroy = typeof delete_Droplets_destroy;
export const delete_Droplets_destroy = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/droplets/{droplet_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.unknown(),
};

export type get_Droplets_list_backups = typeof get_Droplets_list_backups;
export const get_Droplets_list_backups = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}/backups"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.intersection(
    z.object({
      backups: z.array(droplet_snapshot).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Droplets_get_backup_policy = typeof get_Droplets_get_backup_policy;
export const get_Droplets_get_backup_policy = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}/backups/policy"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.object({
    policy: droplet_backup_policy_record.optional(),
  }),
};

export type get_Droplets_list_backup_policies = typeof get_Droplets_list_backup_policies;
export const get_Droplets_list_backup_policies = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/backups/policies"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      policies: z.unknown().optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Droplets_list_supported_backup_policies = typeof get_Droplets_list_supported_backup_policies;
export const get_Droplets_list_supported_backup_policies = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/backups/supported_policies"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.object({
    supported_policies: z.array(supported_droplet_backup_policy).optional(),
  }),
};

export type get_Droplets_list_snapshots = typeof get_Droplets_list_snapshots;
export const get_Droplets_list_snapshots = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}/snapshots"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.intersection(
    z.object({
      snapshots: z.array(droplet_snapshot).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_DropletActions_list = typeof get_DropletActions_list;
export const get_DropletActions_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.intersection(
    z.object({
      actions: z.array(action).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_DropletActions_post = typeof post_DropletActions_post;
export const post_DropletActions_post = {
  method: z.literal("POST"),
  path: z.literal("/v2/droplets/{droplet_id}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
    }),
    body: z.union([
      droplet_action,
      droplet_action_enable_backups,
      droplet_action_change_backup_policy,
      droplet_action_restore,
      droplet_action_resize,
      droplet_action_rebuild,
      droplet_action_rename,
      droplet_action_change_kernel,
      droplet_action_snapshot,
      z.array(
        z.union([
          droplet_action,
          droplet_action_enable_backups,
          droplet_action_change_backup_policy,
          droplet_action_restore,
          droplet_action_resize,
          droplet_action_rebuild,
          droplet_action_rename,
          droplet_action_change_kernel,
          droplet_action_snapshot,
        ]),
      ),
    ]),
  }),
  response: z.object({
    action: action.optional(),
  }),
};

export type post_DropletActions_post_byTag = typeof post_DropletActions_post_byTag;
export const post_DropletActions_post_byTag = {
  method: z.literal("POST"),
  path: z.literal("/v2/droplets/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      tag_name: z.string().optional(),
    }),
    body: z.union([droplet_action, droplet_action_snapshot]),
  }),
  response: z.object({
    actions: z.array(action).optional(),
  }),
};

export type get_DropletActions_get = typeof get_DropletActions_get;
export const get_DropletActions_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}/actions/{action_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
      action_id: z.number(),
    }),
  }),
  response: z.object({
    action: action.optional(),
  }),
};

export type get_Droplets_list_kernels = typeof get_Droplets_list_kernels;
export const get_Droplets_list_kernels = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}/kernels"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.intersection(
    z.object({
      kernels: z.array(kernel).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Droplets_list_firewalls = typeof get_Droplets_list_firewalls;
export const get_Droplets_list_firewalls = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}/firewalls"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.intersection(
    z.object({
      firewalls: z.array(firewall).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Droplets_list_neighbors = typeof get_Droplets_list_neighbors;
export const get_Droplets_list_neighbors = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}/neighbors"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.object({
    droplets: z.array(droplet).optional(),
  }),
};

export type get_Droplets_list_associatedResources = typeof get_Droplets_list_associatedResources;
export const get_Droplets_list_associatedResources = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}/destroy_with_associated_resources"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.object({
    reserved_ips: z.array(associated_resource).optional(),
    floating_ips: z.array(associated_resource).optional(),
    snapshots: z.array(associated_resource).optional(),
    volumes: z.array(associated_resource).optional(),
    volume_snapshots: z.array(associated_resource).optional(),
  }),
};

export type delete_Droplets_destroy_withAssociatedResourcesSelective =
  typeof delete_Droplets_destroy_withAssociatedResourcesSelective;
export const delete_Droplets_destroy_withAssociatedResourcesSelective = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/droplets/{droplet_id}/destroy_with_associated_resources/selective"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
    }),
    body: selective_destroy_associated_resource,
  }),
  response: z.unknown(),
};

export type delete_Droplets_destroy_withAssociatedResourcesDangerous =
  typeof delete_Droplets_destroy_withAssociatedResourcesDangerous;
export const delete_Droplets_destroy_withAssociatedResourcesDangerous = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
    }),
    header: z.object({
      "X-Dangerous": z.boolean(),
    }),
  }),
  response: z.unknown(),
};

export type get_Droplets_get_DestroyAssociatedResourcesStatus =
  typeof get_Droplets_get_DestroyAssociatedResourcesStatus;
export const get_Droplets_get_DestroyAssociatedResourcesStatus = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/{droplet_id}/destroy_with_associated_resources/status"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: associated_resource_status,
};

export type post_Droplets_destroy_retryWithAssociatedResources =
  typeof post_Droplets_destroy_retryWithAssociatedResources;
export const post_Droplets_destroy_retryWithAssociatedResources = {
  method: z.literal("POST"),
  path: z.literal("/v2/droplets/{droplet_id}/destroy_with_associated_resources/retry"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      droplet_id: z.number(),
    }),
  }),
  response: z.unknown(),
};

export type get_Autoscalepools_list = typeof get_Autoscalepools_list;
export const get_Autoscalepools_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/autoscale"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
      name: z.string().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      autoscale_pools: z.array(autoscale_pool).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Autoscalepools_create = typeof post_Autoscalepools_create;
export const post_Autoscalepools_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/droplets/autoscale"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: autoscale_pool_create,
  }),
  response: z.object({
    autoscale_pool: autoscale_pool.optional(),
  }),
};

export type get_Autoscalepools_get = typeof get_Autoscalepools_get;
export const get_Autoscalepools_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/autoscale/{autoscale_pool_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      autoscale_pool_id: z.string(),
    }),
  }),
  response: z.object({
    autoscale_pool: autoscale_pool.optional(),
  }),
};

export type put_Autoscalepools_update = typeof put_Autoscalepools_update;
export const put_Autoscalepools_update = {
  method: z.literal("PUT"),
  path: z.literal("/v2/droplets/autoscale/{autoscale_pool_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      autoscale_pool_id: z.string(),
    }),
    body: autoscale_pool_create,
  }),
  response: z.object({
    autoscale_pool: autoscale_pool.optional(),
  }),
};

export type delete_Autoscalepools_delete = typeof delete_Autoscalepools_delete;
export const delete_Autoscalepools_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/droplets/autoscale/{autoscale_pool_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      autoscale_pool_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type delete_Autoscalepools_delete_dangerous = typeof delete_Autoscalepools_delete_dangerous;
export const delete_Autoscalepools_delete_dangerous = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/droplets/autoscale/{autoscale_pool_id}/dangerous"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      autoscale_pool_id: z.string(),
    }),
    header: z.object({
      "X-Dangerous": z.boolean(),
    }),
  }),
  response: z.unknown(),
};

export type get_Autoscalepools_list_members = typeof get_Autoscalepools_list_members;
export const get_Autoscalepools_list_members = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/autoscale/{autoscale_pool_id}/members"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      autoscale_pool_id: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      droplets: z.array(member).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Autoscalepools_list_history = typeof get_Autoscalepools_list_history;
export const get_Autoscalepools_list_history = {
  method: z.literal("GET"),
  path: z.literal("/v2/droplets/autoscale/{autoscale_pool_id}/history"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      autoscale_pool_id: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      history: z.array(history).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Firewalls_list = typeof get_Firewalls_list;
export const get_Firewalls_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/firewalls"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      firewalls: z.array(firewall).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Firewalls_create = typeof post_Firewalls_create;
export const post_Firewalls_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/firewalls"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: z.union([
      z.intersection(firewall, z.intersection(z.unknown(), z.unknown())),
      z.unknown(),
      z.array(z.union([z.unknown(), z.unknown()])),
    ]),
  }),
  response: z.object({
    firewall: firewall.optional(),
  }),
};

export type get_Firewalls_get = typeof get_Firewalls_get;
export const get_Firewalls_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/firewalls/{firewall_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      firewall_id: z.string(),
    }),
  }),
  response: z.object({
    firewall: firewall.optional(),
  }),
};

export type put_Firewalls_update = typeof put_Firewalls_update;
export const put_Firewalls_update = {
  method: z.literal("PUT"),
  path: z.literal("/v2/firewalls/{firewall_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      firewall_id: z.string(),
    }),
    body: z.union([z.intersection(firewall, z.unknown()), z.unknown(), z.array(z.union([z.unknown(), z.unknown()]))]),
  }),
  response: z.object({
    firewall: firewall.optional(),
  }),
};

export type delete_Firewalls_delete = typeof delete_Firewalls_delete;
export const delete_Firewalls_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/firewalls/{firewall_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      firewall_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_Firewalls_assign_droplets = typeof post_Firewalls_assign_droplets;
export const post_Firewalls_assign_droplets = {
  method: z.literal("POST"),
  path: z.literal("/v2/firewalls/{firewall_id}/droplets"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      firewall_id: z.string(),
    }),
    body: z.object({
      droplet_ids: z.array(z.number()),
    }),
  }),
  response: z.unknown(),
};

export type delete_Firewalls_delete_droplets = typeof delete_Firewalls_delete_droplets;
export const delete_Firewalls_delete_droplets = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/firewalls/{firewall_id}/droplets"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      firewall_id: z.string(),
    }),
    body: z.object({
      droplet_ids: z.array(z.number()),
    }),
  }),
  response: z.unknown(),
};

export type post_Firewalls_add_tags = typeof post_Firewalls_add_tags;
export const post_Firewalls_add_tags = {
  method: z.literal("POST"),
  path: z.literal("/v2/firewalls/{firewall_id}/tags"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      firewall_id: z.string(),
    }),
    body: z.object({
      tags: z.intersection(existing_tags_array, z.unknown()),
    }),
  }),
  response: z.unknown(),
};

export type delete_Firewalls_delete_tags = typeof delete_Firewalls_delete_tags;
export const delete_Firewalls_delete_tags = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/firewalls/{firewall_id}/tags"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      firewall_id: z.string(),
    }),
    body: z.object({
      tags: z.intersection(existing_tags_array, z.unknown()),
    }),
  }),
  response: z.unknown(),
};

export type post_Firewalls_add_rules = typeof post_Firewalls_add_rules;
export const post_Firewalls_add_rules = {
  method: z.literal("POST"),
  path: z.literal("/v2/firewalls/{firewall_id}/rules"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      firewall_id: z.string(),
    }),
    body: z.union([
      z.intersection(firewall_rules, z.unknown()),
      z.unknown(),
      z.array(z.union([z.unknown(), z.unknown()])),
    ]),
  }),
  response: z.unknown(),
};

export type delete_Firewalls_delete_rules = typeof delete_Firewalls_delete_rules;
export const delete_Firewalls_delete_rules = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/firewalls/{firewall_id}/rules"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      firewall_id: z.string(),
    }),
    body: z.union([
      z.intersection(firewall_rules, z.unknown()),
      z.unknown(),
      z.array(z.union([z.unknown(), z.unknown()])),
    ]),
  }),
  response: z.unknown(),
};

export type get_FloatingIPs_list = typeof get_FloatingIPs_list;
export const get_FloatingIPs_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/floating_ips"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      floating_ips: z.array(floating_ip).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_FloatingIPs_create = typeof post_FloatingIPs_create;
export const post_FloatingIPs_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/floating_ips"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: floating_ip_create,
  }),
  response: z.object({
    floating_ip: floating_ip.optional(),
    links: z
      .object({
        droplets: z.array(action_link).optional(),
        actions: z.array(action_link).optional(),
      })
      .optional(),
  }),
};

export type get_FloatingIPs_get = typeof get_FloatingIPs_get;
export const get_FloatingIPs_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/floating_ips/{floating_ip}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      floating_ip: z.string(),
    }),
  }),
  response: z.object({
    floating_ip: floating_ip.optional(),
  }),
};

export type delete_FloatingIPs_delete = typeof delete_FloatingIPs_delete;
export const delete_FloatingIPs_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/floating_ips/{floating_ip}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      floating_ip: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_FloatingIPsAction_list = typeof get_FloatingIPsAction_list;
export const get_FloatingIPsAction_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/floating_ips/{floating_ip}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      floating_ip: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      actions: z.array(action).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_FloatingIPsAction_post = typeof post_FloatingIPsAction_post;
export const post_FloatingIPsAction_post = {
  method: z.literal("POST"),
  path: z.literal("/v2/floating_ips/{floating_ip}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      floating_ip: z.string(),
    }),
    body: z.union([
      floating_ip_action_unassign,
      floating_ip_action_assign,
      z.array(z.union([floating_ip_action_unassign, floating_ip_action_assign])),
    ]),
  }),
  response: z.object({
    action: z
      .intersection(
        action,
        z.object({
          project_id: z.string().optional(),
        }),
      )
      .optional(),
  }),
};

export type get_FloatingIPsAction_get = typeof get_FloatingIPsAction_get;
export const get_FloatingIPsAction_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/floating_ips/{floating_ip}/actions/{action_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      floating_ip: z.string(),
      action_id: z.number(),
    }),
  }),
  response: z.object({
    action: z
      .intersection(
        action,
        z.object({
          project_id: z.string().optional(),
        }),
      )
      .optional(),
  }),
};

export type get_Functions_list_namespaces = typeof get_Functions_list_namespaces;
export const get_Functions_list_namespaces = {
  method: z.literal("GET"),
  path: z.literal("/v2/functions/namespaces"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.object({
    namespaces: z.array(namespace_info).optional(),
  }),
};

export type post_Functions_create_namespace = typeof post_Functions_create_namespace;
export const post_Functions_create_namespace = {
  method: z.literal("POST"),
  path: z.literal("/v2/functions/namespaces"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: create_namespace,
  }),
  response: z.object({
    namespace: namespace_info.optional(),
  }),
};

export type get_Functions_get_namespace = typeof get_Functions_get_namespace;
export const get_Functions_get_namespace = {
  method: z.literal("GET"),
  path: z.literal("/v2/functions/namespaces/{namespace_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      namespace_id: z.string(),
    }),
  }),
  response: z.object({
    namespace: namespace_info.optional(),
  }),
};

export type delete_Functions_delete_namespace = typeof delete_Functions_delete_namespace;
export const delete_Functions_delete_namespace = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/functions/namespaces/{namespace_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      namespace_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Functions_list_triggers = typeof get_Functions_list_triggers;
export const get_Functions_list_triggers = {
  method: z.literal("GET"),
  path: z.literal("/v2/functions/namespaces/{namespace_id}/triggers"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      namespace_id: z.string(),
    }),
  }),
  response: z.object({
    triggers: z.array(trigger_info).optional(),
  }),
};

export type post_Functions_create_trigger = typeof post_Functions_create_trigger;
export const post_Functions_create_trigger = {
  method: z.literal("POST"),
  path: z.literal("/v2/functions/namespaces/{namespace_id}/triggers"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      namespace_id: z.string(),
    }),
    body: create_trigger,
  }),
  response: z.object({
    trigger: trigger_info.optional(),
  }),
};

export type get_Functions_get_trigger = typeof get_Functions_get_trigger;
export const get_Functions_get_trigger = {
  method: z.literal("GET"),
  path: z.literal("/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      namespace_id: z.string(),
      trigger_name: z.string(),
    }),
  }),
  response: z.object({
    trigger: trigger_info.optional(),
  }),
};

export type put_Functions_update_trigger = typeof put_Functions_update_trigger;
export const put_Functions_update_trigger = {
  method: z.literal("PUT"),
  path: z.literal("/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      namespace_id: z.string(),
      trigger_name: z.string(),
    }),
    body: update_trigger,
  }),
  response: z.object({
    trigger: trigger_info.optional(),
  }),
};

export type delete_Functions_delete_trigger = typeof delete_Functions_delete_trigger;
export const delete_Functions_delete_trigger = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      namespace_id: z.string(),
      trigger_name: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Images_list = typeof get_Images_list;
export const get_Images_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/images"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      type: z.union([z.literal("application"), z.literal("distribution")]).optional(),
      private: z.boolean().optional(),
      tag_name: z.string().optional(),
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      images: z.array(image),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Images_create_custom = typeof post_Images_create_custom;
export const post_Images_create_custom = {
  method: z.literal("POST"),
  path: z.literal("/v2/images"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: image_new_custom,
  }),
  response: z.object({
    image: image.optional(),
  }),
};

export type get_Images_get = typeof get_Images_get;
export const get_Images_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/images/{image_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      image_id: z.union([z.number(), z.string(), z.array(z.union([z.number(), z.string()]))]),
    }),
  }),
  response: z.object({
    image: image,
  }),
};

export type put_Images_update = typeof put_Images_update;
export const put_Images_update = {
  method: z.literal("PUT"),
  path: z.literal("/v2/images/{image_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      image_id: z.number(),
    }),
    body: image_update,
  }),
  response: z.object({
    image: image,
  }),
};

export type delete_Images_delete = typeof delete_Images_delete;
export const delete_Images_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/images/{image_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      image_id: z.number(),
    }),
  }),
  response: z.unknown(),
};

export type get_ImageActions_list = typeof get_ImageActions_list;
export const get_ImageActions_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/images/{image_id}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      image_id: z.number(),
    }),
  }),
  response: z.intersection(
    z.object({
      actions: z.array(action).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_ImageActions_post = typeof post_ImageActions_post;
export const post_ImageActions_post = {
  method: z.literal("POST"),
  path: z.literal("/v2/images/{image_id}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      image_id: z.number(),
    }),
    body: z.union([
      image_action_base,
      image_action_transfer,
      z.array(z.union([image_action_base, image_action_transfer])),
    ]),
  }),
  response: action,
};

export type get_ImageActions_get = typeof get_ImageActions_get;
export const get_ImageActions_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/images/{image_id}/actions/{action_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      image_id: z.number(),
      action_id: z.number(),
    }),
  }),
  response: action,
};

export type get_Kubernetes_list_clusters = typeof get_Kubernetes_list_clusters;
export const get_Kubernetes_list_clusters = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      kubernetes_clusters: z.array(cluster).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Kubernetes_create_cluster = typeof post_Kubernetes_create_cluster;
export const post_Kubernetes_create_cluster = {
  method: z.literal("POST"),
  path: z.literal("/v2/kubernetes/clusters"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: cluster,
  }),
  response: z.object({
    kubernetes_cluster: cluster.optional(),
  }),
};

export type get_Kubernetes_get_cluster = typeof get_Kubernetes_get_cluster;
export const get_Kubernetes_get_cluster = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: z.object({
    kubernetes_cluster: cluster.optional(),
  }),
};

export type put_Kubernetes_update_cluster = typeof put_Kubernetes_update_cluster;
export const put_Kubernetes_update_cluster = {
  method: z.literal("PUT"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
    body: cluster_update,
  }),
  response: z.object({
    kubernetes_cluster: cluster.optional(),
  }),
};

export type delete_Kubernetes_delete_cluster = typeof delete_Kubernetes_delete_cluster;
export const delete_Kubernetes_delete_cluster = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Kubernetes_list_associatedResources = typeof get_Kubernetes_list_associatedResources;
export const get_Kubernetes_list_associatedResources = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: associated_kubernetes_resources,
};

export type delete_Kubernetes_destroy_associatedResourcesSelective =
  typeof delete_Kubernetes_destroy_associatedResourcesSelective;
export const delete_Kubernetes_destroy_associatedResourcesSelective = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/selective"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
    body: destroy_associated_kubernetes_resources,
  }),
  response: z.unknown(),
};

export type delete_Kubernetes_destroy_associatedResourcesDangerous =
  typeof delete_Kubernetes_destroy_associatedResourcesDangerous;
export const delete_Kubernetes_destroy_associatedResourcesDangerous = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/dangerous"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Kubernetes_get_kubeconfig = typeof get_Kubernetes_get_kubeconfig;
export const get_Kubernetes_get_kubeconfig = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/kubeconfig"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      expiry_seconds: z.number().optional(),
    }),
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Kubernetes_get_credentials = typeof get_Kubernetes_get_credentials;
export const get_Kubernetes_get_credentials = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/credentials"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      expiry_seconds: z.number().optional(),
    }),
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: credentials,
};

export type get_Kubernetes_get_availableUpgrades = typeof get_Kubernetes_get_availableUpgrades;
export const get_Kubernetes_get_availableUpgrades = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/upgrades"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: z.object({
    available_upgrade_versions: z.union([z.array(kubernetes_version), z.null()]).optional(),
  }),
};

export type post_Kubernetes_upgrade_cluster = typeof post_Kubernetes_upgrade_cluster;
export const post_Kubernetes_upgrade_cluster = {
  method: z.literal("POST"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/upgrade"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
    body: z.object({
      version: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_Kubernetes_list_nodePools = typeof get_Kubernetes_list_nodePools;
export const get_Kubernetes_list_nodePools = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/node_pools"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: z.object({
    node_pools: z.array(kubernetes_node_pool).optional(),
  }),
};

export type post_Kubernetes_add_nodePool = typeof post_Kubernetes_add_nodePool;
export const post_Kubernetes_add_nodePool = {
  method: z.literal("POST"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/node_pools"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
    body: kubernetes_node_pool,
  }),
  response: z.object({
    node_pool: kubernetes_node_pool.optional(),
  }),
};

export type get_Kubernetes_get_nodePool = typeof get_Kubernetes_get_nodePool;
export const get_Kubernetes_get_nodePool = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
      node_pool_id: z.string(),
    }),
  }),
  response: z.object({
    node_pool: kubernetes_node_pool.optional(),
  }),
};

export type put_Kubernetes_update_nodePool = typeof put_Kubernetes_update_nodePool;
export const put_Kubernetes_update_nodePool = {
  method: z.literal("PUT"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
      node_pool_id: z.string(),
    }),
    body: kubernetes_node_pool_base,
  }),
  response: z.object({
    node_pool: kubernetes_node_pool.optional(),
  }),
};

export type delete_Kubernetes_delete_nodePool = typeof delete_Kubernetes_delete_nodePool;
export const delete_Kubernetes_delete_nodePool = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
      node_pool_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type delete_Kubernetes_delete_node = typeof delete_Kubernetes_delete_node;
export const delete_Kubernetes_delete_node = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/nodes/{node_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      skip_drain: z.number().optional(),
      replace: z.number().optional(),
    }),
    path: z.object({
      cluster_id: z.string(),
      node_pool_id: z.string(),
      node_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Kubernetes_get_clusterUser = typeof get_Kubernetes_get_clusterUser;
export const get_Kubernetes_get_clusterUser = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/user"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: user,
};

export type get_Kubernetes_list_options = typeof get_Kubernetes_list_options;
export const get_Kubernetes_list_options = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/options"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: kubernetes_options,
};

export type post_Kubernetes_run_clusterLint = typeof post_Kubernetes_run_clusterLint;
export const post_Kubernetes_run_clusterLint = {
  method: z.literal("POST"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/clusterlint"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cluster_id: z.string(),
    }),
    body: clusterlint_request,
  }),
  response: z.object({
    run_id: z.string().optional(),
  }),
};

export type get_Kubernetes_get_clusterLintResults = typeof get_Kubernetes_get_clusterLintResults;
export const get_Kubernetes_get_clusterLintResults = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/clusterlint"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      run_id: z.string().optional(),
    }),
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: clusterlint_results,
};

export type post_Kubernetes_add_registry = typeof post_Kubernetes_add_registry;
export const post_Kubernetes_add_registry = {
  method: z.literal("POST"),
  path: z.literal("/v2/kubernetes/registry"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: cluster_registries,
  }),
  response: z.unknown(),
};

export type delete_Kubernetes_remove_registry = typeof delete_Kubernetes_remove_registry;
export const delete_Kubernetes_remove_registry = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/kubernetes/registry"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: cluster_registries,
  }),
  response: z.unknown(),
};

export type get_Kubernetes_get_status_messages = typeof get_Kubernetes_get_status_messages;
export const get_Kubernetes_get_status_messages = {
  method: z.literal("GET"),
  path: z.literal("/v2/kubernetes/clusters/{cluster_id}/status_messages"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      since: z.string().optional(),
    }),
    path: z.object({
      cluster_id: z.string(),
    }),
  }),
  response: z.object({
    messages: z.array(status_messages).optional(),
  }),
};

export type post_LoadBalancers_create = typeof post_LoadBalancers_create;
export const post_LoadBalancers_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/load_balancers"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: load_balancer_create,
  }),
  response: z.object({
    load_balancer: load_balancer.optional(),
  }),
};

export type get_LoadBalancers_list = typeof get_LoadBalancers_list;
export const get_LoadBalancers_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/load_balancers"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      load_balancers: z.array(load_balancer).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_LoadBalancers_get = typeof get_LoadBalancers_get;
export const get_LoadBalancers_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/load_balancers/{lb_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      lb_id: z.string(),
    }),
  }),
  response: z.object({
    load_balancer: load_balancer.optional(),
  }),
};

export type put_LoadBalancers_update = typeof put_LoadBalancers_update;
export const put_LoadBalancers_update = {
  method: z.literal("PUT"),
  path: z.literal("/v2/load_balancers/{lb_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      lb_id: z.string(),
    }),
    body: load_balancer_create,
  }),
  response: z.object({
    load_balancer: load_balancer.optional(),
  }),
};

export type delete_LoadBalancers_delete = typeof delete_LoadBalancers_delete;
export const delete_LoadBalancers_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/load_balancers/{lb_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      lb_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type delete_LoadBalancers_delete_cache = typeof delete_LoadBalancers_delete_cache;
export const delete_LoadBalancers_delete_cache = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/load_balancers/{lb_id}/cache"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      lb_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_LoadBalancers_add_droplets = typeof post_LoadBalancers_add_droplets;
export const post_LoadBalancers_add_droplets = {
  method: z.literal("POST"),
  path: z.literal("/v2/load_balancers/{lb_id}/droplets"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      lb_id: z.string(),
    }),
    body: z.object({
      droplet_ids: z.array(z.number()),
    }),
  }),
  response: z.unknown(),
};

export type delete_LoadBalancers_remove_droplets = typeof delete_LoadBalancers_remove_droplets;
export const delete_LoadBalancers_remove_droplets = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/load_balancers/{lb_id}/droplets"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      lb_id: z.string(),
    }),
    body: z.object({
      droplet_ids: z.array(z.number()),
    }),
  }),
  response: z.unknown(),
};

export type post_LoadBalancers_add_forwardingRules = typeof post_LoadBalancers_add_forwardingRules;
export const post_LoadBalancers_add_forwardingRules = {
  method: z.literal("POST"),
  path: z.literal("/v2/load_balancers/{lb_id}/forwarding_rules"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      lb_id: z.string(),
    }),
    body: z.object({
      forwarding_rules: z.array(forwarding_rule),
    }),
  }),
  response: z.unknown(),
};

export type delete_LoadBalancers_remove_forwardingRules = typeof delete_LoadBalancers_remove_forwardingRules;
export const delete_LoadBalancers_remove_forwardingRules = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/load_balancers/{lb_id}/forwarding_rules"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      lb_id: z.string(),
    }),
    body: z.object({
      forwarding_rules: z.array(forwarding_rule),
    }),
  }),
  response: z.unknown(),
};

export type get_Monitoring_list_alertPolicy = typeof get_Monitoring_list_alertPolicy;
export const get_Monitoring_list_alertPolicy = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/alerts"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(list_alert_policy, z.intersection(pagination, meta)),
};

export type post_Monitoring_create_alertPolicy = typeof post_Monitoring_create_alertPolicy;
export const post_Monitoring_create_alertPolicy = {
  method: z.literal("POST"),
  path: z.literal("/v2/monitoring/alerts"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: alert_policy_request,
  }),
  response: z.object({
    policy: alert_policy.optional(),
  }),
};

export type get_Monitoring_get_alertPolicy = typeof get_Monitoring_get_alertPolicy;
export const get_Monitoring_get_alertPolicy = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/alerts/{alert_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      alert_uuid: z.string(),
    }),
  }),
  response: z.object({
    policy: alert_policy.optional(),
  }),
};

export type put_Monitoring_update_alertPolicy = typeof put_Monitoring_update_alertPolicy;
export const put_Monitoring_update_alertPolicy = {
  method: z.literal("PUT"),
  path: z.literal("/v2/monitoring/alerts/{alert_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      alert_uuid: z.string(),
    }),
    body: alert_policy_request,
  }),
  response: z.object({
    policy: alert_policy.optional(),
  }),
};

export type delete_Monitoring_delete_alertPolicy = typeof delete_Monitoring_delete_alertPolicy;
export const delete_Monitoring_delete_alertPolicy = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/monitoring/alerts/{alert_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      alert_uuid: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Monitoring_get_dropletBandwidthMetrics = typeof get_Monitoring_get_dropletBandwidthMetrics;
export const get_Monitoring_get_dropletBandwidthMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/bandwidth"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      interface: z.union([z.literal("private"), z.literal("public")]),
      direction: z.union([z.literal("inbound"), z.literal("outbound")]),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_DropletCpuMetrics = typeof get_Monitoring_get_DropletCpuMetrics;
export const get_Monitoring_get_DropletCpuMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/cpu"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_dropletFilesystemFreeMetrics = typeof get_Monitoring_get_dropletFilesystemFreeMetrics;
export const get_Monitoring_get_dropletFilesystemFreeMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/filesystem_free"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_dropletFilesystemSizeMetrics = typeof get_Monitoring_get_dropletFilesystemSizeMetrics;
export const get_Monitoring_get_dropletFilesystemSizeMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/filesystem_size"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_dropletLoad1Metrics = typeof get_Monitoring_get_dropletLoad1Metrics;
export const get_Monitoring_get_dropletLoad1Metrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/load_1"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_dropletLoad5Metrics = typeof get_Monitoring_get_dropletLoad5Metrics;
export const get_Monitoring_get_dropletLoad5Metrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/load_5"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_dropletLoad15Metrics = typeof get_Monitoring_get_dropletLoad15Metrics;
export const get_Monitoring_get_dropletLoad15Metrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/load_15"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_dropletMemoryCachedMetrics = typeof get_Monitoring_get_dropletMemoryCachedMetrics;
export const get_Monitoring_get_dropletMemoryCachedMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/memory_cached"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_dropletMemoryFreeMetrics = typeof get_Monitoring_get_dropletMemoryFreeMetrics;
export const get_Monitoring_get_dropletMemoryFreeMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/memory_free"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_dropletMemoryTotalMetrics = typeof get_Monitoring_get_dropletMemoryTotalMetrics;
export const get_Monitoring_get_dropletMemoryTotalMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/memory_total"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_dropletMemoryAvailableMetrics = typeof get_Monitoring_get_dropletMemoryAvailableMetrics;
export const get_Monitoring_get_dropletMemoryAvailableMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet/memory_available"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      host_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_appMemoryPercentageMetrics = typeof get_Monitoring_get_appMemoryPercentageMetrics;
export const get_Monitoring_get_appMemoryPercentageMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/apps/memory_percentage"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      app_id: z.string(),
      app_component: z.union([z.string(), z.undefined()]),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_appCPUPercentageMetrics = typeof get_Monitoring_get_appCPUPercentageMetrics;
export const get_Monitoring_get_appCPUPercentageMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/apps/cpu_percentage"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      app_id: z.string(),
      app_component: z.union([z.string(), z.undefined()]),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_appRestartCountMetrics = typeof get_Monitoring_get_appRestartCountMetrics;
export const get_Monitoring_get_appRestartCountMetrics = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/apps/restart_count"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      app_id: z.string(),
      app_component: z.union([z.string(), z.undefined()]),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_connections_current =
  typeof get_Monitoring_get_lb_frontend_connections_current;
export const get_Monitoring_get_lb_frontend_connections_current = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_connections_current"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_connections_limit = typeof get_Monitoring_get_lb_frontend_connections_limit;
export const get_Monitoring_get_lb_frontend_connections_limit = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_connections_limit"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_cpu_utilization = typeof get_Monitoring_get_lb_frontend_cpu_utilization;
export const get_Monitoring_get_lb_frontend_cpu_utilization = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_cpu_utilization"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_firewall_dropped_bytes =
  typeof get_Monitoring_get_lb_frontend_firewall_dropped_bytes;
export const get_Monitoring_get_lb_frontend_firewall_dropped_bytes = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_firewall_dropped_bytes"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_firewall_dropped_packets =
  typeof get_Monitoring_get_lb_frontend_firewall_dropped_packets;
export const get_Monitoring_get_lb_frontend_firewall_dropped_packets = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_firewall_dropped_packets"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_http_responses = typeof get_Monitoring_get_lb_frontend_http_responses;
export const get_Monitoring_get_lb_frontend_http_responses = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_http_responses"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_http_requests_per_second =
  typeof get_Monitoring_get_lb_frontend_http_requests_per_second;
export const get_Monitoring_get_lb_frontend_http_requests_per_second = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_http_requests_per_second"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_network_throughput_http =
  typeof get_Monitoring_get_lb_frontend_network_throughput_http;
export const get_Monitoring_get_lb_frontend_network_throughput_http = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_network_throughput_http"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_network_throughput_udp =
  typeof get_Monitoring_get_lb_frontend_network_throughput_udp;
export const get_Monitoring_get_lb_frontend_network_throughput_udp = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_network_throughput_udp"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_network_throughput_tcp =
  typeof get_Monitoring_get_lb_frontend_network_throughput_tcp;
export const get_Monitoring_get_lb_frontend_network_throughput_tcp = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_network_throughput_tcp"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_nlb_tcp_network_throughput =
  typeof get_Monitoring_get_lb_frontend_nlb_tcp_network_throughput;
export const get_Monitoring_get_lb_frontend_nlb_tcp_network_throughput = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_nlb_tcp_network_throughput"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_nlb_udp_network_throughput =
  typeof get_Monitoring_get_lb_frontend_nlb_udp_network_throughput;
export const get_Monitoring_get_lb_frontend_nlb_udp_network_throughput = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_nlb_udp_network_throughput"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_tls_connections_current =
  typeof get_Monitoring_get_lb_frontend_tls_connections_current;
export const get_Monitoring_get_lb_frontend_tls_connections_current = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_tls_connections_current"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_tls_connections_limit =
  typeof get_Monitoring_get_lb_frontend_tls_connections_limit;
export const get_Monitoring_get_lb_frontend_tls_connections_limit = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_tls_connections_limit"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_frontend_tls_connections_exceeding_rate_limit =
  typeof get_Monitoring_get_lb_frontend_tls_connections_exceeding_rate_limit;
export const get_Monitoring_get_lb_frontend_tls_connections_exceeding_rate_limit = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/frontend_tls_connections_exceeding_rate_limit"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_http_session_duration_avg =
  typeof get_Monitoring_get_lb_droplets_http_session_duration_avg;
export const get_Monitoring_get_lb_droplets_http_session_duration_avg = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_http_session_duration_avg"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_http_session_duration_50p =
  typeof get_Monitoring_get_lb_droplets_http_session_duration_50p;
export const get_Monitoring_get_lb_droplets_http_session_duration_50p = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_http_session_duration_50p"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_http_session_duration_95p =
  typeof get_Monitoring_get_lb_droplets_http_session_duration_95p;
export const get_Monitoring_get_lb_droplets_http_session_duration_95p = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_http_session_duration_95p"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_http_response_time_avg =
  typeof get_Monitoring_get_lb_droplets_http_response_time_avg;
export const get_Monitoring_get_lb_droplets_http_response_time_avg = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_http_response_time_avg"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_http_response_time_50p =
  typeof get_Monitoring_get_lb_droplets_http_response_time_50p;
export const get_Monitoring_get_lb_droplets_http_response_time_50p = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_http_response_time_50p"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_http_response_time_95p =
  typeof get_Monitoring_get_lb_droplets_http_response_time_95p;
export const get_Monitoring_get_lb_droplets_http_response_time_95p = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_http_response_time_95p"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_http_response_time_99p =
  typeof get_Monitoring_get_lb_droplets_http_response_time_99p;
export const get_Monitoring_get_lb_droplets_http_response_time_99p = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_http_response_time_99p"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_queue_size = typeof get_Monitoring_get_lb_droplets_queue_size;
export const get_Monitoring_get_lb_droplets_queue_size = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_queue_size"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_http_responses = typeof get_Monitoring_get_lb_droplets_http_responses;
export const get_Monitoring_get_lb_droplets_http_responses = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_http_responses"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_connections = typeof get_Monitoring_get_lb_droplets_connections;
export const get_Monitoring_get_lb_droplets_connections = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_connections"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_health_checks = typeof get_Monitoring_get_lb_droplets_health_checks;
export const get_Monitoring_get_lb_droplets_health_checks = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_health_checks"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_lb_droplets_downtime = typeof get_Monitoring_get_lb_droplets_downtime;
export const get_Monitoring_get_lb_droplets_downtime = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/load_balancer/droplets_downtime"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      lb_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_droplet_autoscale_current_instances =
  typeof get_Monitoring_get_droplet_autoscale_current_instances;
export const get_Monitoring_get_droplet_autoscale_current_instances = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet_autoscale/current_instances"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      autoscale_pool_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_droplet_autoscale_target_instances =
  typeof get_Monitoring_get_droplet_autoscale_target_instances;
export const get_Monitoring_get_droplet_autoscale_target_instances = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet_autoscale/target_instances"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      autoscale_pool_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_droplet_autoscale_current_cpu_utilization =
  typeof get_Monitoring_get_droplet_autoscale_current_cpu_utilization;
export const get_Monitoring_get_droplet_autoscale_current_cpu_utilization = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet_autoscale/current_cpu_utilization"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      autoscale_pool_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_droplet_autoscale_target_cpu_utilization =
  typeof get_Monitoring_get_droplet_autoscale_target_cpu_utilization;
export const get_Monitoring_get_droplet_autoscale_target_cpu_utilization = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet_autoscale/target_cpu_utilization"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      autoscale_pool_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_droplet_autoscale_current_memory_utilization =
  typeof get_Monitoring_get_droplet_autoscale_current_memory_utilization;
export const get_Monitoring_get_droplet_autoscale_current_memory_utilization = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet_autoscale/current_memory_utilization"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      autoscale_pool_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type get_Monitoring_get_droplet_autoscale_target_memory_utilization =
  typeof get_Monitoring_get_droplet_autoscale_target_memory_utilization;
export const get_Monitoring_get_droplet_autoscale_target_memory_utilization = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/metrics/droplet_autoscale/target_memory_utilization"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      autoscale_pool_id: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  }),
  response: metrics,
};

export type post_Monitoring_create_destination = typeof post_Monitoring_create_destination;
export const post_Monitoring_create_destination = {
  method: z.literal("POST"),
  path: z.literal("/v2/monitoring/sinks/destinations"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: destination_request,
  }),
  response: z.object({
    destination: destination_omit_credentials.optional(),
  }),
};

export type get_Monitoring_list_destinations = typeof get_Monitoring_list_destinations;
export const get_Monitoring_list_destinations = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/sinks/destinations"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.object({
    destinations: z.array(destination_omit_credentials).optional(),
  }),
};

export type get_Monitoring_get_destination = typeof get_Monitoring_get_destination;
export const get_Monitoring_get_destination = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/sinks/destinations/{destination_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      destination_uuid: z.string(),
    }),
  }),
  response: z.object({
    destination: destination_omit_credentials.optional(),
  }),
};

export type post_Monitoring_update_destination = typeof post_Monitoring_update_destination;
export const post_Monitoring_update_destination = {
  method: z.literal("POST"),
  path: z.literal("/v2/monitoring/sinks/destinations/{destination_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      destination_uuid: z.string(),
    }),
    body: destination_request,
  }),
  response: z.unknown(),
};

export type delete_Monitoring_delete_destination = typeof delete_Monitoring_delete_destination;
export const delete_Monitoring_delete_destination = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/monitoring/sinks/destinations/{destination_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      destination_uuid: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_Monitoring_create_sink = typeof post_Monitoring_create_sink;
export const post_Monitoring_create_sink = {
  method: z.literal("POST"),
  path: z.literal("/v2/monitoring/sinks"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: z.object({
      destination_uuid: z.string().optional(),
      resources: z.array(sink_resource).optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_Monitoring_list_sinks = typeof get_Monitoring_list_sinks;
export const get_Monitoring_list_sinks = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/sinks"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      resource_id: z.string().optional(),
    }),
  }),
  response: z.object({
    sinks: z.array(sinks_response).optional(),
  }),
};

export type get_Monitoring_get_sink = typeof get_Monitoring_get_sink;
export const get_Monitoring_get_sink = {
  method: z.literal("GET"),
  path: z.literal("/v2/monitoring/sinks/{sink_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      sink_uuid: z.string(),
    }),
  }),
  response: z.object({
    sink: sinks_response.optional(),
  }),
};

export type delete_Monitoring_delete_sink = typeof delete_Monitoring_delete_sink;
export const delete_Monitoring_delete_sink = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/monitoring/sinks/{sink_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      sink_uuid: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_PartnerAttachments_list = typeof get_PartnerAttachments_list;
export const get_PartnerAttachments_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/partner_network_connect/attachments"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      partner_attachments: z.array(partner_attachment).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_PartnerAttachments_create = typeof post_PartnerAttachments_create;
export const post_PartnerAttachments_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/partner_network_connect/attachments"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: partner_attachment_writable,
  }),
  response: z.object({
    partner_attachment: partner_attachment.optional(),
  }),
};

export type get_PartnerAttachments_get = typeof get_PartnerAttachments_get;
export const get_PartnerAttachments_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/partner_network_connect/attachments/{pa_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      pa_id: z.string(),
    }),
  }),
  response: z.object({
    partner_attachment: partner_attachment.optional(),
  }),
};

export type patch_PartnerAttachments_patch = typeof patch_PartnerAttachments_patch;
export const patch_PartnerAttachments_patch = {
  method: z.literal("PATCH"),
  path: z.literal("/v2/partner_network_connect/attachments/{pa_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      pa_id: z.string(),
    }),
    body: partner_attachment_updatable,
  }),
  response: z.object({
    partner_attachment: partner_attachment.optional(),
  }),
};

export type delete_PartnerAttachments_delete = typeof delete_PartnerAttachments_delete;
export const delete_PartnerAttachments_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/partner_network_connect/attachments/{pa_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      pa_id: z.string(),
    }),
  }),
  response: z.object({
    partner_attachment: partner_attachment.optional(),
  }),
};

export type get_PartnerAttachments_get_bgp_auth_key = typeof get_PartnerAttachments_get_bgp_auth_key;
export const get_PartnerAttachments_get_bgp_auth_key = {
  method: z.literal("GET"),
  path: z.literal("/v2/partner_network_connect/attachments/{pa_id}/bgp_auth_key"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      pa_id: z.string(),
    }),
  }),
  response: z.object({
    bgp_auth_key: z.unknown().optional(),
  }),
};

export type get_PartnerAttachments_list_remote_routes = typeof get_PartnerAttachments_list_remote_routes;
export const get_PartnerAttachments_list_remote_routes = {
  method: z.literal("GET"),
  path: z.literal("/v2/partner_network_connect/attachments/{pa_id}/remote_routes"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      pa_id: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      remote_routes: z.array(partner_attachment_remote_route).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type put_PartnerAttachments_update_remote_routes = typeof put_PartnerAttachments_update_remote_routes;
export const put_PartnerAttachments_update_remote_routes = {
  method: z.literal("PUT"),
  path: z.literal("/v2/partner_network_connect/attachments/{pa_id}/remote_routes"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      pa_id: z.string(),
    }),
    body: z.object({
      remote_routes: z.array(partner_attachment_remote_route_writable).optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      remote_routes: z.array(partner_attachment_remote_route).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_PartnerAttachments_get_service_key = typeof get_PartnerAttachments_get_service_key;
export const get_PartnerAttachments_get_service_key = {
  method: z.literal("GET"),
  path: z.literal("/v2/partner_network_connect/attachments/{pa_id}/service_key"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      pa_id: z.string(),
    }),
  }),
  response: z.object({
    service_key: z.unknown().optional(),
  }),
};

export type post_PartnerAttachments_create_service_key = typeof post_PartnerAttachments_create_service_key;
export const post_PartnerAttachments_create_service_key = {
  method: z.literal("POST"),
  path: z.literal("/v2/partner_network_connect/attachments/{pa_id}/service_key"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      pa_id: z.string(),
    }),
  }),
  response: z.object({
    service_key: z.unknown().optional(),
  }),
};

export type get_Projects_list = typeof get_Projects_list;
export const get_Projects_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/projects"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      projects: z.array(project).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Projects_create = typeof post_Projects_create;
export const post_Projects_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/projects"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: project_base,
  }),
  response: z.object({
    project: project.optional(),
  }),
};

export type get_Projects_get_default = typeof get_Projects_get_default;
export const get_Projects_get_default = {
  method: z.literal("GET"),
  path: z.literal("/v2/projects/default"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.object({
    project: project.optional(),
  }),
};

export type put_Projects_update_default = typeof put_Projects_update_default;
export const put_Projects_update_default = {
  method: z.literal("PUT"),
  path: z.literal("/v2/projects/default"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: project,
  }),
  response: z.object({
    project: project.optional(),
  }),
};

export type patch_Projects_patch_default = typeof patch_Projects_patch_default;
export const patch_Projects_patch_default = {
  method: z.literal("PATCH"),
  path: z.literal("/v2/projects/default"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: project,
  }),
  response: z.object({
    project: project.optional(),
  }),
};

export type get_Projects_get = typeof get_Projects_get;
export const get_Projects_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/projects/{project_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      project_id: z.string(),
    }),
  }),
  response: z.object({
    project: project.optional(),
  }),
};

export type put_Projects_update = typeof put_Projects_update;
export const put_Projects_update = {
  method: z.literal("PUT"),
  path: z.literal("/v2/projects/{project_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      project_id: z.string(),
    }),
    body: project,
  }),
  response: z.object({
    project: project.optional(),
  }),
};

export type patch_Projects_patch = typeof patch_Projects_patch;
export const patch_Projects_patch = {
  method: z.literal("PATCH"),
  path: z.literal("/v2/projects/{project_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      project_id: z.string(),
    }),
    body: project,
  }),
  response: z.object({
    project: project.optional(),
  }),
};

export type delete_Projects_delete = typeof delete_Projects_delete;
export const delete_Projects_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/projects/{project_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      project_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Projects_list_resources = typeof get_Projects_list_resources;
export const get_Projects_list_resources = {
  method: z.literal("GET"),
  path: z.literal("/v2/projects/{project_id}/resources"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      project_id: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      resources: z.array(resource).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Projects_assign_resources = typeof post_Projects_assign_resources;
export const post_Projects_assign_resources = {
  method: z.literal("POST"),
  path: z.literal("/v2/projects/{project_id}/resources"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      project_id: z.string(),
    }),
    body: project_assignment,
  }),
  response: z.object({
    resources: z.array(resource).optional(),
  }),
};

export type get_Projects_list_resources_default = typeof get_Projects_list_resources_default;
export const get_Projects_list_resources_default = {
  method: z.literal("GET"),
  path: z.literal("/v2/projects/default/resources"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.intersection(
    z.object({
      resources: z.array(resource).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Projects_assign_resources_default = typeof post_Projects_assign_resources_default;
export const post_Projects_assign_resources_default = {
  method: z.literal("POST"),
  path: z.literal("/v2/projects/default/resources"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: project_assignment,
  }),
  response: z.object({
    resources: z.array(resource).optional(),
  }),
};

export type get_Regions_list = typeof get_Regions_list;
export const get_Regions_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/regions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      regions: z.array(region),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Registry_get = typeof get_Registry_get;
export const get_Registry_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/registry"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.object({
    registry: registry.optional(),
  }),
};

export type post_Registry_create = typeof post_Registry_create;
export const post_Registry_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/registry"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: registry_create,
  }),
  response: z.object({
    registry: registry.optional(),
  }),
};

export type delete_Registry_delete = typeof delete_Registry_delete;
export const delete_Registry_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/registry"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_Registry_get_subscription = typeof get_Registry_get_subscription;
export const get_Registry_get_subscription = {
  method: z.literal("GET"),
  path: z.literal("/v2/registry/subscription"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.object({
    subscription: subscription.optional(),
  }),
};

export type post_Registry_update_subscription = typeof post_Registry_update_subscription;
export const post_Registry_update_subscription = {
  method: z.literal("POST"),
  path: z.literal("/v2/registry/subscription"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: z.object({
      tier_slug: z.union([z.literal("starter"), z.literal("basic"), z.literal("professional")]).optional(),
    }),
  }),
  response: z.object({
    subscription: subscription.optional(),
  }),
};

export type get_Registry_get_dockerCredentials = typeof get_Registry_get_dockerCredentials;
export const get_Registry_get_dockerCredentials = {
  method: z.literal("GET"),
  path: z.literal("/v2/registry/docker-credentials"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      expiry_seconds: z.number().optional(),
      read_write: z.boolean().optional(),
    }),
  }),
  response: docker_credentials,
};

export type post_Registry_validate_name = typeof post_Registry_validate_name;
export const post_Registry_validate_name = {
  method: z.literal("POST"),
  path: z.literal("/v2/registry/validate-name"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: validate_registry,
  }),
  response: z.unknown(),
};

export type get_Registry_list_repositoriesV2 = typeof get_Registry_list_repositoriesV2;
export const get_Registry_list_repositoriesV2 = {
  method: z.literal("GET"),
  path: z.literal("/v2/registry/{registry_name}/repositoriesV2"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
      page_token: z.string().optional(),
    }),
    path: z.object({
      registry_name: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      repositories: z.array(repository_v2).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Registry_list_repositoryTags = typeof get_Registry_list_repositoryTags;
export const get_Registry_list_repositoryTags = {
  method: z.literal("GET"),
  path: z.literal("/v2/registry/{registry_name}/repositories/{repository_name}/tags"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      registry_name: z.string(),
      repository_name: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      tags: z.array(repository_tag).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type delete_Registry_delete_repositoryTag = typeof delete_Registry_delete_repositoryTag;
export const delete_Registry_delete_repositoryTag = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/registry/{registry_name}/repositories/{repository_name}/tags/{repository_tag}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      registry_name: z.string(),
      repository_name: z.string(),
      repository_tag: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Registry_list_repositoryManifests = typeof get_Registry_list_repositoryManifests;
export const get_Registry_list_repositoryManifests = {
  method: z.literal("GET"),
  path: z.literal("/v2/registry/{registry_name}/repositories/{repository_name}/digests"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      registry_name: z.string(),
      repository_name: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      manifests: z.array(repository_manifest).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type delete_Registry_delete_repositoryManifest = typeof delete_Registry_delete_repositoryManifest;
export const delete_Registry_delete_repositoryManifest = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/registry/{registry_name}/repositories/{repository_name}/digests/{manifest_digest}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      registry_name: z.string(),
      repository_name: z.string(),
      manifest_digest: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_Registry_run_garbageCollection = typeof post_Registry_run_garbageCollection;
export const post_Registry_run_garbageCollection = {
  method: z.literal("POST"),
  path: z.literal("/v2/registry/{registry_name}/garbage-collection"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      registry_name: z.string(),
    }),
  }),
  response: z.object({
    garbage_collection: garbage_collection.optional(),
  }),
};

export type get_Registry_get_garbageCollection = typeof get_Registry_get_garbageCollection;
export const get_Registry_get_garbageCollection = {
  method: z.literal("GET"),
  path: z.literal("/v2/registry/{registry_name}/garbage-collection"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      registry_name: z.string(),
    }),
  }),
  response: z.object({
    garbage_collection: garbage_collection.optional(),
  }),
};

export type get_Registry_list_garbageCollections = typeof get_Registry_list_garbageCollections;
export const get_Registry_list_garbageCollections = {
  method: z.literal("GET"),
  path: z.literal("/v2/registry/{registry_name}/garbage-collections"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      registry_name: z.string(),
    }),
  }),
  response: z.object({
    garbage_collections: z.array(garbage_collection).optional(),
  }),
};

export type put_Registry_update_garbageCollection = typeof put_Registry_update_garbageCollection;
export const put_Registry_update_garbageCollection = {
  method: z.literal("PUT"),
  path: z.literal("/v2/registry/{registry_name}/garbage-collection/{garbage_collection_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      registry_name: z.string(),
      garbage_collection_uuid: z.string(),
    }),
    body: update_registry,
  }),
  response: z.object({
    garbage_collection: garbage_collection.optional(),
  }),
};

export type get_Registry_get_options = typeof get_Registry_get_options;
export const get_Registry_get_options = {
  method: z.literal("GET"),
  path: z.literal("/v2/registry/options"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.object({
    options: z
      .object({
        available_regions: z.array(z.string()).optional(),
        subscription_tiers: z.array(z.intersection(subscription_tier_base, subscription_tier_extended)).optional(),
      })
      .optional(),
  }),
};

export type get_Droplets_list_neighborsIds = typeof get_Droplets_list_neighborsIds;
export const get_Droplets_list_neighborsIds = {
  method: z.literal("GET"),
  path: z.literal("/v2/reports/droplet_neighbors_ids"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: neighbor_ids,
};

export type get_ReservedIPs_list = typeof get_ReservedIPs_list;
export const get_ReservedIPs_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/reserved_ips"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      reserved_ips: z.array(reserved_ip).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_ReservedIPs_create = typeof post_ReservedIPs_create;
export const post_ReservedIPs_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/reserved_ips"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: reserved_ip_create,
  }),
  response: z.object({
    reserved_ip: reserved_ip.optional(),
    links: z
      .object({
        droplets: z.array(action_link).optional(),
        actions: z.array(action_link).optional(),
      })
      .optional(),
  }),
};

export type get_ReservedIPs_get = typeof get_ReservedIPs_get;
export const get_ReservedIPs_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/reserved_ips/{reserved_ip}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      reserved_ip: z.string(),
    }),
  }),
  response: z.object({
    reserved_ip: reserved_ip.optional(),
  }),
};

export type delete_ReservedIPs_delete = typeof delete_ReservedIPs_delete;
export const delete_ReservedIPs_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/reserved_ips/{reserved_ip}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      reserved_ip: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ReservedIPsActions_list = typeof get_ReservedIPsActions_list;
export const get_ReservedIPsActions_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/reserved_ips/{reserved_ip}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      reserved_ip: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      actions: z.array(action).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_ReservedIPsActions_post = typeof post_ReservedIPsActions_post;
export const post_ReservedIPsActions_post = {
  method: z.literal("POST"),
  path: z.literal("/v2/reserved_ips/{reserved_ip}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      reserved_ip: z.string(),
    }),
    body: z.union([
      reserved_ip_action_unassign,
      reserved_ip_action_assign,
      z.array(z.union([reserved_ip_action_unassign, reserved_ip_action_assign])),
    ]),
  }),
  response: z.object({
    action: z
      .intersection(
        action,
        z.object({
          project_id: z.string().optional(),
        }),
      )
      .optional(),
  }),
};

export type get_ReservedIPsActions_get = typeof get_ReservedIPsActions_get;
export const get_ReservedIPsActions_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/reserved_ips/{reserved_ip}/actions/{action_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      reserved_ip: z.string(),
      action_id: z.number(),
    }),
  }),
  response: z.object({
    action: z
      .intersection(
        action,
        z.object({
          project_id: z.string().optional(),
        }),
      )
      .optional(),
  }),
};

export type get_ReservedIPv6_list = typeof get_ReservedIPv6_list;
export const get_ReservedIPv6_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/reserved_ipv6"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(reserved_ipv6_list, z.intersection(pagination, meta)),
};

export type post_ReservedIPv6_create = typeof post_ReservedIPv6_create;
export const post_ReservedIPv6_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/reserved_ipv6"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: reserved_ipv6_create,
  }),
  response: z.object({
    reserved_ipv6: z
      .object({
        ip: z.string().optional(),
        region_slug: z.string().optional(),
        reserved_at: z.string().optional(),
      })
      .optional(),
  }),
};

export type get_ReservedIPv6_get = typeof get_ReservedIPv6_get;
export const get_ReservedIPv6_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/reserved_ipv6/{reserved_ipv6}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      reserved_ipv6: z.string(),
    }),
  }),
  response: z.object({
    reserved_ipv6: reserved_ipv6.optional(),
  }),
};

export type delete_ReservedIPv6_delete = typeof delete_ReservedIPv6_delete;
export const delete_ReservedIPv6_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/reserved_ipv6/{reserved_ipv6}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      reserved_ipv6: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_ReservedIPv6Actions_post = typeof post_ReservedIPv6Actions_post;
export const post_ReservedIPv6Actions_post = {
  method: z.literal("POST"),
  path: z.literal("/v2/reserved_ipv6/{reserved_ipv6}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      reserved_ipv6: z.string(),
    }),
    body: z.union([
      reserved_ipv6_action_unassign,
      reserved_ipv6_action_assign,
      z.array(z.union([reserved_ipv6_action_unassign, reserved_ipv6_action_assign])),
    ]),
  }),
  response: z.object({
    action: z
      .intersection(
        action,
        z.object({
          resource_id: z.number().optional(),
          resource_type: z.string().optional(),
          region_slug: z.string().optional(),
        }),
      )
      .optional(),
  }),
};

export type get_Sizes_list = typeof get_Sizes_list;
export const get_Sizes_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/sizes"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      sizes: z.array(size),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Snapshots_list = typeof get_Snapshots_list;
export const get_Snapshots_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/snapshots"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
      resource_type: z.union([z.literal("droplet"), z.literal("volume")]).optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      snapshots: z.array(snapshots).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Snapshots_get = typeof get_Snapshots_get;
export const get_Snapshots_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/snapshots/{snapshot_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      snapshot_id: z.union([z.number(), z.string(), z.array(z.union([z.number(), z.string()]))]),
    }),
  }),
  response: z.object({
    snapshot: snapshots.optional(),
  }),
};

export type delete_Snapshots_delete = typeof delete_Snapshots_delete;
export const delete_Snapshots_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/snapshots/{snapshot_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      snapshot_id: z.union([z.number(), z.string(), z.array(z.union([z.number(), z.string()]))]),
    }),
  }),
  response: z.unknown(),
};

export type get_SpacesKey_list = typeof get_SpacesKey_list;
export const get_SpacesKey_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/spaces/keys"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
      sort: z.string().optional(),
      sort_direction: z.string().optional(),
      name: z.string().optional(),
      bucket: z.string().optional(),
      permission: z.string().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      keys: z.array(key).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_SpacesKey_create = typeof post_SpacesKey_create;
export const post_SpacesKey_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/spaces/keys"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: key,
  }),
  response: z.object({
    key: key_create_response.optional(),
  }),
};

export type get_SpacesKey_get = typeof get_SpacesKey_get;
export const get_SpacesKey_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/spaces/keys/{access_key}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      access_key: z.string(),
    }),
  }),
  response: z.object({
    keys: z.array(key).optional(),
  }),
};

export type delete_SpacesKey_delete = typeof delete_SpacesKey_delete;
export const delete_SpacesKey_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/spaces/keys/{access_key}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      access_key: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type put_SpacesKey_update = typeof put_SpacesKey_update;
export const put_SpacesKey_update = {
  method: z.literal("PUT"),
  path: z.literal("/v2/spaces/keys/{access_key}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      access_key: z.string(),
    }),
    body: key,
  }),
  response: z.object({
    key: key.optional(),
  }),
};

export type patch_SpacesKey_patch = typeof patch_SpacesKey_patch;
export const patch_SpacesKey_patch = {
  method: z.literal("PATCH"),
  path: z.literal("/v2/spaces/keys/{access_key}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      access_key: z.string(),
    }),
    body: key,
  }),
  response: z.object({
    key: key.optional(),
  }),
};

export type get_Tags_list = typeof get_Tags_list;
export const get_Tags_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/tags"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      tags: z.array(tags).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Tags_create = typeof post_Tags_create;
export const post_Tags_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/tags"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: tags,
  }),
  response: z.object({
    tag: tags.optional(),
  }),
};

export type get_Tags_get = typeof get_Tags_get;
export const get_Tags_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/tags/{tag_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      tag_id: z.string(),
    }),
  }),
  response: z.object({
    tag: tags.optional(),
  }),
};

export type delete_Tags_delete = typeof delete_Tags_delete;
export const delete_Tags_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/tags/{tag_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      tag_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_Tags_assign_resources = typeof post_Tags_assign_resources;
export const post_Tags_assign_resources = {
  method: z.literal("POST"),
  path: z.literal("/v2/tags/{tag_id}/resources"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      tag_id: z.string(),
    }),
    body: tags_resource,
  }),
  response: z.unknown(),
};

export type delete_Tags_unassign_resources = typeof delete_Tags_unassign_resources;
export const delete_Tags_unassign_resources = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/tags/{tag_id}/resources"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      tag_id: z.string(),
    }),
    body: tags_resource,
  }),
  response: z.unknown(),
};

export type get_Volumes_list = typeof get_Volumes_list;
export const get_Volumes_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/volumes"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      name: z.string().optional(),
      region: z
        .union([
          z.literal("ams1"),
          z.literal("ams2"),
          z.literal("ams3"),
          z.literal("blr1"),
          z.literal("fra1"),
          z.literal("lon1"),
          z.literal("nyc1"),
          z.literal("nyc2"),
          z.literal("nyc3"),
          z.literal("sfo1"),
          z.literal("sfo2"),
          z.literal("sfo3"),
          z.literal("sgp1"),
          z.literal("tor1"),
          z.literal("syd1"),
        ])
        .optional(),
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      volumes: z.array(volume_full),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Volumes_create = typeof post_Volumes_create;
export const post_Volumes_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/volumes"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: z.union([volumes_ext4, volumes_xfs, z.array(z.union([volumes_ext4, volumes_xfs]))]),
  }),
  response: z.object({
    volume: volume_full.optional(),
  }),
};

export type delete_Volumes_delete_byName = typeof delete_Volumes_delete_byName;
export const delete_Volumes_delete_byName = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/volumes"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      name: z.string().optional(),
      region: z
        .union([
          z.literal("ams1"),
          z.literal("ams2"),
          z.literal("ams3"),
          z.literal("blr1"),
          z.literal("fra1"),
          z.literal("lon1"),
          z.literal("nyc1"),
          z.literal("nyc2"),
          z.literal("nyc3"),
          z.literal("sfo1"),
          z.literal("sfo2"),
          z.literal("sfo3"),
          z.literal("sgp1"),
          z.literal("tor1"),
          z.literal("syd1"),
        ])
        .optional(),
    }),
  }),
  response: z.unknown(),
};

export type post_VolumeActions_post = typeof post_VolumeActions_post;
export const post_VolumeActions_post = {
  method: z.literal("POST"),
  path: z.literal("/v2/volumes/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    body: z.union([
      volume_action_post_attach,
      volume_action_post_detach,
      z.array(z.union([volume_action_post_attach, volume_action_post_detach])),
    ]),
  }),
  response: z.object({
    action: volumeAction.optional(),
  }),
};

export type get_VolumeSnapshots_get_byId = typeof get_VolumeSnapshots_get_byId;
export const get_VolumeSnapshots_get_byId = {
  method: z.literal("GET"),
  path: z.literal("/v2/volumes/snapshots/{snapshot_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      snapshot_id: z.string(),
    }),
  }),
  response: z.object({
    snapshot: snapshots.optional(),
  }),
};

export type delete_VolumeSnapshots_delete_byId = typeof delete_VolumeSnapshots_delete_byId;
export const delete_VolumeSnapshots_delete_byId = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/volumes/snapshots/{snapshot_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      snapshot_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Volumes_get = typeof get_Volumes_get;
export const get_Volumes_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/volumes/{volume_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      volume_id: z.string(),
    }),
  }),
  response: z.object({
    volume: volume_full.optional(),
  }),
};

export type delete_Volumes_delete = typeof delete_Volumes_delete;
export const delete_Volumes_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/volumes/{volume_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      volume_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_VolumeActions_list = typeof get_VolumeActions_list;
export const get_VolumeActions_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/volumes/{volume_id}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      volume_id: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      actions: z.array(volumeAction).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_VolumeActions_post_byId = typeof post_VolumeActions_post_byId;
export const post_VolumeActions_post_byId = {
  method: z.literal("POST"),
  path: z.literal("/v2/volumes/{volume_id}/actions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      volume_id: z.string(),
    }),
    body: z.union([
      volume_action_post_attach,
      volume_action_post_detach,
      volume_action_post_resize,
      z.array(z.union([volume_action_post_attach, volume_action_post_detach, volume_action_post_resize])),
    ]),
  }),
  response: z.object({
    action: volumeAction.optional(),
  }),
};

export type get_VolumeActions_get = typeof get_VolumeActions_get;
export const get_VolumeActions_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/volumes/{volume_id}/actions/{action_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      volume_id: z.string(),
      action_id: z.number(),
    }),
  }),
  response: z.object({
    action: volumeAction.optional(),
  }),
};

export type get_VolumeSnapshots_list = typeof get_VolumeSnapshots_list;
export const get_VolumeSnapshots_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/volumes/{volume_id}/snapshots"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      volume_id: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      snapshots: z.array(snapshots).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_VolumeSnapshots_create = typeof post_VolumeSnapshots_create;
export const post_VolumeSnapshots_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/volumes/{volume_id}/snapshots"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      volume_id: z.string(),
    }),
    body: z.object({
      name: z.string(),
      tags: z.union([tags_array, z.undefined()]).optional(),
    }),
  }),
  response: z.object({
    snapshot: snapshots.optional(),
  }),
};

export type get_Vpcs_list = typeof get_Vpcs_list;
export const get_Vpcs_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/vpcs"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      vpcs: z.array(vpc).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Vpcs_create = typeof post_Vpcs_create;
export const post_Vpcs_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/vpcs"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: z.intersection(vpc_updatable, vpc_create),
  }),
  response: z.object({
    vpc: vpc.optional(),
  }),
};

export type get_Vpcs_get = typeof get_Vpcs_get;
export const get_Vpcs_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/vpcs/{vpc_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      vpc_id: z.string(),
    }),
  }),
  response: z.object({
    vpc: vpc.optional(),
  }),
};

export type put_Vpcs_update = typeof put_Vpcs_update;
export const put_Vpcs_update = {
  method: z.literal("PUT"),
  path: z.literal("/v2/vpcs/{vpc_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      vpc_id: z.string(),
    }),
    body: z.intersection(vpc_updatable, vpc_default),
  }),
  response: z.object({
    vpc: vpc.optional(),
  }),
};

export type patch_Vpcs_patch = typeof patch_Vpcs_patch;
export const patch_Vpcs_patch = {
  method: z.literal("PATCH"),
  path: z.literal("/v2/vpcs/{vpc_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      vpc_id: z.string(),
    }),
    body: z.intersection(vpc_updatable, vpc_default),
  }),
  response: z.object({
    vpc: vpc.optional(),
  }),
};

export type delete_Vpcs_delete = typeof delete_Vpcs_delete;
export const delete_Vpcs_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/vpcs/{vpc_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      vpc_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Vpcs_list_members = typeof get_Vpcs_list_members;
export const get_Vpcs_list_members = {
  method: z.literal("GET"),
  path: z.literal("/v2/vpcs/{vpc_id}/members"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      resource_type: z.string().optional(),
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      vpc_id: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      members: z.array(vpc_member).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type get_Vpcs_list_peerings = typeof get_Vpcs_list_peerings;
export const get_Vpcs_list_peerings = {
  method: z.literal("GET"),
  path: z.literal("/v2/vpcs/{vpc_id}/peerings"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      vpc_id: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      peerings: z.array(vpc_peering).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Vpcs_create_peerings = typeof post_Vpcs_create_peerings;
export const post_Vpcs_create_peerings = {
  method: z.literal("POST"),
  path: z.literal("/v2/vpcs/{vpc_id}/peerings"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      vpc_id: z.string(),
    }),
    body: z.object({
      name: z.string(),
      vpc_id: z.string(),
    }),
  }),
  response: z.object({
    peering: vpc_peering.optional(),
  }),
};

export type patch_Vpcs_patch_peerings = typeof patch_Vpcs_patch_peerings;
export const patch_Vpcs_patch_peerings = {
  method: z.literal("PATCH"),
  path: z.literal("/v2/vpcs/{vpc_id}/peerings/{vpc_peering_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      vpc_id: z.string(),
      vpc_peering_id: z.string(),
    }),
    body: vpc_peering_updatable,
  }),
  response: z.object({
    peering: vpc_peering.optional(),
  }),
};

export type get_VpcPeerings_list = typeof get_VpcPeerings_list;
export const get_VpcPeerings_list = {
  method: z.literal("GET"),
  path: z.literal("/v2/vpc_peerings"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
      region: z
        .union([
          z.literal("ams1"),
          z.literal("ams2"),
          z.literal("ams3"),
          z.literal("blr1"),
          z.literal("fra1"),
          z.literal("lon1"),
          z.literal("nyc1"),
          z.literal("nyc2"),
          z.literal("nyc3"),
          z.literal("sfo1"),
          z.literal("sfo2"),
          z.literal("sfo3"),
          z.literal("sgp1"),
          z.literal("tor1"),
          z.literal("syd1"),
        ])
        .optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      vpc_peerings: z.array(vpc_peering).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_VpcPeerings_create = typeof post_VpcPeerings_create;
export const post_VpcPeerings_create = {
  method: z.literal("POST"),
  path: z.literal("/v2/vpc_peerings"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: z.intersection(vpc_peering_updatable, vpc_peering_create),
  }),
  response: z.object({
    vpc_peering: vpc_peering.optional(),
  }),
};

export type get_VpcPeerings_get = typeof get_VpcPeerings_get;
export const get_VpcPeerings_get = {
  method: z.literal("GET"),
  path: z.literal("/v2/vpc_peerings/{vpc_peering_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      vpc_peering_id: z.string(),
    }),
  }),
  response: z.object({
    vpc_peering: vpc_peering.optional(),
  }),
};

export type patch_VpcPeerings_patch = typeof patch_VpcPeerings_patch;
export const patch_VpcPeerings_patch = {
  method: z.literal("PATCH"),
  path: z.literal("/v2/vpc_peerings/{vpc_peering_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      vpc_peering_id: z.string(),
    }),
    body: vpc_peering_updatable,
  }),
  response: z.object({
    vpc_peering: vpc_peering.optional(),
  }),
};

export type delete_VpcPeerings_delete = typeof delete_VpcPeerings_delete;
export const delete_VpcPeerings_delete = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/vpc_peerings/{vpc_peering_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      vpc_peering_id: z.string(),
    }),
  }),
  response: z.object({
    vpc_peering: vpc_peering.optional(),
  }),
};

export type get_Uptime_list_checks = typeof get_Uptime_list_checks;
export const get_Uptime_list_checks = {
  method: z.literal("GET"),
  path: z.literal("/v2/uptime/checks"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
  }),
  response: z.intersection(
    z.object({
      checks: z.array(check).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Uptime_create_check = typeof post_Uptime_create_check;
export const post_Uptime_create_check = {
  method: z.literal("POST"),
  path: z.literal("/v2/uptime/checks"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: check_updatable,
  }),
  response: z.object({
    check: check.optional(),
  }),
};

export type get_Uptime_get_check = typeof get_Uptime_get_check;
export const get_Uptime_get_check = {
  method: z.literal("GET"),
  path: z.literal("/v2/uptime/checks/{check_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      check_id: z.string(),
    }),
  }),
  response: z.object({
    check: check.optional(),
  }),
};

export type put_Uptime_update_check = typeof put_Uptime_update_check;
export const put_Uptime_update_check = {
  method: z.literal("PUT"),
  path: z.literal("/v2/uptime/checks/{check_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      check_id: z.string(),
    }),
    body: check_updatable,
  }),
  response: z.object({
    check: check.optional(),
  }),
};

export type delete_Uptime_delete_check = typeof delete_Uptime_delete_check;
export const delete_Uptime_delete_check = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/uptime/checks/{check_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      check_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Uptime_get_checkState = typeof get_Uptime_get_checkState;
export const get_Uptime_get_checkState = {
  method: z.literal("GET"),
  path: z.literal("/v2/uptime/checks/{check_id}/state"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      check_id: z.string(),
    }),
  }),
  response: z.object({
    state: state.optional(),
  }),
};

export type get_Uptime_list_alerts = typeof get_Uptime_list_alerts;
export const get_Uptime_list_alerts = {
  method: z.literal("GET"),
  path: z.literal("/v2/uptime/checks/{check_id}/alerts"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    path: z.object({
      check_id: z.string(),
    }),
  }),
  response: z.intersection(
    z.object({
      alerts: z.array(alert).optional(),
    }),
    z.intersection(pagination, meta),
  ),
};

export type post_Uptime_create_alert = typeof post_Uptime_create_alert;
export const post_Uptime_create_alert = {
  method: z.literal("POST"),
  path: z.literal("/v2/uptime/checks/{check_id}/alerts"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      check_id: z.string(),
    }),
    body: alert,
  }),
  response: z.object({
    alert: alert.optional(),
  }),
};

export type get_Uptime_get_alert = typeof get_Uptime_get_alert;
export const get_Uptime_get_alert = {
  method: z.literal("GET"),
  path: z.literal("/v2/uptime/checks/{check_id}/alerts/{alert_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      check_id: z.string(),
      alert_id: z.string(),
    }),
  }),
  response: z.object({
    alert: alert.optional(),
  }),
};

export type put_Uptime_update_alert = typeof put_Uptime_update_alert;
export const put_Uptime_update_alert = {
  method: z.literal("PUT"),
  path: z.literal("/v2/uptime/checks/{check_id}/alerts/{alert_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      check_id: z.string(),
      alert_id: z.string(),
    }),
    body: alert_updatable,
  }),
  response: z.object({
    alert: alert.optional(),
  }),
};

export type delete_Uptime_delete_alert = typeof delete_Uptime_delete_alert;
export const delete_Uptime_delete_alert = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/uptime/checks/{check_id}/alerts/{alert_id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      check_id: z.string(),
      alert_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Genai_list_agents = typeof get_Genai_list_agents;
export const get_Genai_list_agents = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/agents"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      only_deployed: z.boolean().optional(),
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
  }),
  response: apiListAgentsOutputPublic,
};

export type post_Genai_create_agent = typeof post_Genai_create_agent;
export const post_Genai_create_agent = {
  method: z.literal("POST"),
  path: z.literal("/v2/gen-ai/agents"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: apiCreateAgentInputPublic,
  }),
  response: apiCreateAgentOutput,
};

export type get_Genai_list_agent_api_keys = typeof get_Genai_list_agent_api_keys;
export const get_Genai_list_agent_api_keys = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/agents/{agent_uuid}/api_keys"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
    path: z.object({
      agent_uuid: z.string(),
    }),
  }),
  response: apiListAgentAPIKeysOutput,
};

export type post_Genai_create_agent_api_key = typeof post_Genai_create_agent_api_key;
export const post_Genai_create_agent_api_key = {
  method: z.literal("POST"),
  path: z.literal("/v2/gen-ai/agents/{agent_uuid}/api_keys"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      agent_uuid: z.string(),
    }),
    body: apiCreateAgentAPIKeyInputPublic,
  }),
  response: apiCreateAgentAPIKeyOutput,
};

export type put_Genai_update_agent_api_key = typeof put_Genai_update_agent_api_key;
export const put_Genai_update_agent_api_key = {
  method: z.literal("PUT"),
  path: z.literal("/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      agent_uuid: z.string(),
      api_key_uuid: z.string(),
    }),
    body: apiUpdateAgentAPIKeyInputPublic,
  }),
  response: apiUpdateAgentAPIKeyOutput,
};

export type delete_Genai_delete_agent_api_key = typeof delete_Genai_delete_agent_api_key;
export const delete_Genai_delete_agent_api_key = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      agent_uuid: z.string(),
      api_key_uuid: z.string(),
    }),
  }),
  response: apiDeleteAgentAPIKeyOutput,
};

export type put_Genai_regenerate_agent_api_key = typeof put_Genai_regenerate_agent_api_key;
export const put_Genai_regenerate_agent_api_key = {
  method: z.literal("PUT"),
  path: z.literal("/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}/regenerate"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      agent_uuid: z.string(),
      api_key_uuid: z.string(),
    }),
  }),
  response: apiRegenerateAgentAPIKeyOutput,
};

export type post_Genai_attach_agent_function = typeof post_Genai_attach_agent_function;
export const post_Genai_attach_agent_function = {
  method: z.literal("POST"),
  path: z.literal("/v2/gen-ai/agents/{agent_uuid}/functions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      agent_uuid: z.string(),
    }),
    body: apiLinkAgentFunctionInputPublic,
  }),
  response: apiLinkAgentFunctionOutput,
};

export type put_Genai_update_agent_function = typeof put_Genai_update_agent_function;
export const put_Genai_update_agent_function = {
  method: z.literal("PUT"),
  path: z.literal("/v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      agent_uuid: z.string(),
      function_uuid: z.string(),
    }),
    body: apiUpdateAgentFunctionInputPublic,
  }),
  response: apiUpdateAgentFunctionOutput,
};

export type delete_Genai_detach_agent_function = typeof delete_Genai_detach_agent_function;
export const delete_Genai_detach_agent_function = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      agent_uuid: z.string(),
      function_uuid: z.string(),
    }),
  }),
  response: apiUnlinkAgentFunctionOutput,
};

export type post_Genai_attach_knowledge_base = typeof post_Genai_attach_knowledge_base;
export const post_Genai_attach_knowledge_base = {
  method: z.literal("POST"),
  path: z.literal("/v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      agent_uuid: z.string(),
      knowledge_base_uuid: z.string(),
    }),
  }),
  response: apiLinkKnowledgeBaseOutput,
};

export type delete_Genai_detach_knowledge_base = typeof delete_Genai_detach_knowledge_base;
export const delete_Genai_detach_knowledge_base = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      agent_uuid: z.string(),
      knowledge_base_uuid: z.string(),
    }),
  }),
  response: apiUnlinkKnowledgeBaseOutput,
};

export type post_Genai_attach_agent = typeof post_Genai_attach_agent;
export const post_Genai_attach_agent = {
  method: z.literal("POST"),
  path: z.literal("/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      parent_agent_uuid: z.string(),
      child_agent_uuid: z.string(),
    }),
    body: apiLinkAgentInputPublic,
  }),
  response: apiLinkAgentOutput,
};

export type put_Genai_update_attached_agent = typeof put_Genai_update_attached_agent;
export const put_Genai_update_attached_agent = {
  method: z.literal("PUT"),
  path: z.literal("/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      parent_agent_uuid: z.string(),
      child_agent_uuid: z.string(),
    }),
    body: apiUpdateLinkedAgentInputPublic,
  }),
  response: apiUpdateLinkedAgentOutput,
};

export type delete_Genai_detach_agent = typeof delete_Genai_detach_agent;
export const delete_Genai_detach_agent = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      parent_agent_uuid: z.string(),
      child_agent_uuid: z.string(),
    }),
  }),
  response: apiUnlinkAgentOutput,
};

export type get_Genai_get_agent = typeof get_Genai_get_agent;
export const get_Genai_get_agent = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/agents/{uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      uuid: z.string(),
    }),
  }),
  response: apiGetAgentOutput,
};

export type put_Genai_update_agent = typeof put_Genai_update_agent;
export const put_Genai_update_agent = {
  method: z.literal("PUT"),
  path: z.literal("/v2/gen-ai/agents/{uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      uuid: z.string(),
    }),
    body: apiUpdateAgentInputPublic,
  }),
  response: apiUpdateAgentOutput,
};

export type delete_Genai_delete_agent = typeof delete_Genai_delete_agent;
export const delete_Genai_delete_agent = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/gen-ai/agents/{uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      uuid: z.string(),
    }),
  }),
  response: apiDeleteAgentOutput,
};

export type get_Genai_get_agent_children = typeof get_Genai_get_agent_children;
export const get_Genai_get_agent_children = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/agents/{uuid}/child_agents"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      uuid: z.string(),
    }),
  }),
  response: apiGetChildrenOutput,
};

export type put_Genai_update_agent_deployment_visibility = typeof put_Genai_update_agent_deployment_visibility;
export const put_Genai_update_agent_deployment_visibility = {
  method: z.literal("PUT"),
  path: z.literal("/v2/gen-ai/agents/{uuid}/deployment_visibility"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      uuid: z.string(),
    }),
    body: apiUpdateAgentDeploymentVisibilityInputPublic,
  }),
  response: apiUpdateAgentDeploymentVisbilityOutput,
};

export type get_Genai_list_anthropic_api_keys = typeof get_Genai_list_anthropic_api_keys;
export const get_Genai_list_anthropic_api_keys = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/anthropic/keys"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
  }),
  response: apiListAnthropicAPIKeysOutput,
};

export type post_Genai_create_anthropic_api_key = typeof post_Genai_create_anthropic_api_key;
export const post_Genai_create_anthropic_api_key = {
  method: z.literal("POST"),
  path: z.literal("/v2/gen-ai/anthropic/keys"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: apiCreateAnthropicAPIKeyInputPublic,
  }),
  response: apiCreateAnthropicAPIKeyOutput,
};

export type get_Genai_get_anthropic_api_key = typeof get_Genai_get_anthropic_api_key;
export const get_Genai_get_anthropic_api_key = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/anthropic/keys/{api_key_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      api_key_uuid: z.string(),
    }),
  }),
  response: apiGetAnthropicAPIKeyOutput,
};

export type put_Genai_update_anthropic_api_key = typeof put_Genai_update_anthropic_api_key;
export const put_Genai_update_anthropic_api_key = {
  method: z.literal("PUT"),
  path: z.literal("/v2/gen-ai/anthropic/keys/{api_key_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      api_key_uuid: z.string(),
    }),
    body: apiUpdateAnthropicAPIKeyInputPublic,
  }),
  response: apiUpdateAnthropicAPIKeyOutput,
};

export type delete_Genai_delete_anthropic_api_key = typeof delete_Genai_delete_anthropic_api_key;
export const delete_Genai_delete_anthropic_api_key = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/gen-ai/anthropic/keys/{api_key_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      api_key_uuid: z.string(),
    }),
  }),
  response: apiDeleteAnthropicAPIKeyOutput,
};

export type get_Genai_list_agents_by_anthropic_key = typeof get_Genai_list_agents_by_anthropic_key;
export const get_Genai_list_agents_by_anthropic_key = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/anthropic/keys/{uuid}/agents"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
    path: z.object({
      uuid: z.string(),
    }),
  }),
  response: apiListAgentsByAnthropicKeyOutput,
};

export type get_Genai_list_indexing_jobs = typeof get_Genai_list_indexing_jobs;
export const get_Genai_list_indexing_jobs = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/indexing_jobs"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
  }),
  response: apiListKnowledgeBaseIndexingJobsOutput,
};

export type post_Genai_create_indexing_job = typeof post_Genai_create_indexing_job;
export const post_Genai_create_indexing_job = {
  method: z.literal("POST"),
  path: z.literal("/v2/gen-ai/indexing_jobs"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: apiStartKnowledgeBaseIndexingJobInputPublic,
  }),
  response: apiStartKnowledgeBaseIndexingJobOutput,
};

export type get_Genai_list_indexing_job_data_sources = typeof get_Genai_list_indexing_job_data_sources;
export const get_Genai_list_indexing_job_data_sources = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      indexing_job_uuid: z.string(),
    }),
  }),
  response: apiListIndexingJobDataSourcesOutput,
};

export type get_Genai_get_indexing_job = typeof get_Genai_get_indexing_job;
export const get_Genai_get_indexing_job = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/indexing_jobs/{uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      uuid: z.string(),
    }),
  }),
  response: apiGetKnowledgeBaseIndexingJobOutput,
};

export type put_Genai_cancel_indexing_job = typeof put_Genai_cancel_indexing_job;
export const put_Genai_cancel_indexing_job = {
  method: z.literal("PUT"),
  path: z.literal("/v2/gen-ai/indexing_jobs/{uuid}/cancel"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      uuid: z.string(),
    }),
    body: apiCancelKnowledgeBaseIndexingJobInputPublic,
  }),
  response: apiCancelKnowledgeBaseIndexingJobOutput,
};

export type get_Genai_list_knowledge_bases = typeof get_Genai_list_knowledge_bases;
export const get_Genai_list_knowledge_bases = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/knowledge_bases"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
  }),
  response: apiListKnowledgeBasesOutput,
};

export type post_Genai_create_knowledge_base = typeof post_Genai_create_knowledge_base;
export const post_Genai_create_knowledge_base = {
  method: z.literal("POST"),
  path: z.literal("/v2/gen-ai/knowledge_bases"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: apiCreateKnowledgeBaseInputPublic,
  }),
  response: apiCreateKnowledgeBaseOutput,
};

export type get_Genai_list_knowledge_base_data_sources = typeof get_Genai_list_knowledge_base_data_sources;
export const get_Genai_list_knowledge_base_data_sources = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
    path: z.object({
      knowledge_base_uuid: z.string(),
    }),
  }),
  response: apiListKnowledgeBaseDataSourcesOutput,
};

export type post_Genai_create_knowledge_base_data_source = typeof post_Genai_create_knowledge_base_data_source;
export const post_Genai_create_knowledge_base_data_source = {
  method: z.literal("POST"),
  path: z.literal("/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      knowledge_base_uuid: z.string(),
    }),
    body: apiCreateKnowledgeBaseDataSourceInputPublic,
  }),
  response: apiCreateKnowledgeBaseDataSourceOutput,
};

export type delete_Genai_delete_knowledge_base_data_source = typeof delete_Genai_delete_knowledge_base_data_source;
export const delete_Genai_delete_knowledge_base_data_source = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      knowledge_base_uuid: z.string(),
      data_source_uuid: z.string(),
    }),
  }),
  response: apiDeleteKnowledgeBaseDataSourceOutput,
};

export type get_Genai_get_knowledge_base = typeof get_Genai_get_knowledge_base;
export const get_Genai_get_knowledge_base = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/knowledge_bases/{uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      uuid: z.string(),
    }),
  }),
  response: apiGetKnowledgeBaseOutput,
};

export type put_Genai_update_knowledge_base = typeof put_Genai_update_knowledge_base;
export const put_Genai_update_knowledge_base = {
  method: z.literal("PUT"),
  path: z.literal("/v2/gen-ai/knowledge_bases/{uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      uuid: z.string(),
    }),
    body: apiUpdateKnowledgeBaseInputPublic,
  }),
  response: apiUpdateKnowledgeBaseOutput,
};

export type delete_Genai_delete_knowledge_base = typeof delete_Genai_delete_knowledge_base;
export const delete_Genai_delete_knowledge_base = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/gen-ai/knowledge_bases/{uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      uuid: z.string(),
    }),
  }),
  response: apiDeleteKnowledgeBaseOutput,
};

export type get_Genai_list_models = typeof get_Genai_list_models;
export const get_Genai_list_models = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/models"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      usecases: z
        .array(
          z.union([
            z.literal("MODEL_USECASE_UNKNOWN"),
            z.literal("MODEL_USECASE_AGENT"),
            z.literal("MODEL_USECASE_FINETUNED"),
            z.literal("MODEL_USECASE_KNOWLEDGEBASE"),
            z.literal("MODEL_USECASE_GUARDRAIL"),
            z.literal("MODEL_USECASE_REASONING"),
          ]),
        )
        .optional(),
      public_only: z.boolean().optional(),
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
  }),
  response: apiListModelsOutputPublic,
};

export type get_Genai_list_openai_api_keys = typeof get_Genai_list_openai_api_keys;
export const get_Genai_list_openai_api_keys = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/openai/keys"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
  }),
  response: apiListOpenAIAPIKeysOutput,
};

export type post_Genai_create_openai_api_key = typeof post_Genai_create_openai_api_key;
export const post_Genai_create_openai_api_key = {
  method: z.literal("POST"),
  path: z.literal("/v2/gen-ai/openai/keys"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: apiCreateOpenAIAPIKeyInputPublic,
  }),
  response: apiCreateOpenAIAPIKeyOutput,
};

export type get_Genai_get_openai_api_key = typeof get_Genai_get_openai_api_key;
export const get_Genai_get_openai_api_key = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/openai/keys/{api_key_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      api_key_uuid: z.string(),
    }),
  }),
  response: apiGetOpenAIAPIKeyOutput,
};

export type put_Genai_update_openai_api_key = typeof put_Genai_update_openai_api_key;
export const put_Genai_update_openai_api_key = {
  method: z.literal("PUT"),
  path: z.literal("/v2/gen-ai/openai/keys/{api_key_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      api_key_uuid: z.string(),
    }),
    body: apiUpdateOpenAIAPIKeyInputPublic,
  }),
  response: apiUpdateOpenAIAPIKeyOutput,
};

export type delete_Genai_delete_openai_api_key = typeof delete_Genai_delete_openai_api_key;
export const delete_Genai_delete_openai_api_key = {
  method: z.literal("DELETE"),
  path: z.literal("/v2/gen-ai/openai/keys/{api_key_uuid}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      api_key_uuid: z.string(),
    }),
  }),
  response: apiDeleteOpenAIAPIKeyOutput,
};

export type get_Genai_list_agents_by_openai_key = typeof get_Genai_list_agents_by_openai_key;
export const get_Genai_list_agents_by_openai_key = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/openai/keys/{uuid}/agents"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
    path: z.object({
      uuid: z.string(),
    }),
  }),
  response: apiListAgentsByOpenAIKeyOutput,
};

export type get_Genai_list_datacenter_regions = typeof get_Genai_list_datacenter_regions;
export const get_Genai_list_datacenter_regions = {
  method: z.literal("GET"),
  path: z.literal("/v2/gen-ai/regions"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      serves_inference: z.boolean().optional(),
      serves_batch: z.boolean().optional(),
    }),
  }),
  response: apiListRegionsOutput,
};

// <EndpointByMethod>
export const EndpointByMethod = {
  get: {
    "/v2/1-clicks": get_OneClicks_list,
    "/v2/account": get_Account_get,
    "/v2/account/keys": get_SshKeys_list,
    "/v2/account/keys/{ssh_key_identifier}": get_SshKeys_get,
    "/v2/actions": get_Actions_list,
    "/v2/actions/{action_id}": get_Actions_get,
    "/v2/apps": get_Apps_list,
    "/v2/apps/{id}": get_Apps_get,
    "/v2/apps/{app_id}/components/{component_name}/logs": get_Apps_get_logs_active_deployment,
    "/v2/apps/{app_id}/components/{component_name}/exec": get_Apps_get_exec_active_deployment,
    "/v2/apps/{app_id}/deployments": get_Apps_list_deployments,
    "/v2/apps/{app_id}/deployments/{deployment_id}": get_Apps_get_deployment,
    "/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs": get_Apps_get_logs,
    "/v2/apps/{app_id}/deployments/{deployment_id}/logs": get_Apps_get_logs_aggregate,
    "/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/exec": get_Apps_get_exec,
    "/v2/apps/{app_id}/logs": get_Apps_get_logs_active_deployment_aggregate,
    "/v2/apps/tiers/instance_sizes": get_Apps_list_instanceSizes,
    "/v2/apps/tiers/instance_sizes/{slug}": get_Apps_get_instanceSize,
    "/v2/apps/regions": get_Apps_list_regions,
    "/v2/apps/{app_id}/alerts": get_Apps_list_alerts,
    "/v2/apps/{app_id}/metrics/bandwidth_daily": get_Apps_get_metrics_bandwidth_daily,
    "/v2/cdn/endpoints": get_Cdn_list_endpoints,
    "/v2/cdn/endpoints/{cdn_id}": get_Cdn_get_endpoint,
    "/v2/certificates": get_Certificates_list,
    "/v2/certificates/{certificate_id}": get_Certificates_get,
    "/v2/customers/my/balance": get_Balance_get,
    "/v2/customers/my/billing_history": get_BillingHistory_list,
    "/v2/customers/my/invoices": get_Invoices_list,
    "/v2/customers/my/invoices/{invoice_uuid}": get_Invoices_get_byUUID,
    "/v2/customers/my/invoices/{invoice_uuid}/csv": get_Invoices_get_csvByUUID,
    "/v2/customers/my/invoices/{invoice_uuid}/pdf": get_Invoices_get_pdfByUUID,
    "/v2/customers/my/invoices/{invoice_uuid}/summary": get_Invoices_get_summaryByUUID,
    "/v2/databases/options": get_Databases_list_options,
    "/v2/databases": get_Databases_list_clusters,
    "/v2/databases/{database_cluster_uuid}": get_Databases_get_cluster,
    "/v2/databases/{database_cluster_uuid}/config": get_Databases_get_config,
    "/v2/databases/{database_cluster_uuid}/ca": get_Databases_get_ca,
    "/v2/databases/{database_cluster_uuid}/online-migration": get_Databases_get_migrationStatus,
    "/v2/databases/{database_cluster_uuid}/firewall": get_Databases_list_firewall_rules,
    "/v2/databases/{database_cluster_uuid}/backups": get_Databases_list_backups,
    "/v2/databases/{database_cluster_uuid}/replicas": get_Databases_list_replicas,
    "/v2/databases/{database_cluster_uuid}/events": get_Databases_list_events_logs,
    "/v2/databases/{database_cluster_uuid}/replicas/{replica_name}": get_Databases_get_replica,
    "/v2/databases/{database_cluster_uuid}/users": get_Databases_list_users,
    "/v2/databases/{database_cluster_uuid}/users/{username}": get_Databases_get_user,
    "/v2/databases/{database_cluster_uuid}/dbs": get_Databases_list,
    "/v2/databases/{database_cluster_uuid}/dbs/{database_name}": get_Databases_get,
    "/v2/databases/{database_cluster_uuid}/pools": get_Databases_list_connectionPools,
    "/v2/databases/{database_cluster_uuid}/pools/{pool_name}": get_Databases_get_connectionPool,
    "/v2/databases/{database_cluster_uuid}/eviction_policy": get_Databases_get_evictionPolicy,
    "/v2/databases/{database_cluster_uuid}/sql_mode": get_Databases_get_sql_mode,
    "/v2/databases/{database_cluster_uuid}/topics": get_Databases_list_kafka_topics,
    "/v2/databases/{database_cluster_uuid}/topics/{topic_name}": get_Databases_get_kafka_topic,
    "/v2/databases/{database_cluster_uuid}/logsink": get_Databases_list_logsink,
    "/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}": get_Databases_get_logsink,
    "/v2/databases/metrics/credentials": get_Databases_get_cluster_metrics_credentials,
    "/v2/databases/{database_cluster_uuid}/indexes": get_Databases_list_opeasearch_indexes,
    "/v2/domains": get_Domains_list,
    "/v2/domains/{domain_name}": get_Domains_get,
    "/v2/domains/{domain_name}/records": get_Domains_list_records,
    "/v2/domains/{domain_name}/records/{domain_record_id}": get_Domains_get_record,
    "/v2/droplets": get_Droplets_list,
    "/v2/droplets/{droplet_id}": get_Droplets_get,
    "/v2/droplets/{droplet_id}/backups": get_Droplets_list_backups,
    "/v2/droplets/{droplet_id}/backups/policy": get_Droplets_get_backup_policy,
    "/v2/droplets/backups/policies": get_Droplets_list_backup_policies,
    "/v2/droplets/backups/supported_policies": get_Droplets_list_supported_backup_policies,
    "/v2/droplets/{droplet_id}/snapshots": get_Droplets_list_snapshots,
    "/v2/droplets/{droplet_id}/actions": get_DropletActions_list,
    "/v2/droplets/{droplet_id}/actions/{action_id}": get_DropletActions_get,
    "/v2/droplets/{droplet_id}/kernels": get_Droplets_list_kernels,
    "/v2/droplets/{droplet_id}/firewalls": get_Droplets_list_firewalls,
    "/v2/droplets/{droplet_id}/neighbors": get_Droplets_list_neighbors,
    "/v2/droplets/{droplet_id}/destroy_with_associated_resources": get_Droplets_list_associatedResources,
    "/v2/droplets/{droplet_id}/destroy_with_associated_resources/status":
      get_Droplets_get_DestroyAssociatedResourcesStatus,
    "/v2/droplets/autoscale": get_Autoscalepools_list,
    "/v2/droplets/autoscale/{autoscale_pool_id}": get_Autoscalepools_get,
    "/v2/droplets/autoscale/{autoscale_pool_id}/members": get_Autoscalepools_list_members,
    "/v2/droplets/autoscale/{autoscale_pool_id}/history": get_Autoscalepools_list_history,
    "/v2/firewalls": get_Firewalls_list,
    "/v2/firewalls/{firewall_id}": get_Firewalls_get,
    "/v2/floating_ips": get_FloatingIPs_list,
    "/v2/floating_ips/{floating_ip}": get_FloatingIPs_get,
    "/v2/floating_ips/{floating_ip}/actions": get_FloatingIPsAction_list,
    "/v2/floating_ips/{floating_ip}/actions/{action_id}": get_FloatingIPsAction_get,
    "/v2/functions/namespaces": get_Functions_list_namespaces,
    "/v2/functions/namespaces/{namespace_id}": get_Functions_get_namespace,
    "/v2/functions/namespaces/{namespace_id}/triggers": get_Functions_list_triggers,
    "/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}": get_Functions_get_trigger,
    "/v2/images": get_Images_list,
    "/v2/images/{image_id}": get_Images_get,
    "/v2/images/{image_id}/actions": get_ImageActions_list,
    "/v2/images/{image_id}/actions/{action_id}": get_ImageActions_get,
    "/v2/kubernetes/clusters": get_Kubernetes_list_clusters,
    "/v2/kubernetes/clusters/{cluster_id}": get_Kubernetes_get_cluster,
    "/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources": get_Kubernetes_list_associatedResources,
    "/v2/kubernetes/clusters/{cluster_id}/kubeconfig": get_Kubernetes_get_kubeconfig,
    "/v2/kubernetes/clusters/{cluster_id}/credentials": get_Kubernetes_get_credentials,
    "/v2/kubernetes/clusters/{cluster_id}/upgrades": get_Kubernetes_get_availableUpgrades,
    "/v2/kubernetes/clusters/{cluster_id}/node_pools": get_Kubernetes_list_nodePools,
    "/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}": get_Kubernetes_get_nodePool,
    "/v2/kubernetes/clusters/{cluster_id}/user": get_Kubernetes_get_clusterUser,
    "/v2/kubernetes/options": get_Kubernetes_list_options,
    "/v2/kubernetes/clusters/{cluster_id}/clusterlint": get_Kubernetes_get_clusterLintResults,
    "/v2/kubernetes/clusters/{cluster_id}/status_messages": get_Kubernetes_get_status_messages,
    "/v2/load_balancers": get_LoadBalancers_list,
    "/v2/load_balancers/{lb_id}": get_LoadBalancers_get,
    "/v2/monitoring/alerts": get_Monitoring_list_alertPolicy,
    "/v2/monitoring/alerts/{alert_uuid}": get_Monitoring_get_alertPolicy,
    "/v2/monitoring/metrics/droplet/bandwidth": get_Monitoring_get_dropletBandwidthMetrics,
    "/v2/monitoring/metrics/droplet/cpu": get_Monitoring_get_DropletCpuMetrics,
    "/v2/monitoring/metrics/droplet/filesystem_free": get_Monitoring_get_dropletFilesystemFreeMetrics,
    "/v2/monitoring/metrics/droplet/filesystem_size": get_Monitoring_get_dropletFilesystemSizeMetrics,
    "/v2/monitoring/metrics/droplet/load_1": get_Monitoring_get_dropletLoad1Metrics,
    "/v2/monitoring/metrics/droplet/load_5": get_Monitoring_get_dropletLoad5Metrics,
    "/v2/monitoring/metrics/droplet/load_15": get_Monitoring_get_dropletLoad15Metrics,
    "/v2/monitoring/metrics/droplet/memory_cached": get_Monitoring_get_dropletMemoryCachedMetrics,
    "/v2/monitoring/metrics/droplet/memory_free": get_Monitoring_get_dropletMemoryFreeMetrics,
    "/v2/monitoring/metrics/droplet/memory_total": get_Monitoring_get_dropletMemoryTotalMetrics,
    "/v2/monitoring/metrics/droplet/memory_available": get_Monitoring_get_dropletMemoryAvailableMetrics,
    "/v2/monitoring/metrics/apps/memory_percentage": get_Monitoring_get_appMemoryPercentageMetrics,
    "/v2/monitoring/metrics/apps/cpu_percentage": get_Monitoring_get_appCPUPercentageMetrics,
    "/v2/monitoring/metrics/apps/restart_count": get_Monitoring_get_appRestartCountMetrics,
    "/v2/monitoring/metrics/load_balancer/frontend_connections_current":
      get_Monitoring_get_lb_frontend_connections_current,
    "/v2/monitoring/metrics/load_balancer/frontend_connections_limit": get_Monitoring_get_lb_frontend_connections_limit,
    "/v2/monitoring/metrics/load_balancer/frontend_cpu_utilization": get_Monitoring_get_lb_frontend_cpu_utilization,
    "/v2/monitoring/metrics/load_balancer/frontend_firewall_dropped_bytes":
      get_Monitoring_get_lb_frontend_firewall_dropped_bytes,
    "/v2/monitoring/metrics/load_balancer/frontend_firewall_dropped_packets":
      get_Monitoring_get_lb_frontend_firewall_dropped_packets,
    "/v2/monitoring/metrics/load_balancer/frontend_http_responses": get_Monitoring_get_lb_frontend_http_responses,
    "/v2/monitoring/metrics/load_balancer/frontend_http_requests_per_second":
      get_Monitoring_get_lb_frontend_http_requests_per_second,
    "/v2/monitoring/metrics/load_balancer/frontend_network_throughput_http":
      get_Monitoring_get_lb_frontend_network_throughput_http,
    "/v2/monitoring/metrics/load_balancer/frontend_network_throughput_udp":
      get_Monitoring_get_lb_frontend_network_throughput_udp,
    "/v2/monitoring/metrics/load_balancer/frontend_network_throughput_tcp":
      get_Monitoring_get_lb_frontend_network_throughput_tcp,
    "/v2/monitoring/metrics/load_balancer/frontend_nlb_tcp_network_throughput":
      get_Monitoring_get_lb_frontend_nlb_tcp_network_throughput,
    "/v2/monitoring/metrics/load_balancer/frontend_nlb_udp_network_throughput":
      get_Monitoring_get_lb_frontend_nlb_udp_network_throughput,
    "/v2/monitoring/metrics/load_balancer/frontend_tls_connections_current":
      get_Monitoring_get_lb_frontend_tls_connections_current,
    "/v2/monitoring/metrics/load_balancer/frontend_tls_connections_limit":
      get_Monitoring_get_lb_frontend_tls_connections_limit,
    "/v2/monitoring/metrics/load_balancer/frontend_tls_connections_exceeding_rate_limit":
      get_Monitoring_get_lb_frontend_tls_connections_exceeding_rate_limit,
    "/v2/monitoring/metrics/load_balancer/droplets_http_session_duration_avg":
      get_Monitoring_get_lb_droplets_http_session_duration_avg,
    "/v2/monitoring/metrics/load_balancer/droplets_http_session_duration_50p":
      get_Monitoring_get_lb_droplets_http_session_duration_50p,
    "/v2/monitoring/metrics/load_balancer/droplets_http_session_duration_95p":
      get_Monitoring_get_lb_droplets_http_session_duration_95p,
    "/v2/monitoring/metrics/load_balancer/droplets_http_response_time_avg":
      get_Monitoring_get_lb_droplets_http_response_time_avg,
    "/v2/monitoring/metrics/load_balancer/droplets_http_response_time_50p":
      get_Monitoring_get_lb_droplets_http_response_time_50p,
    "/v2/monitoring/metrics/load_balancer/droplets_http_response_time_95p":
      get_Monitoring_get_lb_droplets_http_response_time_95p,
    "/v2/monitoring/metrics/load_balancer/droplets_http_response_time_99p":
      get_Monitoring_get_lb_droplets_http_response_time_99p,
    "/v2/monitoring/metrics/load_balancer/droplets_queue_size": get_Monitoring_get_lb_droplets_queue_size,
    "/v2/monitoring/metrics/load_balancer/droplets_http_responses": get_Monitoring_get_lb_droplets_http_responses,
    "/v2/monitoring/metrics/load_balancer/droplets_connections": get_Monitoring_get_lb_droplets_connections,
    "/v2/monitoring/metrics/load_balancer/droplets_health_checks": get_Monitoring_get_lb_droplets_health_checks,
    "/v2/monitoring/metrics/load_balancer/droplets_downtime": get_Monitoring_get_lb_droplets_downtime,
    "/v2/monitoring/metrics/droplet_autoscale/current_instances":
      get_Monitoring_get_droplet_autoscale_current_instances,
    "/v2/monitoring/metrics/droplet_autoscale/target_instances": get_Monitoring_get_droplet_autoscale_target_instances,
    "/v2/monitoring/metrics/droplet_autoscale/current_cpu_utilization":
      get_Monitoring_get_droplet_autoscale_current_cpu_utilization,
    "/v2/monitoring/metrics/droplet_autoscale/target_cpu_utilization":
      get_Monitoring_get_droplet_autoscale_target_cpu_utilization,
    "/v2/monitoring/metrics/droplet_autoscale/current_memory_utilization":
      get_Monitoring_get_droplet_autoscale_current_memory_utilization,
    "/v2/monitoring/metrics/droplet_autoscale/target_memory_utilization":
      get_Monitoring_get_droplet_autoscale_target_memory_utilization,
    "/v2/monitoring/sinks/destinations": get_Monitoring_list_destinations,
    "/v2/monitoring/sinks/destinations/{destination_uuid}": get_Monitoring_get_destination,
    "/v2/monitoring/sinks": get_Monitoring_list_sinks,
    "/v2/monitoring/sinks/{sink_uuid}": get_Monitoring_get_sink,
    "/v2/partner_network_connect/attachments": get_PartnerAttachments_list,
    "/v2/partner_network_connect/attachments/{pa_id}": get_PartnerAttachments_get,
    "/v2/partner_network_connect/attachments/{pa_id}/bgp_auth_key": get_PartnerAttachments_get_bgp_auth_key,
    "/v2/partner_network_connect/attachments/{pa_id}/remote_routes": get_PartnerAttachments_list_remote_routes,
    "/v2/partner_network_connect/attachments/{pa_id}/service_key": get_PartnerAttachments_get_service_key,
    "/v2/projects": get_Projects_list,
    "/v2/projects/default": get_Projects_get_default,
    "/v2/projects/{project_id}": get_Projects_get,
    "/v2/projects/{project_id}/resources": get_Projects_list_resources,
    "/v2/projects/default/resources": get_Projects_list_resources_default,
    "/v2/regions": get_Regions_list,
    "/v2/registry": get_Registry_get,
    "/v2/registry/subscription": get_Registry_get_subscription,
    "/v2/registry/docker-credentials": get_Registry_get_dockerCredentials,
    "/v2/registry/{registry_name}/repositoriesV2": get_Registry_list_repositoriesV2,
    "/v2/registry/{registry_name}/repositories/{repository_name}/tags": get_Registry_list_repositoryTags,
    "/v2/registry/{registry_name}/repositories/{repository_name}/digests": get_Registry_list_repositoryManifests,
    "/v2/registry/{registry_name}/garbage-collection": get_Registry_get_garbageCollection,
    "/v2/registry/{registry_name}/garbage-collections": get_Registry_list_garbageCollections,
    "/v2/registry/options": get_Registry_get_options,
    "/v2/reports/droplet_neighbors_ids": get_Droplets_list_neighborsIds,
    "/v2/reserved_ips": get_ReservedIPs_list,
    "/v2/reserved_ips/{reserved_ip}": get_ReservedIPs_get,
    "/v2/reserved_ips/{reserved_ip}/actions": get_ReservedIPsActions_list,
    "/v2/reserved_ips/{reserved_ip}/actions/{action_id}": get_ReservedIPsActions_get,
    "/v2/reserved_ipv6": get_ReservedIPv6_list,
    "/v2/reserved_ipv6/{reserved_ipv6}": get_ReservedIPv6_get,
    "/v2/sizes": get_Sizes_list,
    "/v2/snapshots": get_Snapshots_list,
    "/v2/snapshots/{snapshot_id}": get_Snapshots_get,
    "/v2/spaces/keys": get_SpacesKey_list,
    "/v2/spaces/keys/{access_key}": get_SpacesKey_get,
    "/v2/tags": get_Tags_list,
    "/v2/tags/{tag_id}": get_Tags_get,
    "/v2/volumes": get_Volumes_list,
    "/v2/volumes/snapshots/{snapshot_id}": get_VolumeSnapshots_get_byId,
    "/v2/volumes/{volume_id}": get_Volumes_get,
    "/v2/volumes/{volume_id}/actions": get_VolumeActions_list,
    "/v2/volumes/{volume_id}/actions/{action_id}": get_VolumeActions_get,
    "/v2/volumes/{volume_id}/snapshots": get_VolumeSnapshots_list,
    "/v2/vpcs": get_Vpcs_list,
    "/v2/vpcs/{vpc_id}": get_Vpcs_get,
    "/v2/vpcs/{vpc_id}/members": get_Vpcs_list_members,
    "/v2/vpcs/{vpc_id}/peerings": get_Vpcs_list_peerings,
    "/v2/vpc_peerings": get_VpcPeerings_list,
    "/v2/vpc_peerings/{vpc_peering_id}": get_VpcPeerings_get,
    "/v2/uptime/checks": get_Uptime_list_checks,
    "/v2/uptime/checks/{check_id}": get_Uptime_get_check,
    "/v2/uptime/checks/{check_id}/state": get_Uptime_get_checkState,
    "/v2/uptime/checks/{check_id}/alerts": get_Uptime_list_alerts,
    "/v2/uptime/checks/{check_id}/alerts/{alert_id}": get_Uptime_get_alert,
    "/v2/gen-ai/agents": get_Genai_list_agents,
    "/v2/gen-ai/agents/{agent_uuid}/api_keys": get_Genai_list_agent_api_keys,
    "/v2/gen-ai/agents/{uuid}": get_Genai_get_agent,
    "/v2/gen-ai/agents/{uuid}/child_agents": get_Genai_get_agent_children,
    "/v2/gen-ai/anthropic/keys": get_Genai_list_anthropic_api_keys,
    "/v2/gen-ai/anthropic/keys/{api_key_uuid}": get_Genai_get_anthropic_api_key,
    "/v2/gen-ai/anthropic/keys/{uuid}/agents": get_Genai_list_agents_by_anthropic_key,
    "/v2/gen-ai/indexing_jobs": get_Genai_list_indexing_jobs,
    "/v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources": get_Genai_list_indexing_job_data_sources,
    "/v2/gen-ai/indexing_jobs/{uuid}": get_Genai_get_indexing_job,
    "/v2/gen-ai/knowledge_bases": get_Genai_list_knowledge_bases,
    "/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources": get_Genai_list_knowledge_base_data_sources,
    "/v2/gen-ai/knowledge_bases/{uuid}": get_Genai_get_knowledge_base,
    "/v2/gen-ai/models": get_Genai_list_models,
    "/v2/gen-ai/openai/keys": get_Genai_list_openai_api_keys,
    "/v2/gen-ai/openai/keys/{api_key_uuid}": get_Genai_get_openai_api_key,
    "/v2/gen-ai/openai/keys/{uuid}/agents": get_Genai_list_agents_by_openai_key,
    "/v2/gen-ai/regions": get_Genai_list_datacenter_regions,
  },
  post: {
    "/v2/1-clicks/kubernetes": post_OneClicks_install_kubernetes,
    "/v2/account/keys": post_SshKeys_create,
    "/v2/apps": post_Apps_create,
    "/v2/apps/{app_id}/restart": post_Apps_restart,
    "/v2/apps/{app_id}/deployments": post_Apps_create_deployment,
    "/v2/apps/{app_id}/deployments/{deployment_id}/cancel": post_Apps_cancel_deployment,
    "/v2/apps/propose": post_Apps_validate_appSpec,
    "/v2/apps/{app_id}/alerts/{alert_id}/destinations": post_Apps_assign_alertDestinations,
    "/v2/apps/{app_id}/rollback": post_Apps_create_rollback,
    "/v2/apps/{app_id}/rollback/validate": post_Apps_validate_rollback,
    "/v2/apps/{app_id}/rollback/commit": post_Apps_commit_rollback,
    "/v2/apps/{app_id}/rollback/revert": post_Apps_revert_rollback,
    "/v2/apps/metrics/bandwidth_daily": post_Apps_list_metrics_bandwidth_daily,
    "/v2/cdn/endpoints": post_Cdn_create_endpoint,
    "/v2/certificates": post_Certificates_create,
    "/v2/databases": post_Databases_create_cluster,
    "/v2/databases/{database_cluster_uuid}/replicas": post_Databases_create_replica,
    "/v2/databases/{database_cluster_uuid}/users": post_Databases_add_user,
    "/v2/databases/{database_cluster_uuid}/users/{username}/reset_auth": post_Databases_reset_auth,
    "/v2/databases/{database_cluster_uuid}/dbs": post_Databases_add,
    "/v2/databases/{database_cluster_uuid}/pools": post_Databases_add_connectionPool,
    "/v2/databases/{database_cluster_uuid}/topics": post_Databases_create_kafka_topic,
    "/v2/databases/{database_cluster_uuid}/logsink": post_Databases_create_logsink,
    "/v2/domains": post_Domains_create,
    "/v2/domains/{domain_name}/records": post_Domains_create_record,
    "/v2/droplets": post_Droplets_create,
    "/v2/droplets/{droplet_id}/actions": post_DropletActions_post,
    "/v2/droplets/actions": post_DropletActions_post_byTag,
    "/v2/droplets/{droplet_id}/destroy_with_associated_resources/retry":
      post_Droplets_destroy_retryWithAssociatedResources,
    "/v2/droplets/autoscale": post_Autoscalepools_create,
    "/v2/firewalls": post_Firewalls_create,
    "/v2/firewalls/{firewall_id}/droplets": post_Firewalls_assign_droplets,
    "/v2/firewalls/{firewall_id}/tags": post_Firewalls_add_tags,
    "/v2/firewalls/{firewall_id}/rules": post_Firewalls_add_rules,
    "/v2/floating_ips": post_FloatingIPs_create,
    "/v2/floating_ips/{floating_ip}/actions": post_FloatingIPsAction_post,
    "/v2/functions/namespaces": post_Functions_create_namespace,
    "/v2/functions/namespaces/{namespace_id}/triggers": post_Functions_create_trigger,
    "/v2/images": post_Images_create_custom,
    "/v2/images/{image_id}/actions": post_ImageActions_post,
    "/v2/kubernetes/clusters": post_Kubernetes_create_cluster,
    "/v2/kubernetes/clusters/{cluster_id}/upgrade": post_Kubernetes_upgrade_cluster,
    "/v2/kubernetes/clusters/{cluster_id}/node_pools": post_Kubernetes_add_nodePool,
    "/v2/kubernetes/clusters/{cluster_id}/clusterlint": post_Kubernetes_run_clusterLint,
    "/v2/kubernetes/registry": post_Kubernetes_add_registry,
    "/v2/load_balancers": post_LoadBalancers_create,
    "/v2/load_balancers/{lb_id}/droplets": post_LoadBalancers_add_droplets,
    "/v2/load_balancers/{lb_id}/forwarding_rules": post_LoadBalancers_add_forwardingRules,
    "/v2/monitoring/alerts": post_Monitoring_create_alertPolicy,
    "/v2/monitoring/sinks/destinations": post_Monitoring_create_destination,
    "/v2/monitoring/sinks/destinations/{destination_uuid}": post_Monitoring_update_destination,
    "/v2/monitoring/sinks": post_Monitoring_create_sink,
    "/v2/partner_network_connect/attachments": post_PartnerAttachments_create,
    "/v2/partner_network_connect/attachments/{pa_id}/service_key": post_PartnerAttachments_create_service_key,
    "/v2/projects": post_Projects_create,
    "/v2/projects/{project_id}/resources": post_Projects_assign_resources,
    "/v2/projects/default/resources": post_Projects_assign_resources_default,
    "/v2/registry": post_Registry_create,
    "/v2/registry/subscription": post_Registry_update_subscription,
    "/v2/registry/validate-name": post_Registry_validate_name,
    "/v2/registry/{registry_name}/garbage-collection": post_Registry_run_garbageCollection,
    "/v2/reserved_ips": post_ReservedIPs_create,
    "/v2/reserved_ips/{reserved_ip}/actions": post_ReservedIPsActions_post,
    "/v2/reserved_ipv6": post_ReservedIPv6_create,
    "/v2/reserved_ipv6/{reserved_ipv6}/actions": post_ReservedIPv6Actions_post,
    "/v2/spaces/keys": post_SpacesKey_create,
    "/v2/tags": post_Tags_create,
    "/v2/tags/{tag_id}/resources": post_Tags_assign_resources,
    "/v2/volumes": post_Volumes_create,
    "/v2/volumes/actions": post_VolumeActions_post,
    "/v2/volumes/{volume_id}/actions": post_VolumeActions_post_byId,
    "/v2/volumes/{volume_id}/snapshots": post_VolumeSnapshots_create,
    "/v2/vpcs": post_Vpcs_create,
    "/v2/vpcs/{vpc_id}/peerings": post_Vpcs_create_peerings,
    "/v2/vpc_peerings": post_VpcPeerings_create,
    "/v2/uptime/checks": post_Uptime_create_check,
    "/v2/uptime/checks/{check_id}/alerts": post_Uptime_create_alert,
    "/v2/gen-ai/agents": post_Genai_create_agent,
    "/v2/gen-ai/agents/{agent_uuid}/api_keys": post_Genai_create_agent_api_key,
    "/v2/gen-ai/agents/{agent_uuid}/functions": post_Genai_attach_agent_function,
    "/v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}": post_Genai_attach_knowledge_base,
    "/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}": post_Genai_attach_agent,
    "/v2/gen-ai/anthropic/keys": post_Genai_create_anthropic_api_key,
    "/v2/gen-ai/indexing_jobs": post_Genai_create_indexing_job,
    "/v2/gen-ai/knowledge_bases": post_Genai_create_knowledge_base,
    "/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources": post_Genai_create_knowledge_base_data_source,
    "/v2/gen-ai/openai/keys": post_Genai_create_openai_api_key,
  },
  put: {
    "/v2/account/keys/{ssh_key_identifier}": put_SshKeys_update,
    "/v2/apps/{id}": put_Apps_update,
    "/v2/cdn/endpoints/{cdn_id}": put_Cdn_update_endpoints,
    "/v2/databases/{database_cluster_uuid}/online-migration": put_Databases_update_onlineMigration,
    "/v2/databases/{database_cluster_uuid}/migrate": put_Databases_update_region,
    "/v2/databases/{database_cluster_uuid}/resize": put_Databases_update_clusterSize,
    "/v2/databases/{database_cluster_uuid}/firewall": put_Databases_update_firewall_rules,
    "/v2/databases/{database_cluster_uuid}/maintenance": put_Databases_update_maintenanceWindow,
    "/v2/databases/{database_cluster_uuid}/install_update": put_Databases_install_update,
    "/v2/databases/{database_cluster_uuid}/replicas/{replica_name}/promote": put_Databases_promote_replica,
    "/v2/databases/{database_cluster_uuid}/users/{username}": put_Databases_update_user,
    "/v2/databases/{database_cluster_uuid}/pools/{pool_name}": put_Databases_update_connectionPool,
    "/v2/databases/{database_cluster_uuid}/eviction_policy": put_Databases_update_evictionPolicy,
    "/v2/databases/{database_cluster_uuid}/sql_mode": put_Databases_update_sql_mode,
    "/v2/databases/{database_cluster_uuid}/upgrade": put_Databases_update_major_version,
    "/v2/databases/{database_cluster_uuid}/topics/{topic_name}": put_Databases_update_kafka_topic,
    "/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}": put_Databases_update_logsink,
    "/v2/databases/metrics/credentials": put_Databases_update_cluster_metrics_credentials,
    "/v2/domains/{domain_name}/records/{domain_record_id}": put_Domains_update_record,
    "/v2/droplets/autoscale/{autoscale_pool_id}": put_Autoscalepools_update,
    "/v2/firewalls/{firewall_id}": put_Firewalls_update,
    "/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}": put_Functions_update_trigger,
    "/v2/images/{image_id}": put_Images_update,
    "/v2/kubernetes/clusters/{cluster_id}": put_Kubernetes_update_cluster,
    "/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}": put_Kubernetes_update_nodePool,
    "/v2/load_balancers/{lb_id}": put_LoadBalancers_update,
    "/v2/monitoring/alerts/{alert_uuid}": put_Monitoring_update_alertPolicy,
    "/v2/partner_network_connect/attachments/{pa_id}/remote_routes": put_PartnerAttachments_update_remote_routes,
    "/v2/projects/default": put_Projects_update_default,
    "/v2/projects/{project_id}": put_Projects_update,
    "/v2/registry/{registry_name}/garbage-collection/{garbage_collection_uuid}": put_Registry_update_garbageCollection,
    "/v2/spaces/keys/{access_key}": put_SpacesKey_update,
    "/v2/vpcs/{vpc_id}": put_Vpcs_update,
    "/v2/uptime/checks/{check_id}": put_Uptime_update_check,
    "/v2/uptime/checks/{check_id}/alerts/{alert_id}": put_Uptime_update_alert,
    "/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}": put_Genai_update_agent_api_key,
    "/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}/regenerate": put_Genai_regenerate_agent_api_key,
    "/v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}": put_Genai_update_agent_function,
    "/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}": put_Genai_update_attached_agent,
    "/v2/gen-ai/agents/{uuid}": put_Genai_update_agent,
    "/v2/gen-ai/agents/{uuid}/deployment_visibility": put_Genai_update_agent_deployment_visibility,
    "/v2/gen-ai/anthropic/keys/{api_key_uuid}": put_Genai_update_anthropic_api_key,
    "/v2/gen-ai/indexing_jobs/{uuid}/cancel": put_Genai_cancel_indexing_job,
    "/v2/gen-ai/knowledge_bases/{uuid}": put_Genai_update_knowledge_base,
    "/v2/gen-ai/openai/keys/{api_key_uuid}": put_Genai_update_openai_api_key,
  },
  delete: {
    "/v2/account/keys/{ssh_key_identifier}": delete_SshKeys_delete,
    "/v2/apps/{id}": delete_Apps_delete,
    "/v2/cdn/endpoints/{cdn_id}": delete_Cdn_delete_endpoint,
    "/v2/cdn/endpoints/{cdn_id}/cache": delete_Cdn_purge_cache,
    "/v2/certificates/{certificate_id}": delete_Certificates_delete,
    "/v2/databases/{database_cluster_uuid}": delete_Databases_destroy_cluster,
    "/v2/databases/{database_cluster_uuid}/online-migration/{migration_id}": delete_Databases_delete_onlineMigration,
    "/v2/databases/{database_cluster_uuid}/replicas/{replica_name}": delete_Databases_destroy_replica,
    "/v2/databases/{database_cluster_uuid}/users/{username}": delete_Databases_delete_user,
    "/v2/databases/{database_cluster_uuid}/dbs/{database_name}": delete_Databases_delete,
    "/v2/databases/{database_cluster_uuid}/pools/{pool_name}": delete_Databases_delete_connectionPool,
    "/v2/databases/{database_cluster_uuid}/topics/{topic_name}": delete_Databases_delete_kafka_topic,
    "/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}": delete_Databases_delete_logsink,
    "/v2/databases/{database_cluster_uuid}/indexes/{index_name}": delete_Databases_delete_opensearch_index,
    "/v2/domains/{domain_name}": delete_Domains_delete,
    "/v2/domains/{domain_name}/records/{domain_record_id}": delete_Domains_delete_record,
    "/v2/droplets": delete_Droplets_destroy_byTag,
    "/v2/droplets/{droplet_id}": delete_Droplets_destroy,
    "/v2/droplets/{droplet_id}/destroy_with_associated_resources/selective":
      delete_Droplets_destroy_withAssociatedResourcesSelective,
    "/v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous":
      delete_Droplets_destroy_withAssociatedResourcesDangerous,
    "/v2/droplets/autoscale/{autoscale_pool_id}": delete_Autoscalepools_delete,
    "/v2/droplets/autoscale/{autoscale_pool_id}/dangerous": delete_Autoscalepools_delete_dangerous,
    "/v2/firewalls/{firewall_id}": delete_Firewalls_delete,
    "/v2/firewalls/{firewall_id}/droplets": delete_Firewalls_delete_droplets,
    "/v2/firewalls/{firewall_id}/tags": delete_Firewalls_delete_tags,
    "/v2/firewalls/{firewall_id}/rules": delete_Firewalls_delete_rules,
    "/v2/floating_ips/{floating_ip}": delete_FloatingIPs_delete,
    "/v2/functions/namespaces/{namespace_id}": delete_Functions_delete_namespace,
    "/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}": delete_Functions_delete_trigger,
    "/v2/images/{image_id}": delete_Images_delete,
    "/v2/kubernetes/clusters/{cluster_id}": delete_Kubernetes_delete_cluster,
    "/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/selective":
      delete_Kubernetes_destroy_associatedResourcesSelective,
    "/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/dangerous":
      delete_Kubernetes_destroy_associatedResourcesDangerous,
    "/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}": delete_Kubernetes_delete_nodePool,
    "/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/nodes/{node_id}": delete_Kubernetes_delete_node,
    "/v2/kubernetes/registry": delete_Kubernetes_remove_registry,
    "/v2/load_balancers/{lb_id}": delete_LoadBalancers_delete,
    "/v2/load_balancers/{lb_id}/cache": delete_LoadBalancers_delete_cache,
    "/v2/load_balancers/{lb_id}/droplets": delete_LoadBalancers_remove_droplets,
    "/v2/load_balancers/{lb_id}/forwarding_rules": delete_LoadBalancers_remove_forwardingRules,
    "/v2/monitoring/alerts/{alert_uuid}": delete_Monitoring_delete_alertPolicy,
    "/v2/monitoring/sinks/destinations/{destination_uuid}": delete_Monitoring_delete_destination,
    "/v2/monitoring/sinks/{sink_uuid}": delete_Monitoring_delete_sink,
    "/v2/partner_network_connect/attachments/{pa_id}": delete_PartnerAttachments_delete,
    "/v2/projects/{project_id}": delete_Projects_delete,
    "/v2/registry": delete_Registry_delete,
    "/v2/registry/{registry_name}/repositories/{repository_name}/tags/{repository_tag}":
      delete_Registry_delete_repositoryTag,
    "/v2/registry/{registry_name}/repositories/{repository_name}/digests/{manifest_digest}":
      delete_Registry_delete_repositoryManifest,
    "/v2/reserved_ips/{reserved_ip}": delete_ReservedIPs_delete,
    "/v2/reserved_ipv6/{reserved_ipv6}": delete_ReservedIPv6_delete,
    "/v2/snapshots/{snapshot_id}": delete_Snapshots_delete,
    "/v2/spaces/keys/{access_key}": delete_SpacesKey_delete,
    "/v2/tags/{tag_id}": delete_Tags_delete,
    "/v2/tags/{tag_id}/resources": delete_Tags_unassign_resources,
    "/v2/volumes": delete_Volumes_delete_byName,
    "/v2/volumes/snapshots/{snapshot_id}": delete_VolumeSnapshots_delete_byId,
    "/v2/volumes/{volume_id}": delete_Volumes_delete,
    "/v2/vpcs/{vpc_id}": delete_Vpcs_delete,
    "/v2/vpc_peerings/{vpc_peering_id}": delete_VpcPeerings_delete,
    "/v2/uptime/checks/{check_id}": delete_Uptime_delete_check,
    "/v2/uptime/checks/{check_id}/alerts/{alert_id}": delete_Uptime_delete_alert,
    "/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}": delete_Genai_delete_agent_api_key,
    "/v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}": delete_Genai_detach_agent_function,
    "/v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}": delete_Genai_detach_knowledge_base,
    "/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}": delete_Genai_detach_agent,
    "/v2/gen-ai/agents/{uuid}": delete_Genai_delete_agent,
    "/v2/gen-ai/anthropic/keys/{api_key_uuid}": delete_Genai_delete_anthropic_api_key,
    "/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}":
      delete_Genai_delete_knowledge_base_data_source,
    "/v2/gen-ai/knowledge_bases/{uuid}": delete_Genai_delete_knowledge_base,
    "/v2/gen-ai/openai/keys/{api_key_uuid}": delete_Genai_delete_openai_api_key,
  },
  patch: {
    "/v2/databases/{database_cluster_uuid}/config": patch_Databases_patch_config,
    "/v2/domains/{domain_name}/records/{domain_record_id}": patch_Domains_patch_record,
    "/v2/partner_network_connect/attachments/{pa_id}": patch_PartnerAttachments_patch,
    "/v2/projects/default": patch_Projects_patch_default,
    "/v2/projects/{project_id}": patch_Projects_patch,
    "/v2/spaces/keys/{access_key}": patch_SpacesKey_patch,
    "/v2/vpcs/{vpc_id}": patch_Vpcs_patch,
    "/v2/vpcs/{vpc_id}/peerings/{vpc_peering_id}": patch_Vpcs_patch_peerings,
    "/v2/vpc_peerings/{vpc_peering_id}": patch_VpcPeerings_patch,
  },
};
export type EndpointByMethod = typeof EndpointByMethod;
// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type GetEndpoints = EndpointByMethod["get"];
export type PostEndpoints = EndpointByMethod["post"];
export type PutEndpoints = EndpointByMethod["put"];
export type DeleteEndpoints = EndpointByMethod["delete"];
export type PatchEndpoints = EndpointByMethod["patch"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | "options" | MutationMethod;

type RequestFormat = "json" | "form-data" | "form-url" | "binary" | "text";

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  requestFormat: RequestFormat;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl: string = "";

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("get", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.get>

  // <ApiClient.post>
  post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("post", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.post>

  // <ApiClient.put>
  put<Path extends keyof PutEndpoints, TEndpoint extends PutEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("put", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.put>

  // <ApiClient.delete>
  delete<Path extends keyof DeleteEndpoints, TEndpoint extends DeleteEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("delete", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.delete>

  // <ApiClient.patch>
  patch<Path extends keyof PatchEndpoints, TEndpoint extends PatchEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("patch", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.patch>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? "");
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/

// </ApiClient
