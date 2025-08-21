'use client';

import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import React, { useId } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type MarkdownEditorProps = {
  labelText: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textAreaName: string;
  disabled: boolean;
};

export function MarkdownEditor({
  labelText = '',
  value,
  setValue,
  textAreaName,
  disabled,
}: MarkdownEditorProps) {
  const id = useId();

  return (
    <div className='flex w-full flex-col gap-2 bg-[#f1f4f8]'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <MDEditor
        className='whitespace-pre-wrap'
        value={value}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[remarkGfm]],
        }}
        onChange={value => {
          if (value === undefined) return;
          setValue(value);
        }}
        height={400}
        maxHeight={400}
        minHeight={200}
        extraCommands={[]}
        preview='edit'
        hideToolbar={disabled}
        textareaProps={{
          id,
          name: textAreaName,
          disabled: disabled,
        }}
      />
    </div>
  );
}
