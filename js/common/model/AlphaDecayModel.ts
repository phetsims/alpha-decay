// Copyright 2026, University of Colorado Boulder
/**
 * Model for Alpha Decay, which extends the base NuclearDecayModel with any specific functionality needed for alpha decay.
 *
 * @author Agustín Vallejo
 */

import Property from '../../../../axon/js/Property.js';
import NuclearDecayModel, { NuclearDecayModelOptions, SelectableIsotopes } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = EmptySelfOptions;

// Selectable isotopes in alpha-decay
export const ADSelectableIsotopesValues = [ 'custom', 'polonium-211' ] as const;
export type ADSelectableIsotopes = ( typeof ADSelectableIsotopesValues )[ number ];

export type AlphaDecayModelOptions = SelfOptions & NuclearDecayModelOptions;

export default class AlphaDecayModel extends NuclearDecayModel {

  public override readonly selectableIsotopes: ADSelectableIsotopes[];

  public override readonly selectedIsotopeProperty: Property<SelectableIsotopes>;

  public constructor( providedOptions: AlphaDecayModelOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, AlphaDecayModelOptions>()( {
      tandem: Tandem.REQUIRED
    }, providedOptions );

    super( options );

    this.selectableIsotopes = [ ...ADSelectableIsotopesValues ];

    this.selectedIsotopeProperty = new Property<SelectableIsotopes>( 'polonium-211' );

    this.selectedIsotopeProperty.link( selectedIsotope => {
      if ( selectedIsotope !== 'custom' ) {
        this.selectedHalflifeProperty.value = NuclearDecayModel.getHalfLife( selectedIsotope );
      }
    } );
  }
}
