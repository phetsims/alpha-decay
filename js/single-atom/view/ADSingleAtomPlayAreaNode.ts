// Copyright 2026, University of Colorado Boulder
/**
 * Play area for the single atom view of the Alpha Decay simulation.
 *
 * @author Agustín Vallejo
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import nuclearDecayCommon from '../../../../nuclear-decay-common/js/nuclearDecayCommon.js';
import NuclearDecayCommonColors from '../../../../nuclear-decay-common/js/NuclearDecayCommonColors.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ResetShape from '../../../../scenery-phet/js/ResetShape.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ShredColors from '../../../../shred/js/ShredColors.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';

type SelfOptions = EmptySelfOptions;

export type ADSingleAtomPlayAreaNodeOptions = SelfOptions & NodeOptions;

// Play area dimensions
const PLAY_AREA_WIDTH = 750;
const PLAY_AREA_HEIGHT = 200;
const MARGIN = 10;

export default class ADSingleAtomPlayAreaNode extends Node {
  public constructor( model: ADSingleAtomModel, providedOptions?: ADSingleAtomPlayAreaNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, ADSingleAtomPlayAreaNodeOptions>()( {
      // Default options go here
    }, providedOptions );

    // Decay Time label — top-left
    const elapsedTimeStringProperty = new DerivedStringProperty(
      [
        model.timeProperty,
        NuclearDecayCommonFluent.timeSecondsStringProperty
      ], ( time: number, pattern: string ) => {
        return StringUtils.fillIn( pattern, {
          time: time > 0 ? toFixed( time, 1 ) : '--'
        } );
      }
    );
    const elapsedTimeText = new Text( elapsedTimeStringProperty, {
      font: NuclearDecayCommonConstants.CONTROL_FONT
    } );

    const decayTimeText = new Text( NuclearDecayCommonFluent.decayTimeStringProperty, {
      font: NuclearDecayCommonConstants.CONTROL_BOLD_FONT
    } );

    const decayTimeReadout = new HBox( {
      left: MARGIN,
      top: MARGIN,
      spacing: 5,
      children: [ decayTimeText, elapsedTimeText ]
    } );

    // Add Atom button — center
    const addAtomButton = new RectangularPushButton( {
      visibleProperty: model.decayingIsotopeProperty.derived( isotope => !isotope ), // only show when there is no isotope in the model
      content: new Text( NuclearDecayCommonFluent.addAtomStringProperty, {
        font: NuclearDecayCommonConstants.CONTROL_BOLD_FONT
      } ),
      baseColor: NuclearDecayCommonColors.addButtonProperty,

      listener: () => {

        // Adds one of the selected isotopes into the model
        model.addIsotope();
      },
      centerX: PLAY_AREA_WIDTH / 2,
      centerY: PLAY_AREA_HEIGHT / 2
    } );

    // TODO: This should use Shred's built in AtomNode creator. https://github.com/phetsims/alpha-decay/issues/3
    const SPHERE_DIAMETER = 20;
    const PARTICLE_OFFSET = 0.7 * SPHERE_DIAMETER; // how far apart the particles are in the icon
    const alphaParticleIcon = new Node( {
      visibleProperty: model.decayingIsotopeProperty.derived( isotope => isotope !== null ),
      children: [
        new ShadedSphereNode( SPHERE_DIAMETER, { mainColor: ShredColors.protonColorProperty, x: 0, y: 0 } ),
        new ShadedSphereNode( SPHERE_DIAMETER, { mainColor: ShredColors.neutronColorProperty, x: PARTICLE_OFFSET, y: 0 } ),
        new ShadedSphereNode( SPHERE_DIAMETER, { mainColor: ShredColors.neutronColorProperty, x: 0, y: PARTICLE_OFFSET } ),
        new ShadedSphereNode( SPHERE_DIAMETER, { mainColor: ShredColors.protonColorProperty, x: PARTICLE_OFFSET, y: PARTICLE_OFFSET } )
      ],
      centerX: PLAY_AREA_WIDTH / 2,
      centerY: PLAY_AREA_HEIGHT / 2
    } );

    // Reset button — top-right
    const BUTTON_RADIUS = 18;
    const resetButton = new RectangularPushButton( {
      content: new Path( new ResetShape( BUTTON_RADIUS, false ), { fill: 'black', rotation: Math.PI } ),
      baseColor: NuclearDecayCommonColors.resetButtonProperty,
      listener: () => {
        model.decayingIsotopeProperty.value = null;
      },
      right: PLAY_AREA_WIDTH - MARGIN,
      top: MARGIN
    } );

    options.children = [
      decayTimeReadout,
      addAtomButton,
      resetButton,
      alphaParticleIcon
    ];

    super( options );

  }
}

nuclearDecayCommon.register( 'ADSingleAtomPlayAreaNode', ADSingleAtomPlayAreaNode );
