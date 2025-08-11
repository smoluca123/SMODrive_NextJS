'use client';

import { useId } from 'react';
import { TagInput, TagInputProps } from 'emblor';
import { cn } from '@/lib/utils';

export default function InputTags(
  props: TagInputProps & React.RefAttributes<HTMLInputElement>
) {
  const id = useId();

  return (
    <div className="*:not-first:mt-2">
      <TagInput
        id={id}
        placeholder="Add a tag"
        styleClasses={{
          tagList: {
            container: 'gap-1',
          },
          input: cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            props.className
          ),
          tag: {
            body: 'relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7',
            closeButton:
              'absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground',
          },
        }}
        inlineTags={false}
        inputFieldPosition="top"
        {...props}
      />
    </div>
  );
}
