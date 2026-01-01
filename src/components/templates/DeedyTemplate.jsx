import React from 'react';

export default function DeedyTemplate({ data, sectionOrder }) {
    return (
        <div style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            color: '#333',
            background: 'white',
            padding: '40px',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '30px',
            lineHeight: '1.4'
        }}>
            {/* Left Sidebar */}
            <aside>
                <header style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0, lineHeight: '1', color: '#000' }}>{data.personal.fullName.split(' ')[0]}</h1>
                    <h1 style={{ fontSize: '36px', fontWeight: '300', margin: 0, lineHeight: '1', color: '#333' }}>{data.personal.fullName.split(' ').slice(1).join(' ')}</h1>
                </header>

                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '18px', color: '#1a73e8', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>Contact</h3>
                    <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {data.personal.phone && <span>{data.personal.phone}</span>}
                        {data.personal.email && <span style={{ color: '#1a73e8' }}>{data.personal.email}</span>}
                        {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
                        {data.personal.portfolio && <span style={{ color: '#1a73e8' }}>{data.personal.portfolio}</span>}
                    </div>
                </section>

                {sectionOrder.some(s => s.id === 'skills') && (
                    <section style={{ marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '18px', color: '#1a73e8', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>Skills</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {data.skills.map((skill, index) => (
                                <div key={index} style={{ fontSize: '13px' }}>
                                    <strong>•</strong> {skill}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {sectionOrder.some(s => s.id === 'education') && (
                    <section>
                        <h3 style={{ fontSize: '18px', color: '#1a73e8', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>Education</h3>
                        {data.education.map((edu, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{edu.school}</div>
                                <div style={{ fontSize: '12px' }}>{edu.degree}</div>
                                <div style={{ fontSize: '11px', color: '#666' }}>{edu.year}</div>
                            </div>
                        ))}
                    </section>
                )}
            </aside>

            {/* Main Content */}
            <main>
                <div style={{ fontSize: '18px', fontWeight: '300', marginBottom: '30px', color: '#666' }}>{data.personal.jobTitle}</div>

                {sectionOrder.map(section => {
                    if (section.id === 'skills' || section.id === 'education') return null;

                    switch (section.id) {
                        case 'summary':
                            return data.personal.summary && (
                                <section key={section.id} style={{ marginBottom: '25px' }}>
                                    <h3 style={{ fontSize: '18px', color: '#1a73e8', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>Profile</h3>
                                    <p style={{ fontSize: '13px', textAlign: 'justify' }}>{data.personal.summary}</p>
                                </section>
                            );
                        case 'experience':
                            return data.experience.length > 0 && (
                                <section key={section.id} style={{ marginBottom: '25px' }}>
                                    <h3 style={{ fontSize: '18px', color: '#1a73e8', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>Experience</h3>
                                    {data.experience.map((exp, index) => (
                                        <div key={index} style={{ marginBottom: '15px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
                                                <span>{exp.title}</span>
                                                <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#666' }}>{exp.date}</span>
                                            </div>
                                            <div style={{ fontStyle: 'italic', fontSize: '13px', marginBottom: '5px', color: '#444' }}>{exp.company}</div>
                                            <p style={{ fontSize: '13px', margin: 0 }}>{exp.description}</p>
                                        </div>
                                    ))}
                                </section>
                            );
                        case 'certifications':
                            return data.certifications && data.certifications.length > 0 && (
                                <section key={section.id} style={{ marginBottom: '25px' }}>
                                    <h3 style={{ fontSize: '18px', color: '#1a73e8', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>Certifications</h3>
                                    {data.certifications.map((cert, index) => (
                                        <div key={index} style={{ marginBottom: '8px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                                <strong>{cert.name}</strong>
                                                <span style={{ fontSize: '11px', color: '#666' }}>{cert.year}</span>
                                            </div>
                                            <div style={{ fontSize: '12px' }}>{cert.issuer}</div>
                                        </div>
                                    ))}
                                </section>
                            );
                        default:
                            return null;
                    }
                })}
            </main>
        </div>
    );
}
