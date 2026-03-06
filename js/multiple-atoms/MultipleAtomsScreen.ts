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
import MultipleAtomsModel from './model/MultipleAtomsModel.js';
import MultipleAtomsScreenView from './view/MultipleAtomsScreenView.js';

type SelfOptions = EmptySelfOptions;

type AlphaDecayScreenOptions = SelfOptions & ScreenOptions;

export default class MultipleAtomsScreen extends Screen<MultipleAtomsModel, MultipleAtomsScreenView> {

  public constructor( providedOptions: AlphaDecayScreenOptions ) {

    const options = optionize<AlphaDecayScreenOptions, SelfOptions, ScreenOptions>()( {
      name: AlphaDecayFluent.screen.multipleAtomsStringProperty,
      backgroundColorProperty: AlphaDecayColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new MultipleAtomsModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new MultipleAtomsScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

alphaDecay.register( 'MultipleAtomsScreen', MultipleAtomsScreen );
