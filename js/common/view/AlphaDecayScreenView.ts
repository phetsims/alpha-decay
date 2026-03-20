// Copyright 2026, University of Colorado Boulder
/**
 * Shared Screen View across the Alpha Decay Sim, defines the generic type for the common screen view.
 *
 * @author Agustín Vallejo
 */

import { ADSelectableIsotopes } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import NuclearDecayScreenView, { NuclearDecayScreenViewOptions } from '../../../../nuclear-decay-common/js/view/NuclearDecayScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayModel from '../model/AlphaDecayModel.js';

type SelfOptions = EmptySelfOptions;

export type AlphaDecayScreenViewOptions = SelfOptions & NuclearDecayScreenViewOptions;

export default class AlphaDecayScreenView extends NuclearDecayScreenView<ADSelectableIsotopes> {
  public constructor( model: AlphaDecayModel, providedOptions: AlphaDecayScreenViewOptions ) {
    const options = optionize<AlphaDecayScreenViewOptions, SelfOptions, NuclearDecayScreenViewOptions>()( {
      // Default options go here
    }, providedOptions );

    super( model, options );
    //nop
  }
}