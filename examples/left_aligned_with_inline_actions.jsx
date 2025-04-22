'use client'

/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid'
import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <div className="bg-slate-1 p-6 rounded-lg">
      <div>
        <h3 className="text-lg leading-6 font-medium text-slate-12">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-slate-11">Personal details and application.</p>
      </div>
      <div className="mt-5 border-t border-slate-6">
        <dl className="divide-y divide-slate-6">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-slate-11">Full name</dt>
            <dd className="mt-1 flex text-sm text-slate-12 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">Margot Foster</span>
              <span className="ml-4 flex-shrink-0">
                <Button
                  variant="ghost"
                  className="text-primary-11 hover:text-primary-12"
                >
                  Update
                </Button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-slate-11">Application for</dt>
            <dd className="mt-1 flex text-sm text-slate-12 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">Backend Developer</span>
              <span className="ml-4 flex-shrink-0">
                <Button
                  variant="ghost"
                  className="text-primary-11 hover:text-primary-12"
                >
                  Update
                </Button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-slate-11">Email address</dt>
            <dd className="mt-1 flex text-sm text-slate-12 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">margotfoster@example.com</span>
              <span className="ml-4 flex-shrink-0">
                <Button
                  variant="ghost"
                  className="text-primary-11 hover:text-primary-12"
                >
                  Update
                </Button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-slate-11">Salary expectation</dt>
            <dd className="mt-1 flex text-sm text-slate-12 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">$120,000</span>
              <span className="ml-4 flex-shrink-0">
                <Button
                  variant="ghost"
                  className="text-primary-11 hover:text-primary-12"
                >
                  Update
                </Button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-slate-11">About</dt>
            <dd className="mt-1 flex text-sm text-slate-12 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure
                nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
              </span>
              <span className="ml-4 flex-shrink-0">
                <Button
                  variant="ghost"
                  className="text-primary-11 hover:text-primary-12"
                >
                  Update
                </Button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-slate-11">Attachments</dt>
            <dd className="mt-1 text-sm text-slate-12 sm:mt-0 sm:col-span-2">
              <ul role="list" className="border border-slate-6 rounded-md divide-y divide-slate-6">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-slate-11" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">resume_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-4">
                    <Button
                      variant="ghost"
                      className="text-primary-11 hover:text-primary-12"
                    >
                      Update
                    </Button>
                    <span className="text-slate-8" aria-hidden="true">
                      |
                    </span>
                    <Button
                      variant="ghost"
                      className="text-error-11 hover:text-error-12"
                    >
                      Remove
                    </Button>
                  </div>
                </li>
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-slate-11" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">coverletter_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-4">
                    <Button
                      variant="ghost"
                      className="text-primary-11 hover:text-primary-12"
                    >
                      Update
                    </Button>
                    <span className="text-slate-8" aria-hidden="true">
                      |
                    </span>
                    <Button
                      variant="ghost"
                      className="text-error-11 hover:text-error-12"
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
