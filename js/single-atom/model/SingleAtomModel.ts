// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomModel handles the state and behavior of a single atom in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import NuclearDecayModel from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import alphaDecay from '../../alphaDecay.js';

type SelfOptions = EmptySelfOptions;

type SingleAtomModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class SingleAtomModel extends NuclearDecayModel {

  public constructor( providedOptions: SingleAtomModelOptions ) {
    super( providedOptions );
    // TO BE IMPLEMENTED
  }
}

alphaDecay.register( 'SingleAtomModel', SingleAtomModel );
