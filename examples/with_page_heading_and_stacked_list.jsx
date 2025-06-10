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
import { Fragment, useState } from 'react'
import { Disclosure, Listbox, Menu, Transition } from '@headlessui/react'
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  MailIcon,
  PencilIcon,
  SearchIcon,
} from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const user = {
  name: 'Whitney Francis',
  email: 'whitney.francis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Jobs', href: '#', current: false },
  { name: 'Applicants', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const tabs = [
  { name: 'Applied', href: '#', count: '2', current: false },
  { name: 'Phone Screening', href: '#', count: '4', current: false },
  { name: 'Interview', href: '#', count: '6', current: true },
  { name: 'Offer', href: '#', current: false },
  { name: 'Disqualified', href: '#', current: false },
]
const candidates = [
  {
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: 'January 7, 2020',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
  },
  // More candidates...
]
const publishingOptions = [
  { name: 'Published', description: 'This job posting can be viewed by anyone who has the link.', current: true },
  { name: 'Draft', description: 'This job posting will no longer be publicly accessible.', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [selected, setSelected] = useState(publishingOptions[0])

  return (
    <div className="min-h-full bg-sand-1">
      {/* Navbar */}
      <Disclosure as="nav" className="bg-sand-2 border-b border-sand-6">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative h-16 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                      alt="Workflow"
                    />
                  </div>

                  {/* Links section */}
                  <div className="hidden lg:block lg:ml-10">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-sand-3 text-sand-12' : 'text-sand-11 hover:text-sand-12 hover:bg-sand-3',
                            'px-3 py-2 rounded-md text-sm font-medium transition-colors'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                  {/* Search section */}
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative text-sand-11 focus-within:text-sand-12">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        className="block w-full bg-sand-3 py-2 pl-10 pr-3 border border-sand-6 rounded-md leading-5 text-sand-12 placeholder-sand-11 focus:outline-none focus:ring-2 focus:ring-primary-7 focus:border-primary-7 focus:placeholder-sand-10 sm:text-sm transition-colors"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-sand-2 p-2 inline-flex items-center justify-center rounded-md text-sand-11 hover:text-sand-12 hover:bg-sand-3 focus:outline-none focus:ring-2 focus:ring-primary-7 transition-colors">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Actions section */}
                <div className="hidden lg:block lg:ml-4">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="bg-sand-2 flex-shrink-0 rounded-full p-1 text-sand-11 hover:text-sand-12 hover:bg-sand-3 focus:outline-none focus:ring-2 focus:ring-primary-7 transition-colors"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative flex-shrink-0">
                      <div>
                        <Menu.Button className="bg-sand-2 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-primary-7">
                          <span className="sr-only">Open user menu</span>
                          <img className="rounded-full h-8 w-8" src={user.imageUrl} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-sand-1 ring-1 ring-sand-6 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-sand-3' : '',
                                    'block px-4 py-2 text-sm text-sand-12 hover:bg-sand-3 transition-colors'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-sand-3 text-sand-12' : 'text-sand-11 hover:text-sand-12 hover:bg-sand-3',
                      'block px-3 py-2 rounded-md text-base font-medium transition-colors'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-sand-6">
                <div className="px-5 flex items-center">
                  <div className="flex-shrink-0">
                    <img className="rounded-full h-10 w-10" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-sand-12">{user.name}</div>
                    <div className="text-sm font-medium text-sand-11">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-sand-2 flex-shrink-0 rounded-full p-1 text-sand-11 hover:text-sand-12 hover:bg-sand-3 focus:outline-none focus:ring-2 focus:ring-primary-7 transition-colors"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-sand-12 hover:bg-sand-3 transition-colors"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Tabs */}
      <div className="bg-sand-2 border-b border-sand-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? 'border-primary-9 text-primary-9'
                    : 'border-transparent text-sand-11 hover:text-sand-12 hover:border-sand-6',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={classNames(
                      tab.current ? 'bg-primary-3 text-primary-12' : 'bg-sand-3 text-sand-12',
                      'ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium'
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-sand-12">Candidates</h1>
            <Listbox as="div" value={selected} onChange={setSelected} className="relative">
              <Listbox.Button className="inline-flex justify-between w-full rounded-md border border-sand-6 shadow-sm px-4 py-2 bg-sand-2 text-sm font-medium text-sand-12 hover:bg-sand-3 focus:outline-none focus:ring-2 focus:ring-primary-7 focus:border-primary-7">
                <span className="flex items-center">
                  <span className="block truncate">{selected.name}</span>
                </span>
                <ChevronDownIcon className="h-5 w-5 text-sand-11" aria-hidden="true" />
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-sand-1 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-sand-6 overflow-auto focus:outline-none sm:text-sm">
                  {publishingOptions.map((option) => (
                    <Listbox.Option
                      key={option.name}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-sand-12 bg-sand-3' : 'text-sand-12',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                              {option.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-sand-12' : 'text-sand-11',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>

          {/* Candidates list */}
          <div className="mt-6 bg-sand-2 shadow overflow-hidden rounded-md">
            <ul role="list" className="divide-y divide-sand-6">
              {candidates.map((candidate) => (
                <li key={candidate.email}>
                  <a href="#" className="block hover:bg-sand-3 transition-colors">
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-primary-9 truncate">{candidate.name}</p>
                            <p className="ml-1 flex-shrink-0 font-normal text-sand-11">via {candidate.email}</p>
                          </div>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-sand-11">
                              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-sand-10" aria-hidden="true" />
                              <p>
                                Applied on <time dateTime={candidate.appliedDatetime}>{candidate.applied}</time>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                          <div className="flex overflow-hidden -space-x-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-3 text-success-12">
                              {candidate.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <ChevronRightIcon className="h-5 w-5 text-sand-10" aria-hidden="true" />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
