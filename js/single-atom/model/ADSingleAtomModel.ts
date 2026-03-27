// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomModel is the main model class for the "Single Atom" screen.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import { NuclearDecayModelOptions } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayModel, { AlphaDecayModelOptions } from '../../common/model/AlphaDecayModel.js';

type SelfOptions = EmptySelfOptions;

type ADSingleAtomModelOptions = SelfOptions & AlphaDecayModelOptions;

export default class ADSingleAtomModel extends AlphaDecayModel {

  public constructor( providedOptions: ADSingleAtomModelOptions ) {
    const options = optionize<ADSingleAtomModelOptions, SelfOptions, NuclearDecayModelOptions>()( {
      maxNumberOfAtoms: 1
    }, providedOptions );

    super( options );
  }
}
