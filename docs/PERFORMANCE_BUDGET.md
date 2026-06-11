# PERFORMANCE_BUDGET.md

# RishavendraOS Performance Budget Specification v1.0

## Purpose

This document defines the performance constraints of RishavendraOS.

Performance is a feature.

The most beautiful experience in the world becomes useless if:

- It stutters
- It lags
- It drains batteries
- It overheats devices
- It drops frames

The goal is not to build the most complex portfolio.

The goal is to build the most impressive portfolio that still feels effortless.

---

# Core Philosophy

Most developers build:

```txt
Visuals First

↓

Optimize Later
```

RishavendraOS:

```txt
Performance First

↓

Visuals Within Constraints
```

---

# Experience Target

Visitors should feel:

```txt
Smooth

Responsive

Immediate

Fluid

Premium
```

Never:

```txt
Heavy

Laggy

Delayed

Unresponsive

Overengineered
```

---

# Performance Priorities

Priority Order:

```txt
1. Responsiveness

2. Smoothness

3. Visual Quality

4. Effects

5. Decoration
```

If performance and visuals conflict:

Performance wins.

---

# Frame Rate Targets

## Desktop

Target

60 FPS

---

Acceptable

50–60 FPS

---

Minimum

45 FPS

---

Never Allow

Below 30 FPS

---

# High-End Systems

Target

120 FPS

when possible

---

# Mobile

Target

60 FPS

---

Minimum

40 FPS

---

# Animation Budget

Every animation must justify itself.

---

Questions:

Does it communicate meaning?

Does it improve understanding?

Does it improve immersion?

---

If no:

Remove it.

---

# Initial Load Targets

## First Visit

Target:

< 3 Seconds

---

Maximum:

5 Seconds

---

# Returning Visit

Target:

< 1.5 Seconds

---

# Interaction Response

Hover Response

< 50ms

---

Click Response

< 100ms

---

World Transition Start

< 150ms

---

Assistant Open

< 200ms

---

Recruiter Mode Start

< 200ms

---

# Bundle Size Budget

## Initial Bundle

Target:

< 300 KB gzipped

---

Maximum:

500 KB gzipped

---

Never:

1 MB+ initial bundle

---

# Code Splitting Strategy

Everything not visible immediately:

Lazy Loaded

---

Examples:

CareerForge World

Road Detection World

Secure Voting World

Assistant

Recruiter Mode

Three.js Scenes

---

Load only when needed.

---

# Three.js Budget

## Philosophy

Three.js should create wonder.

Not consume resources.

---

# Polygon Budget

## Character

Target

50k–100k polygons

---

Maximum

150k polygons

---

# Brain Model

Target

20k–60k polygons

---

Maximum

80k polygons

---

# Drone Model

Target

10k–40k polygons

---

Maximum

50k polygons

---

# Environment

Target

100k polygons

---

Maximum

200k polygons

---

# Total Scene Budget

Target

< 300k polygons

---

Maximum

500k polygons

---

# Texture Budget

## Character Textures

2048x2048

Preferred

---

4096x4096

Only for hero assets

---

# Brain Textures

1024–2048

---

# Drone Textures

1024–2048

---

# Environment Textures

1024–2048

---

# Texture Rules

Never use:

```txt
8K Textures

Massive PNGs

Uncompressed Assets
```

---

Always:

```txt
Compressed

Optimized

Web Friendly
```

---

# Image Budget

## Hero Assets

WebP

---

Secondary Assets

AVIF

---

Fallback

JPEG

---

# Image Size

Preferred

< 300 KB

---

Maximum

1 MB

---

# Video Budget

## Philosophy

Use video only when impossible with code.

---

Allowed:

Showreels

Demos

Project Videos

---

Not Allowed:

Background Videos

Looping Decorative Videos

---

# Video Compression

1080p

---

Bitrate Optimized

---

Maximum

5–10 MB per clip

---

# Three.js Rendering Budget

## Lights

Preferred

3–5

---

Maximum

8

---

Avoid

20+ dynamic lights

---

# Shadows

Only for critical objects.

---

Character

Allowed

---

Brain

Allowed

---

Drone

Allowed

---

Particles

No shadows

---

# Particle Budget

## Desktop

Target

500–1000

---

Maximum

2000

---

# Mobile

Target

100–300

---

Maximum

500

---

# Shader Budget

Use shaders carefully.

---

Allowed

Brain Glow

Knowledge Connections

Transition Effects

Hover Effects

---

Avoid

Full-screen shader abuse

---

# Post Processing Budget

## Allowed

Bloom

Depth of Field

Vignette

Noise

Chromatic Aberration (Very Light)

---

# Forbidden

Extreme Blur

Heavy Distortion

Lens Abuse

Glitch Effects

---

# Bloom Budget

Subtle.

---

User should notice:

Quality

Not bloom.

---

# Scroll Performance

## Target

60 FPS

throughout.

---

No:

Janky scroll effects.

---

No:

Massive layout shifts.

---

# Animation Budget

## Simultaneous Animations

Preferred

< 20

---

Maximum

50

---

Never

Hundreds of independent animations.

---

# Motion System Budget

Use:

```txt
Transform

Opacity

Scale
```

---

Avoid:

```txt
Width

Height

Top

Left
```

Animations.

---

# React Budget

## Philosophy

Render less.

Think more.

---

# Component Rules

Use:

Memoization

Lazy Loading

Server Components

Suspense

---

Avoid:

Unnecessary re-renders.

---

# Zustand Budget

Only store:

Shared state.

---

Do NOT store:

Temporary UI state.

---

# AI Assistant Budget

## Response Time

Target

< 3 Seconds

---

Maximum

5 Seconds

---

# Context Window Budget

Send:

Relevant information only.

---

Avoid:

Entire project database every request.

---

# Network Budget

## API Calls

Minimize.

---

Batch when possible.

---

Cache aggressively.

---

# Mobile Optimization

## Philosophy

Mobile receives:

Experience

Not desktop complexity.

---

Reduce:

Particles

Post Processing

Geometry

Animation Density

---

Maintain:

Story

Immersion

Quality

---

# Accessibility Performance

Reduced Motion

Must Disable:

Complex transitions

Camera movement

Particle excess

---

Maintain:

Clarity

Structure

Navigation

---

# Recruiter Mode Budget

Recruiter Mode must be:

Fastest mode.

---

Target

Instant Understanding

Minimal Rendering Cost

Maximum Information Density

---

# Lighthouse Targets

## Performance

95+

---

Accessibility

100

---

Best Practices

100

---

SEO

95+

---

# Core Web Vitals

LCP

< 2.5s

---

INP

< 200ms

---

CLS

< 0.1

---

# Success Criteria

Visitors should feel:

This is visually impressive.

This feels incredibly smooth.

Everything responds instantly.

The experience feels premium.

---

# Failure Criteria

Visitors feel:

Lag

Frame Drops

Loading Delays

Overheating

Battery Drain

Jank

---

# Ultimate Rule

If a visual effect risks hurting performance:

Remove the effect.

The illusion of intelligence is created by fluidity.

Not complexity.

---

# Final Performance Philosophy

Most portfolios attempt to impress through excess.

RishavendraOS should impress through restraint.

The user should never think:

"This website is doing a lot."

Instead they should think:

"Everything feels impossibly smooth."

---

END OF PERFORMANCE BUDGET SPECIFICATION V1.0