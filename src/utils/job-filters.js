export const jobFilterKeys = ["archetype", "level", "stage", "remote"];

export function matchesJobFilters(job, filters) {
  return jobFilterKeys.every((key) => {
    const filterValue = filters[key];

    if (!filterValue) {
      return true;
    }

    return job[key] === filterValue;
  });
}
