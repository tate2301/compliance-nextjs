'use client'

import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button
        variant="secondary"
        size="xs"
      >
        Button text
      </Button>
      <Button
        variant="secondary"
        size="sm"
      >
        Button text
      </Button>
      <Button
        variant="secondary"
        size="default"
      >
        Button text
      </Button>
      <Button
        variant="secondary"
        size="lg"
      >
        Button text
      </Button>
      <Button
        variant="secondary"
        size="xl"
      >
        Button text
      </Button>
    </div>
  )
}
