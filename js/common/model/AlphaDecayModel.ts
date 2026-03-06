// Copyright 2026, University of Colorado Boulder
/**
 * Model for Alpha Decay, which extends the base NuclearDecayModel with any specific functionality needed for alpha decay.
 *
 * @author Agustín Vallejo
 */

import NuclearDecayModel, { NuclearDecayModelOptions } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import alphaDecay from '../../alphaDecay.js';

type SelfOptions = EmptySelfOptions;

export type AlphaDecayModelOptions = SelfOptions & NuclearDecayModelOptions;

export default class AlphaDecayModel extends NuclearDecayModel {
  public constructor( providedOptions: AlphaDecayModelOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, AlphaDecayModelOptions>()( {
      // Default options go here
    }, providedOptions );

    super( options );
    //nop
  }
}

alphaDecay.register( 'AlphaDecayModel', AlphaDecayModel );