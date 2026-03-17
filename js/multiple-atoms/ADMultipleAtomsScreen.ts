// Copyright 2026, University of Colorado Boulder

/**
 * The Screen for Multiple Atoms Decay.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import alphaDecay from '../alphaDecay.js';
import AlphaDecayFluent from '../AlphaDecayFluent.js';
import AlphaDecayColors from '../common/AlphaDecayColors.js';
import ADMultipleAtomsModel from './model/ADMultipleAtomsModel.js';
import ADMultipleAtomsScreenView from './view/ADMultipleAtomsScreenView.js';

type SelfOptions = EmptySelfOptions;

type AlphaDecayScreenOptions = SelfOptions & ScreenOptions;

export default class ADMultipleAtomsScreen extends Screen<ADMultipleAtomsModel, ADMultipleAtomsScreenView> {

  public constructor( providedOptions: AlphaDecayScreenOptions ) {

    const options = optionize<AlphaDecayScreenOptions, SelfOptions, ScreenOptions>()( {
      name: AlphaDecayFluent.screen.multipleAtomsStringProperty,
      backgroundColorProperty: AlphaDecayColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new ADMultipleAtomsModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new ADMultipleAtomsScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

alphaDecay.register( 'ADMultipleAtomsScreen', ADMultipleAtomsScreen );
