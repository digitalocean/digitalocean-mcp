import { createApiClient } from "./specs/digitalocean-openapi.yaml.zod";
import { ApiClient } from "./specs/digitalocean-openapi.yaml.zod";
import logger from "./logger";
const BASE_URL = "https://api.digitalocean.com";

function getToken() {
  const token = process.env.DIGITALOCEAN_API_TOKEN;
  if (!token) {
    throw new Error("DIGITALOCEAN_API_TOKEN is not set");
  }
  return token;
}

function parsePath(path: string, pathParams: Record<string, string> = {}) {
  // extract the path params from the path. Each params will be in the form {param_name}
  const pathParts = path.split("/");
  const newParts = pathParts.map((part) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      const key = part.slice(1, -1);
      return pathParams[key] || part;
    }
    return part;
  });
  return newParts.join("/");
}

export function createClient(params: { sessionId?: string } = {}): {
  client: ApiClient;
} {
  const token = getToken();
  const sharedHeaders: Record<string, string> = {
    "User-Agent": "ModelContext/0.1.0",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const client = createApiClient(async (method, url, params) => {
    const queryString = new URLSearchParams(
      params?.query as Record<string, string>
    ).toString();

    const _headers = {
      ...sharedHeaders,
      ...params?.header,
    };
    const _url = parsePath(url, params?.path as Record<string, string>);
    const urlWithQuery = queryString ? `${_url}?${queryString}` : _url;

    const body =
      params?.body && !["GET", "HEAD"].includes(method)
        ? JSON.stringify(params?.body)
        : undefined;

    const res = await fetch(urlWithQuery, {
      method,
      headers: _headers as HeadersInit,
      body,
    });

    if (res.status !== 200) {
      const errorObj = (await res.json()) as IDigitalOceanApiError;
      if (errorObj.id) {
        const error = DigitalOceanApiError.fromResponse(errorObj);
        logger.error(
          `API Error: ${method.toUpperCase()} ${urlWithQuery} ${error.message}`
        );
        throw error;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const responseContentType = res.headers.get("content-type");
    if (responseContentType?.includes("application/json")) {
      return res.json();
    } else if (responseContentType?.includes("text/")) {
      return res.text();
    } else if (responseContentType?.includes("application/octet-stream")) {
      return res.blob();
    } else {
      return res.text();
    }
  }, BASE_URL);

  return { client };
}

interface IDigitalOceanApiError {
  id: string;
  message: string;
}

export class DigitalOceanApiError extends Error {
  id: string;
  message: string;
  static fromResponse(response: IDigitalOceanApiError): DigitalOceanApiError {
    return new DigitalOceanApiError(response.id, response.message);
  }

  static isDigitalOceanApiError(error: unknown): error is DigitalOceanApiError {
    return error instanceof DigitalOceanApiError;
  }
  constructor(id: string, message: string) {
    super(message);
    this.id = id;
    this.message = message;
  }
}
