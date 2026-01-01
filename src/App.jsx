import { useState } from 'react';
import { Download } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';

function App() {
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      linkedin: 'linkedin.com/in/johndoe',
      portfolio: 'johndoe.com',
      jobTitle: 'Software Engineer',
      summary: 'Passionate software engineer with 5+ years of experience in building scalable web applications.'
    },
    experience: [],
    education: [],
    skills: [],
    certifications: []
  });

  const [sectionOrder, setSectionOrder] = useState([
    { id: 'summary', label: 'Professional Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'skills', label: 'Skills' }
  ]);

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview');
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210;
    const pdfHeight = 297;

    const imgProperties = pdf.getImageProperties(data);
    const imgHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(data, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(data, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('resume.pdf');
  };

  return (
    <div className="container">
      <header className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Resume Builder</h1>
        <button onClick={handleDownload}>
          <Download size={20} />
          Download PDF
        </button>
      </header>

      <div className="grid grid-cols-2 gap-4 main-content">
        <div className="glass-panel">
          <ResumeForm data={resumeData} updateData={setResumeData} sectionOrder={sectionOrder} setSectionOrder={setSectionOrder} />
        </div>

        <div className="resume-container">
          <ResumePreview data={resumeData} sectionOrder={sectionOrder} />
        </div>
      </div>
    </div>
  );
}

export default App;
