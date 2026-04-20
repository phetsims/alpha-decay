// Copyright 2026, University of Colorado Boulder
/**
 * Play area for the single atom view of the Alpha Decay simulation.
 *
 * @author Agustín Vallejo
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import NuclearDecayAtom from '../../../../nuclear-decay-common/js/model/NuclearDecayAtom.js';
import NuclearDecayCommonColors from '../../../../nuclear-decay-common/js/NuclearDecayCommonColors.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import NuclearDecayAtomNode from '../../../../nuclear-decay-common/js/view/NuclearDecayAtomNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import undoSolidShape from '../../../../sherpa/js/fontawesome-5/undoSolidShape.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';

type SelfOptions = EmptySelfOptions;

export type ADSingleAtomPlayAreaNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

export default class ADSingleAtomPlayAreaNode extends Node {
  public constructor(
    model: ADSingleAtomModel,
    bounds: Bounds2,
    modelViewTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    providedOptions?: ADSingleAtomPlayAreaNodeOptions
  ) {
    const options = optionize<ADSingleAtomPlayAreaNodeOptions, EmptySelfOptions, ADSingleAtomPlayAreaNodeOptions>()( {
      // Default options go here
    }, providedOptions );


    // Decay Time label, top-left
    const elapsedTimeStringProperty = new DerivedStringProperty(
      [
        model.timeProperty,
        NuclearDecayCommonFluent.timeSecondsStringProperty
      ], ( time: number, pattern: string ) => {
        const atom = model.atomPool[ 0 ];

        // Show the current time unless the single atom has decayed, in which case we show the decay time.
        const decayTime = atom.decayTime ? atom.decayTime : time;
        return StringUtils.fillIn( pattern, {
          time: time > 0 ? toFixed( decayTime, 1 ) : '--'
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
      left: bounds.left,
      top: bounds.top,
      spacing: 5,
      children: [ decayTimeText, elapsedTimeText ]
    } );

    // Add Atom button — center
    const addAtomButton = new RectangularPushButton( {
      visibleProperty: model.isPlayAreaEmptyProperty,
      content: new Text( NuclearDecayCommonFluent.addAtomStringProperty, {
        font: NuclearDecayCommonConstants.CONTROL_BOLD_FONT
      } ),
      baseColor: NuclearDecayCommonColors.addButtonProperty,

      listener: () => {
        model.activateAtom();
      },
      center: bounds.center,
      tandem: options.tandem.createTandem( 'addAtomButton' )
    } );

    const polonium = NuclearDecayCommonConstants.POLONIUM_211;
    const lead = NuclearDecayCommonConstants.LEAD_207;
    const decayingAtom = new NuclearDecayAtom( polonium, lead );
    const decayingAtomNode = new NuclearDecayAtomNode( decayingAtom, modelViewTransformProperty, {
      center: bounds.center,
      visibleProperty: model.isPlayAreaEmptyProperty.derived( isEmpty => !isEmpty )
    } );

    const potentialAreaCircle = new Circle( 50, {
      stroke: 'black',
      lineWidth: 1,
      lineDash: [ 5, 5 ],
      center: bounds.center,
      visibleProperty: model.isPlayAreaEmptyProperty.derived( isEmpty => !isEmpty )
    } );

    Multilink.multilink(
      [
        model.potentialEnergyProperty, model.initialEnergyProperty
      ], ( potentialEnergy, initialEnergy ) => {
        potentialAreaCircle.radius = 100 * ( potentialEnergy - initialEnergy + 1 ) / 2;
      }
    );

    // Reset button — top-right
    const resetButton = new RectangularPushButton( {
      content: new Path( undoSolidShape, { scale: 0.038, fill: 'black' } ),
      baseColor: NuclearDecayCommonColors.resetButtonProperty,
      listener: () => {
        model.timeProperty.reset();
        model.resetAtoms();
        model.activateAtom();
      },
      right: bounds.right,
      top: bounds.top,
      tandem: options.tandem.createTandem( 'resetButton' )
    } );

    options.children = [
      decayTimeReadout,
      addAtomButton,
      resetButton,
      decayingAtomNode,
      potentialAreaCircle
    ];

    super( options );

  }
}
