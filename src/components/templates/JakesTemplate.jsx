import React from 'react';

export default function JakesTemplate({ data, sectionOrder }) {
    return (
        <div style={{
            fontFamily: '"Times New Roman", Times, serif',
            color: 'black',
            background: 'white',
            padding: '40px',
            lineHeight: '1.2'
        }}>
            <header style={{ textAlign: 'center', marginBottom: '15px' }}>
                <h1 style={{ fontSize: '28px', margin: '0 0 5px 0', color: '#000' }}>{data.personal.fullName}</h1>
                <div style={{ fontSize: '13px' }}>
                    {data.personal.phone} | {data.personal.email} | {data.personal.linkedin} | {data.personal.portfolio}
                </div>
            </header>

            {sectionOrder.map(section => {
                switch (section.id) {
                    case 'summary':
                        return data.personal.summary && (
                            <section key={section.id} style={{ marginBottom: '12px' }}>
                                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid black', marginBottom: '5px', fontWeight: 'bold' }}>Summary</h3>
                                <p style={{ fontSize: '12px', textAlign: 'justify', margin: 0 }}>{data.personal.summary}</p>
                            </section>
                        );
                    case 'experience':
                        return data.experience.length > 0 && (
                            <section key={section.id} style={{ marginBottom: '12px' }}>
                                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid black', marginBottom: '5px', fontWeight: 'bold' }}>Experience</h3>
                                {data.experience.map((exp, index) => (
                                    <div key={index} style={{ marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px' }}>
                                            <span>{exp.title}</span>
                                            <span>{exp.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: '12px' }}>
                                            <span>{exp.company}</span>
                                        </div>
                                        <p style={{ fontSize: '12px', margin: '2px 0 0 0' }}>{exp.description}</p>
                                    </div>
                                ))}
                            </section>
                        );
                    case 'education':
                        return data.education.length > 0 && (
                            <section key={section.id} style={{ marginBottom: '12px' }}>
                                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid black', marginBottom: '5px', fontWeight: 'bold' }}>Education</h3>
                                {data.education.map((edu, index) => (
                                    <div key={index} style={{ marginBottom: '5px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px' }}>
                                            <span>{edu.school}</span>
                                            <span>{edu.year}</span>
                                        </div>
                                        <div style={{ fontSize: '12px' }}>{edu.degree}</div>
                                    </div>
                                ))}
                            </section>
                        );
                    case 'certifications':
                        return data.certifications && data.certifications.length > 0 && (
                            <section key={section.id} style={{ marginBottom: '12px' }}>
                                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid black', marginBottom: '5px', fontWeight: 'bold' }}>Certifications</h3>
                                {data.certifications.map((cert, index) => (
                                    <div key={index} style={{ marginBottom: '4px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                            <strong>{cert.name}</strong>
                                            <span>{cert.year}</span>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        );
                    case 'skills':
                        return data.skills.length > 0 && (
                            <section key={section.id} style={{ marginBottom: '12px' }}>
                                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid black', marginBottom: '5px', fontWeight: 'bold' }}>Technical Skills</h3>
                                <p style={{ fontSize: '12px', margin: 0 }}>
                                    <strong>Skills:</strong> {data.skills.join(', ')}
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
