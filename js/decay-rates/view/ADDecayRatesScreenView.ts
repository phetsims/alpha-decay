// Copyright 2026, University of Colorado Boulder

/**
 * DecayRatesScreenView is responsible for the visual representation of the Decay Rates Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import NuclearDecayScreenView, { NuclearDecayScreenViewOptions } from '../../../../nuclear-decay-common/js/view/NuclearDecayScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import alphaDecay from '../../alphaDecay.js';
import ADDecayRatesModel from '../model/ADDecayRatesModel.js';

type SelfOptions = EmptySelfOptions;

type ADDecayRatesScreenViewOptions = SelfOptions & NuclearDecayScreenViewOptions;

export default class ADDecayRatesScreenView extends NuclearDecayScreenView {

  public constructor( model: ADDecayRatesModel, providedOptions: ADDecayRatesScreenViewOptions ) {

    const options = optionize<ADDecayRatesScreenViewOptions, SelfOptions, NuclearDecayScreenViewOptions>()( {
    }, providedOptions );

    super( model, options );
  }

  /**
   * Resets the view.
   */
  public override reset(): void {
    // TO BE IMPLEMENTED
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    // TO BE IMPLEMENTED
  }
}

alphaDecay.register( 'ADDecayRatesScreenView', ADDecayRatesScreenView );
