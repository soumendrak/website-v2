+++
title = "Why do we need vector embeddings in NLP?"
description = "Why do we need vector embeddings in NLP?"
date = "2022-04-06"
updated = "2025-06-14"
[extra]
social_media_card = "/images/posts/why-do-we-need-vector-embeddings-in-nlp.webp"

[taxonomies]
tags=["interview", "artificial-intelligence", "machine-learning", "nlp", "technical-interview"]

+++

- Most ML algorithms can only take low-dimensional numerical data as inputs. Why? → Faster for computation.
- That means we must transform non-numeric variables (ex. items and users) into numbers and vectors.
- We could try to represent items by numerical values as it is, however, neural networks treat numerical inputs as continuous variables. That means higher numbers have greater significance than lower numbers.
- It also sees numbers that are similar as being similar items. This makes perfect sense for a field like “age” but is nonsensical when the numbers represent a categorical variable.

- [One-hot encoding](https://www.educative.io/blog/one-hot-encoding) works in turning a category into a set of continuous variables, but we literally end up with a huge vector of 0s with a single or a handful of 1’s (Sparse Vectors), creates an unmanageable number of dimensions.
- Since each item is technically equidistant in vector space, it omits context around similarity. As a result, we have no way of evaluating the relationship between the two entities.
- We could generate more one-to-one mappings, or attempt to group them and look for similarities. This requires extensive work and manual labeling that’s typically infeasible.
- Embeddings are dense (no/fewer 0s) numerical representations of real-world objects and relationships, expressed as a vector.
- The vector space quantifies the semantic similarity between categories. Embedding vectors that are close to each other are considered similar.
- Sometimes, they are used directly for the “Similar items to this” section in an e-commerce store. Other times, embeddings are passed to other models. In those cases, the model can share learnings across similar items rather than treating them as two completely unique categories, as is the case with one-hot encodings.
- For this reason, embeddings can be used to accurately represent sparse data like clickstreams, text, and e-commerce purchases as features to downstream models.
- On the other hand, embeddings are much more expensive to compute than one-hot encodings and are far less interpretable.

## Related Articles

- [From Naive to Light: The Evolution of RAG Systems](@/blog/evolution-rag.md) - Understanding modern NLP architectures
- [Evolution of RAG Systems](@/blog/evolution-rag.md) - Modern LLM architectures
- [LLM Evaluations](@/blog/llm-evals.md) - Evaluation strategies for LLMs
- [Large Language Models History](@/blog/large-language-models-history.md) - Evolution of LLMs
- [10 Python Libraries for AI/ML](@/blog/10-python-libraries-every-aiml-developer-should-know.md) - Essential ML libraries
- [ML in Academics vs Production](@/blog/ml-academics-vs-ml-production.md) - Real-world ML deployment

## References

- [Definitive guide to Embeddings](https://www.featureform.com/post/the-definitive-guide-to-embeddings)

You can contact me over [LinkedIn](https://www.linkedin.com/in/soumendrak/) or [Twitter](https://twitter.com/soumendrak_).
