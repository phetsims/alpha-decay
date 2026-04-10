// Copyright 2026, University of Colorado Boulder

/**
 * ADDecayRateModel handles the state and behavior of the Decay Rates screen in the Alpha Decay simulation.
 * Tracks decay percentages over time for plotting on the decay rate graph.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import DecayRateModel, { DecayRateModelOptions } from '../../../../nuclear-decay-common/js/model/DecayRateModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayConstants from '../../common/AlphaDecayConstants.js';

type SelfOptions = EmptySelfOptions;

type ADDecayRateModelOptions = SelfOptions & DecayRateModelOptions;

export default class ADDecayRateModel extends DecayRateModel {

  // Current percentage of undecayed atoms (0-1).
  public readonly percentageOfUndecayedProperty: NumberProperty;

  // Current percentage of decayed atoms (0-1).
  public readonly percentageOfDecayedProperty: NumberProperty;

  // Time series data for plotting. Each entry is (time, percentage).
  public readonly undecayedDataPoints: Vector2[] = [];
  public readonly decayedDataPoints: Vector2[] = [];

  public constructor( providedOptions: ADDecayRateModelOptions ) {
    const options = optionize<ADDecayRateModelOptions, SelfOptions, DecayRateModelOptions>()( {
      maxNumberOfAtoms: 1000
    }, providedOptions );

    super( AlphaDecayConstants.SELECTABLE_ISOTOPES, options );

    this.percentageOfUndecayedProperty = new NumberProperty( 1 );
    this.percentageOfDecayedProperty = new NumberProperty( 0 );
  }

  public override step( dt: number ): void {
    super.step( dt );

    const totalAtoms = this.activeAtoms.length;
    if ( totalAtoms > 0 ) {
      const undecayedCount = this.undecayedAtoms.length;
      const percentageUndecayed = undecayedCount / totalAtoms;
      const percentageDecayed = 1 - percentageUndecayed;

      this.percentageOfUndecayedProperty.value = percentageUndecayed;
      this.percentageOfDecayedProperty.value = percentageDecayed;

      // Accumulate data points for the graph lines.
      const time = this.timeProperty.value;
      this.undecayedDataPoints.push( new Vector2( time, percentageUndecayed ) );
      this.decayedDataPoints.push( new Vector2( time, percentageDecayed ) );
    }
  }

  public override reset(): void {
    super.reset();
    this.percentageOfUndecayedProperty.reset();
    this.percentageOfDecayedProperty.reset();
    this.undecayedDataPoints.length = 0;
    this.decayedDataPoints.length = 0;
    this.undecayedDataPoints.push( new Vector2( 0, 1 ) );
    this.decayedDataPoints.push( new Vector2( 0, 0 ) );
  }
}
