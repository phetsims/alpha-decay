// Copyright 2026, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author John
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import AlphaDecayColors from '../common/AlphaDecayColors.js';
import alphaDecay from '../alphaDecay.js';
import AlphaDecayFluent from '../AlphaDecayFluent.js';
import AlphaDecayModel from './model/AlphaDecayModel.js';
import AlphaDecayScreenView from './view/AlphaDecayScreenView.js';

type SelfOptions = {
  //TODO add options that are specific to AlphaDecayScreen here
};

type AlphaDecayScreenOptions = SelfOptions & ScreenOptions;

export default class AlphaDecayScreen extends Screen<AlphaDecayModel, AlphaDecayScreenView> {

  public constructor( providedOptions: AlphaDecayScreenOptions ) {

    const options = optionize<AlphaDecayScreenOptions, SelfOptions, ScreenOptions>()( {
      name: AlphaDecayFluent.screen.nameStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: AlphaDecayColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new AlphaDecayModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new AlphaDecayScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

alphaDecay.register( 'AlphaDecayScreen', AlphaDecayScreen );