# Alpha Decay - Implementation Notes

## File Structure

```
js/
  common/          Base model (AlphaDecayModel) and view (AlphaDecayScreenView)
  single-atom/     Single atom screen (ADSingleAtomModel/ADSingleAtomScreenView)
  multiple-atoms/  Multiple atoms screen (ADMultipleAtomsModel/ADMultipleAtomsScreenView)
  decay-rates/     Decay rates screen (ADDecayRateModel/ADDecayRateScreenView)
```

Most view components live in `nuclear-decay-common`; alpha-decay assembles and configures them per screen.

## PhET-iO Serialization

`NuclearDecayModel` uses **reference type serialization**, it is a `PhetioObject` that persists for the lifetime of
the sim. Its `NuclearDecayModelIO` defines `applyState` to restore mutable state onto the existing instance.

`NuclearDecayAtom` uses **data type serialization**, it is *not* a `PhetioObject` and is instead serialized as part of
the parent model's aggregate state. `NuclearDecayAtomIO` defines `fromStateObject` to create new atom instances from
serialized data. The model's `applyState` then uses `atom.set()` to copy the deserialized values into the existing
pool atoms, or pushes new instances into `decayedAtoms`.

The atom arrays (`atomPool`, `decayedAtoms`) are wrapped in `ReferenceArrayIO( NuclearDecayAtomIO )`.

See the [PhET-iO serialization docs](https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization)
for full details on data type vs reference type serialization.

## Model

TODO

## View

TODO
