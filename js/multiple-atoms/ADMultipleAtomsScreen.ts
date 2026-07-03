// Copyright 2026, University of Colorado Boulder

/**
 * The Screen for Multiple Atoms Decay.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Vector2 from '../../../dot/js/Vector2.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Shape from '../../../kite/js/Shape.js';
import createNucleusIconNode from '../../../nuclear-decay-common/js/common/view/createNucleusIconNode.js';
import NuclearDecayCommonColors from '../../../nuclear-decay-common/js/NuclearDecayCommonColors.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import Circle from '../../../scenery/js/nodes/Circle.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Path from '../../../scenery/js/nodes/Path.js';
import AlphaDecayFluent from '../AlphaDecayFluent.js';
import AlphaDecayColors from '../common/AlphaDecayColors.js';
import ADMultipleAtomsModel from './model/ADMultipleAtomsModel.js';
import ADMultipleAtomsKeyboardHelpContent from './view/ADMultipleAtomsKeyboardHelpContent.js';
import ADMultipleAtomsScreenView from './view/ADMultipleAtomsScreenView.js';

type SelfOptions = EmptySelfOptions;

type AlphaDecayScreenOptions = SelfOptions & ScreenOptions;

export default class ADMultipleAtomsScreen extends Screen<ADMultipleAtomsModel, ADMultipleAtomsScreenView> {

  public constructor( providedOptions: AlphaDecayScreenOptions ) {

    const options = optionize<AlphaDecayScreenOptions, SelfOptions, ScreenOptions>()( {
      name: AlphaDecayFluent.screen.multipleAtomsStringProperty,
      homeScreenIcon: createScreenIcon(),
      backgroundColorProperty: AlphaDecayColors.screenBackgroundColorProperty,
      screenButtonsHelpText: AlphaDecayFluent.a11y.screens.multipleAtomsScreen.screenButtonsHelpTextStringProperty,
      createKeyboardHelpNode: () => new ADMultipleAtomsKeyboardHelpContent()
    }, providedOptions );

    super(
      () => new ADMultipleAtomsModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new ADMultipleAtomsScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

const PIE_RADIUS = 60;
const MINI_NUCLEON_RADIUS = 3;

// Approximate visual radius of a mini nucleus at MINI_NUCLEON_RADIUS, used for spacing.
const MINI_NUCLEUS_VISUAL_RADIUS = 25;

const createScreenIcon = (): ScreenIcon => {

  // Pie chart: 3/4 decayed (black), 1/4 undecayed (magenta).
  const undecayedBackground = new Circle( PIE_RADIUS, {
    fill: NuclearDecayCommonColors.poloniumColorProperty,
    stroke: 'black',
    lineWidth: 1
  } );
  const decayedArc = new Path(
    new Shape().moveTo( 0, 0 ).arc( 0, 0, PIE_RADIUS, 0, 2 * Math.PI * 0.80 ).lineTo( 0, 0 ).close(),
    { fill: NuclearDecayCommonColors.decayedProperty }
  );
  const pieNode = new Node( { children: [ undecayedBackground, decayedArc ] } );

  // Three small nuclei arranged in a loose triangle to the right of the pie.
  const spacing = MINI_NUCLEUS_VISUAL_RADIUS * 2.4;
  const mini1 = createNucleusIconNode( 84, 127, MINI_NUCLEON_RADIUS );
  const mini2 = createNucleusIconNode( 84, 127, MINI_NUCLEON_RADIUS );
  const mini3 = createNucleusIconNode( 84, 127, MINI_NUCLEON_RADIUS );
  mini1.center = new Vector2( PIE_RADIUS * 1.9, -spacing );
  mini2.center = new Vector2( PIE_RADIUS * 1.9 + spacing * 0.8, 0 );
  mini3.center = new Vector2( PIE_RADIUS * 1.9, spacing );

  const iconNode = new Node( { children: [ pieNode, mini1, mini2, mini3 ] } );
  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 0.9,
    fill: AlphaDecayColors.screenBackgroundColorProperty
  } );
};
