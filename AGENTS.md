# Codex Agent Instructions

This repository hosts a Zola-based static website.

## Guidelines
- Always recheck the diffs before committing.
- Keep changes simple, maintainable, and follow industry best practices.
- Add tests when modifying code. For static content changes, build the site to ensure there are no issues.

## Installation
- Install zola by following the instructions at [Zola's official site](https://www.getzola.org/documentation/getting-started/installation/).

```bash
curl -L -o zola.tar.gz https://github.com/getzola/zola/releases/download/v0.20.0/zola-v0.20.0-x86_64-unknown-linux-gnu.tar.gz
tar xzf zola.tar.gz --overwrite
./zola --version
```
- Install theme using the command:

```bash
git clone https://github.com/welpo/tabi.git themes/tabi
```

## Testing
- Run `zola build` to verify the site compiles successfully.
- Execute any available test suites when applicable and ensure all pass before the final commit.

## Special Notes
- If you are using mermaid diagrams, ensure to use the shortcode format for compatibility with Zola.

```markdown
{% mermaid() %}
mermaid diagram flowchart
{% end %}
```
