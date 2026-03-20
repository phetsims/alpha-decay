// Copyright 2026, University of Colorado Boulder

/**
 * DecayRatesScreenView is responsible for the visual representation of the Decay Rates Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayScreenView, { AlphaDecayScreenViewOptions } from '../../common/view/AlphaDecayScreenView.js';
import ADDecayRatesModel from '../model/ADDecayRatesModel.js';

type SelfOptions = EmptySelfOptions;

type ADDecayRatesScreenViewOptions = SelfOptions & AlphaDecayScreenViewOptions;

export default class ADDecayRatesScreenView extends AlphaDecayScreenView {

  public constructor( model: ADDecayRatesModel, providedOptions: AlphaDecayScreenViewOptions ) {

    const options = optionize<ADDecayRatesScreenViewOptions, SelfOptions, AlphaDecayScreenViewOptions>()( {
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
