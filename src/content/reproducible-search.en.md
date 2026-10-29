In symbolic regression, a final expression is only part of an experiment. The candidate-generation process, search choices, and evaluation conditions determine how that expression should be interpreted.

This is a methodological checklist for documenting search experiments. It is not a claim that every item has already been completed in RESTART / LLM-SRBench, and it does not establish a new search method or performance improvement.

## Record the candidate, then its context

A useful candidate record should connect an equation to the conditions under which it was proposed and evaluated. Depending on the experiment, that may include:

- The expression in a consistent representation.
- Allowed operators, variables, and any search constraints.
- Candidate-generation settings and model configuration.
- The evaluation split and numerical fitting procedure.
- The score definition, invalid-expression handling, and stopping rule.

Without this context, two expressions with similar scores may have been produced under different assumptions.

## Treat the search trace as evidence

For a tree-based search, logs can connect parent states, proposed candidates, evaluation results, and selection decisions. MCTS-related exploration introduces additional choices that should be recorded rather than inferred from the final tree.

Motif-level structural evidence can help describe recurring expression patterns. A recurring structure alone does not demonstrate a causal benefit, a new algorithm, or improved generalization. Those claims require a comparison designed to test them.

## Separate repeatability from a good score

A repeatable run needs enough information to reconstruct the environment and procedure. A good score needs a clearly defined evaluation. Neither one automatically supplies the other.

For a future reproducibility record, a compact structure could be:

```text
experiment/
  configuration
  environment-summary
  candidate-records
  search-trace
  evaluation-summary
```

This is an illustrative organization, not an inventory of released project artifacts. Private prompts, code, credentials, and datasets should be reviewed before any record is shared.

## Report the boundary of the result

An ongoing exploration can report what was tested, what was observed, and what remains uncertain. Search logs and reproducibility checks make those boundaries easier to inspect; they do not replace a controlled experiment.
