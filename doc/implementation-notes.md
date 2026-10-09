# Alpha Decay - Implementation Notes

## File Structure

```
js/
  common/          Constants, query parameters, preferences, and the energy/half-life calculations
  single-atom/     Single atom screen (ADSingleAtomModel/ADSingleAtomScreenView)
  multiple-atoms/  Multiple atoms screen (ADMultipleAtomsModel/ADMultipleAtomsScreenView)
  decay-rate/      Decay rate screen (ADDecayRateModel/ADDecayRateScreenView)
```

There is no Alpha-Decay-wide base model or screen view. Each screen extends its counterpart in
`nuclear-decay-common` directly, so shared behavior belongs there rather than in an intermediate base class here.

Alpha Decay is part of the Nuclear Decay Suite of simulations (Alpha Decay, Beta Decay, Radioactive Dating Game), with
shared components declared in the `nuclear-decay-common` repository. 

[We suggest reading those implementation notes first to have a better grasp of the shared components, then you can see the specifics of Alpha Decay here.](https://github.com/phetsims/totality/blob/main/nuclear-decay-common/doc/implementation-notes.md)

Some relevant files for this sim are:

- `ADSingleAtomModel.ts`: Extends the shared Single Atom model and adds the energy-diagram state: the alpha particle
  energy and the potential energy (the Coulomb barrier height). Both are held as a user-editable custom value plus an
  effective value that follows the selected isotope, so the custom value only takes effect for the custom isotope.
  The energies are in normalized, dimensionless units, and the defaults were chosen empirically to show tunneling
  well for Polonium-211.
- `EnergyDiagramAccordionBox.ts`: Assembles and wires the first screen's energy diagram. This component has a
  view to model data flow, which is unusual. The reason for this is something called the Intersection Point, which is
  where the potential and alpha-particle energies cross, computed in the view, it will inform the size of the tunneling
  radius of the atom, which is needed back in the model to position the ejected decay particles. All this is disabled if
  the preference Advances Quantum
  Physics is off.

  The diagram's pieces live alongside it in `single-atom/view/`, and the accordion box is the only thing that knows how
  they fit together. The two grabber files below are this sim's instance of the shared grabber-pair pattern described
  in the `nuclear-decay-common` implementation notes:

  | File                           | Responsibility                                                                   |
  |--------------------------------|----------------------------------------------------------------------------------|
  | `EnergyDiagramConstants.ts`   | Layout and curve-shape constants, in the diagram's local (inverted-Y) frame.      |
  | `computeEnergyWellGeometry.ts`| Pure math: the well curve `Shape` and the Intersection Point described above.     |
  | `EnergyGrabberArrowNode.ts`   | The draggable arrow itself, an `AccessibleSlider`; one per adjustable energy.     |
  | `EnergyGrabberNode.ts`        | Wraps that arrow with its guide line and owns the pointer dragging for the pair.  |
  | `EnergyWellParticleLayer.ts`  | The alpha particles on the graph, their jitter in the well, and their tunneling.  |
  | `PreDecayWellMarkerNode.ts`   | After-decay marker showing where the well bottom used to be.                      |
  | `EnergyDiagramLegendNode.ts`  | The legend.                                                                       |
  | `EnergyDiagramDescriber.ts`   | Accessible (screen reader) description content for the diagram.                   |

## Query Parameters

When using the `&dev` query parameter, a yellow 'Force Decay' button will show up in the single atom screens.
It is useful for debugging so you don't have to wait for the whole decay duration, which could take ages due to its
random nature.

One public query parameter, `advancedQuantumPhysics` (boolean, default `true`), sets the initial value of the
sim-specific preference of the same name, which controls whether the quantum tunneling features (escape radius, energy
levels, and potential well) show up on screen. It only seeds the preference Property, so the user can still change it
from the Preferences dialog at runtime.