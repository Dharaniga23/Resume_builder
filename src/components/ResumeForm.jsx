import { Plus, Trash2, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function ResumeForm({ data, updateData, sectionOrder, setSectionOrder }) {
    const handleChange = (section, e) => {
        const { name, value } = e.target;
        updateData(prev => ({
            ...prev,
            [section]: { ...prev[section], [name]: value }
        }));
    };

    const handleArrayChange = (section, index, field, value) => {
        const newArray = [...data[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        updateData(prev => ({ ...prev, [section]: newArray }));
    };

    const addItem = (section, item) => {
        updateData(prev => ({
            ...prev,
            [section]: [...prev[section], item]
        }));
    };

    const removeItem = (section, index) => {
        updateData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const newOrder = Array.from(sectionOrder);
        const [reorderedItem] = newOrder.splice(result.source.index, 1);
        newOrder.splice(result.destination.index, 0, reorderedItem);

        setSectionOrder(newOrder);
    };

    const renderSection = (section, provided) => {
        const content = (() => {
            switch (section.id) {
                case 'summary':
                    return (
                        <div>
                            <textarea
                                name="summary"
                                value={data.personal.summary}
                                onChange={(e) => handleChange('personal', e)}
                                rows="4"
                                placeholder="Professional Summary..."
                                className="w-full"
                            />
                        </div>
                    );
                case 'experience':
                    return (
                        <div className="flex flex-col gap-4">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="glass-panel" style={{ padding: '1rem' }}>
                                    <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
                                        <h4>Job {index + 1}</h4>
                                        <button className="secondary" style={{ padding: '0.25rem 0.5rem' }} onClick={() => removeItem('experience', index)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            placeholder="Job Title"
                                            value={exp.title}
                                            onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                                        />
                                        <input
                                            placeholder="Company"
                                            value={exp.company}
                                            onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                                        />
                                        <input
                                            placeholder="Date Range"
                                            value={exp.date}
                                            onChange={(e) => handleArrayChange('experience', index, 'date', e.target.value)}
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Job Description"
                                        value={exp.description}
                                        onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                                        rows="3"
                                        className="mb-0"
                                    />
                                </div>
                            ))}
                            <button className="secondary w-full justify-center" onClick={() => addItem('experience', { title: '', company: '', date: '', description: '' })}>
                                <Plus size={16} /> Add Job
                            </button>
                        </div>
                    );
                case 'education':
                    return (
                        <div className="flex flex-col gap-4">
                            {data.education.map((edu, index) => (
                                <div key={index} className="glass-panel" style={{ padding: '1rem' }}>
                                    <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
                                        <h4>School {index + 1}</h4>
                                        <button className="secondary" style={{ padding: '0.25rem 0.5rem' }} onClick={() => removeItem('education', index)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            placeholder="Degree"
                                            value={edu.degree}
                                            onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                        />
                                        <input
                                            placeholder="School/University"
                                            value={edu.school}
                                            onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)}
                                        />
                                        <input
                                            placeholder="Year"
                                            value={edu.year}
                                            onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <button className="secondary w-full justify-center" onClick={() => addItem('education', { degree: '', school: '', year: '' })}>
                                <Plus size={16} /> Add Education
                            </button>
                        </div>
                    );
                case 'certifications':
                    return (
                        <div className="flex flex-col gap-4">
                            {data.certifications.map((cert, index) => (
                                <div key={index} className="glass-panel" style={{ padding: '1rem' }}>
                                    <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
                                        <h4>Certification {index + 1}</h4>
                                        <button className="secondary" style={{ padding: '0.25rem 0.5rem' }} onClick={() => removeItem('certifications', index)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            placeholder="Certification Name"
                                            value={cert.name}
                                            onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)}
                                        />
                                        <input
                                            placeholder="Issuer"
                                            value={cert.issuer}
                                            onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)}
                                        />
                                        <input
                                            placeholder="Year"
                                            value={cert.year}
                                            onChange={(e) => handleArrayChange('certifications', index, 'year', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <button className="secondary w-full justify-center" onClick={() => addItem('certifications', { name: '', issuer: '', year: '' })}>
                                <Plus size={16} /> Add Certification
                            </button>
                        </div>
                    );
                case 'skills':
                    return (
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                Enter skills as a comma-separated list.
                            </p>
                            <textarea
                                placeholder="React, Node.js, Python, Leadership..."
                                value={data.skills.join(', ')}
                                onChange={(e) => updateData(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }))}
                                rows="2"
                                className="mb-0"
                            />
                        </div>
                    );
                default:
                    return null;
            }
        })();

        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                className="section glass-panel"
                style={{
                    marginBottom: '1.5rem',
                    ...provided.draggableProps.style
                }}
            >
                <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-2">
                    <div {...provided.dragHandleProps} style={{ cursor: 'grab', display: 'flex', alignItems: 'center' }}>
                        <GripVertical size={20} className="text-gray-400 hover:text-white" />
                    </div>
                    <h3 className="m-0">{section.label}</h3>
                </div>
                {content}
            </div>
        );
    };

    return (
        <div className="flex flex-col pb-8">
            {/* Static Personal Details */}
            <div className="section glass-panel mb-6">
                <h3>Personal Details</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Full Name</label>
                        <input
                            name="fullName"
                            value={data.personal.fullName}
                            onChange={(e) => handleChange('personal', e)}
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label>Job Title</label>
                        <input
                            name="jobTitle"
                            value={data.personal.jobTitle}
                            onChange={(e) => handleChange('personal', e)}
                            placeholder="Software Engineer"
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            name="email"
                            value={data.personal.email}
                            onChange={(e) => handleChange('personal', e)}
                            placeholder="email@example.com"
                        />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            name="phone"
                            value={data.personal.phone}
                            onChange={(e) => handleChange('personal', e)}
                            placeholder="+1 234 567 890"
                        />
                    </div>
                    <div>
                        <label>LinkedIn</label>
                        <input
                            name="linkedin"
                            value={data.personal.linkedin}
                            onChange={(e) => handleChange('personal', e)}
                            placeholder="linkedin.com/in/..."
                        />
                    </div>
                    <div>
                        <label>Portfolio</label>
                        <input
                            name="portfolio"
                            value={data.personal.portfolio}
                            onChange={(e) => handleChange('personal', e)}
                            placeholder="portfolio.com"
                        />
                    </div>
                </div>
            </div>

            {/* Draggable Sections */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sections">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="flex flex-col"
                        >
                            {sectionOrder.map((section, index) => (
                                <Draggable key={section.id} draggableId={section.id} index={index}>
                                    {(provided) => renderSection(section, provided)}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
