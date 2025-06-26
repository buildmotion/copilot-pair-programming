# Custom Prompts Reference

## Available Prompts

### 1. Smart Commit & Push

**File**: `commit-and-push.prompt.md`

**Usage**:

- Command: `cp scp`
- Direct: `#file .github/prompts/commit-and-push.prompt.md`
- Reference: `#prompt commit-and-push.prompt.md`

**Purpose**: Automated git workflow for staging, committing with conventional format, and pushing changes.

### 2. Lucid Sequence Diagram Generator

**File**: `lucid-sequence-diagram.prompt.md`

**Usage**:

- Direct: `#file .github/prompts/lucid-sequence-diagram.prompt.md`
- Command: `generate lucid sequence diagram`

**Purpose**: Generate UML sequence diagrams using Lucid Chart markup syntax.

## Usage Patterns

### Method 1: Direct File Reference

```text
#file .github/prompts/[prompt-name].prompt.md
```

### Method 2: With Additional Context

```text
#file .github/prompts/lucid-sequence-diagram.prompt.md

Create a sequence diagram for the antipattern detection system
```

### Method 3: Command Shortcuts

```text
cp scp                              # Smart commit & push
generate lucid sequence diagram     # Lucid diagram generator  
```

### Method 4: Prompt + Custom Instructions

```text
#file .github/prompts/commit-and-push.prompt.md

Please also include documentation updates in the commit analysis
```

## Creating New Prompts

1. Create new `.prompt.md` file in `.github/prompts/`
2. Follow the template structure:

   ```markdown
   # Prompt Title
   
   ## Overview
   Brief description of purpose
   
   ## Instructions for Copilot
   Detailed instructions...
   ```

3. Update this README with new prompt reference
4. Consider adding shortcuts to `.github/instructions/instructions.md`

## Best Practices

- Use descriptive filenames: `[functionality]-[type].prompt.md`
- Include clear usage examples in prompt files
- Document command shortcuts in instruction files
- Test prompts with various scenarios before committing
