/*
  This example requires Tailwind CSS v3.0+ 
  
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
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { UsersIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

const recent = [people[5], people[4], people[2], people[10], people[16]]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(true)

  const filteredPeople =
    query === ''
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-slate-12/25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-3xl transform divide-y divide-slate-6 overflow-hidden rounded-xl bg-slate-1 shadow-lg ring-1 ring-slate-6 transition-all"
            onChange={(person) => (window.location = person.profileUrl)}
          >
            {({ activeOption }) => (
              <>
                <div className="relative">
                  <SearchIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-slate-11"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-slate-12 placeholder-slate-11 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(query === '' || filteredPeople.length > 0) && (
                  <Combobox.Options as="div" static hold className="flex divide-x divide-slate-6">
                    <div
                      className={classNames(
                        'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                        activeOption && 'sm:h-96'
                      )}
                    >
                      {query === '' && (
                        <h2 className="mt-2 mb-4 text-xs font-semibold text-slate-11">Recent searches</h2>
                      )}
                      <div className="-mx-2 text-sm text-slate-12">
                        {(query === '' ? recent : filteredPeople).map((person) => (
                          <Combobox.Option
                            as="div"
                            key={person.id}
                            value={person}
                            className={({ active }) =>
                              classNames(
                                'flex cursor-default select-none items-center rounded-md p-2 transition-colors',
                                active ? 'bg-slate-3 text-slate-12' : 'text-slate-11 hover:text-slate-12'
                              )
                            }
                          >
                            {({ active }) => (
                              <>
                                <img src={person.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full" />
                                <span className="ml-3 flex-auto truncate">{person.name}</span>
                                {active && (
                                  <ChevronRightIcon
                                    className="ml-3 h-5 w-5 flex-none text-slate-11"
                                    aria-hidden="true"
                                  />
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </div>
                    </div>

                    {activeOption && (
                      <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-slate-6 overflow-y-auto sm:flex">
                        <div className="flex-none p-6 text-center">
                          <img src={activeOption.imageUrl} alt="" className="mx-auto h-16 w-16 rounded-full" />
                          <h2 className="mt-3 font-semibold text-slate-12">{activeOption.name}</h2>
                          <p className="text-sm leading-6 text-slate-11">{activeOption.role}</p>
                        </div>
                        <div className="flex flex-auto flex-col justify-between p-6">
                          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-slate-12">
                            <dt className="col-end-1 font-semibold text-slate-12">Phone</dt>
                            <dd>{activeOption.phone}</dd>
                            <dt className="col-end-1 font-semibold text-slate-12">URL</dt>
                            <dd className="truncate">
                              <a href={activeOption.url} className="text-primary-9 hover:text-primary-10 underline transition-colors">
                                {activeOption.url}
                              </a>
                            </dd>
                            <dt className="col-end-1 font-semibold text-slate-12">Email</dt>
                            <dd className="truncate">
                              <a href={`mailto:${activeOption.email}`} className="text-primary-9 hover:text-primary-10 underline transition-colors">
                                {activeOption.email}
                              </a>
                            </dd>
                          </dl>
                          <button
                            type="button"
                            className="mt-6 w-full rounded-md border border-transparent bg-primary-9 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-10 focus:outline-none focus:ring-2 focus:ring-primary-7 focus:ring-offset-2 transition-colors"
                          >
                            Send message
                          </button>
                        </div>
                      </div>
                    )}
                  </Combobox.Options>
                )}

                {query !== '' && filteredPeople.length === 0 && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <UsersIcon className="mx-auto h-6 w-6 text-slate-11" aria-hidden="true" />
                    <p className="mt-4 font-semibold text-slate-12">No people found</p>
                    <p className="mt-2 text-slate-11">We couldn't find anything with that term. Please try again.</p>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
