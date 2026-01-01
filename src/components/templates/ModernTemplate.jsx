import React from 'react';

export default function ModernTemplate({ data, sectionOrder }) {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            color: 'black',
            background: 'white',
            padding: '40px'
        }}>
            <header style={{ borderBottom: '2px solid #333', paddingBottom: '20px', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '32px', textTransform: 'uppercase', color: '#333', margin: 0 }}>{data.personal.fullName}</h1>
                <h2 style={{ fontSize: '18px', color: '#666', marginTop: '5px' }}>{data.personal.jobTitle}</h2>
                <div style={{ marginTop: '10px', fontSize: '14px', color: '#444', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {data.personal.email && <span>📧 {data.personal.email}</span>}
                    {data.personal.phone && <span>📱 {data.personal.phone}</span>}
                    {data.personal.linkedin && <span>🔗 {data.personal.linkedin}</span>}
                    {data.personal.portfolio && <span>🌐 {data.personal.portfolio}</span>}
                </div>
            </header>

            {sectionOrder.map(section => {
                switch (section.id) {
                    case 'summary':
                        return data.personal.summary && (
                            <section key={section.id} style={{ marginBottom: '25px' }}>
                                <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>Professional Summary</h3>
                                <p style={{ lineHeight: '1.6', fontSize: '14px' }}>{data.personal.summary}</p>
                            </section>
                        );
                    case 'experience':
                        return data.experience.length > 0 && (
                            <section key={section.id} style={{ marginBottom: '25px' }}>
                                <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>Experience</h3>
                                {data.experience.map((exp, index) => (
                                    <div key={index} style={{ marginBottom: '15px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <strong style={{ fontSize: '15px' }}>{exp.title}</strong>
                                            <span style={{ fontSize: '14px', color: '#666' }}>{exp.date}</span>
                                        </div>
                                        <div style={{ fontStyle: 'italic', fontSize: '14px', marginBottom: '5px' }}>{exp.company}</div>
                                        <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{exp.description}</p>
                                    </div>
                                ))}
                            </section>
                        );
                    case 'education':
                        return data.education.length > 0 && (
                            <section key={section.id} style={{ marginBottom: '25px' }}>
                                <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>Education</h3>
                                {data.education.map((edu, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <strong style={{ fontSize: '15px' }}>{edu.school}</strong>
                                            <span style={{ fontSize: '14px', color: '#666' }}>{edu.year}</span>
                                        </div>
                                        <div style={{ fontSize: '14px' }}>{edu.degree}</div>
                                    </div>
                                ))}
                            </section>
                        );
                    case 'certifications':
                        return data.certifications && data.certifications.length > 0 && (
                            <section key={section.id} style={{ marginBottom: '25px' }}>
                                <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>Certifications</h3>
                                {data.certifications.map((cert, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <strong style={{ fontSize: '15px' }}>{cert.name}</strong>
                                            <span style={{ fontSize: '14px', color: '#666' }}>{cert.year}</span>
                                        </div>
                                        <div style={{ fontSize: '14px' }}>{cert.issuer}</div>
                                    </div>
                                ))}
                            </section>
                        );
                    case 'skills':
                        return data.skills.length > 0 && (
                            <section key={section.id}>
                                <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>Skills</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {data.skills.map((skill, index) => (
                                        skill && <span key={index} style={{ background: '#eee', padding: '5px 10px', borderRadius: '4px', fontSize: '14px' }}>{skill}</span>
                                    ))}
                                </div>
                            </section>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}
