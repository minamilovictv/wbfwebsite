// Areas of Intervention — values must match the options on the `project`
// schema's areasOfIntervention field. Add new areas in both places.

export const INTERVENTION_AREAS: Record<string, string> = {
  "education-research": "Education & Scientific Research",
  "cultural-cooperation": "Cultural Cooperation",
  "sustainable-development": "Sustainable Development",
};

export function interventionAreaLabel(value: string): string {
  return INTERVENTION_AREAS[value] ?? value;
}
