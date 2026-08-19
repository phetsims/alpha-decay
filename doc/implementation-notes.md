# Alpha Decay - Implementation Notes

## File Structure

```
js/
  common/          Base model (AlphaDecayModel) and view (AlphaDecayScreenView)
  single-atom/     Single atom screen (ADSingleAtomModel/ADSingleAtomScreenView)
  multiple-atoms/  Multiple atoms screen (ADMultipleAtomsModel/ADMultipleAtomsScreenView)
  decay-rates/     Decay rates screen (ADDecayRateModel/ADDecayRateScreenView)
```

Alpha Decay is part of the Nuclear Decay Suite of simulations (Alpha Decay, Beta Decay, Radioactive Dating Game), with
shared components declared in the `nuclear-decay-common` repository. 

[We suggest reading those implementation notes first to have a better grasp of the shared components, then you can see the specifics of Alpha Decay here.](https://github.com/phetsims/totality/blob/main/nuclear-decay-common/doc/implementation-notes.md)

Some relevant files for this sim are:

- `ADSingleAtomModel.ts`: Declares the properties related to the energy diagram: Alpha Particle Energy and Potential
    Energy. This one in particular will give birth to `ADSingleAtomModel.ts`, which doesn't do much.
- `EnergyDiagramAccordionBox.ts`: Assembles and wires the first screen's energy diagram. This component has a
  view to model data flow, which is unusual. The reason for this is something called the Intersection Point, which is
  where the potential and alpha-particle energies cross, computed in the view, it will inform the size of the tunneling
  radius of the atom, which is needed back in the model to position the ejected decay particles. All this is disabled if
  the preference Advances Quantum
  Physics is off.

  The diagram's pieces live alongside it in `single-atom/view/`, and the accordion box is the only thing that knows how
  they fit together:

  | File                           | Responsibility                                                                   |
  |--------------------------------|----------------------------------------------------------------------------------|
  | `EnergyDiagramConstants.ts`   | Layout and curve-shape constants, in the diagram's local (inverted-Y) frame.      |
  | `computeEnergyWellGeometry.ts`| Pure math: the well curve `Shape` and the Intersection Point described above.     |
  | `EnergyGrabberNode.ts`        | A draggable energy level (arrow plus guide line); one per adjustable energy.      |
  | `EnergyWellParticleLayer.ts`  | The alpha particles on the graph, their jitter in the well, and their tunneling.  |
  | `PreDecayWellMarkerNode.ts`   | After-decay marker showing where the well bottom used to be.                      |
  | `EnergyDiagramLegendNode.ts`  | The legend.                                                                       |
  | `EnergyDiagramDescriber.ts`   | Accessible (screen reader) description content for the diagram.                   |