import { useState } from 'react';
import { Download } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';
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

  const [selectedTemplate, setSelectedTemplate] = useState('modern');

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
    <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="flex justify-between items-center glass-panel" style={{ padding: '0.75rem 2rem', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#3b82f6' }}>Resume Builder <span className="text-gray-500 font-normal">Pro</span></h1>
        <button onClick={handleDownload} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-blue-900/20">
          <Download size={18} /> Download PDF
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 main-content" style={{ flex: 1, overflow: 'hidden', padding: '0 2rem 1rem' }}>
        {/* Left Side: Form */}
        <div className="lg:col-span-4 h-full scroll-panel pr-2 custom-scrollbar">
          <div className="mb-6 glass-panel">
            <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />
          </div>
          <ResumeForm
            data={resumeData}
            updateData={setResumeData}
            sectionOrder={sectionOrder}
            setSectionOrder={setSectionOrder}
          />
        </div>

        {/* Right Side: Preview */}
        <div className="lg:col-span-8 h-full scroll-panel bg-gray-900/30 rounded-2xl p-6 border border-gray-800 custom-scrollbar">
          <ResumePreview
            data={resumeData}
            sectionOrder={sectionOrder}
            selectedTemplate={selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
