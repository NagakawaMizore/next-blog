import { cn } from '@/lib/utils'
import React from 'react'
import { serializeLexical } from './serialize'

type Props = {
  className?: string
  content: Record<string, unknown>
  enableProse?: boolean
}

export function RichText({
  className,
  content,
  enableProse = true,
}: Props) {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'prose min-w-0 dark:prose-invert': enableProse,
        },
        className
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({
          nodes: (content.root as { children: unknown[] })?.children as Parameters<
            typeof serializeLexical
          >[0]['nodes'],
        })}
    </div>
  )
}

export default RichText
