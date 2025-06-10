/* This example requires Tailwind CSS v2.0+ */
const transactions = [
  {
    id: 'AAPS0L',
    company: 'Chase & Co.',
    share: 'CAC',
    commission: '+$4.37',
    price: '$3,509.00',
    quantity: '12.00',
    netAmount: '$4,397.00',
  },
  // More transactions...
]

export default function Example() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-sand-12">Transactions</h1>
          <p className="mt-2 text-sm text-sand-11">
            A table of placeholder stock market data that does not make any sense.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-9 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-10 focus:outline-none focus:ring-2 focus:ring-primary-7 focus:ring-offset-2 sm:w-auto transition-colors"
          >
            Export
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow-sm ring-1 ring-sand-6 md:rounded-lg">
              <table className="min-w-full divide-y divide-sand-6">
                <thead className="bg-sand-2">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-sand-12 sm:pl-6"
                    >
                      Transaction ID
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-sand-12"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-sand-12"
                    >
                      Share
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-sand-12"
                    >
                      Commision
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-sand-12"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-sand-12"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-sand-12"
                    >
                      Net amount
                    </th>
                    <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-6 bg-sand-1">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-sand-11 sm:pl-6">
                        {transaction.id}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-sand-12">
                        {transaction.company}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-sand-12">{transaction.share}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-sand-11">{transaction.commission}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-sand-11">{transaction.price}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-sand-11">{transaction.quantity}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-sand-11">{transaction.netAmount}</td>
                      <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-primary-9 hover:text-primary-10 transition-colors">
                          Edit<span className="sr-only">, {transaction.id}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
