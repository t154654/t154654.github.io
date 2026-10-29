An evaluation number becomes useful only when its object, denominator, and procedure are clear. This note documents distinctions that matter when reading the projects in this portfolio; it does not introduce a new experimental result.

## Data readiness is a prerequisite

For Sentry / AppWorld, **147/147** refers to a data task integrity check. It says that all 147 tasks in that check passed data validation. It does not say that an agent executed or solved those tasks.

An agent success rate would require an evaluated set of agent runs, a success criterion, and a count of tasks meeting that criterion. A data completeness check supplies none of those outcomes on its own.

| Check               | What it can support                                            |
| ------------------- | -------------------------------------------------------------- |
| Data task integrity | Whether task data passes the integrity check                   |
| API adaptation      | Whether the model interface is compatible with the environment |
| Agent evaluation    | Whether agent runs satisfy the task success criterion          |

## Validation and test results answer different questions

The reported best CNN result in the CIFAR-10 project is **72.08% validation accuracy** and **71.34% test accuracy**. These labels belong next to the numbers wherever they appear.

Validation results can inform model selection. Test results should be interpreted in the context of a fixed evaluation procedure. Swapping the labels, reporting only the larger number, or calling both numbers test performance would obscure what was measured.

The supplied summary does not include split details, repeated-run variance, or per-ablation numbers. Those details should remain unspecified until there is an experiment record to support them.

## A small reporting checklist

- Name the measured object: data, interface, candidate equation, or agent run.
- State the denominator and the evaluation criterion.
- Label validation and test splits explicitly.
- Separate completed checks from experiments still in progress.
- Keep missing evidence visible as a limitation instead of filling it with assumptions.

A precise, narrow claim is easier to inspect and build on than a larger claim whose measurement is unclear.
