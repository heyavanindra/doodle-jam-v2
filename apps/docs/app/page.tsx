'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Code,
  Dialog,
  Tabs,
} from '@repo/ui';

export default function Home() {
  const [activeTab, setActiveTab] = useState('darkmode');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-12 transition-colors duration-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header with Theme Switcher */}
        <div className="border-border space-y-4 border-b pb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="mono" size="sm">
                @repo/ui
              </Badge>
              <Badge variant="success" size="sm" pulse>
                Design System v1.0
              </Badge>
              {mounted && (
                <Badge variant="neutral" size="sm">
                  Active: {resolvedTheme}
                </Badge>
              )}
            </div>

            {/* useTheme Controls */}
            <div className="border-border bg-secondary flex items-center gap-1.5 rounded-lg border p-1">
              <span className="text-muted-foreground px-2 font-mono text-[11px]">useTheme:</span>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  mounted && theme === 'light'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Light
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  mounted && theme === 'dark'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Dark
              </button>
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  mounted && theme === 'system'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                System
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
              Doodle Jam Design System
            </h1>
            <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
              Cohesive component library built with Tailwind CSS v4 tokens, Clerk-aligned styling,
              and theme switching via <Code>useTheme</Code>.
            </p>
          </div>

          <div className="pt-2">
            <Tabs
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={[
                { id: 'darkmode', label: 'Dark Mode Preview', badge: 'Live' },
                { id: 'components', label: 'All Components', badge: '6' },
                { id: 'tokens', label: 'Token Inventory' },
              ]}
            />
          </div>
        </div>

        {/* Tab 1: Dark Mode Preview (Using Dark Mode only tokens) */}
        {activeTab === 'darkmode' && (
          <div className="space-y-8">
            {/* Context & Status Notice */}
            <div className="border-border bg-card text-card-foreground space-y-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Badge variant="mono" size="sm">
                  Specification
                </Badge>
                <h3 className="text-sm font-semibold">Dark Mode Token State</h3>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Rendering using only existing dark mode tokens (<Code>--background: #08090a</Code>,{' '}
                <Code>--foreground: #ffffff</Code>, <Code>--card: #131316</Code>,{' '}
                <Code>--primary: #ffffff</Code>, <Code>--secondary: #24252a</Code>,{' '}
                <Code>--border: #2f3037</Code>, <Code>--muted: #24252a</Code>). Components and
                tokens without dedicated dark variants yet (e.g., shadows and surface ladders) are
                displayed <strong>as is</strong> without invented values.
              </p>
            </div>

            {/* Dark Mode Live Surface Container (Forced .dark scope) */}
            <div className="dark border-border bg-background text-foreground space-y-6 rounded-xl border p-6 shadow-2xl">
              <div className="border-border flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="text-foreground text-sm font-bold">Isolated .dark Container</h3>
                  <p className="text-muted-foreground text-[11px]">
                    Canvas floor: <Code>#08090a</Code> (var(--background)) | Text:{' '}
                    <Code>#ffffff</Code> (var(--foreground))
                  </p>
                </div>
                <Badge variant="neutral" size="sm">
                  Forced .dark
                </Badge>
              </div>

              {/* Buttons under Dark Mode */}
              <div className="space-y-3">
                <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Button Variants with Dark Mode Tokens
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="md">
                    Primary (#ffffff)
                  </Button>
                  <Button variant="secondary" size="md">
                    Secondary (#24252a)
                  </Button>
                  <Button variant="outline" size="md">
                    Outline (#2f3037 border)
                  </Button>
                  <Button variant="ghost" size="md">
                    Ghost
                  </Button>
                  <Button variant="danger" size="md">
                    Danger (#ef4444)
                  </Button>
                </div>
              </div>

              {/* Button Shadows (Rendered As-Is) */}
              <div className="border-border space-y-3 border-t pt-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                    Shadow Elevation in Dark Mode (Rendered As-Is)
                  </h4>
                  <Badge variant="mono" size="sm">
                    No Invented Tokens
                  </Badge>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  Box shadows currently use base RGBA values. Shown as-is until dark shadow tokens
                  are inserted.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="secondary" shadow="button">
                    Deep Lift (shadow-button)
                  </Button>
                  <Button variant="secondary" shadow="control">
                    Compact Bevel (shadow-control)
                  </Button>
                  <Button variant="primary" shadow="card">
                    Container (shadow-card)
                  </Button>
                  <Button variant="secondary" shadow="none">
                    Flat (shadow-none)
                  </Button>
                </div>
              </div>

              {/* Card & Surface Comparison */}
              <div className="border-border space-y-3 border-t pt-3">
                <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Surfaces & Containers
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Card using Dark Token --card: #131316 */}
                  <div className="border-border bg-card text-card-foreground space-y-2 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Dark Card Token (var(--card))</span>
                      <Badge variant="success" size="sm">
                        Available
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Background: <Code>#131316</Code> | Border: <Code>#2f3037</Code> | Foreground:{' '}
                      <Code>#ffffff</Code>
                    </p>
                  </div>

                  {/* Surface using Base Token --color-surface-1 (Shown As-Is) */}
                  <div className="border-border bg-surface-1 text-text-primary space-y-2 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Base Surface-1 Token</span>
                      <Badge variant="neutral" size="sm">
                        As-Is (#ffffff)
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Base token has no dark variant yet. Renders as-is until mapped.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Input in Dark Mode */}
              <div className="border-border space-y-3 border-t pt-3">
                <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Input Field (Ring & Border Tokens)
                </h4>
                <div className="max-w-sm space-y-2">
                  <Input
                    placeholder="Search or enter prompt..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <p className="text-muted-foreground text-[11px]">
                    Border: <Code>#2f3037</Code> | Ring: <Code>#ffffff</Code> | Focus Offset:{' '}
                    <Code>#08090a</Code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: All Components */}
        {activeTab === 'components' && (
          <div className="space-y-8">
            {/* Buttons Showcase */}
            <Card elevation="e2">
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>
                  Supports <Code>primary</Code>, <Code>secondary</Code>, <Code>ghost</Code>,{' '}
                  <Code>outline</Code>, and <Code>danger</Code> variants.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-foreground mb-2 text-xs font-bold">Variants & Sizes</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" size="md">
                      Primary
                    </Button>
                    <Button variant="secondary" size="md">
                      Secondary
                    </Button>
                    <Button variant="outline" size="md">
                      Outline
                    </Button>
                    <Button variant="ghost" size="md">
                      Ghost
                    </Button>
                    <Button variant="danger" size="md">
                      Danger
                    </Button>
                    <Button variant="primary" size="sm">
                      Small
                    </Button>
                    <Button variant="primary" size="lg">
                      Large
                    </Button>
                  </div>
                </div>

                <div className="border-border space-y-2 border-t pt-3">
                  <h4 className="text-foreground text-xs font-bold">
                    Button Elevation & Shadow Tokens
                  </h4>
                  <p className="text-muted-foreground text-[11px]">
                    Deep 5-layer physical lift (<Code>shadow-button</Code>) vs compact 3-layer bevel
                    (<Code>shadow-control</Code>).
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Button variant="secondary" shadow="button">
                      Deep Lift (shadow-button)
                    </Button>
                    <Button variant="secondary" shadow="control">
                      Compact Bevel (shadow-control)
                    </Button>
                    <Button variant="primary" shadow="card">
                      Container (shadow-card)
                    </Button>
                    <Button variant="secondary" shadow="none">
                      Flat (shadow-none)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges Showcase */}
            <Card elevation="e2">
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>
                  Status indicators with subtle, high-contrast, and animated pulse variants.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                  <Badge variant="mono">Mono</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="success" pulse>
                    Live
                  </Badge>
                  <Badge variant="warning" pulse>
                    Alert
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Form Inputs */}
            <Card elevation="e2">
              <CardHeader>
                <CardTitle>Inputs</CardTitle>
                <CardDescription>
                  Keyboard-accessible fields with focus rings, icons, and validation states.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Regular input..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Input
                    placeholder="With search icon..."
                    icon={
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    }
                  />
                </div>
                <Input
                  placeholder="Error validation state"
                  error="This canvas room name is already taken."
                />
              </CardContent>
            </Card>

            {/* Dialog Trigger */}
            <Card elevation="e2">
              <CardHeader>
                <CardTitle>Modal Dialog</CardTitle>
                <CardDescription>Overlay modal with elevated shadow and backdrop.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="primary" onClick={() => setIsDialogOpen(true)}>
                  Open Settings Dialog
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 3: Token Inventory */}
        {activeTab === 'tokens' && (
          <Card elevation="e2">
            <CardHeader>
              <CardTitle>Design System Token Inventory</CardTitle>
              <CardDescription>
                Existing tokens from <Code>@repo/tailwind-config/shared-styles.css</Code>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dark Mode Tokens */}
              <div>
                <h4 className="text-foreground mb-3 flex items-center gap-2 text-xs font-bold">
                  <span>Available Dark Mode Tokens (.dark)</span>
                  <Badge variant="success" size="sm">
                    Official
                  </Badge>
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="border-border bg-card text-card-foreground space-y-1.5 rounded-md border p-3">
                    <div className="border-border h-6 rounded-sm border bg-[#08090a]" />
                    <p className="font-mono text-xs font-medium">--background</p>
                    <p className="text-muted-foreground font-mono text-[11px]">
                      #08090a (Dark Canvas)
                    </p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1.5 rounded-md border p-3">
                    <div className="border-border h-6 rounded-sm border bg-[#ffffff]" />
                    <p className="font-mono text-xs font-medium">--foreground</p>
                    <p className="text-muted-foreground font-mono text-[11px]">
                      #ffffff (Dark Text)
                    </p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1.5 rounded-md border p-3">
                    <div className="border-border h-6 rounded-sm border bg-[#131316]" />
                    <p className="font-mono text-xs font-medium">--card</p>
                    <p className="text-muted-foreground font-mono text-[11px]">
                      #131316 (Card Surface)
                    </p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1.5 rounded-md border p-3">
                    <div className="border-border h-6 rounded-sm border bg-[#ffffff]" />
                    <p className="font-mono text-xs font-medium">--primary</p>
                    <p className="text-muted-foreground font-mono text-[11px]">
                      #ffffff (Primary Button)
                    </p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1.5 rounded-md border p-3">
                    <div className="border-border h-6 rounded-sm border bg-[#24252a]" />
                    <p className="font-mono text-xs font-medium">--secondary</p>
                    <p className="text-muted-foreground font-mono text-[11px]">
                      #24252a (Secondary Button)
                    </p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1.5 rounded-md border p-3">
                    <div className="border-border h-6 rounded-sm border bg-[#2f3037]" />
                    <p className="font-mono text-xs font-medium">--border</p>
                    <p className="text-muted-foreground font-mono text-[11px]">
                      #2f3037 (Dark Hairline)
                    </p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1.5 rounded-md border p-3">
                    <div className="border-border h-6 rounded-sm border bg-[#24252a]" />
                    <p className="font-mono text-xs font-medium">--muted</p>
                    <p className="text-muted-foreground font-mono text-[11px]">#24252a</p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1.5 rounded-md border p-3">
                    <div className="border-border h-6 rounded-sm border bg-[#8a8f98]" />
                    <p className="font-mono text-xs font-medium">--muted-foreground</p>
                    <p className="text-muted-foreground font-mono text-[11px]">#8a8f98</p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1.5 rounded-md border p-3">
                    <div className="border-border h-6 rounded-sm border bg-[#ef4444]" />
                    <p className="font-mono text-xs font-medium">--destructive</p>
                    <p className="text-muted-foreground font-mono text-[11px]">#ef4444</p>
                  </div>
                </div>
              </div>

              {/* Un-mapped Base Tokens (Shown As-Is) */}
              <div>
                <h4 className="text-foreground mb-3 flex items-center gap-2 text-xs font-bold">
                  <span>Tokens Rendered As-Is in Dark Mode (Pending Insertion)</span>
                  <Badge variant="neutral" size="sm">
                    No Invented Values
                  </Badge>
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="border-border bg-card text-card-foreground space-y-1 rounded-md border p-3">
                    <p className="font-mono text-xs font-medium">--shadow-button</p>
                    <p className="text-muted-foreground text-[11px]">
                      Base 5-layer button lift with rgba(255,255,255,0.70) inner bevel. Rendered
                      as-is.
                    </p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1 rounded-md border p-3">
                    <p className="font-mono text-xs font-medium">--shadow-control</p>
                    <p className="text-muted-foreground text-[11px]">
                      Base 3-layer compact control shadow. Rendered as-is.
                    </p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1 rounded-md border p-3">
                    <p className="font-mono text-xs font-medium">--color-surface-1 / 2 / 3</p>
                    <p className="text-muted-foreground text-[11px]">
                      Base surface ladder (#ffffff, #f7f7f8, #eeeef0). Rendered as-is until dark
                      tokens inserted.
                    </p>
                  </div>
                  <div className="border-border bg-card text-card-foreground space-y-1 rounded-md border p-3">
                    <p className="font-mono text-xs font-medium">--color-hairline</p>
                    <p className="text-muted-foreground text-[11px]">
                      Base hairline color (#eeeef0). Rendered as-is.
                    </p>
                  </div>
                </div>
              </div>

              {/* Radius in rem */}
              <div>
                <h4 className="text-foreground mb-3 text-xs font-bold">
                  Scale & Radius System (rem)
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="border-border bg-card text-card-foreground rounded-md border p-3">
                    <p className="font-mono text-xs font-medium">--radius-sm</p>
                    <p className="text-muted-foreground font-mono text-[11px]">0.125rem (2px)</p>
                  </div>
                  <div className="border-border bg-card text-card-foreground rounded-md border p-3">
                    <p className="font-mono text-xs font-medium">--radius-md</p>
                    <p className="text-muted-foreground font-mono text-[11px]">0.25rem (4px)</p>
                  </div>
                  <div className="border-border bg-card text-card-foreground rounded-md border p-3">
                    <p className="font-mono text-xs font-medium">--radius-lg</p>
                    <p className="text-muted-foreground font-mono text-[11px]">0.375rem (6px)</p>
                  </div>
                  <div className="border-border bg-card text-card-foreground rounded-md border p-3">
                    <p className="font-mono text-xs font-medium">--radius-xl</p>
                    <p className="text-muted-foreground font-mono text-[11px]">0.75rem (12px)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dialog Demo */}
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title="Collaborative Room Settings"
          description="Configure your live canvas session permissions and participants."
        >
          <div className="space-y-4 pt-2">
            <Input placeholder="Room Title (e.g. Sprint Architecture Sync)" />
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>Sync latency</span>
              <span className="font-mono text-emerald-400">&lt; 15ms</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={() => setIsDialogOpen(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </main>
  );
}
