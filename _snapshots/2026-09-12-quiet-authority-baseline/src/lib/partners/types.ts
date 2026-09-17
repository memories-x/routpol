export const PARTNER_LANGS = ["pl", "en", "tr"] as const;
export type PartnerLang = (typeof PARTNER_LANGS)[number];

export const CONTRACT_STATUSES = ["none", "draft", "signed"] as const;
export type ContractStatus = (typeof CONTRACT_STATUSES)[number];

export type LawyerPartner = {
  id: string;
  name: string;
  officeName?: string;
  email?: string;
  phone?: string;
  nip?: string;
  barNumber?: string;
  city?: string;
  address?: string;
  website?: string;
  specialty?: string;
  languages?: PartnerLang[];
  contractStatus: ContractStatus;
  notes?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LawyerPartnerInput = {
  name: string;
  officeName?: string;
  email?: string;
  phone?: string;
  nip?: string;
  barNumber?: string;
  city?: string;
  address?: string;
  website?: string;
  specialty?: string;
  languages?: PartnerLang[];
  contractStatus?: ContractStatus;
  notes?: string;
  active?: boolean;
};
