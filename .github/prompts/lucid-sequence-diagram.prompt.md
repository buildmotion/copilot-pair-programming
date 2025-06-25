# Lucid Chart Sequence Diagram Generator

## Overview
Generate UML sequence diagrams using Lucid Chart markup syntax. This prompt ensures proper syntax, participant naming conventions, and visual clarity for complex system interactions.

## Instructions for Copilot

When user requests a sequence diagram or types "generate lucid sequence diagram":

### 1. **Analyze the System Flow**
- Identify all participants/actors in the process
- Map the complete interaction sequence from start to finish
- Note decision points, loops, and alternative flows
- Identify phases or logical groupings of actions

### 2. **Apply Lucid Chart Syntax Rules**

#### **Participant Naming Convention**
```lucid
# ✅ CORRECT: Quote participant names with spaces
Developer->"Git Client": action description
"Git Client"->"System Component": message

# ❌ WRONG: Unquoted names with spaces
Git Client->System Component: action description
```

#### **Required Syntax Elements**
- **Title**: Always start with `title Your Diagram Title`
- **Arrows**: Use `->` for all message flows
- **Quotes**: Quote ALL participant names containing spaces
- **Messages**: Descriptive action or data being passed
- **Code blocks**: Wrap entire diagram in ````lucid` block

#### **Control Structures**
```lucid
# Alternative flows
alt Condition Description
    Participant->Other: success path
else Alternative Condition  
    Participant->Other: failure path
end

# Loops
loop Description of iteration
    Participant->Other: repeated action
end

# Notes (spanning participants)
note over "Participant A", "Participant B": Phase description
note over "Single Participant": Single participant note
```

### 3. **Structure Requirements**

#### **Opening Format**
```lucid
title Descriptive System Name - Process Flow

# Start with primary trigger
User/Trigger->"Entry Point": initial action
```

#### **Phase Organization**
- Use spanning notes to mark major phases
- Group related interactions logically
- Show decision points with `alt/else/end` blocks
- Use `loop` for iterative processes

#### **Error Handling**
- Always include failure scenarios in `alt` blocks
- Show user feedback for both success and failure
- Include retry mechanisms where applicable

#### **Completion Pattern**
- End with final state or user confirmation
- Show data persistence or external effects
- Include success confirmations

### 4. **Content Guidelines**

#### **Message Descriptions**
- Use imperative mood: "validate data", "create record"
- Include key parameters: "git add .", "exit code 1"
- Show data types: "list of staged files", "validation results"
- Use emojis for status: "✅ success", "❌ failure", "⚠️ warning"

#### **Participant Selection**
- **Systems**: "Database", "File System", "API Gateway"
- **Tools**: "Git Client", "Build System", "Test Runner"  
- **Scripts**: "Pre-commit Script", "Validation Engine"
- **Users**: Developer, "System Admin", "End User"
- **External**: "Remote Repository", "Third Party API"

#### **Note Usage**
```lucid
# Phase marking (spanning multiple participants)
note over "Start Participant", "End Participant": Phase 1: Description

# Explanatory notes (single participant)
note over "Participant": Additional context or explanation

# User feedback (within alt blocks)
note over Developer: User sees specific error message\nwith line breaks for clarity
```

### 5. **Validation Checklist**

Before generating, ensure:
- [ ] All participant names with spaces are quoted
- [ ] Title is present and descriptive
- [ ] All arrows use `->` syntax
- [ ] Alt/else/end blocks are properly closed
- [ ] Loop blocks are properly closed
- [ ] Notes use proper `over` syntax
- [ ] Messages are descriptive and actionable
- [ ] Error paths are included
- [ ] Success confirmations are shown

### 6. **Common Patterns**

#### **Validation Pattern**
```lucid
System->"Validator": check input data
alt Validation Fails
    "Validator"->System: error details
    System->User: show validation errors
else Validation Passes
    "Validator"->System: validation success
    System->"Next Component": continue process
end
```

#### **File Processing Pattern**
```lucid
loop For each file in collection
    Processor->"File System": read file content
    "File System"->Processor: file data
    Processor->Processor: process file data
    
    alt Processing Error
        Processor->User: report file error
    else Processing Success
        Processor->"Output System": save processed data
    end
end
```

#### **Git Workflow Pattern**
```lucid
Developer->"Git Client": git command
"Git Client"->"Git Hook": trigger hook
"Git Hook"->"Validation Script": execute validation

alt Validation Fails
    "Validation Script"->"Git Hook": exit code 1
    "Git Hook"->"Git Client": abort operation
    "Git Client"->Developer: show error message
else Validation Passes
    "Validation Script"->"Git Hook": exit code 0
    "Git Hook"->"Git Client": continue operation
    "Git Client"->Developer: operation successful
end
```

## Example Output

Based on the antipattern detection system:

```lucid
title Antipattern Detection System - Commit Process Flow

Developer->"Git Client": git add .
Developer->"Git Client": git commit -m "message"
"Git Client"->"Husky Hook": trigger pre-commit hook
note over "Husky Hook": Hook automatically triggered before commit creation

note over "Husky Hook", "Compliance Tester": Phase 1: AI Instruction Compliance
"Husky Hook"->"Pre-commit Script": execute .husky/pre-commit
"Pre-commit Script"->"File System": check for test-copilot-instructions.sh
"File System"->"Pre-commit Script": script exists
"Pre-commit Script"->"Compliance Tester": ./.github/scripts/test-copilot-instructions.sh

"Compliance Tester"->"File System": validate instruction files exist
"Compliance Tester"->"File System": check applyTo scope configuration
"Compliance Tester"->"File System": verify antipattern guidelines
"Compliance Tester"->"File System": confirm solar writing philosophy
"File System"->"Compliance Tester": instruction validation results

alt Instruction Validation Fails
    "Compliance Tester"->"Pre-commit Script": exit code 1
    "Pre-commit Script"->"Git Client": ❌ AI pattern instruction validation failed
    "Git Client"->Developer: COMMIT ABORTED
    note over Developer: Fix instruction issues and retry commit
else Instruction Validation Passes
    "Compliance Tester"->"Pre-commit Script": exit code 0
    "Pre-commit Script"->"Pre-commit Script": continue to pattern detection
end

note over "Pre-commit Script", "Pattern Detector": Phase 2: Real-time Antipattern Detection
"Pre-commit Script"->"Git Client": git diff --cached --name-only --diff-filter=ACM
"Git Client"->"Pre-commit Script": list of staged files
"Pre-commit Script"->"Pre-commit Script": filter for *.md files

loop For each staged markdown file
    "Pre-commit Script"->"Pattern Detector": scan file for antipatterns
    "Pattern Detector"->"File System": read file content
    "File System"->"Pattern Detector": file content
    
    "Pattern Detector"->"Pattern Detector": grep -n "isn't just|not just|more than just|not merely"
    "Pattern Detector"->"Pattern Detector": grep -v "grep" (exclude false positives)
    "Pattern Detector"->"Pattern Detector": head -5 (limit output)
    
    alt Antipatterns Found
        "Pattern Detector"->"Pre-commit Script": violations with line numbers
        "Pre-commit Script"->"Git Client": ❌ Found antipattern in staged file
        "Pre-commit Script"->"Git Client": show violation details
        "Git Client"->Developer: COMMIT ABORTED
        note over Developer: Developer sees:\n❌ Found antipattern in file.md\nLines with expectation-subversion patterns:\n60:- text with expectation-subversion violation\nPlease remove these patterns
        Developer->Developer: edit file to remove antipatterns
        Developer->"Git Client": git add . (re-stage fixed file)
        Developer->"Git Client": git commit -m "message" (retry)
        note over Developer: Process starts over with fixed content
    else No Antipatterns Found
        "Pattern Detector"->"Pre-commit Script": file clean
        "Pre-commit Script"->"Pre-commit Script": continue to next file
    end
end

note over "Pre-commit Script", "Git Client": Successful Validation
"Pre-commit Script"->"Git Client": ✅ No antipatterns found in staged files
"Pre-commit Script"->"Git Client": ✅ Pre-commit validation passed
"Git Client"->"Husky Hook": pre-commit hook success
"Husky Hook"->"Git Client": proceed to commit-msg validation

note over "Git Client", "Husky Hook": Commit Message Validation
"Git Client"->"Husky Hook": trigger commit-msg hook
"Husky Hook"->"Git Client": validate conventional commit format
note over "Husky Hook": Separate hook validates commit message format

alt Commit Message Invalid
    "Husky Hook"->"Git Client": commit message validation failed
    "Git Client"->Developer: COMMIT ABORTED (invalid message format)
else Commit Message Valid
    "Husky Hook"->"Git Client": commit message validation passed
    "Git Client"->"Git Client": create commit object
    "Git Client"->Developer: ✅ Commit created successfully
end

note over Developer, "Remote Repository": Push to Remote
Developer->"Git Client": git push
"Git Client"->"Remote Repository": push commit
"Remote Repository"->"Git Client": push successful
"Git Client"->Developer: ✅ Changes pushed to remote repository
```

## Usage Examples

### Simple API Call
```lucid
title API Authentication Flow

User->"Web App": login request
"Web App"->"Auth Service": validate credentials
"Auth Service"->"Database": query user record
"Database"->"Auth Service": user data
"Auth Service"->"Web App": JWT token
"Web App"->User: authentication successful
```

### Error Handling with Retry
```lucid
title File Upload with Retry Logic

User->"Upload Service": upload file
"Upload Service"->"File Validator": validate file
alt File Invalid
    "File Validator"->"Upload Service": validation errors
    "Upload Service"->User: show error message
else File Valid
    "File Validator"->"Upload Service": validation passed
    "Upload Service"->"Storage": save file
    alt Save Failed
        "Storage"->"Upload Service": storage error
        "Upload Service"->User: retry upload
    else Save Successful
        "Storage"->"Upload Service": file saved
        "Upload Service"->User: upload complete
    end
end
```

### Multi-Phase Process
```lucid
title CI/CD Pipeline Execution

note over Developer, "Deploy Service": Phase 1: Code Integration
Developer->"Git Repository": push code
"Git Repository"->"CI Service": trigger build
"CI Service"->"Build Agent": execute build

note over "Build Agent", "Test Service": Phase 2: Quality Assurance  
"Build Agent"->"Test Service": run test suite
"Test Service"->"Build Agent": test results

note over "Build Agent", "Deploy Service": Phase 3: Deployment
"Build Agent"->"Deploy Service": deploy to staging
"Deploy Service"->"Production": promote to production
"Production"->Developer: deployment notification
```

## Troubleshooting

### Common Syntax Errors

❌ **Unquoted participant names**
```
Git Client->File System: check file
```

✅ **Properly quoted names**
```
"Git Client"->"File System": check file
```

❌ **Missing alt/end closure**
```
alt Condition
    A->B: action
# Missing 'end'
```

✅ **Proper closure**
```
alt Condition
    A->B: action
end
```

❌ **Invalid note syntax**
```
note Git Client: description
```

✅ **Correct note syntax**
```
note over "Git Client": description
note over "Client", "Server": spanning note
```

### Best Practices

1. **Keep messages concise but descriptive**
2. **Use consistent participant naming throughout**
3. **Include both success and failure paths**
4. **Group related actions with spanning notes**
5. **Show user feedback for all outcomes**
6. **Use emojis sparingly for status indicators**
7. **Test diagram syntax before finalizing**

This prompt ensures Copilot generates properly formatted, comprehensive Lucid Chart sequence diagrams that accurately represent system interactions and follow established markup conventions.
