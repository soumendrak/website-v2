+++
title = "From Naive to Light: The Evolution of RAG Systems"
description = "How Retrieval-Augmented Generation is transforming from simple similarity matching to sophisticated knowledge graphs"
date = "2025-04-10"
updated="2025-06-10"
canonical_url = "https://medium.com/@soumendrak/evolution-of-rags-5a5b996bdd94"

[extra]
social_media_card = "/images/posts/rag-evolution.webp"

[taxonomies]
tags=["AI", "RAG"]

+++

![|700x543](https://miro.medium.com/v2/resize:fit:700/1*joeczo_WjO680VN89dy9aA.png)

Components of an RAG System

- RAG combines information retrieval with text generation, allowing AI systems to access and leverage external knowledge before generating responses.
- It works by first retrieving relevant documents or information from a knowledge base, then using this retrieved context to augment the AI’s generation process

## Naive RAG

![](https://miro.medium.com/v2/resize:fit:700/1*C9fMlA_rrH9dMrihHXAHyQ.png)
- **Naive RAG** is presented as a standard baseline RAG system. It operates by first segmenting the raw text data into smaller chunks. These chunks are then converted into vectorized representations (embeddings) and stored in a vector database.
- When a user poses a query, Naive RAG generates a vector representation of the query and retrieves the text chunks from the vector database that have the highest similarity to the query vector.
- This retrieved information is then used by LLM to generate a response. Naive RAG relies on flat data representations and direct similarity matching of text chunks.

## RQ-RAG

![](https://miro.medium.com/v2/resize:fit:700/1*G2cbSuxOxEtb7W4DSXR7GQ.png)

Refine Queries RAG

- RQ-RAG (Learning to Refine Queries for Retrieval Augmented Generation) approach focuses on improving the search accuracy by refining the initial user query.
- RQ-RAG utilizes the capabilities of an LLM to **decompose the original query into multiple sub-queries.** These sub-queries are designed to be more explicit and leverage techniques like rewriting, decomposition, and disambiguation to better target relevant information in the external knowledge source.

## HyDE RAG

![](https://miro.medium.com/v2/resize:fit:700/1*ErbeUkkJZg2terNdXwwkQA.png)

HyDE based RAG

- In HyDE (Hypothetical Document Embedding) approach, unlike direct retrieval based on query embeddings, an LLM is employed to first generate a hypothetical document that anticipates the would be relevant response to the input query.
- This hypothetical document is then converted into a vector embedding, which is used to retrieve semantically similar text chunks from the vector database.
- The retrieved chunks are subsequently used by the LLM to formulate the final answer. HyDE leverages the LLM’s generative capabilities to guide the retrieval process.

## Graph RAG

![](https://miro.medium.com/v2/resize:fit:700/1*d7BqYJUfSZc2TiTbQdEzkQ.png)
- GraphRAG introduces a graph-based approach to knowledge representation and retrieval.
- GraphRAG uses an LLM to extract entities and relationships from the text corpus, representing them as nodes and edges in a knowledge graph. It also generates descriptions for these graph elements.
- To capture global information, GraphRAG aggregates nodes into communities and produces community reports.
- When handling complex, high-level queries, GraphRAG retrieves information by traversing these communities in the knowledge graph, aiming to gather more comprehensive and interconnected information compared to chunk-based methods.
- GraphRAG focuses on capturing relationships between entities for a more holistic understanding of the data.

## Summary

![](https://miro.medium.com/v2/resize:fit:700/1*BjlLpr2ZHWbOExJeyARfsw.png)

Difference between various RAGs

The key differences lie in how each system handles the external knowledge and the query:

- **NaiveRAG** uses a simple chunking and vector similarity approach.
- **RQ-RAG** refines the query itself to improve retrieval.
- **HyDE** generates a hypothetical document to guide retrieval.
- **GraphRAG** structures the knowledge as a graph and performs retrieval by navigating this structure.


## Enters LightRAG

![](https://miro.medium.com/v2/resize:fit:700/1*Qq0Ly460XMJkIWibKOyliA.png)

Advantages of LightRAG

- The [LightRAG framework](https://arxiv.org/pdf/2410.05779) aims to improve upon these existing methods, particularly by addressing the limitations of flat data representations in systems like NaiveRAG and the potential for fragmented answers due to inadequate contextual awareness in many existing RAG systems.
- LightRAG incorporates graph structures into text indexing and retrieval and uses a **dual-level retrieval system** to enhance comprehensive information retrieval.
- It also focuses on efficient retrieval and rapid adaptation to new data, which are highlighted as crucial aspects not fully addressed before.
- You can check the code repo [here](https://github.com/HKUDS/LightRAG).
![](https://miro.medium.com/v2/resize:fit:700/0*oXJWuCUn_Y8hqSxC.png)
```sh
import os
import asyncio
from lightrag import LightRAG, QueryParam
from lightrag.llm.openai import gpt_4o_mini_complete, gpt_4o_complete, openai_embed
from lightrag.kg.shared_storage import initialize_pipeline_status
from lightrag.utils import setup_logger

setup_logger("lightrag", level="INFO")

async def initialize_rag():
    rag = LightRAG(
        working_dir="data",
        embedding_func=openai_embed,
        llm_model_func=gpt_4o_mini_complete
    )

    await rag.initialize_storages()
    await initialize_pipeline_status()

    return rag

def main():
    # Initialize RAG instance
    rag = asyncio.run(initialize_rag())
    # Insert text
    rag.insert("Your text")

    # Perform naive search
    mode="naive"
    # Perform local search
    mode="local"
    # Perform global search
    mode="global"
    # Perform hybrid search
    mode="hybrid"
    # Mix mode Integrates knowledge graph and vector retrieval.
    mode="mix"

    rag.query(
        "What are the top themes in this story?",
        param=QueryParam(mode=mode)
    )

if __name__ == "__main__":
    main()
```
![](https://miro.medium.com/v2/resize:fit:700/0*Tycg7tsI-CyHwAU-.png)

LightRAG Server UI

## Further Read

- [https://github.com/HKUDS/LightRAG](https://github.com/HKUDS/LightRAG)
- [https://arxiv.org/pdf/2410.05779](https://arxiv.org/pdf/2410.05779)
- [The Hidden Cost of LLM-as-a-Judge](@/blog/llm-evals.md) - Learn about LLM evaluation techniques
- [LLMOps: Introduction](@/blog/llmops-introduction.md) - Understanding LLMOps and RAG deployment
- [Large Language Models History](@/blog/large-language-models-history.md) - Evolution of language models
- [AI Tools](@/blog/ai-tools.md) - Collection of AI and LLM tools
- [ML in Academics vs ML in Production](@/blog/ml-academics-vs-ml-production.md) - Real-world ML implementation