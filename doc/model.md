# Alpha Decay - Model

This document is a high-level description of the model used in PhET's *Alpha Decay* simulation.

Alpha decay is modeled as a random process governed by each isotope's half-life: on every time step, each nucleus has
some probability of decaying, derived from that half-life. The sim also includes a simplified representation of the
nuclear potential energy barrier and quantum tunneling that underlies why decay happens at all.

## Nucleus and Decay

A nucleus is described by its *_**atomic number**_* (number of protons, which determines the element) and its
*_**mass number**_* (total number of protons and neutrons, together called *_**nucleons**_*).

In alpha decay, a *_**parent nucleus**_* emits an *_**alpha particle**_* (a helium nucleus made of 2 protons and 2
neutrons) and becomes a *_**daughter nucleus**_* of a different element. The daughter nucleus always has exactly 2
fewer protons and 2 fewer neutrons than the parent; nucleon number and charge are conserved between the parent nucleus
and the alpha particle plus daughter nucleus.

The Single Atom screen keeps one nucleus in the play area at a time. The Multiple Atoms and Decay Rate screens instead
work with many nuclei at once (see Samples, below).

The sim's isotopes are Polonium-211 (the default, available on all 3 screens) and a "Custom" isotope (available on
Single Atom and Multiple Atoms, but not Decay Rate). Custom is a fixed, representative nucleus, not a specific
real-world isotope; only its half-life (and, on the Single Atom screen, its potential energy barrier and alpha
particle energy) can be adjusted.

A nucleus's drawn size is not to real physical (femtometer) scale; it uses a simplified, unitless packing model,
adequate for relative comparisons but not for quantitative measurement. The electron cloud was also ignored in this representation.

## Half-Life

*_**Half-life**_* is the time for half of an identical sample of nuclei to decay. It is a fixed property of an
isotope: it does not change as a sample decays, and it does not depend on how many atoms are in the sample.

Individual decay events are unpredictable. Whether a given nucleus decays is determined by treating each isotope's
half-life as a decay constant, and testing each nucleus against it on every time step:

* decay constant: `λ = ln(2) / halfLife`
* probability of decaying during a short time `Δt`: `P = 1 - e^(-λΔt)`

A large sample of nuclei, each obeying this same random process independently, decays overall at the familiar
exponential rate, even though no individual nucleus can be predicted.

Polonium-211's half-life is about 0.516 seconds, but the displayed value is 0.52 seconds.

For Custom, half-life range depends on the screen. On the Single Atom screen, it ranges from 10⁻³ to 10¹⁹ seconds, and
is tied to the potential energy barrier and alpha particle energy (see below). On the Multiple Atoms screen, it ranges
from 0.2 to 3 seconds, the same timescale as Polonium-211.

## Potential Energy Barrier and Tunneling

A nucleus can be pictured as a potential energy well and barrier: the strong nuclear force holds nucleons together in
a well, while the Coulomb (electrical) repulsion between the alpha particle and the rest of the nucleus creates a
barrier around it. An alpha particle with less energy than the barrier height cannot classically escape, but has some
chance of *_**tunneling**_* through the barrier rather than passing over it.

A full quantum-mechanical tunneling calculation is not used. Instead, half-life is derived from potential energy
barrier height `P` and alpha particle energy `K` (both on a relative scale, not physical energy units like MeV).

The closer the alpha particle's energy gets to the barrier height, the shorter the half-life. This relationship makes
the forbidden zone more pronounced than a linear relationship would.

The sim does not model energy conservation for the decay process itself. Potential energy barrier height and alpha
particle energy are qualitative, relative values, not values derived from (or checked against) any physical energy
calculation. The change in depth of the energy well is equal to the alpha particle energy.

On the Single Atom screen, when Custom is selected, barrier height and alpha particle energy can be adjusted directly, 
and changing either one recalculates the resulting half-life (and vice versa).

An **Advanced Quantum Physics** preference (on by default, Single Atom screen only) shows or hides a potential energy
diagram. When on, a dashed circle around the nucleus marks the distance the alpha particle must tunnel through to
escape, sized by where the alpha particle's energy crosses the barrier; the circle is not the boundary of the nucleus,
and does not itself affect when a decay happens. When off, the diagram is hidden and the alpha particle simply appears
at the center of the nucleus when a decay occurs. For Polonium-211, the forbidden zone is drawn larger than its true
relative size.

## Samples

The Multiple Atoms and Decay Rate screens add a batch of identical nuclei to the play area at once. Every nucleus in
the sample decays independently and randomly according to the same half-life probability described above.

On the Multiple Atoms screen, sample size ranges from 1 to 100 atoms, default 10. Nuclei are spread out on screen
for visual clarity. Their positions have no physical meaning. A stopwatch tracks elapsed time; the fraction of the
original sample remaining is recorded once the half-life is reached.

On the Decay Rate screen, sample size ranges from 1 to 1000 atoms, default 100. Nuclei are drawn as plain spheres with
no ejected-particle animation. A graph plots percentage remaining of the parent isotope (and percentage grown of the
daughter isotope) against time, scaled so that exactly 6 half-lives fit across the graph regardless of the isotope's
actual half-life; half-life markers are shown along the time axis, and a draggable probe reads off percentages at a
chosen time. A "Sort" control arranges the sample into a grid, undecayed atoms first; sorting is for visual clarity
only and does not affect decay timing.

## Time and Reset

Play/pause and step-forward time controls are available on all 3 screens, with a Normal/Slow speed choice on Single
Atom and Multiple Atoms.

Model time is tracked in real seconds, on the same scale as an isotope's actual half-life. For Polonium-211 (and for
Custom on the Multiple Atoms and Decay Rate screens), the displayed timeline spans 0.2 to 3 seconds of model time; at
Normal speed this takes about 15 seconds of real time to traverse (about 37 seconds at Slow speed). On the Single Atom
screen, Custom's much larger half-life range (10⁻³ to 10¹⁹ seconds) is instead traversed on a logarithmic timeline,
using the same Normal/Slow speed choice.

On the Single Atom screen, a "Replay" control, enabled after a decay, rewinds to just before that decay.

Reset, on each screen, restores the default isotope selection and any Custom energy or half-life adjustments, and
clears the current nucleus or sample.



