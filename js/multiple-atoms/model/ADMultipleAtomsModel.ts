// Copyright 2026, University of Colorado Boulder

/**
 * MultipleAtomsModel handles the state and behavior of the Multiple Atoms screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import MultipleAtomDecayModel, { MultipleAtomDecayModelOptions } from '../../../../nuclear-decay-common/js/common/model/MultipleAtomDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayConstants from '../../common/AlphaDecayConstants.js';

type SelfOptions = EmptySelfOptions;

type ADMultipleAtomsModelOptions = SelfOptions & MultipleAtomDecayModelOptions;

export default class ADMultipleAtomsModel extends MultipleAtomDecayModel {

  public constructor( providedOptions: ADMultipleAtomsModelOptions ) {
    const options = optionize<ADMultipleAtomsModelOptions, SelfOptions, MultipleAtomDecayModelOptions>()( {
    }, providedOptions );

    super( AlphaDecayConstants.SELECTABLE_ISOTOPES, options );

    this.selectedIsotopeProperty.setInitialValue( 'polonium-211' );
    this.selectedIsotopeProperty.reset();
  }
}
