import { SiteHeader } from "@/components/marketing/site-header";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { InfoBox } from "@/components/ui/info-box";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { languages, practiceAreas, provinces } from "@/lib/legal/practice-areas";
import { submitNotice } from "@/lib/wizard/actions";

export default async function WizardPage({
  params,
  searchParams
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ sessionId }, { category: categoryParam }] = await Promise.all([params, searchParams]);
  const category = categoryParam ?? "cheque-bounce";

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-oxblood">Session {sessionId}</p>
          <h1 className="mt-2 font-serif text-4xl font-bold">Notice wizard</h1>
          <p className="mt-3 leading-7 text-mutedInk">Step through the facts. A lawyer reviews before final PDF delivery.</p>
        </div>
        <ProgressSteps current={1} steps={["Issue", "Parties", "Facts", "Review"]} />
        <form action={submitNotice} className="mt-8 grid gap-6">
          <section className="rounded-md border border-border bg-paper p-5">
            <h2 className="font-serif text-2xl font-bold">1. Category and location</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Practice area">
                <Select name="practiceAreaSlug" defaultValue={category}>
                  {practiceAreas.map((area) => (
                    <option key={area.slug} value={area.slug}>
                      {area.title}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Province or territory">
                <Select name="province" required>
                  {provinces.map((province) => (
                    <option key={province}>{province}</option>
                  ))}
                </Select>
              </Field>
              <Field label="City">
                <Input name="city" placeholder="Lahore" required />
              </Field>
              <Field label="Language">
                <Select name="language" defaultValue="en">
                  {languages.map((language) => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          </section>

          <section className="rounded-md border border-border bg-paper p-5">
            <h2 className="font-serif text-2xl font-bold">2. Parties</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Your full name">
                <Input name="claimantName" required />
              </Field>
              <Field label="Your phone">
                <Input name="claimantPhone" required />
              </Field>
              <Field label="Your email">
                <Input name="claimantEmail" type="email" required />
              </Field>
              <Field label="Your address" hint="Needed so the notice can identify the claimant properly.">
                <Input name="claimantAddress" required />
              </Field>
              <Field label="Respondent name">
                <Input name="respondentName" required />
              </Field>
              <Field label="Respondent type">
                <Select name="respondentType" defaultValue="person">
                  <option value="person">Person</option>
                  <option value="business">Business</option>
                  <option value="employer">Employer</option>
                </Select>
              </Field>
              <Field label="Respondent address" hint="A legal notice usually needs a deliverable address.">
                <Input name="respondentAddress" required />
              </Field>
              <Field label="Respondent phone/email if available">
                <Input name="respondentContact" />
              </Field>
            </div>
          </section>

          <section className="rounded-md border border-border bg-paper p-5">
            <h2 className="font-serif text-2xl font-bold">3. Cheque bounce details</h2>
            <InfoBox>Evidence upload is planned for Supabase Storage; for this MVP screen, list evidence in the facts.</InfoBox>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Cheque number">
                <Input name="chequeNumber" required />
              </Field>
              <Field label="Bank name">
                <Input name="bankName" required />
              </Field>
              <Field label="Cheque amount">
                <Input name="chequeAmount" type="number" min="1" required />
              </Field>
              <Field label="Cheque date">
                <Input name="chequeDate" type="date" required />
              </Field>
              <Field label="Dishonour date">
                <Input name="dishonourDate" type="date" required />
              </Field>
              <Field label="Reason for dishonour if available">
                <Input name="dishonourReason" />
              </Field>
              <div className="md:col-span-2">
                <Field label="Underlying transaction and evidence">
                  <Textarea name="underlyingTransaction" required />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="What do you want from the respondent?">
                  <Textarea name="desiredRelief" required />
                </Field>
              </div>
            </div>
          </section>

          <section className="rounded-md border border-border bg-paper p-5">
            <h2 className="font-serif text-2xl font-bold">4. Review and declaration</h2>
            <label className="mt-5 flex gap-3 text-sm leading-6 text-mutedInk">
              <input name="declarationAccepted" type="checkbox" required className="mt-1 h-4 w-4 accent-forest" />
              <span>
                I confirm that the information I provided is true to the best of my knowledge. I understand that Duhai
                prepares a legal notice based on my submitted facts and that false information may harm my claim and
                create legal consequences for me.
              </span>
            </label>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit">Submit for lawyer review</Button>
              <p className="text-sm text-mutedInk">No final notice is sent before lawyer approval.</p>
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}
