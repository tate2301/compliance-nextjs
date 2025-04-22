# Mercury Design System

A fluid, focused, and familiar design system inspired by the Mercury concept, providing a seamless and intention-based user experience.

![Mercury Design System](https://via.placeholder.com/1200x600?text=Mercury+Design+System)

## Philosophy

Mercury is designed around three core principles:

### 1. Fluid

Instead of asking people to modify their thoughts and actions around arbitrary sandboxes of Apps, Mercury responds fluidly to the intentions of its user, alleviating the risk of interstitial friction that multi-tool workflows carry.

### 2. Focused

Mercury is respectful of limited bandwidths and attention spans, and rejects the idea of "notification driven engagement." Information will not be pushed to the user unless they intentionally ask for it. Mercury's intention-as-context architecture protects the user against unintentional consumption of information.

### 3. Familiar

Mercury introduces new ideas and metaphors through familiar interaction patterns, leaning into the playfulness afforded by multi-touch and the efficiency made possible by the keyboard.

## Architecture

The Mercury Design System is built around a hierarchical architecture:

- **Spaces**: Contextual groupings of flows representing user intentions
- **Flows**: Horizontal rows of modules for related tasks
- **Modules**: The fundamental building blocks containing content and actions
- **Locus**: A powerful command interface that responds to natural language

## Installation

```bash
npm install mercury-design-system
# or
yarn add mercury-design-system
```

## Usage

```tsx
import { Dashboard, Module, Flow, Space, Locus } from 'mercury-design-system';

function MyApp() {
  return (
    <Dashboard
      userName="Jamie"
      spaceDescription="Your personalized workspace"
    />
  );
}
```

For more detailed examples, see the `examples` directory.

## Components

### Module

The fundamental building block of Mercury's UI. Modules are containers for content and actions, defined by user intent.

```tsx
import { Module } from 'mercury-design-system';

<Module
  title="My Module"
  width={300}
  onFocus={() => console.log('Module focused')}
>
  <p>Module content goes here</p>
</Module>
```

### Flow

A horizontal row of Modules. Flows organize related modules into a logical progression of tasks.

```tsx
import { Flow, Module } from 'mercury-design-system';

<Flow
  title="My Flow"
  onAddModule={() => console.log('Add module')}
>
  <Module title="Module 1">Content 1</Module>
  <Module title="Module 2">Content 2</Module>
</Flow>
```

### Space

A contextual grouping of Flows. Spaces organize related Flows under a common intention.

```tsx
import { Space, Flow, Module } from 'mercury-design-system';

<Space
  title="My Space"
  description="A space for my flows"
>
  <Flow title="Flow 1">
    <Module title="Module 1">Content 1</Module>
  </Flow>
  <Flow title="Flow 2">
    <Module title="Module 2">Content 2</Module>
  </Flow>
</Space>
```

### Locus

A command-line interface with natural language processing capabilities. Locus combines the power of a CLI with the convenience of a GUI.

```tsx
import { Locus } from 'mercury-design-system';

<Locus
  suggestions={[
    {
      id: 'create-task',
      text: 'Create new task',
      description: 'Add a new task to your list',
      action: () => console.log('Creating new task')
    }
  ]}
  onExecute={(command) => console.log(`Executing: ${command}`)}
/>
```

### Dashboard

A complete Mercury interface that integrates Space, Flow, Module, and Locus components.

```tsx
import { Dashboard } from 'mercury-design-system';

<Dashboard
  userName="Jamie"
  spaceDescription="Your personalized workspace"
/>
```

## Customization

The Mercury Design System is designed to be highly customizable:

1. **Theme Customization**: Modify colors, typography, spacing, animations, and shadows in the `theme.ts` file.
2. **Component Customization**: Each component accepts customization props like `className` and style overrides.
3. **Content Customization**: Provide custom content via children or content props.

## Development

```bash
# Install dependencies
npm install

# Run development mode
npm run dev

# Build the library
npm run build

# Run tests
npm run test
```

## License

MIT

---

Inspired by the [Mercury concept](https://jhilnbrand.com/mercury) by Jae Hyun Lim. 