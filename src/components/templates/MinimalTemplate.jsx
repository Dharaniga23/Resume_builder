import React from 'react';

export default function MinimalTemplate({ data, sectionOrder }) {
    return (
        <div style={{
            fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
            color: '#333',
            background: 'white',
            padding: '40px',
            lineHeight: '1.6'
        }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '42px', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-1px' }}>{data.personal.fullName}</h1>
                <div style={{ fontSize: '20px', color: '#666', marginBottom: '20px' }}>{data.personal.jobTitle}</div>
                <div style={{ fontSize: '14px', color: '#888', display: 'flex', gap: '20px' }}>
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.phone && <span>{data.personal.phone}</span>}
                    {data.personal.portfolio && <span>{data.personal.portfolio}</span>}
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
                {sectionOrder.map(section => {
                    switch (section.id) {
                        case 'summary':
                            return data.personal.summary && (
                                <section key={section.id}>
                                    <h3 style={{ fontSize: '14px', color: '#999', textTransform: 'uppercase', marginBottom: '15px' }}>About Me</h3>
                                    <p style={{ fontSize: '16px', maxWidth: '600px' }}>{data.personal.summary}</p>
                                </section>
                            );
                        case 'experience':
                            return data.experience.length > 0 && (
                                <section key={section.id}>
                                    <h3 style={{ fontSize: '14px', color: '#999', textTransform: 'uppercase', marginBottom: '20px' }}>Experience</h3>
                                    {data.experience.map((exp, index) => (
                                        <div key={index} style={{ marginBottom: '25px', paddingLeft: '20px', borderLeft: '2px solid #eee' }}>
                                            <div style={{ fontSize: '18px', fontWeight: '600' }}>{exp.title}</div>
                                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{exp.company} | {exp.date}</div>
                                            <p style={{ fontSize: '15px', color: '#444' }}>{exp.description}</p>
                                        </div>
                                    ))}
                                </section>
                            );
                        case 'education':
                            return data.education.length > 0 && (
                                <section key={section.id}>
                                    <h3 style={{ fontSize: '14px', color: '#999', textTransform: 'uppercase', marginBottom: '20px' }}>Education</h3>
                                    <div style={{ display: 'grid', gap: '15px' }}>
                                        {data.education.map((edu, index) => (
                                            <div key={index}>
                                                <div style={{ fontWeight: '600' }}>{edu.school}</div>
                                                <div style={{ fontSize: '14px', color: '#666' }}>{edu.degree} · {edu.year}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        case 'certifications':
                            return data.certifications && data.certifications.length > 0 && (
                                <section key={section.id}>
                                    <h3 style={{ fontSize: '14px', color: '#999', textTransform: 'uppercase', marginBottom: '20px' }}>Certifications</h3>
                                    {data.certifications.map((cert, index) => (
                                        <div key={index} style={{ marginBottom: '10px' }}>
                                            <div style={{ fontWeight: '600' }}>{cert.name}</div>
                                            <div style={{ fontSize: '14px', color: '#666' }}>{cert.issuer} · {cert.year}</div>
                                        </div>
                                    ))}
                                </section>
                            );
                        case 'skills':
                            return data.skills.length > 0 && (
                                <section key={section.id}>
                                    <h3 style={{ fontSize: '14px', color: '#999', textTransform: 'uppercase', marginBottom: '15px' }}>Skills</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {data.skills.map((skill, index) => (
                                            <span key={index} style={{ background: '#f5f5f5', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', color: '#333' }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
}
