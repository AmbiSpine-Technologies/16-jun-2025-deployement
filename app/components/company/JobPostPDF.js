// components/JobPostPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Helvetica', fontSize: 11, lineHeight: 1.6, color: '#333' },
  
  // Header Style
  header: { borderBottomWidth: 2, borderBottomColor: '#2563EB', paddingBottom: 15, marginBottom: 20 },
  jobTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827', textTransform: 'capitalize' },
  subHeader: { fontSize: 10, color: '#6B7280', marginTop: 4, flexDirection: 'row', gap: 10 },
  
  // Section Style
  section: { marginBottom: 15 },
  heading: { fontSize: 12, fontWeight: 'bold', color: '#374151', marginBottom: 6, textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 2 },
  
  // Content Style
  text: { fontSize: 10, color: '#4B5563', marginBottom: 4 },
  bulletPoint: { fontSize: 10, color: '#4B5563', marginLeft: 10 }, // Indent for bullets
  
  // Grid for Info
  row: { flexDirection: 'row', justifyContent: 'flex-start', gap: 40, marginBottom: 5 },
  infoLabel: { fontSize: 10, fontWeight: 'bold', color: '#374151' },
  
  // Skills Tag Style
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  tag: { fontSize: 9, backgroundColor: '#F3F4F6', color: '#1F2937', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, borderWidth: 1, borderColor: '#E5E7EB' }
});

// ✅ SMART PARSER: HTML को PDF-Readable फॉर्मेट में बदलता है (Bullets preserves करता है)
const formatHtmlToPdf = (html) => {
    if (!html) return "Not provided";
    
    // 1. <br>, </p>, </div> को New Line बनाओ
    let text = html.replace(/<br\s*\/?>/gi, '\n')
                   .replace(/<\/p>/gi, '\n\n')
                   .replace(/<\/div>/gi, '\n');

    // 2. <li> को Bullet Point (•) बनाओ
    text = text.replace(/<li[^>]*>/gi, '\n•  ');

    // 3. बाकी सारे HTML Tags हटा दो
    text = text.replace(/<[^>]+>/g, '');

    // 4. HTML Entities decode करो (e.g. &amp; -> &)
    text = text.replace(/&nbsp;/g, ' ')
               .replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>');

    return text.trim();
};

export const JobPostPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.jobTitle}>{data.jobTitle || "Job Title"}</Text>
        <View style={styles.subHeader}>
            <Text>{data.companyName}  |  {data.location}  |  {data.employmentType}</Text>
        </View>
        <Text style={{ fontSize: 9, color: '#9CA3AF', marginTop: 2 }}>{data.companyEmail} • {data.website}</Text>
      </View>

      {/* QUICK INFO GRID */}
      <View style={styles.section}>
        <Text style={styles.heading}>Job Details</Text>
        <View style={styles.row}>
            <View>
                <Text style={styles.infoLabel}>Experience:</Text>
                <Text style={styles.text}>{data.experience}</Text>
            </View>
            <View>
                <Text style={styles.infoLabel}>Salary (CTC):</Text>
                <Text style={styles.text}>{data.minSalary} - {data.maxSalary}</Text>
            </View>
            <View>
                <Text style={styles.infoLabel}>Qualification:</Text>
                <Text style={styles.text}>{data.education}</Text>
            </View>
        </View>
      </View>

      {/* SUMMARY */}
      <View style={styles.section}>
        <Text style={styles.heading}>Job Overview</Text>
        <Text style={styles.text}>{formatHtmlToPdf(data.jobSummary)}</Text>
      </View>

      {/* RESPONSIBILITIES */}
      <View style={styles.section}>
        <Text style={styles.heading}>Key Responsibilities</Text>
        <Text style={styles.text}>{formatHtmlToPdf(data.responsibilities)}</Text>
      </View>

      {/* SKILLS */}
      <View style={styles.section}>
        <Text style={styles.heading}>Required Skills</Text>
        <View style={styles.tagContainer}>
            {data.skills?.map((skill, i) => (
                <Text key={i} style={styles.tag}>{skill}</Text>
            ))}
        </View>
      </View>

    </Page>
  </Document>
);