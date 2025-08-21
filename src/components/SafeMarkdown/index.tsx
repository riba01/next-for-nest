import { clsx } from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type SafeMarkdownProps = {
  markdown: string;
};

export function SafeMarkdown({ markdown }: SafeMarkdownProps) {
  // No wrapper div is needed here
  return (
    <div
      className={clsx(
        'prose prose-slate',
        'max-w-none w-full',
        'mb-8',
        'overflow-hidden',
        'prose-a:text-blue-500',
        'prose-a:hover:text-blue-700',
        'prose-a:hover:underline',
        'prose-a:no-underline',
        'prose-img:rounded-lg',
        'prose-img:shadow-md',
        'prose-img:mx-auto',
        'md:prose-lg',
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return '';
            return (
              <div className='overflow-x-auto'>
                <table {...props} className='w-full min-w-[500px]' />
              </div>
            );
          },
          // Add other custom components if needed
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
