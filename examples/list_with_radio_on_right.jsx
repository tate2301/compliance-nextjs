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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

const accounts = [
  { id: 'checking', name: 'Checking', description: 'CIBC ••••6610' },
  { id: 'savings', name: 'Savings', description: 'Bank of America ••••0149' },
  { id: 'mastercard', name: 'Mastercard', description: 'Capital One ••••7877' },
]

export default function Example() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-sand-12">Transfer funds</h2>
      <p className="mt-1 text-sm text-sand-11">Transfer your balance to your bank account.</p>
      <RadioGroup defaultValue="checking" className="mt-6 space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="relative flex items-start">
            <div className="min-w-0 flex-1 text-sm">
              <Label 
                htmlFor={`account-${account.id}`} 
                className="text-sand-12 font-medium"
              >
                {account.name}
              </Label>
              <p 
                id={`account-${account.id}-description`} 
                className="mt-1 text-sm text-sand-11"
              >
                {account.description}
              </p>
            </div>
            <div className="ml-3 flex items-center h-5">
              <RadioGroupItem
                value={account.id}
                id={`account-${account.id}`}
                aria-describedby={`account-${account.id}-description`}
              />
            </div>
          </div>
        ))}
      </RadioGroup>
    </Card>
  )
}
