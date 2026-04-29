// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomModel is the main model class for the "Single Atom" screen.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import SingleAtomModel, { SingleAtomDecayModelOptions } from '../../../../nuclear-decay-common/js/single-atom/model/SingleAtomModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayConstants from '../../common/AlphaDecayConstants.js';

type SelfOptions = EmptySelfOptions;

type ADSingleAtomModelOptions = SelfOptions & SingleAtomDecayModelOptions;

export default class ADSingleAtomModel extends SingleAtomModel {

  public constructor( providedOptions: ADSingleAtomModelOptions ) {
    const options = optionize<ADSingleAtomModelOptions, SelfOptions, SingleAtomDecayModelOptions>()( {
      maxNumberOfAtoms: 1
    }, providedOptions );

    super( AlphaDecayConstants.SELECTABLE_ISOTOPES, options );

    this.selectedIsotopeProperty.setInitialValue( 'polonium-211' );
    this.selectedIsotopeProperty.reset();
  }
}
