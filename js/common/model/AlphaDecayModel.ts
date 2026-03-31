// Copyright 2026, University of Colorado Boulder
/**
 * Model for Alpha Decay, which extends the base NuclearDecayModel with any specific functionality needed for alpha decay.
 *
 * @author Agustín Vallejo
 */

import NuclearDecayModel, { NuclearDecayModelOptions } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = EmptySelfOptions;

// Selectable isotopes in alpha-decay
export const ADSelectableIsotopesValues = [ 'custom', 'polonium-211' ] as const;
export type ADSelectableIsotopes = ( typeof ADSelectableIsotopesValues )[ number ];

export type AlphaDecayModelOptions = SelfOptions & NuclearDecayModelOptions;

export default class AlphaDecayModel extends NuclearDecayModel {

  public override readonly selectableIsotopes: ADSelectableIsotopes[];

  public constructor( providedOptions: AlphaDecayModelOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, AlphaDecayModelOptions>()( {
      tandem: Tandem.REQUIRED
    }, providedOptions );

    super( options );

    this.selectableIsotopes = [ ...ADSelectableIsotopesValues ];
  }
}
