// Copyright 2026, University of Colorado Boulder

/**
 * The Screen for Decay Rates.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Shape from '../../../kite/js/Shape.js';
import NuclearDecayCommonColors from '../../../nuclear-decay-common/js/NuclearDecayCommonColors.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Path from '../../../scenery/js/nodes/Path.js';
import AlphaDecayFluent from '../AlphaDecayFluent.js';
import AlphaDecayColors from '../common/AlphaDecayColors.js';
import ADDecayRateModel from './model/ADDecayRateModel.js';
import ADDecayRateScreenView from './view/ADDecayRateScreenView.js';

type SelfOptions = EmptySelfOptions;

type AlphaDecayScreenOptions = SelfOptions & ScreenOptions;

export default class ADDecayRateScreen extends Screen<ADDecayRateModel, ADDecayRateScreenView> {

  public constructor( providedOptions: AlphaDecayScreenOptions ) {

    const options = optionize<AlphaDecayScreenOptions, SelfOptions, ScreenOptions>()( {
      name: AlphaDecayFluent.screen.decayRateStringProperty,
      homeScreenIcon: createScreenIcon(),
      backgroundColorProperty: AlphaDecayColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new ADDecayRateModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new ADDecayRateScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

const createScreenIcon = (): ScreenIcon => {
  const W = 120;
  const H = 80;

  // Exponential decay curve: steep initial drop that levels off toward a horizontal asymptote.
  const curveShape = new Shape()
    .moveTo( 0, 0 )
    .cubicCurveTo( W * 0.1, H, W * 0.5, H, W, H );

  const iconNode = new Node( {
    children: [
      new Path( curveShape, {
        stroke: NuclearDecayCommonColors.undecayedProperty,
        lineWidth: 5,
        lineCap: 'round'
      } )
    ]
  } );

  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 0.9,
    maxIconHeightProportion: 0.85,
    fill: AlphaDecayColors.screenBackgroundColorProperty
  } );
};
