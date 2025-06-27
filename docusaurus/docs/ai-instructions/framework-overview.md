# AI Instructions Framework

## Overview

This comprehensive framework enables precise control over GitHub Copilot behavior through structured instruction files. Our system combines explicit guidelines, automated enforcement, and contextual application to ensure consistent, high-quality AI-assisted development.

## Framework Architecture

### Instruction File Structure

```
.github/instructions/
├── instructions.md                              # 📋 Master index and directives
├── ai-troubleshooting.instructions.md          # 🔧 Systematic debugging protocols
├── git-workflow.instructions.md                # 📝 Conventional commits and git practices
├── husky-hook-management.instructions.md       # ⚙️ Git hook configuration
├── copilot-smart-commit-push.instructions.md   # 🚀 Automated git workflow (SCP)
├── presentation-style-snarky.instructions.md   # ✍️ Writing style and antipattern elimination
├── style-management.instructions.md            # 🎨 Style system coordination
└── [specialized-topic].instructions.md         # 📚 Domain-specific instructions
```

### Instruction Categories

#### 1. Core System Instructions

**Purpose**: Fundamental AI behavior and workflow management

**Files**:
- `instructions.md` - Master coordination and command directives
- `ai-troubleshooting.instructions.md` - Systematic problem-solving protocols
- `style-management.instructions.md` - Cross-cutting style coordination

#### 2. Development Workflow Instructions

**Purpose**: Git, testing, and development process guidance

**Files**:
- `git-workflow.instructions.md` - Conventional commits and best practices
- `husky-hook-management.instructions.md` - Git hook configuration
- `copilot-smart-commit-push.instructions.md` - Automated SCP workflow

#### 3. Content and Style Instructions

**Purpose**: Writing, presentation, and communication standards

**Files**:
- `presentation-style-snarky.instructions.md` - Engaging technical presentation style
- `chat-log.instructions.md` - Session documentation protocols

#### 4. Technology-Specific Instructions

**Purpose**: Framework and platform-specific guidance

**Files**:
- `nx.instructions.md` - Nx workspace management
- `typescript-development.instructions.md` - TypeScript best practices
- `angular-development.instructions.md` - Angular application patterns

## Instruction File Format

### Standard Template

```markdown
---
applyTo: "**"  # File pattern for instruction application
---

# [Instruction Title]

## Purpose
Clear statement of instruction objectives and scope

## Related Instructions
Cross-references to complementary instruction files

## Core Guidelines
Explicit behavioral directives for GitHub Copilot

## Implementation Details
Specific technical requirements and patterns

## Examples
Concrete examples of correct and incorrect approaches

## Validation
Methods for verifying instruction compliance

## Integration
How this instruction works with the broader framework
```

### Key Components

#### ApplyTo Directive
Controls which files and contexts the instruction affects:

```markdown
---
applyTo: "presentation/**/*.md"  # Only presentation files
---

---
applyTo: "**"  # All files (global instruction)
---

---
applyTo: "src/**/*.ts"  # TypeScript source files only
---
```

#### Cross-Reference System
Links related instructions for comprehensive guidance:

```markdown
## Related Instructions

This instruction focuses on X. For related topics:
- **Topic Y**: [`y-topic.instructions.md`](y-topic.instructions.md)
- **Topic Z**: [`z-topic.instructions.md`](z-topic.instructions.md)
```

## Core Instruction Components

### 1. AI Troubleshooting Framework

**Location**: `ai-troubleshooting.instructions.md`

**Key Features**:
- Systematic code analysis protocols
- Root cause identification methods
- Evidence-based diagnosis approach
- Comprehensive logging requirements

**Usage Pattern**:
```markdown
// copilot: follow ai-troubleshooting protocol for this issue
// copilot: trace complete workflow before making changes
// copilot: add diagnostic logging at key points
```

### 2. Git Workflow Management

**Location**: `git-workflow.instructions.md`

**Key Features**:
- Conventional commit enforcement
- Automated quality validation
- Consistent branching strategies
- Integration with development tools

**Automated Integration**:
- Husky pre-commit hooks validate instruction compliance
- Commitlint ensures conventional commit format
- SCP workflow automates intelligent commit generation

### 3. Style Management System

**Location**: `style-management.instructions.md`

**Key Features**:
- Context-aware style application
- Antipattern detection and elimination
- Cross-cutting style coordination
- Override mechanisms for special cases

**Style Selection Commands**:
```typescript
// copilot: apply snarky presentation style for this content
// copilot: use tutorial documentation style for this explanation
// copilot: apply readable code style for this implementation
```

### 4. Smart Commit and Push (SCP)

**Location**: `copilot-smart-commit-push.instructions.md`

**Key Features**:
- Automated commit message generation
- Change analysis and categorization
- Conventional commit compliance
- Single-command workflow execution

**Trigger Command**: `cp scp`

## Advanced Features

### Command Directives System

The framework includes specialized commands for common operations:

#### Core Commands
- **`cp scp`**: Smart Commit & Push workflow
- **`cp log -c`**: Chat session documentation
- **`cp log -r`**: Research session documentation

#### Style Commands
```typescript
// copilot: apply [style-name] style for this [context]
// copilot: temporarily override style with [alternative-style]
// copilot: validate style compliance for this content
```

#### Debugging Commands
```typescript
// copilot: follow troubleshooting protocol for [issue-type]
// copilot: trace workflow for [specific-functionality]
// copilot: add comprehensive logging for [component]
```

### Contextual Application

Instructions automatically apply based on file patterns and content types:

| Context | Active Instructions | Behavior |
|---------|-------------------|----------|
| `presentation/*.md` | Snarky style + git workflow | Engaging content with quality enforcement |
| `.github/instructions/*.md` | Reference style + validation | Clear, systematic documentation |
| `src/**/*.ts` | Code style + TypeScript rules | Readable, maintainable code |
| Git operations | Git workflow + conventional commits | Automated quality and consistency |

### Validation and Enforcement

#### Automated Testing
```bash
#!/bin/bash
# .github/scripts/test-copilot-instructions.sh

echo "🔍 Testing instruction compliance..."

# Check for AI writing antipatterns
if grep -r "isn't just\|not just\|more than just" presentation/; then
    echo "❌ Found expectation-subversion patterns"
    exit 1
fi

# Validate instruction file format
for file in .github/instructions/*.instructions.md; do
    if ! grep -q "^---$" "$file"; then
        echo "❌ Missing frontmatter in $file"
        exit 1
    fi
done

echo "✅ All instruction compliance tests passed"
```

#### Git Hook Integration
```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run instruction compliance testing
./.github/scripts/test-copilot-instructions.sh

# Additional quality checks...
echo "✅ Pre-commit validation passed"
```

## Implementation Guide

### Setting Up the Framework

#### 1. Create Instruction Directory Structure
```bash
mkdir -p .github/instructions
mkdir -p .github/scripts
mkdir -p .github/prompts
```

#### 2. Install Core Instructions
Download or create the essential instruction files:
- Master index (`instructions.md`)
- Core protocols (`ai-troubleshooting.instructions.md`)
- Git workflow (`git-workflow.instructions.md`)
- Style management (`style-management.instructions.md`)

#### 3. Configure Validation
```bash
# Create validation script
cat > .github/scripts/test-copilot-instructions.sh << 'EOF'
#!/bin/bash
echo "🔍 Testing instruction compliance..."
# Add your validation logic here
echo "✅ Instruction compliance validated"
EOF

chmod +x .github/scripts/test-copilot-instructions.sh
```

#### 4. Integrate with Git Hooks
```bash
# Install husky
npm install --save-dev husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "./.github/scripts/test-copilot-instructions.sh"
```

### Creating Custom Instructions

#### 1. Use the Standard Template
```markdown
---
applyTo: "your-file-pattern/**"
---

# Your Custom Instruction

## Purpose
What this instruction achieves

## Guidelines
Specific directives for GitHub Copilot

## Examples
Concrete implementation examples

## Validation
How to verify compliance
```

#### 2. Add Cross-References
Link to related instructions for comprehensive guidance

#### 3. Test Integration
Verify the instruction works correctly with your validation system

#### 4. Update Master Index
Add the new instruction to `instructions.md`

## Best Practices

### Instruction Design

- **Be Explicit**: Specify exactly what you want Copilot to do/avoid
- **Provide Examples**: Include both good and bad examples
- **Cross-Reference**: Link related instructions for context
- **Validate**: Include testing mechanisms for compliance

### Framework Management

- **Version Control**: Track instruction changes like code
- **Testing**: Automate compliance validation
- **Documentation**: Maintain clear purpose statements
- **Integration**: Ensure instructions work together harmoniously

### Usage Patterns

- **Start Simple**: Begin with core instructions, add complexity gradually
- **Context-Specific**: Create targeted instructions for specific domains
- **Iterate**: Refine instructions based on actual usage
- **Measure**: Track effectiveness and compliance rates

## Troubleshooting

### Common Issues

#### Instructions Not Applied
- Check `applyTo` pattern matches target files
- Verify file syntax and frontmatter format
- Ensure GitHub Copilot can access instruction files

#### Conflicting Instructions
- Review cross-references and dependencies
- Use style management system for coordination
- Implement clear precedence rules

#### Validation Failures
- Check script permissions and execution
- Verify pattern matching logic
- Review git hook configuration

### Debug Commands

```bash
# Test instruction file format
grep -l "^---$" .github/instructions/*.md

# Validate applyTo patterns
find . -name "*.md" | grep "presentation"

# Check hook execution
./.husky/pre-commit
```

## Framework Evolution

### Planned Enhancements

- **AI Model Integration**: Direct instruction loading into AI models
- **Dynamic Validation**: Real-time instruction compliance checking
- **Template System**: Automated instruction generation for new domains
- **Analytics**: Usage tracking and effectiveness measurement

### Contributing Guidelines

When adding new instructions:

1. Follow the standard template format
2. Include comprehensive examples and validation
3. Update cross-references in related files
4. Test integration with existing framework
5. Document the instruction in the master index

This AI Instructions Framework provides a robust, scalable foundation for controlling GitHub Copilot behavior while maintaining flexibility for diverse development contexts and requirements.
