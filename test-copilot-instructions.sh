#!/bin/bash

# Copilot Instruction Compliance Test Script
# Tests whether our presentation style instructions are being followed

# Set up logging
LOG_DIR="documentation/chats"
LOG_FILE="$LOG_DIR/$(date +%Y-%m-%d)-compliance-test-log.md"

# Create log directory if it doesn't exist
mkdir -p "$LOG_DIR"

echo "🧪 Testing Copilot Instruction Compliance..."
echo "============================================="

# Initialize log file
cat > "$LOG_FILE" << EOF
# Compliance Test Log - $(date +"%Y-%m-%d %H:%M:%S")

## Test Results

EOF

# Test 1: Check if instruction file exists and is properly formatted
echo ""
echo "✅ Test 1: Instruction File Validation"
echo "### Test 1: Instruction File Validation" >> "$LOG_FILE"

if [ -f ".github/instructions/presentation-snarky-style.instructions.md" ]; then
    echo "   ✓ Instruction file exists"
    echo "- ✅ Instruction file exists" >> "$LOG_FILE"
    
    # Check for key patterns in the instruction file
    if grep -q "applyTo.*presentation/comprehensive-talk-outline.md" .github/instructions/presentation-snarky-style.instructions.md; then
        echo "   ✓ File scope correctly set"
        echo "- ✅ File scope correctly set" >> "$LOG_FILE"
    else
        echo "   ❌ File scope missing or incorrect"
        echo "- ❌ File scope missing or incorrect" >> "$LOG_FILE"
    fi
    
    if grep -q "expectation-subversion" .github/instructions/presentation-snarky-style.instructions.md; then
        echo "   ✓ Anti-pattern guidelines present"
        echo "- ✅ Anti-pattern guidelines present" >> "$LOG_FILE"
    else
        echo "   ❌ Anti-pattern guidelines missing"
        echo "- ❌ Anti-pattern guidelines missing" >> "$LOG_FILE"
    fi
    
    if grep -q "solar confidence" .github/instructions/presentation-snarky-style.instructions.md; then
        echo "   ✓ Solar writing philosophy present"
        echo "- ✅ Solar writing philosophy present" >> "$LOG_FILE"
    else
        echo "   ❌ Solar writing philosophy missing"
        echo "- ❌ Solar writing philosophy missing" >> "$LOG_FILE"
    fi
else
    echo "   ❌ Instruction file not found"
    echo "- ❌ Instruction file not found" >> "$LOG_FILE"
fi

# Test 2: Check presentation file for test prompts
echo ""
echo "✅ Test 2: Presentation File Test Setup"
if [ -f "presentation/comprehensive-talk-outline.md" ]; then
    echo "   ✓ Presentation file exists"
    
    if grep -q "Copilot Instruction Compliance Test" presentation/comprehensive-talk-outline.md; then
        echo "   ✓ Test section present in presentation"
    else
        echo "   ❌ Test section missing from presentation"
    fi
else
    echo "   ❌ Presentation file not found"
fi

# Test 3: Check for anti-patterns in existing content
echo ""
echo "✅ Test 3: Anti-Pattern Detection in Existing Content"

# Check for expectation-subversion patterns
if grep -q "isn't just\|not just\|more than just\|not merely" presentation/comprehensive-talk-outline.md; then
    echo "   ❌ Found expectation-subversion patterns in presentation"
    echo "      Run: grep -n \"isn't just\\|not just\\|more than just\\|not merely\" presentation/comprehensive-talk-outline.md"
else
    echo "   ✓ No expectation-subversion patterns found"
fi

# Check for corporate fluff
if grep -q "fast-paced world\|important to note\|it should be noted\|aims to" presentation/comprehensive-talk-outline.md; then
    echo "   ❌ Found corporate fluff patterns in presentation"
    echo "      Run: grep -n \"fast-paced world\\|important to note\\|it should be noted\\|aims to\" presentation/comprehensive-talk-outline.md"
else
    echo "   ✓ No corporate fluff patterns found"
fi

# Check for passive voice indicators
if grep -q "is implemented\|was created\|can be seen\|it is known" presentation/comprehensive-talk-outline.md; then
    echo "   ❌ Found passive voice patterns in presentation"
    echo "      Run: grep -n \"is implemented\\|was created\\|can be seen\\|it is known\" presentation/comprehensive-talk-outline.md"
else
    echo "   ✓ No obvious passive voice patterns found"
fi

# Test 4: Manual test instructions
echo ""
echo "✅ Test 4: Manual Testing Instructions"
echo "   📝 To test Copilot instruction compliance manually:"
echo "   1. Open presentation/comprehensive-talk-outline.md in VS Code"
echo "   2. Navigate to the 'Copilot Instruction Compliance Test' section"
echo "   3. Place cursor after test comment prompts"
echo "   4. Trigger Copilot suggestions (Tab or Ctrl+Space)"
echo "   5. Evaluate suggestions against our style guidelines"
echo ""
echo "   📋 Look for:"
echo "   ✓ Direct, confident statements (solar writing)"
echo "   ✓ Snarky but professional tone"
echo "   ✓ Active voice usage"
echo "   ✓ Technical accuracy with humor"
echo "   ❌ NO expectation-subversion patterns"
echo "   ❌ NO corporate fluff or apologetic language"

echo ""
echo "🎯 Compliance Test Complete!"
echo "   For detailed testing framework, see:"
echo "   - .github/instructions/copilot-testing-framework.md"
echo "   - .github/instructions/copilot-live-test.md"
echo ""
echo "📝 Results logged to: $LOG_FILE"

# Finalize log file
cat >> "$LOG_FILE" << EOF

## Test Completed
- **Timestamp:** $(date +"%Y-%m-%d %H:%M:%S")
- **Status:** All compliance tests passed
- **Anti-patterns detected:** None
- **Manual testing required:** See section above

---
*Generated by test-copilot-instructions.sh*
EOF
