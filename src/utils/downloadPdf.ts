export const triggerPdfDownload = (filename: string = "Mendel_Fellowship_Roadmap.pdf") => {
  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kinds [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 200 >>
stream
BT
/F1 20 Tf
40 730 Td
(Mendel Academy - Molecular Pathology Fellowship) Tj
0 -30 Td
/F1 12 Tf
(12-Month Virtual Fellowship Roadmap & Detailed Curriculum) Tj
0 -25 Td
(Phase 1: Foundations of Integrated Diagnosis) Tj
0 -20 Td
(Phase 2: Molecular Methods & Interpretation) Tj
0 -20 Td
(Phase 3: Precision Oncology in Practice) Tj
0 -20 Td
(Phase 4: Leadership & Implementation) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000495 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
568
%%EOF`;

  try {
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  } catch (err) {
    console.error("PDF download failed", err);
  }
};
