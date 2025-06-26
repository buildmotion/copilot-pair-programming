---
applyTo: "**"
---

# Copilot Style Management Instructions

## Purpose

This instruction provides a centralized system for managing and applying different writing and coding styles across the repository using contextual instruction files.

## Active Style Configuration

### Current Active Styles
- **Presentation**: `presentation-style-snarky.instructions.md`
- **Documentation**: `documentation-style-tutorial.instructions.md` (when created)
- **Code**: `code-style-readable.instructions.md` (when created)
- **Commits**: Defined in `git-workflow.instructions.md`

### Style Context Mapping

| File Pattern | Active Style Instruction |
|--------------|-------------------------|
| `presentation/**` | `presentation-style-snarky.instructions.md` |
| `documentation/**` | `documentation-style-tutorial.instructions.md` |
| `.github/**` | `documentation-style-reference.instructions.md` |
| `src/**`, `packages/**` | `code-style-readable.instructions.md` |
| Git operations | `git-workflow.instructions.md` |

## Style Selection Commands

Use these Copilot directives to switch styles:

```ts
// copilot: apply snarky presentation style for this content
// copilot: use tutorial documentation style for this explanation  
// copilot: apply readable code style for this implementation
// copilot: use formal academic style for this section
```

## Available Style Instructions

### Writing Styles
- `presentation-style-snarky.instructions.md` ✅ (Active)
- `presentation-style-academic.instructions.md` (Planned)
- `presentation-style-conversational.instructions.md` (Planned)
- `documentation-style-tutorial.instructions.md` (Planned)
- `documentation-style-reference.instructions.md` (Planned)

### Code Styles  
- `code-style-readable.instructions.md` (Planned)
- `code-style-functional.instructions.md` (Planned)
- `code-style-defensive.instructions.md` (Planned)

## Style Persistence

Style preferences are persisted in multiple locations:

1. **Repository Config**: `.github/copilot-config.yml`
2. **Workspace Settings**: `copilot-pair-programming.code-workspace`
3. **Package Config**: `package.json` copilot section
4. **This Instruction**: Central style management

## Creating New Style Instructions

When creating new style instructions:

1. **File naming**: Use pattern `[context]-style-[name].instructions.md`
2. **Location**: Place in `.github/instructions/`
3. **ApplyTo**: Set appropriate file patterns
4. **Update configs**: Add to all persistence locations
5. **Document**: Update this instruction file

## Integration with Existing Instructions

Style instructions work alongside core instructions:

- **Core behavior**: Defined in `instructions.md`, `ai-troubleshooting.instructions.md`
- **Git workflow**: Defined in `git-workflow.instructions.md`
- **Style overlay**: Applied contextually based on file patterns

## Style Override Commands

```ts
// Override current style for specific content
// copilot: ignore current style, use academic tone for this explanation
// copilot: temporarily switch to conversational style for this section
// copilot: apply executive summary style for this overview
```

This system allows flexible, context-aware style management while maintaining consistency across the repository.
