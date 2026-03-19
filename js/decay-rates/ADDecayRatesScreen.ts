// Copyright 2026, University of Colorado Boulder

/**
 * The Screen for Decay Rates.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import AlphaDecayFluent from '../AlphaDecayFluent.js';
import AlphaDecayColors from '../common/AlphaDecayColors.js';
import ADDecayRatesModel from './model/ADDecayRatesModel.js';
import ADDecayRatesScreenView from './view/ADDecayRatesScreenView.js';

type SelfOptions = EmptySelfOptions;

type AlphaDecayScreenOptions = SelfOptions & ScreenOptions;

export default class ADDecayRatesScreen extends Screen<ADDecayRatesModel, ADDecayRatesScreenView> {

  public constructor( providedOptions: AlphaDecayScreenOptions ) {

    const options = optionize<AlphaDecayScreenOptions, SelfOptions, ScreenOptions>()( {
      name: AlphaDecayFluent.screen.decayRatesStringProperty,
      backgroundColorProperty: AlphaDecayColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new ADDecayRatesModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new ADDecayRatesScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}
