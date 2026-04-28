import "server-only";

export type NoticeLegalContext = {
  template: {
    title: string;
    body: string;
    formattingRules: Record<string, unknown>;
  } | null;
  statutes: Array<{
    title: string;
    section: string | null;
    text: string;
    summary: string | null;
  }>;
  caseCitations: Array<{
    citation: string;
    caseTitle: string;
    court: string | null;
    year: number | null;
    legalPrinciple: string;
  }>;
  manualReviewRequired: boolean;
};

export async function retrieveLegalContext(input: {
  practiceAreaSlug: string;
  language: string;
  province?: string | null;
}): Promise<NoticeLegalContext> {
  if (input.practiceAreaSlug !== "cheque-bounce") {
    return {
      template: null,
      statutes: [],
      caseCitations: [],
      manualReviewRequired: true
    };
  }

  return {
    template: {
      title: "Cheque dishonour payment recovery notice",
      body: "Legal notice regarding dishonoured cheque {{chequeNumber}} for PKR {{chequeAmount}}.",
      formattingRules: { tone: "formal", deadline_days: 15, paper: "A4" }
    },
    statutes: [
      {
        title: "Pakistan Penal Code",
        section: "489-F",
        text:
          "Dishonestly issuing a cheque towards repayment of a loan or fulfillment of an obligation which is dishonoured may create criminal liability subject to statutory requirements and facts.",
        summary: "Cheque dishonour context for lawyer-reviewed notices."
      }
    ],
    caseCitations: [],
    manualReviewRequired: false
  };
}
