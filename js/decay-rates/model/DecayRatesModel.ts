// Copyright 2026, University of Colorado Boulder

/**
 * DecayRatesModel handles the state and behavior of the Decay Rates screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import NuclearDecayModel from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import alphaDecay from '../../alphaDecay.js';

type SelfOptions = EmptySelfOptions;

type DecayRatesModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class DecayRatesModel extends NuclearDecayModel {

  public constructor( providedOptions: DecayRatesModelOptions ) {
    super( providedOptions );
    // TO BE IMPLEMENTED
  }
}

alphaDecay.register( 'DecayRatesModel', DecayRatesModel );
