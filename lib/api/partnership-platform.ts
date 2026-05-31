/**
 * Partnership Platform API client
 *
 * WBF's partner network platform. Enables civil society organizations,
 * universities, and public bodies to register, find partners, and
 * respond to open calls. This module exposes read-only data for the
 * public website layer.
 */

import type {
  PartnershipOrganization,
  PartnershipCall,
  PaginatedResponse,
} from "@/types";

const BASE_URL = process.env.PARTNERSHIP_PLATFORM_BASE_URL;
const API_KEY = process.env.PARTNERSHIP_PLATFORM_API_KEY;

class PartnershipPlatformError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "PartnershipPlatformError";
  }
}

async function ppFetch<T>(
  path: string,
  options: RequestInit & { revalidate?: number } = {}
): Promise<T> {
  if (!BASE_URL || !API_KEY) {
    throw new PartnershipPlatformError("Partnership Platform API not configured", 500);
  }

  const { revalidate = 600, ...fetchOptions } = options;
  const response = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
      "Accept": "application/json",
      ...(fetchOptions.headers ?? {}),
    },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new PartnershipPlatformError(
      `Partnership Platform API error: ${response.statusText}`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

// ─── Organization Directory ────────────────────────────────────────────────

export async function getVerifiedOrganizations(params: {
  page?: number;
  perPage?: number;
  type?: string;
  country?: string;
  sector?: string;
  search?: string;
} = {}): Promise<PaginatedResponse<PartnershipOrganization>> {
  const qs = new URLSearchParams(
    Object.entries({ ...params, verified: "true" })
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  ).toString();
  return ppFetch<PaginatedResponse<PartnershipOrganization>>(
    `/organizations?${qs}`,
    { revalidate: 3600 }
  );
}

// ─── Partnership Calls ─────────────────────────────────────────────────────

export async function getOpenPartnershipCalls(): Promise<PartnershipCall[]> {
  return ppFetch<PartnershipCall[]>("/calls?status=open", { revalidate: 300 });
}

export async function getPartnershipCallById(id: string): Promise<PartnershipCall> {
  return ppFetch<PartnershipCall>(`/calls/${id}`, { revalidate: 300 });
}

// ─── Statistics ────────────────────────────────────────────────────────────

export interface PartnershipStats {
  registeredOrganizations: number;
  verifiedOrganizations: number;
  countriesRepresented: number;
  sectorsRepresented: number;
  activePartnerships: number;
}

export async function getPartnershipStats(): Promise<PartnershipStats> {
  return ppFetch<PartnershipStats>("/statistics", { revalidate: 3600 });
}

// ─── Registration (write) ──────────────────────────────────────────────────

export async function registerOrganization(payload: {
  name: string;
  type: string;
  country: string;
  sector: string;
  registrationNumber?: string;
  contactEmail: string;
  website?: string;
}): Promise<{ id: string; status: "pending-verification" }> {
  return ppFetch("/organizations/register", {
    method: "POST",
    body: JSON.stringify(payload),
    revalidate: 0,
  });
}
