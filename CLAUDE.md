# CLAUDE.md — alpha-decay

HTML5 simulation of alpha particle decay. **Status**: Under development (v1.0.0-dev.0, not yet published).

## Screens

| Screen | Model | View | Purpose |
|--------|-------|------|---------|
| Single Atom | `ADSingleAtomModel` | `ADSingleAtomScreenView` | Detailed view of one atom decaying; includes energy diagram, equation, particle counts. |
| Multiple Atoms | `ADMultipleAtomsModel` | `ADMultipleAtomsScreenView` | Batch view with stopwatch, add-atom button, visibility toggle. |
| Decay Rates | `ADDecayRateModel` | `ADDecayRateScreenView` | Statistical view with decay rate graph, isotope checkboxes, time probe. |

## Architecture

### Inheritance Chain

```
NuclearDecayModel (nuclear-decay-common)
  └─ AlphaDecayModel (alpha-decay/js/common/)
       ├─ ADSingleAtomModel     (maxNumberOfAtoms: 1)
       ├─ ADMultipleAtomsModel
       └─ ADDecayRateModel      (tracks decay percentages over time)

NuclearDecayScreenView / DecayHistogramScreenView (nuclear-decay-common)
  └─ AlphaDecayScreenView (alpha-decay/js/common/)
       ├─ ADSingleAtomScreenView
       ├─ ADMultipleAtomsScreenView
       └─ ADDecayRateScreenView
```

### Directory Layout

```
js/
├── alpha-decay-main.ts          Entry point
├── alphaDecay.ts                Namespace
├── AlphaDecayFluent.ts          Fluent i18n strings
├── AlphaDecayStrings.ts         String keys
├── common/
│   ├── AlphaDecayModel.ts       Base model restricting isotopes to alpha-decay types (custom, polonium-211)
│   ├── AlphaDecayScreenView.ts  Shared base screen view
│   ├── AlphaDecayConstants.ts
│   ├── AlphaDecayColors.ts
│   └── AlphaDecayQueryParameters.ts
├── single-atom/
│   ├── model/ADSingleAtomModel.ts
│   └── view/ADSingleAtomScreenView.ts, ADSingleAtomPlayAreaNode.ts
├── multiple-atoms/
│   ├── model/ADMultipleAtomsModel.ts
│   └── view/ADMultipleAtomsScreenView.ts
└── decay-rates/
    ├── model/ADDecayRateModel.ts
    └── view/ADDecayRateScreenView.ts
```

## Key Details

- **Selectable isotopes**: `AlphaDecayModel` restricts `SelectableIsotopes` to `'custom'` and `'polonium-211'` (the only alpha-emitting options).
- **Custom mode**: When `selectedIsotopeProperty === 'custom'`, the half-life slider in `DecayTimeHistogramPanel` becomes visible and `selectedHalfLifeProperty` is user-editable.
- **Most view components** live in `nuclear-decay-common` — alpha-decay mostly assembles and configures them per screen.

## Dependencies

- `nuclear-decay-common` — Shared model, view components, constants, colors.
- `shred` — Particle and atom utilities.
- Standard PhET libs: `axon`, `scenery`, `scenery-phet`, `dot`, `sun`, `kite`, `tandem`, `joist`.
