/**
 * OGMS (Open Grant Management System) API client
 *
 * WBF's internal grant management backend. Handles applications,
 * reporting, and project lifecycle. This client provides a typed
 * interface for querying OGMS data to surface on the public website.
 */

import type {
  OGMSGrant,
  OGMSApplication,
  OGMSProject,
  PaginatedResponse,
} from "@/types";

const BASE_URL = process.env.OGMS_API_BASE_URL;
const API_KEY = process.env.OGMS_API_KEY;

class OGMSError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "OGMSError";
  }
}

async function ogmsFetch<T>(
  path: string,
  options: RequestInit & { revalidate?: number } = {}
): Promise<T> {
  if (!BASE_URL || !API_KEY) {
    throw new OGMSError("OGMS API not configured", 500, "MISSING_CONFIG");
  }

  const { revalidate = 300, ...fetchOptions } = options;
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
      "Accept": "application/json",
      ...(fetchOptions.headers ?? {}),
    },
    next: { revalidate },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new OGMSError(
      `OGMS API error: ${response.statusText}`,
      response.status,
      body
    );
  }

  return response.json() as Promise<T>;
}

// ─── Grant Calls ───────────────────────────────────────────────────────────

export async function getOGMSOpenGrants(): Promise<OGMSGrant[]> {
  return ogmsFetch<OGMSGrant[]>("/grants?status=open", { revalidate: 300 });
}

export async function getOGMSGrantById(id: string): Promise<OGMSGrant> {
  return ogmsFetch<OGMSGrant>(`/grants/${id}`, { revalidate: 300 });
}

// ─── Application Calls ─────────────────────────────────────────────────────

export async function submitApplication(
  grantId: string,
  payload: Record<string, unknown>
): Promise<{ applicationId: string; status: string }> {
  return ogmsFetch("/applications", {
    method: "POST",
    body: JSON.stringify({ grantId, ...payload }),
    revalidate: 0,
  });
}

export async function getApplicationStatus(applicationId: string): Promise<OGMSApplication> {
  return ogmsFetch<OGMSApplication>(`/applications/${applicationId}`, { revalidate: 0 });
}

// ─── Project Calls ─────────────────────────────────────────────────────────

export async function getOGMSProjects(params: {
  page?: number;
  perPage?: number;
  status?: string;
  country?: string;
  programId?: string;
} = {}): Promise<PaginatedResponse<OGMSProject>> {
  const qs = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  ).toString();
  return ogmsFetch<PaginatedResponse<OGMSProject>>(
    `/projects${qs ? `?${qs}` : ""}`,
    { revalidate: 600 }
  );
}

export async function getOGMSProjectById(id: string): Promise<OGMSProject> {
  return ogmsFetch<OGMSProject>(`/projects/${id}`, { revalidate: 600 });
}

// ─── Statistics ────────────────────────────────────────────────────────────

export interface OGMSStats {
  totalGrantsAwarded: number;
  totalFundingDisbursed: number;
  activeProjects: number;
  completedProjects: number;
  totalBeneficiaries: number;
  countriesCovered: number;
}

export async function getOGMSStats(): Promise<OGMSStats> {
  return ogmsFetch<OGMSStats>("/statistics/public", { revalidate: 3600 });
}
