+++
title = "Production Readiness Checklist"
description = "A checklist for developers to ensure they are ready for production."
date = "2024-08-04"
updated = "2025-06-10"
[extra]
social_media_card = "/images/posts/production-readiness-checklist.webp"

[taxonomies]
tags=["devops", "python", "aws", "kubernetes"]

+++

I have been working on multiple pojects where I have moved applications from PoC to Production.
These are the checklists I have prepared for myself and my team to ensure we are ready for production.
Here the checklists are in focus as the application is in Python programming language and deployed to AWS via Kubernetes.
Not all of these are mandatory, but they are the ones I have found most useful.

## 1. Alerts & Metrics

- [ ] Are there alerts set up for infrastructure issues (e.g., memory or CPU usage increase, service unavailability)?
- [ ] Are there alerts set up for critical application-specific logic failures?
- [ ] Can we view historical data (past few hours/days) of infrastructure and resource usage?
- [ ] Is there a real-time monitoring dashboard in place?

## 2. Dashboard and SOP

- [ ] Is there an SOP document for handling alerts and known issues?
- [ ] Are there runbooks available for common scenarios?
- [ ] Is there an incident response plan in place?

## 3. On-call mapping and cadence

- [ ] Is there an on-call person mapping for application-level issues?
- [ ] Is there an on-call person mapping for infrastructure-related issues?
- [ ] Is there a defined rotation schedule and escalation policy?

## 4. Deployment

- [ ] Has the appropriate instance type (GPU or CPU) been determined?
- [ ] Has the required server type been specified?
- [ ] Is there multi-availability zone support for failover?
- [ ] Is there support for multiple regions?
- [ ] Is auto-scaling set up (e.g., HPA, Keda) for traffic spikes?
- [ ] Are health checks configured for the server?
- [ ] Have resource limits been defined and documented?
- [ ] Is there a blue-green or canary deployment strategy in place?
- [ ] Is there a defined rollback plan and procedure?

## 5. Observability and tracing

- [ ] Is there a dashboard showing relevant metrics (e.g., request count, HTTP status codes, usage)?
- [ ] Can we trace a single request end-to-end for debugging purposes?
- [ ] Is there a log aggregation and analysis system in place?
- [ ] Is distributed tracing implemented?

## 6. Load tests

- [ ] Has capacity planning been performed to determine the server's load handling capabilities?
- [ ] Are there defined performance benchmarks?
- [ ] Has stress testing been conducted?

## 7. Quality

- [ ] Are there automated unit tests?
- [ ] Are there automated integration tests?
- [ ] Is static code analysis (e.g., complexity checks) performed?
- [ ] Is code coverage measured and at an acceptable level?
- [ ] Are there production sanity test cases?
- [ ] Is there a CI/CD pipeline in place?
- [ ] Are security scans and vulnerability assessments performed regularly?

## 8. Release

- [ ] Is Swagger/OpenAPI documentation available and up-to-date?
- [ ] Is there a versioning system for APIs and releases?
- [ ] Is there an established communication channel for scheduled maintenance?
- [ ] Is there a change management process?
- [ ] Are feature flags used for gradual rollout of new features?

## 9. Disaster Recovery and Business Continuity

- [ ] Are backup and restore procedures in place and tested?
- [ ] Is there a data replication strategy?
- [ ] Have Recovery Time Objective (RTO) and Recovery Point Objective (RPO) been defined?
- [ ] Are regular disaster recovery drills conducted?

## 10. Compliance and Security

- [ ] Is data encrypted at rest and in transit?
- [ ] Are access control and authentication mechanisms in place?
- [ ] Are regular security audits conducted?
- [ ] Does the application comply with relevant industry standards (e.g., GDPR, HIPAA)?

## 11. Documentation

- [ ] Is system architecture documentation available and up-to-date?
- [ ] Is API documentation complete and current?
- [ ] Are operational procedures documented?
- [ ] Is there a comprehensive troubleshooting guide?

## Related Articles

- [Comparing DevOps, DataOps, AIOps, MLOps, and LLMOps](@/blog/comparing-devops-dataops-aiops-mlops-and-llmops-key-differences.md) - Understanding different Ops practices
- [Code Refactoring](@/blog/code-refactoring.md) - Best practices for maintaining clean code
- [10 Best Practices for your Python code](@/blog/10-best-practices-for-your-python-code.md) - Writing maintainable Python code
- [ML in Academics vs ML in Production](@/blog/ml-academics-vs-ml-production.md) - Real-world deployment considerations
- [Optimize Your Python Code](@/blog/optimize-your-python-code.md) - Performance optimization techniques
