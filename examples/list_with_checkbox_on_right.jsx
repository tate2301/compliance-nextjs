/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function Example() {
  return (
    <Card className="divide-y divide-slate-6">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-12 mb-1">Notifications</h2>
        <p className="text-sm text-slate-11">Manage your notification preferences</p>
      </div>
      <div className="divide-y divide-slate-6">
        <div className="relative flex items-start p-6">
          <div className="min-w-0 flex-1 text-sm">
            <Label htmlFor="comments" className="text-slate-12 font-medium">
              Comments
            </Label>
            <p id="comments-description" className="mt-1 text-sm text-slate-11">
              Get notified when someones posts a comment on a posting.
            </p>
          </div>
          <div className="ml-3 flex items-center h-5">
            <Checkbox
              id="comments"
              aria-describedby="comments-description"
              name="comments"
            />
          </div>
        </div>
        <div className="relative flex items-start p-6">
          <div className="min-w-0 flex-1 text-sm">
            <Label htmlFor="candidates" className="text-slate-12 font-medium">
              Candidates
            </Label>
            <p id="candidates-description" className="mt-1 text-sm text-slate-11">
              Get notified when a candidate applies for a job.
            </p>
          </div>
          <div className="ml-3 flex items-center h-5">
            <Checkbox
              id="candidates"
              aria-describedby="candidates-description"
              name="candidates"
            />
          </div>
        </div>
        <div className="relative flex items-start p-6">
          <div className="min-w-0 flex-1 text-sm">
            <Label htmlFor="offers" className="text-slate-12 font-medium">
              Offers
            </Label>
            <p id="offers-description" className="mt-1 text-sm text-slate-11">
              Get notified when a candidate accepts or rejects an offer.
            </p>
          </div>
          <div className="ml-3 flex items-center h-5">
            <Checkbox
              id="offers"
              aria-describedby="offers-description"
              name="offers"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
