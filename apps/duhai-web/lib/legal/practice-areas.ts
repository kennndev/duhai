export type PracticeAreaSlug =
  | "cheque-bounce"
  | "online-fraud"
  | "landlord-dispute"
  | "employer-dispute"
  | "defamation"
  | "custom";

export type PracticeArea = {
  slug: PracticeAreaSlug;
  title: string;
  shortTitle: string;
  description: string;
  userProblem: string;
  noticePeriodDays: number | null;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "cheque-bounce",
    title: "Cheque Bounce",
    shortTitle: "Bounced cheque",
    description: "For dishonoured cheque and payment recovery notices.",
    userProblem: "A cheque was dishonoured and you need a formal recovery notice.",
    noticePeriodDays: 15
  },
  {
    slug: "online-fraud",
    title: "Online Shopping Fraud",
    shortTitle: "Online fraud",
    description: "For non-delivery, fake products, refunds, and seller disputes.",
    userProblem: "You paid online and did not receive what was promised.",
    noticePeriodDays: 15
  },
  {
    slug: "landlord-dispute",
    title: "Landlord / Rent Dispute",
    shortTitle: "Rent dispute",
    description: "For rent, possession, deposit, and tenancy disputes.",
    userProblem: "A deposit, possession, rent, or tenancy issue needs formal notice.",
    noticePeriodDays: 30
  },
  {
    slug: "employer-dispute",
    title: "Employer Won't Pay",
    shortTitle: "Unpaid salary",
    description: "For unpaid salary, dues, and employment payment disputes.",
    userProblem: "Your employer is withholding salary, dues, or agreed payment.",
    noticePeriodDays: 15
  },
  {
    slug: "defamation",
    title: "Defamation",
    shortTitle: "Defamation",
    description: "For false statements harming reputation.",
    userProblem: "Someone made a false statement that harmed your reputation.",
    noticePeriodDays: 15
  },
  {
    slug: "custom",
    title: "Something Else",
    shortTitle: "Manual review",
    description: "For disputes that need manual legal review before drafting.",
    userProblem: "Your issue does not fit the standard categories.",
    noticePeriodDays: null
  }
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}

export const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu and Kashmir"
] as const;

export const languages = [
  { value: "en", label: "English" },
  { value: "ur", label: "Urdu" }
] as const;
