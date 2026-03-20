// Copyright 2026, University of Colorado Boulder

/**
 * MultipleAtomsModel handles the state and behavior of the Multiple Atoms screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import { NuclearDecayModelOptions } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import AlphaDecayModel from '../../common/model/AlphaDecayModel.js';

type SelfOptions = EmptySelfOptions;

type ADMultipleAtomsModelOptions = SelfOptions & NuclearDecayModelOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class ADMultipleAtomsModel extends AlphaDecayModel {

  public constructor( providedOptions: ADMultipleAtomsModelOptions ) {
    const options = optionize<ADMultipleAtomsModelOptions, SelfOptions, NuclearDecayModelOptions>()( {
    }, providedOptions );

    super( options );
  }
}
