'use client'

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
import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  ArrowLeft,
  Check,
  Home,
  Paperclip,
  HelpCircle,
  Search,
  ThumbsUp,
  User,
  Bell,
  Menu as MenuIcon,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Applicants', href: '#' },
  { name: 'Company', href: '#' },
]
const breadcrumbs = [
  { name: 'Jobs', href: '#', current: false },
  { name: 'Front End Developer', href: '#', current: false },
  { name: 'Applicants', href: '#', current: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const attachments = [
  { name: 'resume_front_end_developer.pdf', href: '#' },
  { name: 'coverletter_front_end_developer.pdf', href: '#' },
]
const eventTypes = {
  applied: { icon: User, bgColorClass: 'bg-sand-9' },
  advanced: { icon: ThumbsUp, bgColorClass: 'bg-primary-9' },
  completed: { icon: Check, bgColorClass: 'bg-success-9' },
}
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'Applied to',
    target: 'Front End Developer',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    date: 'Sep 30',
    datetime: '2020-09-30',
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    date: 'Oct 4',
    datetime: '2020-10-04',
  },
]
const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="min-h-full bg-sand-2">
      <header className="bg-sand-1 border-b border-sand-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <Popover className="flex justify-between h-16">
            <div className="flex px-2 lg:px-0">
              <div className="flex-shrink-0 flex items-center">
                <a href="#">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-primary-9.svg"
                    alt="Workflow"
                  />
                </a>
              </div>
              <nav aria-label="Global" className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="px-3 py-2 text-sand-12 text-sm font-medium hover:text-primary-11 transition-colors">
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-sand-11" aria-hidden="true" />
                  </div>
                  <Input
                    id="search"
                    name="search"
                    className="pl-10"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center lg:hidden">
              <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-sand-11 hover:text-sand-12 hover:bg-sand-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-7">
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Transition.Root as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay className="z-20 fixed inset-0 bg-sand-12/25" aria-hidden="true" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    className="z-30 absolute top-0 right-0 max-w-none w-full p-2 transition transform origin-top"
                  >
                    <div className="rounded-lg shadow-lg ring-1 ring-sand-6 bg-sand-1 divide-y divide-sand-6">
                      <div className="pt-3 pb-2">
                        <div className="flex items-center justify-between px-4">
                          <div>
                            <img
                              className="h-8 w-auto"
                              src="https://tailwindui.com/img/logos/workflow-mark-primary-9.svg"
                              alt="Workflow"
                            />
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="bg-sand-1 rounded-md p-2 inline-flex items-center justify-center text-sand-11 hover:text-sand-12 hover:bg-sand-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-7">
                              <span className="sr-only">Close menu</span>
                              <X className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base text-sand-12 font-medium hover:bg-sand-3 hover:text-primary-11 transition-colors"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 pb-2">
                        <div className="flex items-center px-5">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.imageUrl} alt="" />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <div className="text-base font-medium text-sand-12">{user.name}</div>
                            <div className="text-sm font-medium text-sand-11">{user.email}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto"
                          >
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-6 w-6" aria-hidden="true" />
                          </Button>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          {userNavigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base text-sand-12 font-medium hover:bg-sand-3 hover:text-primary-11 transition-colors"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
            <div className="hidden lg:ml-4 lg:flex lg:items-center">
              <Button
                variant="ghost"
                size="icon"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </Button>

              <Menu as="div" className="ml-4 relative flex-shrink-0">
                <div>
                  <Menu.Button className="bg-sand-1 rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-7">
                    <span className="sr-only">Open user menu</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.imageUrl} alt="" />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-sand-1 ring-1 ring-sand-6 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? 'bg-sand-3 text-sand-12' : 'text-sand-11',
                              'block px-4 py-2 text-sm transition-colors'
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
          </Popover>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-t border-sand-6 py-3">
            <nav className="flex" aria-label="Breadcrumb">
              <div className="flex sm:hidden">
                <a
                  href="#"
                  className="group inline-flex space-x-3 text-sm font-medium text-sand-11 hover:text-sand-12"
                >
                  <ArrowLeft
                    className="flex-shrink-0 h-5 w-5 text-sand-11 group-hover:text-sand-12"
                    aria-hidden="true"
                  />
                  <span>Back to Applicants</span>
                </a>
              </div>
              <div className="hidden sm:block">
                <ol role="list" className="flex items-center space-x-4">
                  <li>
                    <div>
                      <a href="#" className="text-sand-11 hover:text-sand-12">
                        <Home className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Home</span>
                      </a>
                    </div>
                  </li>
                  {breadcrumbs.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-center">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-sand-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <a
                          href={item.href}
                          className="ml-4 text-sm font-medium text-sand-11 hover:text-sand-12"
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <AvatarFallback>RC</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-sand-12">Ricardo Cooper</h1>
              <p className="text-sm font-medium text-sand-11">
                Applied for{' '}
                <a href="#" className="text-sand-12 hover:text-primary-11">
                  Front End Developer
                </a>{' '}
                on <time dateTime="2020-08-25">August 25, 2020</time>
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-x-reverse sm:space-y-0 md:mt-0 md:flex-row md:space-x-3">
            <Button variant="outline">
              Disqualify
            </Button>
            <Button>
              Advance to offer
            </Button>
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            <section aria-labelledby="applicant-information-title">
              <div className="bg-sand-1 shadow-sm sm:rounded-lg border border-sand-6">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-sand-12">
                    Applicant Information
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-sand-11">Personal details and application.</p>
                </div>
                <Separator />
                <div className="px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-sand-11">Application for</dt>
                      <dd className="mt-1 text-sm text-sand-12">Backend Developer</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-sand-11">Email address</dt>
                      <dd className="mt-1 text-sm text-sand-12">ricardocooper@example.com</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-sand-11">Salary expectation</dt>
                      <dd className="mt-1 text-sm text-sand-12">$120,000</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-sand-11">Phone</dt>
                      <dd className="mt-1 text-sm text-sand-12">+1 555-555-5555</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-sand-11">About</dt>
                      <dd className="mt-1 text-sm text-sand-12">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
                        Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                        proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-sand-11">Attachments</dt>
                      <dd className="mt-1 text-sm text-sand-12">
                        <ul role="list" className="border border-sand-6 rounded-md divide-y divide-sand-6">
                          {attachments.map((attachment) => (
                            <li
                              key={attachment.name}
                              className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                            >
                              <div className="w-0 flex-1 flex items-center">
                                <Paperclip className="flex-shrink-0 h-5 w-5 text-sand-11" aria-hidden="true" />
                                <span className="ml-2 flex-1 w-0 truncate">{attachment.name}</span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <a href={attachment.href} className="font-medium text-primary-11 hover:text-primary-12">
                                  Download
                                </a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <a
                    href="#"
                    className="block bg-sand-2 text-sm font-medium text-sand-11 text-center px-4 py-4 hover:text-sand-12 sm:rounded-b-lg transition-colors"
                  >
                    Read full application
                  </a>
                </div>
              </div>
            </section>

            <section aria-labelledby="notes-title">
              <div className="bg-sand-1 shadow-sm sm:rounded-lg sm:overflow-hidden border border-sand-6">
                <div className="divide-y divide-sand-6">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="notes-title" className="text-lg font-medium text-sand-12">
                      Notes
                    </h2>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    <ul role="list" className="space-y-8">
                      {comments.map((comment) => (
                        <li key={comment.id}>
                          <div className="flex space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                alt=""
                              />
                              <AvatarFallback>{comment.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm">
                                <a href="#" className="font-medium text-sand-12">
                                  {comment.name}
                                </a>
                              </div>
                              <div className="mt-1 text-sm text-sand-12">
                                <p>{comment.body}</p>
                              </div>
                              <div className="mt-2 text-sm space-x-2">
                                <span className="text-sand-11 font-medium">{comment.date}</span>{' '}
                                <span className="text-sand-11 font-medium">&middot;</span>{' '}
                                <button
                                  type="button"
                                  className="text-primary-11 font-medium hover:text-primary-12"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-sand-2 px-4 py-6 sm:px-6">
                  <div className="flex space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.imageUrl} alt="" />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <form action="#">
                        <div>
                          <label htmlFor="comment" className="sr-only">
                            About
                          </label>
                          <textarea
                            id="comment"
                            name="comment"
                            rows={3}
                            className="shadow-sm block w-full focus:ring-primary-7 focus:border-primary-7 sm:text-sm border border-sand-6 rounded-md bg-sand-1 text-sand-12 placeholder-sand-11"
                            placeholder="Add a note"
                            defaultValue={''}
                          />
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <a
                            href="#"
                            className="group inline-flex items-start text-sm space-x-2 text-sand-11 hover:text-sand-12"
                          >
                            <HelpCircle
                              className="flex-shrink-0 h-5 w-5 text-sand-11 group-hover:text-sand-12"
                              aria-hidden="true"
                            />
                            <span>Some HTML is okay.</span>
                          </a>
                          <Button type="submit">
                            Comment
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-sand-1 px-4 py-5 shadow-sm sm:rounded-lg sm:px-6 border border-sand-6">
              <h2 id="timeline-title" className="text-lg font-medium text-sand-12">
                Timeline
              </h2>

              <div className="mt-6 flow-root">
                <ul role="list" className="-mb-8">
                  {timeline.map((item, itemIdx) => (
                    <li key={item.id}>
                      <div className="relative pb-8">
                        {itemIdx !== timeline.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-sand-6"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={classNames(
                                item.type.bgColorClass,
                                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-sand-1'
                              )}
                            >
                              <item.type.icon className="w-5 h-5 text-white" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-sand-11">
                                {item.content}{' '}
                                <a href="#" className="font-medium text-sand-12">
                                  {item.target}
                                </a>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-sand-11">
                              <time dateTime={item.datetime}>{item.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-col justify-stretch">
                <Button>
                  Advance to offer
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
