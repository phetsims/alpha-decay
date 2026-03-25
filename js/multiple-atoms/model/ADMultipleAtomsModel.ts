// Copyright 2026, University of Colorado Boulder

/**
 * MultipleAtomsModel handles the state and behavior of the Multiple Atoms screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import { NuclearDecayModelOptions } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayModel, { AlphaDecayModelOptions } from '../../common/model/AlphaDecayModel.js';

type SelfOptions = EmptySelfOptions;

type ADMultipleAtomsModelOptions = SelfOptions & AlphaDecayModelOptions;

export default class ADMultipleAtomsModel extends AlphaDecayModel {

  public constructor( providedOptions: ADMultipleAtomsModelOptions ) {
    const options = optionize<ADMultipleAtomsModelOptions, SelfOptions, NuclearDecayModelOptions>()( {
    }, providedOptions );

    super( options );
  }
}
