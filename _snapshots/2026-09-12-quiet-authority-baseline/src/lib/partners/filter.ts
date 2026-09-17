import type { LawyerPartner } from "./types";

export function leftoverPartnerLabels<
  T extends { lawyerPartnerId?: string; lawyerPartner?: string; status: string },
>(partners: LawyerPartner[], cases: T[]): string[] {
  const directory = Array.isArray(partners) ? partners : [];
  const knownIds = new Set(directory.map((p) => p.id));
  const knownNames = new Set(
    directory.map((p) => p.name.trim().toLowerCase()),
  );
  return [
    ...new Set(
      (Array.isArray(cases) ? cases : [])
        .filter((c) => {
          if (c.status === "draft") return false;
          if (c.lawyerPartnerId && knownIds.has(c.lawyerPartnerId)) {
            return false;
          }
          const name = (c.lawyerPartner ?? "").trim();
          if (!name) return false;
          return !knownNames.has(name.toLowerCase());
        })
        .map((c) => (c.lawyerPartner ?? "").trim()),
    ),
  ];
}
