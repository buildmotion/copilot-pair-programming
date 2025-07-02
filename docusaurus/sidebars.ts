import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Conference Talk Content
  conferenceTalkSidebar: [
    {
      type: 'category',
      label: '🎯 Conference Talk',
      link: {
        type: 'generated-index',
        title: 'Beyond Autocomplete: Mastering AI Pair Programming',
        description: 'Comprehensive conference presentation content and resources',
        slug: '/conference-talk',
      },
      items: [
        'conference-talk/overview',
        'conference-talk/getting-started',
      ],
    },
  ],

  // Research and Analysis
  researchSidebar: [
    {
      type: 'category',
      label: '🔬 Research & Analysis',
      link: {
        type: 'generated-index',
        title: 'Technical Research and Analysis',
        description: 'Behind-the-scenes research, patterns, and technical decisions',
        slug: '/research-analysis',
      },
      items: [
        'research-analysis/ai-pattern-instructions',
      ],
    },
  ],

  // Implementation Guides
  guidesSidebar: [
    {
      type: 'category',
      label: '🛠️ Implementation Guides',
      link: {
        type: 'generated-index',
        title: 'Step-by-Step Implementation Guides',
        description: 'Practical guides for setting up AI pair programming workflows',
        slug: '/implementation-guides',
      },
      items: [
        'implementation-guides/git-workflow-setup',
      ],
    },
  ],

  // AI Instructions Framework
  instructionsSidebar: [
    {
      type: 'category',
      label: '📋 AI Instructions Framework',
      link: {
        type: 'generated-index',
        title: 'AI Instructions Framework',
        description: 'Comprehensive system for controlling GitHub Copilot behavior',
        slug: '/ai-instructions',
      },
      items: [
        'ai-instructions/framework-overview',
      ],
    },
  ],

  // Resources and References
  resourcesSidebar: [
    {
      type: 'category',
      label: '📚 Resources & References',
      link: {
        type: 'generated-index',
        title: 'Learning Resources and System Documentation',
        description: 'Educational resources, system documentation, and reference materials',
        slug: '/resources',
      },
      items: [
        'resources/learning-resources',
        'resources/revision-system',
      ],
    },
  ],
};

export default sidebars;
