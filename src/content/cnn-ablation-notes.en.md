An ablation is useful when another reader can identify what changed, what stayed fixed, and which measurement supports the conclusion. This methodological note explains how to document CNN experiments. It does not report additional experiments or new performance results.

## Start with the evidence available

The CIFAR-10 project uses PyTorch and includes CNN and MLP models, Adam and SGD, BatchNorm, and Dropout. Multiple ablation experiments have been completed. The reported best CNN achieved **72.08% validation accuracy** and **71.34% test accuracy**.

The supplied summary does not include individual ablation scores, training epochs, repeated-seed results, or confidence intervals. These two headline numbers therefore cannot establish how much any single component helped. An unreported comparison should remain unreported, rather than becoming an estimated improvement in a results table.

## Make each comparison inspectable

### Define the changed factor

Use a named reference configuration and describe the intended difference before interpreting results. A comparison between a CNN and an MLP changes the model family; it should not be described as isolating one convolutional layer. Optimizer comparisons also need their own hyperparameter settings, since the same numerical learning rate does not necessarily create a comparable training procedure.

The following table is a recording plan, not a table of measured outcomes.

| Factor       | Comparison idea                                                | Evidence to record                                                  |
| ------------ | -------------------------------------------------------------- | ------------------------------------------------------------------- |
| Architecture | Compare CNN and MLP under a stated data and training protocol  | Layer definitions, parameter counts, preprocessing, training budget |
| Optimizer    | Compare Adam and SGD with explicitly reported settings         | Learning rate, schedule, optimizer options, loss and accuracy logs  |
| BatchNorm    | Compare a reference network with a specified BatchNorm variant | Layer placement, other configuration changes, train/eval mode       |
| Dropout      | Compare a reference network with a specified Dropout variant   | Placement, probability, train/eval mode, checkpoint identifier      |

### Keep configuration and measurements together

Record the data split, preprocessing, code version, training configuration, and checkpoint-selection rule alongside each run. Keep both training and validation curves where available. A single final accuracy hides whether training was interrupted or the chosen checkpoint differed between runs; logs make those questions answerable.

This **JSON example is an empty record template**, not an existing run. Unknown values are `null`; accuracy fields should use a documented unit consistently.

```json
{
  "record_type": "template",
  "model": null,
  "optimizer": null,
  "batch_norm": null,
  "dropout_probability": null,
  "seed": null,
  "epochs": null,
  "split_id": null,
  "validation_accuracy": null,
  "test_accuracy": null,
  "checkpoint_path": null,
  "log_path": null
}
```

## Preserve the validation/test boundary

Validation measurements can guide configuration and checkpoint selection. A held-out test set should assess the selected procedure rather than repeatedly guide changes. Report **validation 72.08%** and **test 71.34%** with their labels, not as interchangeable estimates of test performance. Split identifiers and selection rules would make this boundary auditable; they are not supplied in the current summary.

## Gather the next layer of evidence

The next useful addition is the original per-run configuration and metric records, followed by a comparison table containing only recoverable observations. Note any differences that prevent a controlled comparison. Repeated runs with recorded seeds could later characterize variation, and uncertainty estimates could accompany a clearly stated procedure. Neither multi-seed evaluation nor confidence intervals are claimed here. Until that evidence exists, the reported best result supports a bounded project summary, not a component-level causal claim.
