import { getCollection, type CollectionEntry } from "astro:content";

export type JobEntry = CollectionEntry<"jobs">;
export type PublishedJob = JobEntry;
export type JobFilterKey = "archetype" | "level" | "stage" | "remote";
export type JobFilters = Partial<Pick<JobEntry["data"], JobFilterKey>>;
export type JobFilterOption = {
  value: string;
  label: string;
  count: number;
};

const jobFilterValueLabels = {
  archetype: {
    "core-product": "Core Product",
    growth: "Growth",
    platform: "Platform",
    "internal-tools": "Internal Tools",
    "zero-to-one": "Zero-to-One",
  },
  level: {
    associate: "Associate",
    mid: "Mid",
    senior: "Senior",
    staff: "Staff",
    director: "Director",
  },
  stage: {
    seed: "Seed",
    "series-a": "Series A",
    "series-b": "Series B",
    growth: "Growth",
    "profitable-private": "Profitable Private",
    public: "Public",
  },
  remote: {
    remote: "Remote",
    hybrid: "Hybrid",
    "on-site": "On-site",
  },
  confidence: {
    low: "Low",
    medium: "Medium",
    high: "High",
  },
} as const;

const jobFilterOrder = {
  archetype: ["core-product", "growth", "platform", "internal-tools", "zero-to-one"],
  level: ["associate", "mid", "senior", "staff", "director"],
  stage: ["seed", "series-a", "series-b", "growth", "profitable-private", "public"],
  remote: ["remote", "hybrid", "on-site"],
} as const satisfies Record<JobFilterKey, readonly string[]>;

const sortJobs = (jobs: JobEntry[]) =>
  [...jobs].sort((left, right) => {
    const reviewedDateCompare = right.data.reviewedAt.localeCompare(left.data.reviewedAt);

    if (reviewedDateCompare !== 0) {
      return reviewedDateCompare;
    }

    return left.data.title.localeCompare(right.data.title);
  });

const filterJobsByField = <Key extends JobFilterKey>(
  jobs: JobEntry[],
  field: Key,
  value: JobEntry["data"][Key],
) => jobs.filter((job) => job.data[field] === value);

export async function getAllPublishedJobs() {
  const jobs = await getCollection("jobs", ({ data }) => !data.draft);

  return sortJobs(jobs);
}

export async function getFeaturedJobs() {
  const jobs = await getAllPublishedJobs();

  return jobs.filter((job) => job.data.featured);
}

export async function getJobBySlug(slug: string) {
  const jobs = await getAllPublishedJobs();

  return jobs.find((job) => job.data.slug === slug);
}

export function filterJobsByArchetype(jobs: JobEntry[], archetype: JobEntry["data"]["archetype"]) {
  return filterJobsByField(jobs, "archetype", archetype);
}

export function filterJobsByLevel(jobs: JobEntry[], level: JobEntry["data"]["level"]) {
  return filterJobsByField(jobs, "level", level);
}

export function filterJobsByStage(jobs: JobEntry[], stage: JobEntry["data"]["stage"]) {
  return filterJobsByField(jobs, "stage", stage);
}

export function filterJobsByRemote(jobs: JobEntry[], remote: JobEntry["data"]["remote"]) {
  return filterJobsByField(jobs, "remote", remote);
}

export function formatJobFilterValue(
  field: keyof typeof jobFilterValueLabels,
  value: string,
) {
  return jobFilterValueLabels[field][value as keyof (typeof jobFilterValueLabels)[typeof field]];
}

export function getJobFilterOptions(jobs: JobEntry[]): Record<JobFilterKey, JobFilterOption[]> {
  return {
    archetype: jobFilterOrder.archetype
      .filter((value) => jobs.some((job) => job.data.archetype === value))
      .map((value) => ({
        value,
        label: formatJobFilterValue("archetype", value),
        count: filterJobsByArchetype(jobs, value).length,
      })),
    level: jobFilterOrder.level
      .filter((value) => jobs.some((job) => job.data.level === value))
      .map((value) => ({
        value,
        label: formatJobFilterValue("level", value),
        count: filterJobsByLevel(jobs, value).length,
      })),
    stage: jobFilterOrder.stage
      .filter((value) => jobs.some((job) => job.data.stage === value))
      .map((value) => ({
        value,
        label: formatJobFilterValue("stage", value),
        count: filterJobsByStage(jobs, value).length,
      })),
    remote: jobFilterOrder.remote
      .filter((value) => jobs.some((job) => job.data.remote === value))
      .map((value) => ({
        value,
        label: formatJobFilterValue("remote", value),
        count: filterJobsByRemote(jobs, value).length,
      })),
  };
}

export function getJobDetailPath(slug: string) {
  return `/jobs/${slug}`;
}

export function formatReviewedDate(reviewedAt: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${reviewedAt}T00:00:00`));
}

export function filterJobs(jobs: JobEntry[], filters: JobFilters) {
  return jobs.filter((job) => {
    if (filters.archetype && job.data.archetype !== filters.archetype) {
      return false;
    }

    if (filters.level && job.data.level !== filters.level) {
      return false;
    }

    if (filters.stage && job.data.stage !== filters.stage) {
      return false;
    }

    if (filters.remote && job.data.remote !== filters.remote) {
      return false;
    }

    return true;
  });
}
