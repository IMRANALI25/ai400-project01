# Software Code Review: Study Notes

---

## Topic Overview

Software code review is a process where developers examine each other's source code to find mistakes, improve quality, and share knowledge. It's like having a fresh pair of eyes look over your work before it becomes part of the final product. This practice helps teams catch bugs early, maintain consistent coding standards, and help developers learn from each other.

---

## 1. Remember - Key Facts & Vocabulary

### Key Terms

- **Code Review**: The process of examining computer source code to find mistakes and improve quality
- **Reviewer**: The person who reads and checks the code for problems
- **Author**: The person who wrote the code being reviewed
- **Pull Request**: A method of submitting code changes for review in version control systems like Git
- **Static Analysis**: Automated tools that check code for problems without running it
- **Linting**: Checking code for style and syntax errors using automated tools
- **Code Smell**: A symptom in the code that might indicate a deeper problem (like long functions or confusing names)
- **Refactoring**: Improving code structure without changing what it does

### Important Facts

- Code review typically happens before code is merged into the main codebase
- Reviews can be done by one person or a team of reviewers
- Modern code reviews often use tools like GitHub, GitLab, or Bitbucket
- The goal is to improve both the code and the developers
- Reviews should focus on important issues, not personal style preferences
- Good reviews are constructive, not critical

### Quick Reference

**Common Code Review Checklist:**
- Does the code work correctly?
- Is it easy to understand?
- Does it follow the team's coding standards?
- Are there any obvious bugs?
- Is the code secure?
- Are there tests?
- Is the documentation clear?

---

## 2. Understand - Core Concepts

### Main Ideas

Code review works on a simple principle: everyone makes mistakes, and fresh eyes catch mistakes that the original author missed. When developers review each other's code, the whole team benefits. The code becomes better, problems are caught early (when they're easier to fix), and team members learn from each other's strengths and weaknesses.

Think of code review like proofreading an essay. You wrote it, so your brain might skip over mistakes because it knows what you meant to say. A classmate reading it for the first time will spot typos, confusing sentences, and logical problems that you missed.

### How It Works

1. **Code is written**: A developer writes new code or makes changes to existing code
2. **Changes are submitted**: The developer creates a pull request or submits their changes
3. **Reviewers examine**: Other developers look through the code line by line
4. **Feedback is given**: Reviewers ask questions, point out problems, and suggest improvements
5. **Changes are made**: The original author fixes the issues or responds to feedback
6. **Code is approved**: Once reviewers are satisfied, the code is merged into the main codebase

### Simple Explanation

Code review is like having a friend check your homework. You might think you answered all the questions correctly, but your friend notices that you misread one question or made a simple math error. They're not trying to be mean—they're helping you get a better grade. In the same way, code reviewers help developers write better code by catching mistakes early.

### Key Points Summary

- Code review catches bugs before they reach users
- It helps maintain consistent code style across a team
- Knowledge spreads when developers see how others solve problems
- Reviews build teamwork and shared responsibility for quality
- Tools like GitHub make it easy to leave comments and discuss code

### Practice Questions (Understand)

1. Explain in your own words why code review is important for software teams.
2. What is the difference between a code review author and a reviewer?
3. How would you describe the purpose of a pull request to someone new to coding?

---

## 3. Apply - Practical Use

### Real-World Examples

1. **Google**: Google has used code review since the company started. Every line of code must be reviewed by at least one other person before it's added to Google's codebase. This practice has helped them maintain high quality across millions of lines of code.

2. **Microsoft**: Microsoft teams use code review as part of their development process. They've found that reviews catch about 60-70% of bugs before code is even tested.

3. **Open Source Projects**: Projects like Linux, Kubernetes, and TensorFlow rely on code review from contributors around the world. Anyone can suggest changes, but experienced reviewers must approve them before they're included.

### How to Conduct a Code Review

1. **Start with the big picture**: Before looking at details, understand what the code is supposed to do. Read the description of the changes.

2. **Look at the code structure**: Does the code make sense? Is it organized well? Are variable and function names clear?

3. **Check for common problems**:
   - Are there any obvious bugs?
   - Does the code handle errors properly?
   - Are there security issues (like checking user input)?
   - Is the code efficient enough?

4. **Test the code**: If possible, run the code to see if it works as expected.

5. **Leave constructive feedback**:
   - Be specific about what needs to change
   - Explain why something is a problem
   - Suggest improvements when possible
   - Ask questions instead of making demands
   - Acknowledge good parts of the code

6. **Follow up**: Check that the author fixed the issues. Approve the changes once you're satisfied.

### Practice Application

**Exercise**: Review this simple code snippet and identify at least 3 issues or improvements:

```python
def calc(x,y):
    return x*y
```

**Possible issues to find**:
- Function name is unclear (calc what?)
- No documentation explaining what it does
- Parameter names are unclear (x and y don't tell you what they represent)
- What if someone passes in text instead of numbers?

**Improved version**:
```python
def calculate_area(length, width):
    """Calculate the area of a rectangle."""
    return length * width
```

### Practice Questions (Apply)

1. How would you approach reviewing a 1000-line code change? What steps would you take?
2. Demonstrate how you would give feedback on a piece of code that has a security issue.
3. Apply the code review checklist to a recent piece of code you wrote. What did you find?

---

## 4. Analyze - Deeper Understanding

### Breaking It Down

Code review has several key components that work together:

**The Human Element**: Code review is fundamentally about people working together. Reviewers need to communicate clearly and kindly. Authors need to be open to feedback. The goal is improvement, not criticism.

**The Technical Element**: Reviewers look for technical problems like bugs, security issues, performance problems, and violations of coding standards. They check that the code does what it's supposed to do and doesn't break existing functionality.

**The Process Element**: Code review works best when it's part of a structured process. There should be clear guidelines about what gets reviewed, how quickly reviews should happen, and what the approval criteria are.

### Comparisons

| Aspect | Code Review | Testing |
|--------|-------------|---------|
| What it finds | Logic errors, style issues, security problems, design flaws | Bugs that cause the program to crash or give wrong results |
| When it happens | Before code is merged | Before or after code is merged |
| Who does it | People (developers) | Can be automated or manual |
| Cost | Time spent reviewing | Time writing tests and running them |
| Benefits | Catches issues tests can't, shares knowledge, improves code quality | Confirms code works, prevents regressions |

**Key insight**: Code review and testing work best together. Testing finds if code doesn't work. Code review finds if code isn't written well.

### Relationships

**Code Review and Team Culture**: Teams that do regular code reviews tend to have better collaboration. Reviews create shared responsibility for code quality. Everyone's code gets reviewed, even senior developers'. This creates a culture of continuous learning.

**Code Review and Development Speed**: It might seem like code review slows down development, and it does add time in the short term. However, catching bugs early actually saves time overall. Bugs found in review are quick to fix. Bugs found in production take much longer to diagnose and repair.

### Patterns and Trends

**Common Code Review Patterns**:
- Small, focused reviews are more effective than large ones (changes under 400 lines get reviewed faster and more thoroughly)
- Reviews with more than 2 reviewers often don't provide additional benefit
- Reviews done quickly (within a few hours) are more effective than delayed reviews
- Teams that use code review have fewer bugs in production

**Code Review Anti-patterns**:
- Rubber stamping (approving without actually reading the code)
- Nitpicking (focusing on minor style issues instead of important problems)
- Delaying reviews (taking days or weeks to complete reviews)
- Harsh feedback (making comments personal instead of focusing on the code)

### Practice Questions (Analyze)

1. What are the parts of an effective code review process? How do they work together?
2. Analyze the relationship between code review and development speed. Does review really slow things down?
3. What patterns do you see in effective code reviews versus ineffective ones?

---

## 5. Evaluate - Critical Thinking

### Strengths and Benefits

**Catches Bugs Early**: Finding bugs during review is much cheaper than finding them in production. A bug found in review might take minutes to fix. The same bug found by a user could take hours or days to track down and fix.

**Knowledge Sharing**: Junior developers learn from senior developers. Senior developers stay aware of all parts of the codebase. Everyone learns new techniques and approaches.

**Consistent Quality**: When all code is reviewed, the whole codebase becomes more consistent. Coding standards are enforced naturally. Bad code patterns are caught before they spread.

**Team Ownership**: Code review creates shared responsibility. The code isn't "my code" or "your code"—it's "our code." Everyone feels responsible for quality.

**Better Design**: Reviewers often suggest better approaches or point out design flaws. The author might be too close to the problem to see alternatives.

### Limitations and Considerations

**Time-Consuming**: Code review takes time. Both the reviewer and author must invest time in the process. For very small changes, the review might take longer than writing the code.

**Can Cause Conflicts**: If feedback isn't delivered well, authors can become defensive. Poor communication in reviews can create tension between team members.

**Not All Issues Are Caught**: Reviewers are human and can miss things. Code review doesn't replace testing—it complements it.

**Can Be Inconsistent**: Different reviewers might focus on different things. One reviewer might care a lot about style, while another focuses on security.

**Potential for Bottlenecks**: If only a few people can approve code, changes can pile up waiting for review.

### Different Perspectives

**Management Perspective**: Code review might seem expensive because it takes developer time. However, the cost of bugs in production (lost users, emergency fixes, damage to reputation) is much higher. Good code review is an investment that pays off.

**Developer Perspective**: Some developers find reviews stressful, especially when they're new. Others appreciate the chance to learn and get feedback. The experience often improves once developers get used to the process and trust their reviewers.

**User Perspective**: Users benefit from code review even though they never see it. Fewer bugs mean more reliable software. Security issues caught in review can't be exploited by attackers.

### Evaluation Criteria

When evaluating code review practices, consider:

- **Effectiveness**: Are meaningful issues being found?
- **Speed**: How quickly are reviews completed?
- **Team Satisfaction**: Do team members find reviews helpful or annoying?
- **Bug Reduction**: Has the number of bugs in production decreased?
- **Knowledge Growth**: Are team members learning and improving over time?

### Practice Questions (Evaluate)

1. What are the pros and cons of making code review mandatory for all changes?
2. Evaluate the effectiveness of code review compared to automated testing. Which is more important?
3. Would you recommend code review for a small startup team with only 2-3 developers? Why or why not?

---

## 6. Create - Innovation & Synthesis

### Project Ideas

1. **Build a Code Review Checklist Tool**: Create a web application that guides reviewers through a checklist tailored to their project. Include different checklists for different types of changes (bug fixes, new features, security updates).

2. **Design a Code Review Training Program**: Create a training program for new developers that teaches them how to give and receive feedback effectively. Include examples of good and bad reviews.

3. **Create a Code Review Metrics Dashboard**: Build a dashboard that tracks review metrics like review time, number of comments, and bug detection rate. Help teams understand their review process better.

### Design Challenge

**Design a code review process for a distributed team with members in different time zones.** Consider:
- How can you avoid delays when reviewers are asleep while authors are working?
- How can you make async communication effective?
- What tools would help distributed teams collaborate better?

### Synthesis Activity

Combine code review with automated tools to create a hybrid approach:
- Automated tools check for style issues, obvious bugs, and security problems
- Human reviewers focus on logic, design, and more complex issues
- Create a system where automated tools flag potential issues for human reviewers to check

### Improvement Opportunities

**Modern code review could be improved by**:
- Better integration with IDEs (showing review comments right in the editor)
- AI-assisted reviews (suggesting likely issues, prioritizing important files)
- Gamification (rewarding thorough reviews, recognizing helpful reviewers)
- Training simulations (practice reviewing code with no real consequences)

**New approaches to try**:
- Pair programming combined with code review (two people coding together, then reviewing each other's work)
- Swarm reviews (multiple people review together in real-time instead of async)
- Rotation systems (everyone reviews everyone else's code, not just senior devs reviewing juniors)

### Practice Questions (Create)

1. Design a code review process for a team where half the developers work remotely and half work in the office.
2. Create a new code review format that combines the speed of automated tools with the insight of human reviewers.
3. Invent a way to make code review more engaging and less tedious for developers.

---

## Practice Questions by Level

### Remember (Recall)
1. What is code review?
2. Who are the two main people involved in a code review?
3. List three common problems that code reviews can find.
4. Define the term "pull request."
5. What is the difference between linting and code review?

### Understand (Explain)
1. Explain why code review is important even if you already test your code.
2. What is the difference between a code review author and a reviewer?
3. How would you describe the purpose of a pull request to someone new to coding?
4. Why do developers often miss mistakes in their own code?
5. Explain how code review helps share knowledge across a team.

### Apply (Use)
1. How would you approach reviewing a 1000-line code change? What steps would you take?
2. Demonstrate how you would give feedback on a piece of code that has a security issue.
3. Apply the code review checklist to a recent piece of code you wrote. What did you find?
4. How would you handle a situation where you don't understand the code you're reviewing?
5. Show how you would prioritize feedback when there are many issues to address.

### Analyze (Examine)
1. What are the parts of an effective code review process? How do they work together?
2. Analyze the relationship between code review and development speed. Does review really slow things down?
3. What patterns do you see in effective code reviews versus ineffective ones?
4. How is code review related to testing? What does each do better than the other?
5. Analyze why small code changes are reviewed more effectively than large ones.

### Evaluate (Judge)
1. What are the pros and cons of making code review mandatory for all changes?
2. Evaluate the effectiveness of code review compared to automated testing. Which is more important?
3. Would you recommend code review for a small startup team with only 2-3 developers? Why or why not?
4. Is it better to have one thorough reviewer or three quick reviewers? Justify your answer.
5. Evaluate this statement: "Code review is the single most effective way to improve software quality."

### Create (Invent)
1. Design a code review process for a team where half the developers work remotely and half work in the office.
2. Create a new code review format that combines the speed of automated tools with the insight of human reviewers.
3. Invent a way to make code review more engaging and less tedious for developers.
4. Design a training program to teach developers how to give constructive feedback.
5. Create a mobile app that makes it easy to review code on the go.

---

## Summary & Key Takeaways

- **Code review is a systematic process** where developers examine each other's code to find mistakes, improve quality, and share knowledge
- **The process involves submission, review, feedback, revision, and approval**—typically using tools like GitHub, GitLab, or Bitbucket
- **Effective code reviews balance technical and human elements**, focusing on important issues while maintaining constructive communication
- **Code review complements testing**: testing finds if code works, review finds if code is well-written
- **Benefits include fewer bugs, consistent quality, knowledge sharing, and team ownership**—outweighing the time investment
- **Best practices include keeping reviews small, providing quick feedback, focusing on important issues, and maintaining kindness**
- **Code review creates a culture of continuous improvement** where everyone learns and everyone's code gets better

---
