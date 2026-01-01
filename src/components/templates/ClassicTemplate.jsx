import React from 'react';

export default function ClassicTemplate({ data, sectionOrder }) {
    return (
        <div style={{
            fontFamily: '"Times New Roman", Times, serif',
            color: '#1a1a1a',
            background: 'white',
            padding: '40px',
            lineHeight: '1.4'
        }}>
            <header style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '28px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 10px 0', color: '#000' }}>{data.personal.fullName}</h1>
                <div style={{ fontSize: '16px', marginBottom: '10px' }}>{data.personal.jobTitle}</div>
                <div style={{ fontSize: '14px', color: '#444' }}>
                    {data.personal.phone} | {data.personal.email} | {data.personal.linkedin}
                </div>
            </header>

            {sectionOrder.map(section => {
                switch (section.id) {
                    case 'summary':
                        return data.personal.summary && (
                            <section key={section.id} style={{ marginBottom: '20px' }}>
                                <h3 style={{
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid black',
                                    marginBottom: '10px',
                                    fontWeight: 'bold'
                                }}>Professional Summary</h3>
                                <p style={{ fontSize: '14px', textAlign: 'justify' }}>{data.personal.summary}</p>
                            </section>
                        );
                    case 'experience':
                        return data.experience.length > 0 && (
                            <section key={section.id} style={{ marginBottom: '20px' }}>
                                <h3 style={{
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid black',
                                    marginBottom: '10px',
                                    fontWeight: 'bold'
                                }}>Experience</h3>
                                {data.experience.map((exp, index) => (
                                    <div key={index} style={{ marginBottom: '15px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                            <span>{exp.title}</span>
                                            <span>{exp.date}</span>
                                        </div>
                                        <div style={{ fontStyle: 'italic', marginBottom: '5px' }}>{exp.company}</div>
                                        <p style={{ fontSize: '14px' }}>{exp.description}</p>
                                    </div>
                                ))}
                            </section>
                        );
                    case 'education':
                        return data.education.length > 0 && (
                            <section key={section.id} style={{ marginBottom: '20px' }}>
                                <h3 style={{
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid black',
                                    marginBottom: '10px',
                                    fontWeight: 'bold'
                                }}>Education</h3>
                                {data.education.map((edu, index) => (
                                    <div key={index} style={{ marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                            <span>{edu.school}</span>
                                            <span>{edu.year}</span>
                                        </div>
                                        <div>{edu.degree}</div>
                                    </div>
                                ))}
                            </section>
                        );
                    case 'certifications':
                        return data.certifications && data.certifications.length > 0 && (
                            <section key={section.id} style={{ marginBottom: '20px' }}>
                                <h3 style={{
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid black',
                                    marginBottom: '10px',
                                    fontWeight: 'bold'
                                }}>Certifications</h3>
                                {data.certifications.map((cert, index) => (
                                    <div key={index} style={{ marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <strong>{cert.name}</strong>
                                            <span>{cert.year}</span>
                                        </div>
                                        <div>{cert.issuer}</div>
                                    </div>
                                ))}
                            </section>
                        );
                    case 'skills':
                        return data.skills.length > 0 && (
                            <section key={section.id}>
                                <h3 style={{
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid black',
                                    marginBottom: '10px',
                                    fontWeight: 'bold'
                                }}>Skills</h3>
                                <p style={{ fontSize: '14px' }}>
                                    {data.skills.join(' • ')}
                                </p>
                            </section>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}
