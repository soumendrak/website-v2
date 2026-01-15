+++
path = "blog/large-language-models-history"
title = "Large Language Models History"
description = "History of Large Language Models (LLMs) and their impact on the field of NLP."
date = "2023-09-13"
updated="2025-06-14"
[extra]
social_media_card = "/images/posts/2023/09/large-language-models-history/llm-history.webp"

[taxonomies]
tags=["nlp", "llm", "languagemodelling", "large-language-models"]
+++

## What are Language Models?

A language model (LM) is a tool that guesses the next word in a given sequence of terms.

## Evolution of Language Models

The development of LMs can be broadly classified into five stages.

1. Rule-based LM
2. Statistical LM
3. Neural LM
4. Pre-Trained LM
5. Large Language Models (LLM)

### Rule-based Language Models

- Grammatical rules of a specific language were used to predict the next word in a sentence.
- E.g., in English `I` will be followed by `am` not `are`, and `They` can be followed by `have` or `are` like these grammatical rules.
- However, there are many exceptions, and handling all the language rules is tricky.

### Statistical Language Models

- In this method, a large set of texts was analyzed, and the word-level probability of a word after a bunch of words was determined statistically.
- How many times does `am` appear after `I` that probability is compared with other words like `are` or `is`.
- In an advanced SLM n-gram model, instead of finding probability from a previous single word, the last bi-gram (two words) and tri-grams (three terms) were used to find the possibility of the next word.
- However, In English, a single word can have multiple meanings based on the context of the sentence. SLM can not able to determine the context of the sentence.

### Neural Language Models

- With Word2Vec (Word to Vector), these models calculate the probability of the following words by neural networks.
- Example: RNN (Recurrent Neural Network), LSTM (Long Short Term Memory)

### Pre-Trained Language Models

- ELMo (Context-aware Word Embedding) and Self-Attention through Transformer architecture raised the performance bar of NLP tasks. Example: BERT and GPT-2
- Models were trained with a large amount of text, and the context awareness increased.

### Large Language Models (LLM)

- There is a thin line between PLM and LLM.
- Scaling model size and training data size of PLMs new emergent abilities of model discovered. Example: ChatGPT, LLaMA, Claude
- LLM is different from PLM broadly in three ways:
  - Emergent abilities
  - Prompting/Conversational Interface
  - To attend the scale, Engineering and Research problems must be solved.

## Related Articles
- [Evolution of RAG Systems](@/blog/2025/04/evolution-rag.md) - Understanding modern LLM architectures
- [LLM Evaluations](@/blog/2025/05/llm-evals.md) - Evaluation strategies for LLMs
- [Vector Embeddings in NLP](@/blog/2022/04/why-do-we-need-vector-embeddings-in-nlp.md) - Understanding embeddings
- [Prompt Engineering](@/blog/2023/03/prompt-engineering.md) - Effective prompt engineering
- [AI Tools](@/blog/2024/07/ai-tools.md) - Useful AI tools and applications

## References

1. [Language Models in Plain English (](https://learning.oreilly.com/library/view/language-models-in/9781098109073/)[oreilly.com](https://oreilly.com)[)](https://learning.oreilly.com/library/view/language-models-in/9781098109073/)
2. [\[2303.18223\] A Survey of Large Language Models (](https://arxiv.org/abs/2303.18223)[arxiv.org](https://arxiv.org)[)](https://arxiv.org/abs/2303.18223)
