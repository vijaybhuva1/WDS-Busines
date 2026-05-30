import React, { useState } from 'react';
import { Plus, X, Upload, FileText, MoveUp, MoveDown, Eye, CheckCircle } from 'lucide-react';
import { MockFile } from '../types';

// TAG INPUT COMPONENT
interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  id?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, onChange, placeholder = 'Add tag...', id }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-2">
        <input
          id={id}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-3 py-2 bg-[#D4A437] hover:bg-[#bfa032] text-white rounded-lg transition-colors flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5 min-h-[36px] p-1 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950/20">
        {tags.length === 0 ? (
          <span className="text-xs text-slate-400 p-1 self-center italic">No tags added yet. Press Enter or comma to add.</span>
        ) : (
          tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-850 text-slate-800 dark:text-slate-200 text-xs rounded-full border border-slate-200 dark:border-slate-750 font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-slate-400 hover:text-red-500 rounded-full p-0.5 focus:outline-none transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  );
};


// DRAG & DROP / INTERACTIVE PRIORITY RANKING
interface PriorityRankingProps {
  items: string[];
  onChange: (items: string[]) => void;
  id?: string;
}

export const PriorityRanking: React.FC<PriorityRankingProps> = ({ items, onChange, id }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < items.length) {
      const temp = newItems[index];
      newItems[index] = newItems[targetIndex];
      newItems[targetIndex] = temp;
      onChange(newItems);
    }
  };

  // HTML5 Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    onChange(newItems);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div id={id} className="space-y-2">
      <p className="text-xs text-slate-400 mb-2 italic">
        💡 Drag and drop to reorder, or use the action arrows to prioritize.
      </p>
      {items.map((item, index) => (
        <div
          key={item}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`flex items-center justify-between p-3 rounded-lg border transition duration-200 cursor-grab active:cursor-grabbing backdrop-blur-sm ${
            draggedIndex === index
              ? 'border-[#D4A437] bg-amber-500/10 scale-[1.01]'
              : 'border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:border-slate-350 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-[#D4A437] text-xs font-semibold">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item}</span>
          </div>
          
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              disabled={index === 0}
              onClick={() => moveItem(index, 'up')}
              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
                index === 0 ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-500 hover:text-[#D4A437]'
              }`}
            >
              <MoveUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={index === items.length - 1}
              onClick={() => moveItem(index, 'down')}
              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
                index === items.length - 1 ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-500 hover:text-[#D4A437]'
              }`}
            >
              <MoveDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


// MOCK UPLOAD COMPONENT FOR PREMIUM EXPERIENCE
interface MockUploadProps {
  files: MockFile[];
  onChange: (files: MockFile[]) => void;
  accept: string;
  label: string;
  id?: string;
}

export const MockUpload: React.FC<MockUploadProps> = ({ files, onChange, accept, label, id }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  // Auto Generate Mock File Info for onboarding
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: MockFile[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const formattedSize = file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(0)} KB`;
        
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: formattedSize,
          type: file.type || 'application/octet-stream'
        });
      }
      onChange([...files, ...newFiles]);
    }
  };

  const handleSimulateDemoFile = () => {
    const randomSuffix = Math.floor(Math.random() * 1000);
    const mockOptions = [
      { name: `wellonik_branding_guide_${randomSuffix}.pdf`, size: '2.4 MB', type: 'application/pdf' },
      { name: `logo_vector_dark_${randomSuffix}.ai`, size: '4.8 MB', type: 'application/postscript' },
      { name: `product_commercial_preview_${randomSuffix}.mp4`, size: '24.1 MB', type: 'video/mp4' },
      { name: `summer_catalog_draft_${randomSuffix}.pdf`, size: '12.6 MB', type: 'application/pdf' },
      { name: `instagram_creative_pack_${randomSuffix}.zip`, size: '18.5 MB', type: 'application/zip' },
      { name: `product_grid_01_${randomSuffix}.jpg`, size: '890 KB', type: 'image/jpeg' },
      { name: `meta_lead_ads_past_results_${randomSuffix}.xlsx`, size: '1.2 MB', type: 'sheet' },
    ];
    const selected = mockOptions[Math.floor(Math.random() * mockOptions.length)];
    const mock: MockFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: selected.name,
      size: selected.size,
      type: selected.type
    };
    onChange([...files, mock]);
  };

  const removeFile = (id: string) => {
    onChange(files.filter((f) => f.id !== id));
  };

  return (
    <div id={id} className="w-full">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          // Simulate drop file metadata
          const simulatedFile: MockFile = {
            id: Math.random().toString(36).substr(2, 9),
            name: 'dropped_onboarding_asset.pdf',
            size: '1.8 MB',
            type: 'application/pdf'
          };
          onChange([...files, simulatedFile]);
        }}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
          isDragOver
            ? 'border-[#D4A437] bg-amber-500/5'
            : 'border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:border-slate-350 dark:hover:border-slate-700'
        }`}
      >
        <input
          type="file"
          accept={accept}
          multiple
          onChange={handleFileSelection}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-full text-[#D4A437]">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</p>
            <p className="text-xs text-slate-400 mt-1">Drag and drop here, click to browse files, or use simulation</p>
          </div>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSimulateDemoFile();
            }}
            className="mt-2 text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-650 hover:bg-[#D4A437]/10 dark:text-slate-300 hover:text-[#D4A437] rounded-md transition duration-150 relative z-10"
          >
            ⚡ Quickly Attach Dummy Asset for Testing
          </button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-100 dark:border-slate-800/80"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-[#D4A437] shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {file.size} • {file.type.split('/')[1] || file.type}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="p-1 text-slate-400 hover:text-red-500 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
