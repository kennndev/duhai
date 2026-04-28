import { z } from "zod";

const phoneSchema = z.string().min(7, "Enter a valid phone number").max(30);
const requiredText = z.string().trim().min(2, "This field is required");

export const StartWizardSchema = z.object({
  practiceAreaSlug: z.enum([
    "cheque-bounce",
    "online-fraud",
    "landlord-dispute",
    "employer-dispute",
    "defamation",
    "custom"
  ]),
  source: z.string().optional()
});

export const CategoryLocationSchema = z.object({
  practiceAreaSlug: StartWizardSchema.shape.practiceAreaSlug,
  province: requiredText,
  city: requiredText,
  language: z.enum(["en", "ur"])
});

export const PartiesStepSchema = z.object({
  claimantName: requiredText,
  claimantPhone: phoneSchema,
  claimantEmail: z.string().email("Enter a valid email"),
  claimantAddress: requiredText,
  respondentName: requiredText,
  respondentType: z.string().trim().min(2).max(80),
  respondentAddress: requiredText,
  respondentContact: z.string().trim().max(120).optional()
});

export const ChequeBounceDetailsSchema = z.object({
  chequeNumber: requiredText,
  bankName: requiredText,
  chequeAmount: z.coerce.number().positive("Amount must be greater than zero"),
  chequeDate: z.string().min(1, "Cheque date is required"),
  dishonourDate: z.string().min(1, "Dishonour date is required"),
  dishonourReason: z.string().trim().max(300).optional(),
  underlyingTransaction: requiredText.max(1200),
  desiredRelief: requiredText.max(800)
});

export const OnlineFraudDetailsSchema = z.object({
  platform: requiredText,
  sellerName: requiredText,
  amountPaid: z.coerce.number().positive(),
  paymentMethod: requiredText,
  orderDate: z.string().min(1),
  deliveryStatus: requiredText,
  desiredRelief: requiredText
});

export const LandlordDisputeDetailsSchema = z.object({
  propertyAddress: requiredText,
  tenancyStartDate: z.string().min(1),
  securityDepositAmount: z.coerce.number().nonnegative(),
  monthlyRent: z.coerce.number().nonnegative(),
  disputeType: requiredText,
  agreementAvailable: z.enum(["yes", "no"]),
  desiredRelief: requiredText
});

export const EmployerDisputeDetailsSchema = z.object({
  employerName: requiredText,
  jobTitle: requiredText,
  employmentPeriod: requiredText,
  salary: z.coerce.number().nonnegative(),
  unpaidAmount: z.coerce.number().positive(),
  proofAvailable: z.enum(["yes", "no"]),
  desiredRelief: requiredText
});

export const DefamationDetailsSchema = z.object({
  statementMade: requiredText,
  whereMade: requiredText,
  statementDate: z.string().min(1),
  audience: requiredText,
  proofAvailable: z.enum(["yes", "no"]),
  harmCaused: requiredText,
  desiredRelief: requiredText
});

export const DeclarationSchema = z.object({
  declarationAccepted: z.literal("on", {
    errorMap: () => ({ message: "You must accept the declaration before submitting." })
  })
});

export const SubmitNoticeSchema = CategoryLocationSchema.merge(PartiesStepSchema).extend({
  details: z.record(z.unknown()),
  factsNarrative: requiredText.max(2500),
  desiredRelief: requiredText.max(800),
  declarationAccepted: z.boolean().refine(Boolean, "Declaration is required")
});

export type SubmitNoticeInput = z.infer<typeof SubmitNoticeSchema>;
