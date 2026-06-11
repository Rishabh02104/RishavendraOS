# THREEJS_ARCHITECTURE.md

# RishavendraOS Three.js Architecture Specification v1.0

## Purpose

This document translates the vision of RishavendraOS into a practical 3D architecture.

DESIGN_SPEC.md defines philosophy.

MOTION_SPEC.md defines behavior.

SCENE_ARCHITECTURE.md defines composition.

THREEJS_ARCHITECTURE.md defines implementation.

This document should be considered the source of truth for:

- React Three Fiber
- Three.js
- Shaders
- Cameras
- Lighting
- Materials
- Post Processing
- Particle Systems
- Performance Budgets
- Asset Pipeline
- Scene Management

---

# Technology Stack

## Core

React Three Fiber

Three.js

Drei

Framer Motion

Next.js 15

TypeScript

---

## Post Processing

@react-three/postprocessing

---

Effects allowed:

Bloom

Depth Of Field

Chromatic Aberration (extremely subtle)

Noise

Vignette

God Rays

Volumetric Lighting

---

Avoid:

Heavy distortion

Glitch effects

Cyberpunk effects

RGB splitting

Excessive bloom

---

# Rendering Philosophy

Most portfolios render objects.

RishavendraOS renders ideas.

Everything should feel intelligent.

Every object must have meaning.

Nothing decorative should exist without purpose.

---

# Scene Graph Architecture

```txt
Root Scene

├── Environment System
│
├── Lighting System
│
├── Character System
│
├── Intelligence Core System
│
├── Knowledge Node System
│
├── Project Anchor System
│
├── Particle System
│
├── Camera System
│
├── Post Processing System
│
└── Recruiter Mode System
```

---

# Environment System

## Purpose

Create a believable intelligence ecosystem.

---

# Environment Layers

```txt
Environment

├── Background Layer
├── Fog Layer
├── Architecture Layer
├── Information Layer
└── Atmosphere Layer
```

---

# Background Layer

## Geometry

Massive sphere

Inside-facing normals

Radius:

500–1000 units

---

## Material

Custom shader

Gradient shader

Animated procedural noise

---

## Colors

Midnight Blue

Deep Black

Dark Intelligence Blue

---

## Requirements

No visible seams

No stars

No galaxies

No skyboxes

---

# Architecture Layer

## Purpose

Represent systems thinking.

---

## Objects

Procedural structures

Abstract frameworks

Floating engineering forms

Architectural fragments

---

## Geometry Types

Boxes

Frames

Curves

Extrusions

Procedural geometry

---

## Quantity

50–200 structures

---

## Placement

Distributed around scene perimeter.

Never obstruct central focus.

---

## Motion

Extremely slow.

5–20 second cycles.

---

# Atmosphere System

## Purpose

Create depth.

---

# Components

Volumetric Fog

Floating Dust

Light Scattering

Depth Particles

---

# Volumetric Fog

Density:

Very low

---

Range:

50–300 units

---

Purpose:

Scale

Depth

Immersion

---

# Information System

## Purpose

Represent active thought.

---

# Components

Neural Streams

Data Flows

Connection Paths

Signal Pulses

---

## Implementation

Spline Curves

Tube Geometry

Shader Materials

---

## Behavior

Constant movement

Directional flow

Dynamic activation

---

# Character System

## Purpose

Human anchor.

---

# Asset Type

GLB

GLTF

Ready Player Me not recommended

Custom character preferred

---

# Structure

```txt
Character

├── Head
├── Eyes
├── Neck
├── Shoulders
└── Torso
```

---

# Animation System

Idle breathing

Blinking

Micro movements

Eye tracking

Focus shifts

---

## Update Frequency

60 FPS

---

## Optimization

Animation mixer

GPU skinning

Single skeleton

---

# Intelligence Core System

## Purpose

Visualize thinking.

---

# Structure

```txt
Intelligence Core

├── Core Geometry
├── Neural Network
├── Knowledge Nodes
├── Data Streams
└── Activation Effects
```

---

# Core Geometry

## Materials

Glass

Energy

Procedural light

Translucent structures

---

## Geometry

Custom generated

Icosahedrons

Spheres

Procedural mesh clusters

---

## Quantity

20–100 components

---

# Neural Network

## Purpose

Connect ideas.

---

# Implementation

Spline curves

Tube geometries

Animated shaders

---

# Node System

## Purpose

Represent expertise.

---

Nodes:

CareerForge

Computer Vision

Road Detection

Visual Cryptography

AI Systems

Product Building

---

# Node Structure

```txt
Node

├── Orb
├── Label
├── Glow
├── Connection Links
└── Interaction Layer
```

---

# Hover Behavior

Scale:

1.0 → 1.15

Glow Increase

Connection Highlight

Camera Focus

---

# Selection Behavior

Scale:

1.15 → 1.3

Environment Response

Project Activation

---

# Project Anchor System

## Purpose

Physical manifestations of projects.

---

# CareerForge Anchor

## Asset

Laptop

---

## States

Dormant

Hovered

Activated

---

## Hover

Screen illuminates

UI fragments appear

Data streams activate

---

## Click

Camera enters screen

Transition begins

---

# Road Detection Anchor

## Asset

Drone

---

## Flight System

Bezier path

Spline path

Looping patrol

---

## Hover

Scanner activates

Ground scan projection appears

---

## Click

Launch sequence begins

Camera follows drone

---

# Secure Voting Anchor

## Asset

Vault

---

## Hover

Encryption layers appear

Security particles activate

---

## Click

Vault opens

Camera enters

Transition begins

---

# Particle System

## Purpose

Represent information.

Not decoration.

---

# Types

Information Particles

Knowledge Particles

Activation Particles

Transition Particles

---

# Quantity

Desktop:

10,000–50,000

---

Mobile:

1,000–5,000

---

# Rendering

Instanced Meshes

GPU accelerated

---

# Shader Architecture

## Purpose

Create impossible materials.

---

# Material Types

Intelligence Glass

Neural Energy

Knowledge Nodes

Information Streams

Atmospheric Materials

---

# Intelligence Glass Shader

Properties:

Transparency

Refraction

Glow

Fresnel Edge

Noise Distortion

---

# Neural Energy Shader

Properties:

Animated flow

Pulse effects

Connection energy

---

# Knowledge Node Shader

Properties:

Core glow

Pulse response

Activation burst

---

# Lighting System

## Philosophy

Light should guide attention.

---

# Main Lights

```txt
Lighting

├── Key Light
├── Fill Light
├── Rim Light
├── Environment Light
└── Accent Lights
```

---

# Key Light

Purpose:

Character visibility

---

Position:

Front upper angle

---

# Rim Light

Purpose:

Separation from environment

---

Position:

Rear

---

# Accent Lights

Purpose:

Highlight active systems

---

Examples

Brain activation

Node activation

Project activation

---

# Camera System

## Philosophy

Camera is a filmmaker.

---

# Camera Modes

Arrival

Observation

Investigation

Immersion

Recruiter

---

# Arrival Camera

Wide shot

Entire ecosystem visible

---

Duration

3–5 seconds

---

# Observation Camera

Default mode

Character centered

---

# Investigation Camera

Hover response

Subtle movement

---

# Immersion Camera

Project entry

Cinematic travel

---

# Recruiter Camera

Structured

Stable

Objective

---

# Camera Constraints

Never shake

Never teleport

Never spin

Never snap

---

# Post Processing

## Philosophy

Enhance reality.

Do not dominate reality.

---

# Effects

Bloom

DOF

Vignette

Noise

Volumetrics

---

# Bloom

Very controlled

Threshold based

---

# DOF

Only during transitions

---

# Noise

Extremely subtle

Film-like

---

# Recruiter Mode Architecture

## Purpose

Convert exploration into evaluation.

---

# System

```txt
Recruiter Mode

├── Environment Compression
├── Node Compression
├── Project Summary Layer
├── Resume Layer
├── Metrics Layer
└── Contact Layer
```

---

# Transformation

Brain compresses

Nodes reorganize

Projects summarize

Resume appears

Evidence surfaces

---

# Performance Budget

## Desktop

Target:

60 FPS

---

Triangles:

< 2 Million

---

Draw Calls:

< 300

---

Textures:

2K Maximum

---

# Mobile

Target:

30–60 FPS

---

Triangles:

< 500K

---

Draw Calls:

< 100

---

# Optimization Rules

Use Instancing

Use LOD

Use Lazy Loading

Use Suspense

Use Texture Compression

Use GPU Particles

Avoid unnecessary re-renders

---

# Asset Pipeline

## Formats

GLB

GLTF

KTX2

HDR

WEBP

---

## Avoid

FBX

Large PNGs

Massive textures

---

# Folder Structure

```txt
src/

components/3d/

├── scene/
├── character/
├── intelligence-core/
├── nodes/
├── anchors/
├── particles/
├── shaders/
├── lights/
├── cameras/
└── recruiter-mode/

assets/

├── models/
├── textures/
├── hdr/
└── animations/
```

---

# Success Criteria

The Three.js implementation succeeds when visitors feel:

> This is not a website rendered in 3D.

Instead:

> I am exploring a living intelligence system.

Every frame should communicate thought, curiosity, engineering, and creation.

---

END OF THREEJS ARCHITECTURE SPECIFICATION V1.0