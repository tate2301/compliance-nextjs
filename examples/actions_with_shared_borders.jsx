/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          sky: colors.sky,
          teal: colors.teal,
          rose: colors.rose,
        },
      },
    },
  }
  ```
*/
'use client'

import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from '@heroicons/react/outline'

const actions = [
  {
    title: 'Request time off',
    href: '#',
    icon: ClockIcon,
    iconForeground: 'text-primary-11',
    iconBackground: 'bg-primary-3',
  },
  {
    title: 'Benefits',
    href: '#',
    icon: BadgeCheckIcon,
    iconForeground: 'text-secondary-11',
    iconBackground: 'bg-secondary-3',
  },
  {
    title: 'Schedule a one-on-one',
    href: '#',
    icon: UsersIcon,
    iconForeground: 'text-success-11',
    iconBackground: 'bg-success-3',
  },
  { 
    title: 'Payroll', 
    href: '#', 
    icon: CashIcon, 
    iconForeground: 'text-warning-11', 
    iconBackground: 'bg-warning-3' 
  },
  {
    title: 'Submit an expense',
    href: '#',
    icon: ReceiptRefundIcon,
    iconForeground: 'text-error-11',
    iconBackground: 'bg-error-3',
  },
  {
    title: 'Training',
    href: '#',
    icon: AcademicCapIcon,
    iconForeground: 'text-primary-11',
    iconBackground: 'bg-primary-3',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="rounded-lg bg-sand-3 overflow-hidden shadow divide-y divide-sand-6 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
            actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'relative group bg-sand-1 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-8 hover:bg-sand-2 transition-colors'
          )}
        >
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                'rounded-lg inline-flex p-3 ring-4 ring-sand-1'
              )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium text-sand-12">
              <a href={action.href} className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </a>
            </h3>
            <p className="mt-2 text-sm text-sand-11">
              Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et
              quo et molestiae.
            </p>
          </div>
          <span
            className="pointer-events-none absolute top-6 right-6 text-sand-8 group-hover:text-sand-11 transition-colors"
            aria-hidden="true"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  )
}
