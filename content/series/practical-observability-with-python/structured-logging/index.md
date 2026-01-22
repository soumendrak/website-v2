+++
title = "1: Structured Logging in Python using Loguru"
description = "Why standard text logging is failing you in production, and how switching to structured logging with Loguru is the first step towards true observability."
date = "2026-01-21"

[taxonomies]
tags = ["Python", "Observability", "Logging"]

[extra]
social_media_card = "structured-logging-cover.webp"
og_image = "structured-logging-cover.webp"
+++

![Cover Image](structured-logging-cover.webp)

I am currently reading [Observability Engineering](https://www.oreilly.com/library/view/observability-engineering/9781492076438/) by [Charity Majors](https://charity.wtf) et al. A core concept in the book is treating logs not as text, but as **events**.

Welcome to Part 1 of my series on **Practical Observability with Python**. In this post, we will move from "grep-based debugging" to "query-based observability" by implementing structured logging.

## The Problem: You Can't Query Text

Imagine you are running a production service and need to answer a simple question: *"How many login failures did User 123 have in the last hour?"*

If your logs look like this:

```text
2026-01-21 10:00:01 WARNING:root:User 123 failed to login with error: invalid_password
```

You are stuck. To answer the question, you have to:
1.  Ingest this text line into a system (Splunk, ELK, Datadog).
2.  Write a Regex parser to extract "123" from the message string.
3.  Hope that no developer changes the message to `"Login failed for user: 123"` and breaks your Regex.

This is **brittle**. You are treating your monitoring system as a text search engine, not a database.

## The Solution: Structured Logging

Structured logging means writing logs as **data** (usually JSON), not strings. 

{% mermaid() %}
graph LR
    A[Application Event] --> B{Loguru Logger}
    B -->|Serialize| C[JSON Object]
    C -->|Ingest| D[Observability Backend]
    D -->|Query| E[Dashboard/Alerts]
    style C fill:#f9f,stroke:#333
    style E fill:#ccf,stroke:#333
{% end %}

Instead of a sentence, we want this:

```json
{
  "event": "user_login_failed",
  "user_id": 123,
  "level": "warning",
  "timestamp": "2026-01-21T10:00:00Z",
  "error_type": "invalid_password"
}
```

Now, `user_id` and `error_type` are fields. You don't parse them; you select them.

## The Tool: Loguru

While there are other options like `structlog` (excellent, but steeper learning curve) or `python-json-logger` (basic), we will use [Loguru](https://github.com/Delgan/loguru). It is the most developer-friendly logger in the Python ecosystem, known for its "zero config" philosophy.

### Installation

```bash
uv add loguru
```

### The Code

{{ admonition(icon="info", title="Info", text="All the code snippets are available at [Chapter 1: Code](https://github.com/soumendrak/observability-engineering-series/tree/main/chapters/ch1-structured-logging)") }}

The key change is passing data as **context**, not embedding it in the string.

```python
import sys
import os
from loguru import logger

# 1. Configure for Production (JSON)
# In a real app, you might toggle this with an env var like: 
# if os.getenv("ENV") == "PROD":
logger.remove() # Remove the default human-readable handler
logger.add(sys.stdout, serialize=True)

# 2. Define your event logic
def log_login_failure(user_id: int, error_type: str) -> None:
    # Bind the context variables so they appear as separate JSON keys
    context_logger = logger.bind(user_id=user_id, error_type=error_type)
    
    # Log the event name
    context_logger.warning("user_login_failed")

# 3. Simulate an event
log_login_failure(123, "invalid_password")
```

Running this script outputs (formatted for readability):
```json
{
  "record": {
    "level": {"name": "WARNING", "no": 30},
    "message": "user_login_failed",
    "extra": {"user_id": 123, "error_type": "invalid_password"},
    "time": {"timestamp": 1737482500.123}
  }
}
```

{{ admonition(icon="tip", title="Tip", text="Loguru nests custom fields under `record.extra` by default. Most observability backends (Datadog, Loki) dealing with JSON ingestion will automatically flatten this or allow you to query the nested path easily.") }}

## Operational Considerations

### The Trade-off: Human Readability
Scanning a file full of JSON objects is painful for humans. We accept this trade-off: **we make logs harder to read for humans (raw), so they become easier to read for machines.** 

{{ admonition(icon="tip", title="Tip", text="For local development, keep the pretty-printed colors enabled! Only switch to `serialize=True` in production environments.") }}

{{ admonition(icon="danger", type="warning", title="Security Note", text="Be careful not to log PII (passwords, tokens, emails). Loguru's patch() function can help you scrub sensitive fields before they are serialized. See [Loguru Docs: Patching](https://loguru.readthedocs.io/en/stable/api/logger.html#loguru._logger.Logger.patch).") }}

## The Payoff: Querying Your Logs

You asked: *"How does this help me find login failures?"* Since your logs are now JSON, you can essentially run SQL on them.

### Example: Using `jq` (Command Line)
Great for quick debugging on a server.
```bash
cat app.log | jq 'select(.record.extra.user_id == 123) | .record.message'
```

### Example: SQL-like Query (Datadog/Loki)
In a real observability backend, getting the count is trivial. Note that backends usually flatten the JSON, so `record.extra.user_id` often becomes just `user_id`.

```sql
SELECT count(*) 
FROM logs 
WHERE message = "user_login_failed" 
AND user_id = 123
```

## Why This Matters for AI

In AI applications, tracing cost and quality is critical. You can bind specific AI metrics to every log in a chain:

```python
# Bind context once at the start of a RAG pipeline
rag_logger = logger.bind(
    model="gpt-4o", 
    tokens_in=150, 
    tokens_out=45,
    embedding_latency_ms=120
)

rag_logger.info("llm_response_generated")
```

**What you can graph from this:**
1.  **Cost:** Sum of `tokens_in` + `tokens_out` * cost_per_token.
2.  **Performance:** P99 of `embedding_latency_ms`.
3.  **Trends:** Error rate broken down by `model`.

## Conclusion

![Summary](tldr.webp "Summary card for the post")
*Summary image generated via [Nano Banana](https://gemini.google.com/share/f409f13c25f4)*

Structured logging is the foundation of modern observability. It turns your logs into a dataset that allows you to debug complex production issues in seconds, not hours.

**Next Steps:**
1.  Install `loguru` in your project.
2.  Replace one critical `print()` or `logging.info()` with a structured log.
3.  Check the output JSON in your terminal.

## Resources
*   [Loguru Documentation](https://loguru.readthedocs.io/en/stable/)
*   [Observability Engineering (Book)](https://www.oreilly.com/library/view/observability-engineering/9781492076438/)
*   [12 Factor App: Logs](https://12factor.net/logs)
*   [Chapter 1: Code](https://github.com/soumendrak/observability-engineering-series/tree/main/chapters/ch1-structured-logging)

In the next post, we will look at [**Context Propagation**](@/series/practical-observability-with-python/context-propagation/index.md): how to make sure that `user_id` automatically attaches to every log line in a request, so you don't have to bind it manually every time.
