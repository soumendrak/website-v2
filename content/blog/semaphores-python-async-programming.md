+++
title="Semaphores in Python Async Programming Real-World Use Cases"
date="2024-07-25"
description="Use semaphore to avoid rate limit from OpenAI"
updated="2025-06-10"

[taxonomies]
tags=["python", "async", "semaphore"]


[extra]
og_preview_img="/images/posts/semaphore.webp"
+++

## Context

While doing LLM-as-a-judge for evaluations, I was facing a rate limit issue from OpenAI. This post will explain how to use `asyncio.Semaphore` in Python to manage the rate limit and avoid getting rate limit errors. We will start with the basics of semaphores and then move on to use cases. To directly jump to the code, you can check out the [use case 5](#use-case-5-calling-openai-api).

## Introduction

Managing shared resources and coordinating concurrent operations can be challenging in the world of asynchronous programming. Enter semaphores: a powerful synchronization primitive that can help you control access to limited resources and coordinate between multiple coroutines. This post will explore practical use cases for semaphores in Python's asyncio framework, complete with code examples you can adapt for your projects.


## Setting Up: Semaphores in Python's asyncio

Before we dive into specific use cases, let's quickly look at how to use semaphores in Python's asyncio. The `asyncio.Semaphore` class provides a simple interface for creating and using semaphores:

```python
import asyncio

async def worker(semaphore, name):
    async with semaphore:
        print(f"{name} is working")
        await asyncio.sleep(1)
    print(f"{name} is done")

async def main():
    semaphore = asyncio.Semaphore(2)
    tasks = [asyncio.create_task(worker(semaphore, f"Worker-{i}")) for i in range(4)]
    await asyncio.gather(*tasks)

asyncio.run(main())
```
Output:
```sh
Worker-0 is working
Worker-1 is working
Worker-0 is done
Worker-1 is done
Worker-2 is working
Worker-3 is working
Worker-2 is done
Worker-3 is done
```

In this example, we create a semaphore that allows up to two workers to access a resource simultaneously. The `async with` statement ensures that the semaphore is released even if an exception occurs.

Let's look at real-world use cases where semaphores can save the day.

## Use Case 1: Rate Limiting API Requests

Respecting rate limits is crucial when working with external APIs to avoid being blocked. Semaphores can help you easily control the rate of requests.

```python
import asyncio
import aiohttp

class RateLimitedClient:
    def __init__(self, rate_limit):
        self.semaphore = asyncio.Semaphore(rate_limit)
        self.session = aiohttp.ClientSession()

    async def get(self, url):
        async with self.semaphore:
            async with self.session.get(url) as response:
                return await response.text()

    async def close(self):
        await self.session.close()

async def main():
    client = RateLimitedClient(rate_limit=5)
    urls = [f"https://jsonplaceholder.typicode.com/comments?postId={i}" for i in range(20)]
    
    tasks = [asyncio.create_task(client.get(url)) for url in urls]
    results = await asyncio.gather(*tasks)
    
    await client.close()

asyncio.run(main())
```

In this example, `RateLimitedClient` uses a semaphore to ensure that no more than 5 requests are made concurrently, effectively rate-limiting our API calls.

## Use Case 2: Connection Pool Management

Managing a fixed number of database connections is another great use case for semaphores. Here's a simple example of a connection pool:

```python
import asyncio
import asyncpg

class DatabasePool:
    def __init__(self, dsn, max_connections=5):
        self.dsn = dsn
        self.semaphore = asyncio.Semaphore(max_connections)
        self.pool = None

    async def init_pool(self):
        self.pool = await asyncpg.create_pool(self.dsn)

    async def query(self, sql, *args):
        async with self.semaphore:
            async with self.pool.acquire() as conn:
                return await conn.fetch(sql, *args)

    async def close(self):
        await self.pool.close()

async def main():
    db = DatabasePool("postgresql://user:password@localhost/database")
    await db.init_pool()

    tasks = [db.query("SELECT * FROM users WHERE id = $1", i) for i in range(1, 11)]
    results = await asyncio.gather(*tasks)

    await db.close()

asyncio.run(main())
```

This `DatabasePool` class uses a semaphore to limit the number of concurrent database connections, preventing connection exhaustion.

## Use Case 3: Parallel Data Processing with Resource Constraints

When processing large amounts of data in parallel, you might need to limit the number of concurrent operations due to memory or CPU constraints. Semaphores can help:

```python
import asyncio
import aiofiles

async def process_file(semaphore, filename):
    async with semaphore:
        async with aiofiles.open(filename, 'r') as f:
            content = await f.read()
        # Process the content (e.g., parse JSON, transform data, etc.)
        processed = content.upper()
        async with aiofiles.open(f"processed_{filename}", 'w') as f:
            await f.write(processed)

async def main():
    semaphore = asyncio.Semaphore(5)  # Process up to 5 files concurrently
    files = [f"file_{i}.txt" for i in range(20)]
    tasks = [asyncio.create_task(process_file(semaphore, file)) for file in files]
    await asyncio.gather(*tasks)

asyncio.run(main())
```

This script processes multiple files concurrently but limits the number of files being processed at any given time to 5, preventing excessive memory usage.

## Use Case 4: Implementing a Bounded Producer-Consumer Queue

Semaphores can be used to implement a bounded queue for producer-consumer scenarios:

```python
import asyncio
import random

class BoundedQueue:
    def __init__(self, size):
        self.queue = asyncio.Queue()
        self.size = size
        self.producer_sem = asyncio.Semaphore(size)
        self.consumer_sem = asyncio.Semaphore(0)

    async def put(self, item):
        await self.producer_sem.acquire()
        await self.queue.put(item)
        self.consumer_sem.release()

    async def get(self):
        await self.consumer_sem.acquire()
        item = await self.queue.get()
        self.producer_sem.release()
        return item

async def producer(queue, name):
    for i in range(5):
        item = f"{name}-{i}"
        await queue.put(item)
        print(f"Produced: {item}")
        await asyncio.sleep(random.uniform(0.1, 0.5))

async def consumer(queue, name):
    for _ in range(5):
        item = await queue.get()
        print(f"Consumed: {item} by {name}")
        await asyncio.sleep(random.uniform(0.1, 0.5))

async def main():
    queue = BoundedQueue(size=2)
    producers = [asyncio.create_task(producer(queue, f"P{i}")) for i in range(2)]
    consumers = [asyncio.create_task(consumer(queue, f"C{i}")) for i in range(2)]
    await asyncio.gather(*producers, *consumers)

asyncio.run(main())
```
Output:
```sh
Produced: P0-0
Produced: P1-0
Consumed: P0-0 by C0
Consumed: P1-0 by C1
Produced: P1-1
Consumed: P1-1 by C0
Produced: P0-1
Consumed: P0-1 by C1
Produced: P1-2
Consumed: P1-2 by C0
Produced: P0-2
Consumed: P0-2 by C1
Produced: P0-3
Consumed: P0-3 by C0
Produced: P1-3
Consumed: P1-3 by C0
Produced: P1-4
Consumed: P1-4 by C1
Produced: P0-4
Consumed: P0-4 by C1
```

This `BoundedQueue` class uses two semaphores to ensure that the queue never exceeds its maximum size and that consumers wait when the queue is empty.

## Use Case 5: Calling OpenAI API
```python
import asyncio
import aiohttp
from asyncio import Semaphore
from openai import AsyncOpenAI

# Create a client instance
client = AsyncOpenAI(api_key="your-api-key-here")

# Create a semaphore with a limit of 5 concurrent requests
# Adjust this number based on your API rate limits
semaphore = Semaphore(5)

async def make_api_call(prompt):
    async with semaphore:
        try:
            response = await client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=50
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error making API call: {e}")
            return None

async def process_prompts(prompts):
    tasks = [make_api_call(prompt) for prompt in prompts]
    results = await asyncio.gather(*tasks)
    return results

async def main():
    prompts = [
        "What is the capital of France?",
        "Who wrote Romeo and Juliet?",
        "What is the largest planet in our solar system?",
        # Add more prompts as needed
    ]
    
    results = await process_prompts(prompts)
    
    for prompt, result in zip(prompts, results):
        if result:
            print(f"Prompt: {prompt}")
            print(f"Response: {result}\n")

if __name__ == "__main__":
    asyncio.run(main())
```
To use this code:

1. Make sure you have the latest version of the OpenAI Python library installed:
    ```sh
    pip install -U openai
    ```
2. Replace `"your-api-key-here"` with your actual OpenAI API key.
3. Adjust the `Semaphore(5)` value if needed, based on your specific API rate limits.
4. Run the script.
## Drawbacks
Semaphores are a great way to manage concurrency in async Python, but like any other synchronization primitive, they have drawbacks and limitations. Here are some of the main ones:

1. **Blocking**: Semaphores can block your code, leading to performance issues and even deadlocks. When a semaphore is locked, any task that tries to acquire it will be blocked until it's released. This can lead to a situation where a task is waiting for a resource being held by another task, which is waiting for another resource, and so on.
2. **Starvation**: Semaphores can lead to starvation, where a task cannot acquire a resource because other tasks hold onto it for too long. This can happen if a task holds onto a semaphore for an extended period, preventing other tasks from acquiring it.
3. **Lack of fairness**: Semaphores don't provide any fairness guarantees. This means that if multiple tasks are waiting to acquire a semaphore, there's no guarantee that the task that's been waiting the longest will be the one that acquires it first.
4. **Limited scalability**: Semaphores can become a bottleneck in high-traffic systems. If too many tasks compete for a semaphore, performance issues can occur and slow down the system.
5. **Debugging difficulties**: Semaphores can make debugging more difficult by introducing complex synchronization issues that are hard to understand and reproduce.
6. **Limited support for async/await**: While semaphores can be used with async/await, they don't provide the same support as synchronization primitives like async locks. This can lead to issues with async/await code that's not properly synchronized.
7. **No built-in support for timeouts**: Semaphores don't have built-in support for timeouts, which means that if a task is waiting for a semaphore and it's not released within a certain time, the task will be blocked indefinitely.
8. **No built-in support for cancellation**: Semaphores don't have built-in support for cancellation, which means that if a task is waiting for a semaphore and is canceled, it will still be blocked until the semaphore is released.

To mitigate these drawbacks and limitations, you can use other synchronization primitives like async locks, which provide more advanced features and better support for async/await. You can also use libraries like Trio or Curio, which provide more advanced concurrency features and better support for async/await.

Here's an example of how you can use an async lock instead of a semaphore to manage concurrency in async Python:
```python
import asyncio

async def task1(lock):
    async with lock:
	    # Critical section of code
	    ...
    await asyncio.sleep(1)
    print("Task 1 finished")

async def task2(lock):
    async with lock:
	    # Critical section of code
	    ...
    await asyncio.sleep(2)
    print("Task 2 finished")

async def main():
    lock = asyncio.Lock()
    await asyncio.gather(task1(lock), task2(lock))

asyncio.run(main())
```
In this example, we use an async lock to synchronize access to a critical code section. The async lock provides better support for async/await and doesn't block indefinitely if a task is canceled.

## Best Practices and Common Pitfalls

When using semaphores, keep these tips in mind:

1. Always release acquired semaphores, preferably using `async with` for automatic release.
2. Be cautious of deadlocks when using multiple semaphores.
3. Handle exceptions properly to release semaphores even if an error occurs.
4. Consider using `asyncio.BoundedSemaphore` if you want to prevent accidental over-releasing.

## Conclusion

Semaphores are a powerful tool in the async programmer's toolkit. They can help you manage shared resources, implement rate limiting, control concurrency, and coordinate between producers and consumers. Understanding these use cases and patterns allows you to write more efficient and robust asynchronous Python code.

## Further Reading

- [asyncio Semaphore documentation](https://docs.python.org/3/library/asyncio-sync.html#semaphore)
- [asyncio: We Did It Wrong](https://www.roguelynn.com/words/asyncio-we-did-it-wrong/) - An excellent deep dive into asyncio
- [Python Asyncio: The Complete Guide](https://realpython.com/async-io-python/) - A comprehensive guide to asyncio

## Related Articles

- [Cool Python tricks you are not using, but you should](@/blog/cool-python-tricks-you-are-not-using-but-you-should.md) - Advanced Python programming techniques
- [Cache heavy computation functions with timeout](@/blog/cache-heavy-computation-functions-with-timeout.md) - Performance optimization in Python
- [10 Best Practices for your Python code](@/blog/10-best-practices-for-your-python-code.md) - Python coding standards and best practices
- [10 Python libraries every AI/ML developer should know](@/blog/10-python-libraries-every-aiml-developer-should-know.md) - Essential Python libraries for developers
- [Aggregate code timing in Python](@/blog/aggregate-code-timing-in-python.md) - Measuring code performance in Python
