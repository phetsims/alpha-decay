// Copyright 2026, University of Colorado Boulder

/**
 * The Screen for Single Atom Decay.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import alphaDecay from '../alphaDecay.js';
import AlphaDecayFluent from '../AlphaDecayFluent.js';
import AlphaDecayColors from '../common/AlphaDecayColors.js';
import ADSingleAtomModel from './model/ADSingleAtomModel.js';
import ADSingleAtomScreenView from './view/ADSingleAtomScreenView.js';

type SelfOptions = EmptySelfOptions;

type AlphaDecayScreenOptions = SelfOptions & ScreenOptions;

export default class ADSingleAtomScreen extends Screen<ADSingleAtomModel, ADSingleAtomScreenView> {

  public constructor( providedOptions: AlphaDecayScreenOptions ) {

    const options = optionize<AlphaDecayScreenOptions, SelfOptions, ScreenOptions>()( {
      name: AlphaDecayFluent.screen.singleAtomStringProperty,
      backgroundColorProperty: AlphaDecayColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new ADSingleAtomModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new ADSingleAtomScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

alphaDecay.register( 'ADSingleAtomScreen', ADSingleAtomScreen );
