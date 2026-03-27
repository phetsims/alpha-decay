// Copyright 2026, University of Colorado Boulder
/**
 * Play area for the single atom view of the Alpha Decay simulation.
 *
 * @author Agustín Vallejo
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import NuclearDecayAtom from '../../../../nuclear-decay-common/js/model/NuclearDecayAtom.js';
import NuclearDecayCommonColors from '../../../../nuclear-decay-common/js/NuclearDecayCommonColors.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import DecayingAtomNode from '../../../../nuclear-decay-common/js/view/DecayingAtomNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import undoSolidShape from '../../../../sherpa/js/fontawesome-5/undoSolidShape.js';
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

    // Decay Time label, top-left
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
      visibleProperty: model.activeAtoms.lengthProperty.derived( length => length === 0 ),
      content: new Text( NuclearDecayCommonFluent.addAtomStringProperty, {
        font: NuclearDecayCommonConstants.CONTROL_BOLD_FONT
      } ),
      baseColor: NuclearDecayCommonColors.addButtonProperty,

      listener: () => {

        // Adds one of the selected isotopes into the model
        model.addAtom();
      },
      centerX: PLAY_AREA_WIDTH / 2,
      centerY: PLAY_AREA_HEIGHT / 2
    } );

    const polonium = NuclearDecayCommonConstants.POLONIUM_211;
    const lead = NuclearDecayCommonConstants.LEAD_207;
    const decayingAtom = new NuclearDecayAtom( polonium, lead );
    const decayingAtomNode = new DecayingAtomNode( decayingAtom, {
      visibleProperty: model.activeAtoms.lengthProperty.derived( length => length !== 0 ),
      centerX: PLAY_AREA_WIDTH / 2,
      centerY: PLAY_AREA_HEIGHT / 2
    } );

    // Reset button — top-right
    const resetButton = new RectangularPushButton( {
      content: new Path( undoSolidShape, { scale: 0.038, fill: 'black' } ),
      baseColor: NuclearDecayCommonColors.resetButtonProperty,
      listener: () => {
        model.activeAtoms.clear();
        model.addAtom();
      },
      right: PLAY_AREA_WIDTH - MARGIN,
      top: MARGIN
    } );

    options.children = [
      decayTimeReadout,
      addAtomButton,
      resetButton,
      decayingAtomNode
    ];

    super( options );

  }
}
