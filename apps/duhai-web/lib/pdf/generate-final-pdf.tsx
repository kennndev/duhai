import "server-only";
import { Document, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 54, fontFamily: "Times-Roman", fontSize: 11, lineHeight: 1.6 },
  header: { borderBottomWidth: 1, borderBottomColor: "#111111", paddingBottom: 12, marginBottom: 24 },
  firm: { fontSize: 18, fontWeight: "bold" },
  subject: { marginTop: 20, marginBottom: 16, fontWeight: "bold" },
  body: { marginBottom: 14 },
  footer: { position: "absolute", bottom: 28, left: 54, right: 54, fontSize: 9, color: "#555555" }
});

export async function generateFinalPdf(input: {
  referenceNumber: string;
  respondentName: string;
  subject: string;
  body: string;
  reliefDemanded: string;
  deadlineDays: number;
  reviewingLawyerName: string;
  barEnrollmentNumber?: string | null;
}) {
  return renderToBuffer(
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.firm}>Duhai Legal Review Chamber</Text>
          <Text>Lawyer-reviewed legal notice for Pakistan</Text>
        </View>
        <Text>Reference: {input.referenceNumber}</Text>
        <Text>Date: {new Date().toLocaleDateString("en-GB")}</Text>
        <Text>To: {input.respondentName}</Text>
        <Text style={styles.subject}>Subject: {input.subject}</Text>
        <Text style={styles.body}>{input.body}</Text>
        <Text style={styles.body}>Demand / Relief: {input.reliefDemanded}</Text>
        <Text style={styles.body}>Deadline: {input.deadlineDays} days from receipt of this notice.</Text>
        <Text>Reviewed by: {input.reviewingLawyerName}</Text>
        <Text>Bar / Enrollment: {input.barEnrollmentNumber ?? "On record"}</Text>
        <Text style={styles.footer}>Page 1 | {input.referenceNumber}</Text>
      </Page>
    </Document>
  );
}
