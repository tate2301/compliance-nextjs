/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'

export default function Example() {
  return (
    <div className="bg-sand-1 px-4 py-5 border-b border-sand-6 sm:px-6">
      <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg leading-6 font-medium text-sand-12">Tom Cook</h3>
              <p className="text-sm text-sand-11">
                <a href="#" className="hover:text-sand-12 transition-colors">@tom_cook</a>
              </p>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0 flex">
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-sand-6 shadow-sm text-sm font-medium rounded-md text-sand-12 bg-sand-2 hover:bg-sand-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-7 transition-colors"
          >
            <PhoneIcon className="-ml-1 mr-2 h-5 w-5 text-sand-11" aria-hidden="true" />
            <span>Phone</span>
          </button>
          <button
            type="button"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-sand-6 shadow-sm text-sm font-medium rounded-md text-sand-12 bg-sand-2 hover:bg-sand-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-7 transition-colors"
          >
            <MailIcon className="-ml-1 mr-2 h-5 w-5 text-sand-11" aria-hidden="true" />
            <span>Email</span>
          </button>
        </div>
      </div>
    </div>
  )
}
