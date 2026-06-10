// Copyright 2026, University of Colorado Boulder

/**
 * The Screen for Single Atom Decay.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import createNucleusIconNode from '../../../nuclear-decay-common/js/common/view/createNucleusIconNode.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
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
      homeScreenIcon: createScreenIcon(),
      backgroundColorProperty: AlphaDecayColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new ADSingleAtomModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new ADSingleAtomScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

// Radius of individual nucleon spheres used in the icon, in screen coordinates.
const ICON_NUCLEON_RADIUS = 3;

const createScreenIcon = (): ScreenIcon => {
  return new ScreenIcon( createNucleusIconNode( 84, 127, ICON_NUCLEON_RADIUS ), {
    maxIconWidthProportion: 0.9,
    maxIconHeightProportion: 0.9,
    fill: AlphaDecayColors.screenBackgroundColorProperty
  } );
};
