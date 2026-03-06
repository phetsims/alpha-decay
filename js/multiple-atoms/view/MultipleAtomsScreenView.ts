// Copyright 2026, University of Colorado Boulder

/**
 * MultipleAtomsScreenView is responsible for the visual representation of the Multiple Atoms Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import NuclearDecayScreenView, { NuclearDecayScreenViewOptions } from '../../../../nuclear-decay-common/js/view/NuclearDecayScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import alphaDecay from '../../alphaDecay.js';
import MultipleAtomsModel from '../model/MultipleAtomsModel.js';

type SelfOptions = EmptySelfOptions;

type MultipleAtomsScreenViewOptions = SelfOptions & NuclearDecayScreenViewOptions;

export default class MultipleAtomsScreenView extends NuclearDecayScreenView {

  public constructor( model: MultipleAtomsModel, providedOptions: MultipleAtomsScreenViewOptions ) {

    const options = optionize<MultipleAtomsScreenViewOptions, SelfOptions, NuclearDecayScreenViewOptions>()( {
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

alphaDecay.register( 'MultipleAtomsScreenView', MultipleAtomsScreenView );
