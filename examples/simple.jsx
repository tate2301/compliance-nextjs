'use client'

/* This example requires Tailwind CSS v2.0+ */
const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
]

export default function Example() {
  return (
    <div className="bg-sand-1 p-6 rounded-lg">
      <h3 className="text-lg leading-6 font-medium text-sand-12">Last 30 days</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 bg-sand-2 shadow-sm rounded-lg overflow-hidden sm:p-6 border border-sand-6">
            <dt className="text-sm font-medium text-sand-11 truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-sand-12">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
