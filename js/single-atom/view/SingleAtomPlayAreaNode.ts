// Copyright 2026, University of Colorado Boulder
/**
 * Play area for the single atom view of the Alpha Decay simulation.
 *
 * @author Agustín Vallejo
 */

import nuclearDecayCommon from '../../../../nuclear-decay-common/js/nuclearDecayCommon.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ResetButton from '../../../../scenery-phet/js/buttons/ResetButton.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ShredColors from '../../../../shred/js/ShredColors.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import SingleAtomModel from '../model/SingleAtomModel.js';

type SelfOptions = EmptySelfOptions;

export type SingleAtomPlayAreaNodeOptions = SelfOptions & NodeOptions;

// Play area dimensions
const PLAY_AREA_WIDTH = 600;
const PLAY_AREA_HEIGHT = 200;
const MARGIN = 10;

export default class SingleAtomPlayAreaNode extends Node {
  public constructor( model: SingleAtomModel, providedOptions?: SingleAtomPlayAreaNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, SingleAtomPlayAreaNodeOptions>()( {
      // Default options go here
    }, providedOptions );

    // Decay Time label — top-left
    const decayTimeText = new Text( NuclearDecayCommonFluent.decayTimeStringProperty, {
      font: NuclearDecayCommonConstants.CONTROL_BOLD_FONT,
      left: MARGIN,
      top: MARGIN
    } );

    // Add Atom button — center
    const addAtomButton = new RectangularPushButton( {
      visibleProperty: model.decayingIsotopeProperty.derived( isotope => !isotope ), // only show when there is no isotope in the model
      content: new Text( NuclearDecayCommonFluent.addAtomStringProperty, {
        font: NuclearDecayCommonConstants.CONTROL_FONT
      } ),
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
    const resetButton = new ResetButton( {
      listener: () => {
        model.decayingIsotopeProperty.value = null;
      },
      radius: 18,
      right: PLAY_AREA_WIDTH - MARGIN,
      top: MARGIN
    } );

    options.children = [
      decayTimeText,
      addAtomButton,
      resetButton,
      alphaParticleIcon
    ];

    super( options );

  }
}

nuclearDecayCommon.register( 'SingleAtomPlayAreaNode', SingleAtomPlayAreaNode );
