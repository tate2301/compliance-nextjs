'use client'

import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

// Map of example components
const examples = {
    // Layout Examples
    'with-actions-and-breadcrumbs': dynamic(() => import('@/examples/with_actions_and_breadcrumbs')),
    'with-actions-and-tabs': dynamic(() => import('@/examples/with_actions_and_tabs')),
    'with-page-heading-and-stacked-list': dynamic(() => import('@/examples/with_page_heading_and_stacked_list')),
    'with-sticky-headings': dynamic(() => import('@/examples/with_sticky_headings')),
    'multi-column-directory': dynamic(() => import('@/examples/multi_column_directory')),
    'full-width-three-column': dynamic(() => import('@/examples/full_width_three_column')),
    'double': dynamic(() => import('@/examples/double')),

    // Content Examples
    'with-condensed-content': dynamic(() => import('@/examples/with_condensed_content')),
    'with-multiple-item-types': dynamic(() => import('@/examples/with_multiple_item_types')),
    'with-groups': dynamic(() => import('@/examples/with_groups')),
    'left-aligned-with-inline-actions': dynamic(() => import('@/examples/left_aligned_with_inline_actions')),

    // Form Examples
    'with-title-and-pill-actions': dynamic(() => import('@/examples/with_title_and_pill_actions')),
    'with-left-label-and-description': dynamic(() => import('@/examples/with_left_label_and_description')),
    'with-well': dynamic(() => import('@/examples/with_well')),
    'list-with-checkbox-on-right': dynamic(() => import('@/examples/list_with_checkbox_on_right')),
    'list-with-radio-on-right': dynamic(() => import('@/examples/list_with_radio_on_right')),

    // Interactive Examples
    'with-preview': dynamic(() => import('@/examples/with_preview')),
    'with-dropdown': dynamic(() => import('@/examples/with_dropdown')),
    'with-imageurl': dynamic(() => import('@/examples/with_imageurl')),
    'with-avatar-and-actions': dynamic(() => import('@/examples/with_avatar_and_actions')),
    'narrow-with-avatar-group': dynamic(() => import('@/examples/narrow_with_avatar_group')),

    // Dashboard Examples
    'dashboard': dynamic(() => import('@/examples/DashboardExample')),
}

interface PageProps {
    params: {
        slug: string
    }
}

export default function ExamplePage({ params }: PageProps) {
    const Example = examples[params.slug]

    if (!Example) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-slate-1 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold text-slate-12 capitalize">
                                {params.slug.split('-').join(' ')}
                            </h1>
                            <p className="text-slate-11">
                                Example component from Mercury Design System
                            </p>
                        </div>
                        <a
                            href="/design-system"
                            className="text-primary-11 hover:text-primary-12 transition-colors"
                        >
                            Back to Design System
                        </a>
                    </div>

                    <div className="rounded-lg border border-slate-6 bg-slate-2 p-6">
                        <Example />
                    </div>
                </div>
            </div>
        </div>
    )
} 