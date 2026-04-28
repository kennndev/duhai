"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createReferenceNumber } from "@/lib/security/reference";
import {
  CategoryLocationSchema,
  ChequeBounceDetailsSchema,
  DeclarationSchema,
  PartiesStepSchema,
  StartWizardSchema
} from "@/lib/wizard/schema";

export async function startWizardSession(formData: FormData) {
  const parsed = StartWizardSchema.parse({
    practiceAreaSlug: formData.get("practiceAreaSlug"),
    source: "start-page"
  });
  const sessionId = `local-${Date.now()}-${parsed.practiceAreaSlug}`;
  redirect(`/wizard/${sessionId}?category=${parsed.practiceAreaSlug}`);
}

export async function saveWizardStep() {
  return { ok: true };
}

export async function submitNotice(formData: FormData) {
  const category = CategoryLocationSchema.parse({
    practiceAreaSlug: formData.get("practiceAreaSlug"),
    province: formData.get("province"),
    city: formData.get("city"),
    language: formData.get("language")
  });
  const parties = PartiesStepSchema.parse({
    claimantName: formData.get("claimantName"),
    claimantPhone: formData.get("claimantPhone"),
    claimantEmail: formData.get("claimantEmail"),
    claimantAddress: formData.get("claimantAddress"),
    respondentName: formData.get("respondentName"),
    respondentType: formData.get("respondentType"),
    respondentAddress: formData.get("respondentAddress"),
    respondentContact: formData.get("respondentContact") || undefined
  });
  const chequeDetails = ChequeBounceDetailsSchema.parse({
    chequeNumber: formData.get("chequeNumber"),
    bankName: formData.get("bankName"),
    chequeAmount: formData.get("chequeAmount"),
    chequeDate: formData.get("chequeDate"),
    dishonourDate: formData.get("dishonourDate"),
    dishonourReason: formData.get("dishonourReason") || undefined,
    underlyingTransaction: formData.get("underlyingTransaction"),
    desiredRelief: formData.get("desiredRelief")
  });
  DeclarationSchema.parse({ declarationAccepted: formData.get("declarationAccepted") });

  const payload = {
    ...category,
    ...parties,
    details: chequeDetails,
    factsNarrative: chequeDetails.underlyingTransaction,
    desiredRelief: chequeDetails.desiredRelief,
    declarationAccepted: true
  };

  z.object({ declarationAccepted: z.literal(true) }).parse(payload);

  const referenceNumber = createReferenceNumber();
  redirect(`/notice/${referenceNumber}?status=submitted`);
}

export async function assignLawyerReview() {
  console.info("review.assigned");
}

export async function startLawyerReview() {
  console.info("review.started");
}

export async function approveNoticeDraft() {
  console.info("review.approved");
}

export async function requestMoreInformation() {
  console.info("review.more_information_requested");
}

export async function rejectNotice() {
  console.info("review.rejected");
}

export async function getNoticeStatus(referenceNumber: string) {
  return {
    referenceNumber,
    status: "lawyer_review_pending" as const,
    submittedAt: new Date().toISOString(),
    category: "Cheque Bounce",
    currentStage: "Awaiting lawyer review",
    nextStep: "A reviewer checks the draft before the final PDF is generated.",
    pdfUrl: null
  };
}
