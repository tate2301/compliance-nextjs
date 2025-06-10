/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function Example() {
  return (
    <div>
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <a href="#" className="flex items-center text-sm font-medium text-sand-11 hover:text-sand-12 transition-colors">
            <ChevronLeftIcon className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-sand-11" aria-hidden="true" />
            Back
          </a>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <a href="#" className="text-sm font-medium text-sand-11 hover:text-sand-12 transition-colors">
                  Jobs
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-sand-11" aria-hidden="true" />
                <a href="#" className="ml-4 text-sm font-medium text-sand-11 hover:text-sand-12 transition-colors">
                  Engineering
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-sand-11" aria-hidden="true" />
                <a href="#" aria-current="page" className="ml-4 text-sm font-medium text-sand-11 hover:text-sand-12 transition-colors">
                  Back End Developer
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-sand-12 sm:text-3xl sm:truncate">Back End Developer</h2>
        </div>
        <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-sand-6 rounded-md shadow-sm text-sm font-medium text-sand-12 bg-sand-2 hover:bg-sand-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-7 transition-colors"
          >
            Edit
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-9 hover:bg-primary-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-7 transition-colors"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}
