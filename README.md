# static-analysis-test

OptiBot test repository — Node.js project with chained jobs (lint -> test -> build).

## Workflow

Workflow (`ci.yml`) with three chained jobs:
- **lint**: checkout, setup-node, npm ci, lint
- **test**: checkout, setup-node, npm ci, test (`needs: [lint]`)
- **build**: checkout, setup-node, npm ci, build (`needs: [test]`)

## Intentional Inefficiencies

| # | Inefficiency | Details |
|---|-------------|---------|
| 1 | No dependency cache | All three jobs run `npm ci` without cache |
| 2 | No concurrency cancellation | Overlapping runs waste resources |
| 3 | Broad triggers | push to main/develop + PR to main, no path filters |
| 4 | Unnecessary needs chain | lint, test, and build are independent but chained sequentially |

## Expected OptiBot Behavior

| Strategy | Detection | Static Analysis | Experiment | Expected Result |
|----------|-----------|----------------|------------|----------------|
| Add dependency cache | Detected | Needs experiment | 3 CI runs | Pass if >=10% improvement |
| Concurrency cancellation | Detected | Sufficient (skip) | Skipped | Auto-pass |
| Trigger narrowing | Detected | Needs experiment | 1 CI run | Pass if CI succeeds |
| Parallelize CI | Detected | Needs experiment | 1 CI run | Fails (YAML anchors bug) |

## Expected Final State

- 4 discoveries
- 1 optimization PR (cache or concurrency)
- Parallelize discovery = failed

