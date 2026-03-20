// Copyright 2026, University of Colorado Boulder
/**
 * Model for Alpha Decay, which extends the base NuclearDecayModel with any specific functionality needed for alpha decay.
 *
 * @author Agustín Vallejo
 */

import Property from '../../../../axon/js/Property.js';
import NuclearDecayModel, { ADSelectableIsotopes, ADSelectableIsotopesValues, NuclearDecayModelOptions } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type AlphaDecayModelOptions = SelfOptions & NuclearDecayModelOptions;

export default class AlphaDecayModel extends NuclearDecayModel<ADSelectableIsotopes> {

  public override readonly selectableIsotopes: ADSelectableIsotopes[];

  public override readonly selectedIsotopeProperty: Property<ADSelectableIsotopes>;

  public constructor( providedOptions: AlphaDecayModelOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, AlphaDecayModelOptions>()( {
      // Default options go here
    }, providedOptions );

    super( options );

    this.selectableIsotopes = [ ...ADSelectableIsotopesValues ];

    this.selectedIsotopeProperty = new Property<ADSelectableIsotopes>( 'polonium-211' );
  }
}
