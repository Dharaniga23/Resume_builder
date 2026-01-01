import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import JakesTemplate from './templates/JakesTemplate';
import DeedyTemplate from './templates/DeedyTemplate';

export default function ResumePreview({ data, sectionOrder, selectedTemplate }) {
    const renderTemplate = () => {
        switch (selectedTemplate) {
            case 'classic':
                return <ClassicTemplate data={data} sectionOrder={sectionOrder} />;
            case 'minimal':
                return <MinimalTemplate data={data} sectionOrder={sectionOrder} />;
            case 'jakes':
                return <JakesTemplate data={data} sectionOrder={sectionOrder} />;
            case 'deedy':
                return <DeedyTemplate data={data} sectionOrder={sectionOrder} />;
            case 'modern':
            default:
                return <ModernTemplate data={data} sectionOrder={sectionOrder} />;
        }
    };

    return (
        <div id="resume-preview">
            {renderTemplate()}
        </div>
    );
}
