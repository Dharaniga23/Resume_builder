import React from 'react';
import { Layout, CheckCircle } from 'lucide-react';

const templates = [
    { id: 'modern', name: 'Modern Pro', description: 'Clean & Glassmorphic' },
    { id: 'classic', name: 'Traditional', description: 'Academic Serif' },
    { id: 'jakes', name: "Jake's Resume", description: 'Tech standard' },
    { id: 'deedy', name: 'Deedy', description: 'Two-column layout' }
];

export default function TemplateSelector({ selected, onSelect }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Layout size={18} />
                <span className="text-sm font-semibold uppercase tracking-wider">Choose Template</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {templates.map((tpl) => (
                    <button
                        key={tpl.id}
                        onClick={() => onSelect(tpl.id)}
                        className={`group relative text-left p-4 rounded-xl border-2 transition-all duration-300 ${selected === tpl.id
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-gray-800 bg-gray-900/50 hover:border-gray-600'
                            }`}
                    >
                        <div className="flex flex-col h-full">
                            <span className={`font-bold text-sm ${selected === tpl.id ? 'text-blue-400' : 'text-white'}`}>
                                {tpl.name}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                                {tpl.description}
                            </span>
                        </div>
                        {selected === tpl.id && (
                            <div className="absolute top-2 right-2 text-blue-500">
                                <CheckCircle size={16} fill="currentColor" className="text-blue-900" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
