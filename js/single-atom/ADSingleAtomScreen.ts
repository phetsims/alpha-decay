// Copyright 2026, University of Colorado Boulder

/**
 * The Screen for Single Atom Decay.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Vector2 from '../../../dot/js/Vector2.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import AlphaParticleNode from '../../../nuclear-decay-common/js/common/view/AlphaParticleNode.js';
import createNucleusIconNode from '../../../nuclear-decay-common/js/common/view/createNucleusIconNode.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import Line from '../../../scenery/js/nodes/Line.js';
import Node from '../../../scenery/js/nodes/Node.js';
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

// Radius of individual nucleon spheres used in the nucleus icon, in screen coordinates.
const ICON_NUCLEON_RADIUS = 3;

const createScreenIcon = (): ScreenIcon => {

  // Nucleus scaled down slightly and shifted toward the lower-left
  const nucleusNode = createNucleusIconNode( 84, 127, ICON_NUCLEON_RADIUS );
  nucleusNode.center = new Vector2( -10, 10 );

  // Alpha particle (2 protons + 2 neutrons) positioned in the upper-right
  const alphaParticleNode = new AlphaParticleNode( { nucleonDiameter: 2 * ICON_NUCLEON_RADIUS } );
  alphaParticleNode.center = new Vector2( 32, -22 );

  // Get the coordinate of the middle of the nucleus and ejecta,
  // with the ejecta position a bit scaled so the motion lines show up closer to it
  const middle = Vector2.average( [ nucleusNode.center, alphaParticleNode.center.timesScalar( 1.5 ) ] );

  // Three short diagonal motion lines trailing the alpha particle, going upper-right
  const LINE_HALF_LEN = 6;
  const lineAngle = -Math.PI / 6; // 45° toward upper-right
  const ldx = Math.cos( lineAngle ) * LINE_HALF_LEN;
  const ldy = Math.sin( lineAngle ) * LINE_HALF_LEN;

  const makeMotionLine = ( cx: number, cy: number ): Line => {
    const line = new Line( -ldx, -ldy, ldx, ldy, { stroke: 'black', lineWidth: 0.5 } );
    line.center = new Vector2( cx, cy );
    return line;
  };

  // Three lines stacked along the perpendicular to the motion direction
  const motionLinesNode = new Node( {
    children: [
      makeMotionLine( middle.x, middle.y - 3 ),
      makeMotionLine( middle.x, middle.y ),
      makeMotionLine( middle.x + 6, middle.y )
    ]
  } );

  const iconNode = new Node( { children: [ nucleusNode, motionLinesNode, alphaParticleNode ] } );

  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 0.9,
    maxIconHeightProportion: 0.9,
    fill: AlphaDecayColors.screenBackgroundColorProperty
  } );
};
