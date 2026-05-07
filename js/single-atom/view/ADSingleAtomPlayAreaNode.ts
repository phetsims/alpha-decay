// Copyright 2026, University of Colorado Boulder
/**
 * Play area for the single atom view of the Alpha Decay simulation.
 *
 * @author Agustín Vallejo
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NuclearDecayAtom from '../../../../nuclear-decay-common/js/common/model/NuclearDecayAtom.js';
import NuclearDecayAtomNode from '../../../../nuclear-decay-common/js/common/view/NuclearDecayAtomNode.js';
import NuclearDecayCommonColors from '../../../../nuclear-decay-common/js/NuclearDecayCommonColors.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import undoSolidShape from '../../../../sherpa/js/fontawesome-5/undoSolidShape.js';
import AtomNameUtils from '../../../../shred/js/AtomNameUtils.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import AlphaDecayFluent from '../../AlphaDecayFluent.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';

type SelfOptions = EmptySelfOptions;

export type ADSingleAtomPlayAreaNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

export default class ADSingleAtomPlayAreaNode extends Node {
  public constructor(
    model: ADSingleAtomModel,
    boundsProperty: TReadOnlyProperty<Bounds2>,
    modelViewTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    energyIntersectionPointProperty: TReadOnlyProperty<Vector2>,
    providedOptions?: ADSingleAtomPlayAreaNodeOptions
  ) {
    const options = optionize<ADSingleAtomPlayAreaNodeOptions, EmptySelfOptions, ADSingleAtomPlayAreaNodeOptions>()( {
      accessibleHeading: AlphaDecayFluent.a11y.radioactiveAtomHeadingStringProperty
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

        if ( model.selectedIsotopeProperty.value === 'custom' ) {

          const decayLogTime = toFixed( Math.log10( decayTime ), 1 );
          const exponent = `10<sup>${decayLogTime}</sup>`;
          return StringUtils.fillIn( pattern, {
            time: time > 0 ? exponent : '--'
          } );
        }
        else {
          return StringUtils.fillIn( pattern, {
            time: time > 0 ? toFixed( decayTime, 1 ) : '--'
          } );
        }
      }
    );
    const elapsedTimeText = new RichText( elapsedTimeStringProperty, {
      font: NuclearDecayCommonConstants.CONTROL_FONT
    } );

    const decayTimeText = new Text( NuclearDecayCommonFluent.decayTimeStringProperty, {
      font: NuclearDecayCommonConstants.CONTROL_BOLD_FONT
    } );

    const decayTimeReadout = new HBox( {
      spacing: 5,
      children: [ decayTimeText, elapsedTimeText ]
    } );

    // Isotope name properties used in context responses and atom description — defined here so they are
    // available in addAtomButton's listener below.
    const poloniumNameProperty = AtomNameUtils.getNameAndMass( 84, 127 );
    const leadNameProperty = AtomNameUtils.getNameAndMass( 82, 125 );

    const currentIsotopeNameProperty = new DerivedStringProperty(
      [
        model.selectedIsotopeProperty,
        model.hasDecayOccurredProperty,
        NuclearDecayCommonFluent.isotopeAStringProperty,
        NuclearDecayCommonFluent.isotopeBStringProperty,
        poloniumNameProperty,
        leadNameProperty
      ],
      ( selectedIsotope, hasDecayOccurred, isotopeAName, isotopeBName, poloniumName, leadName ) => {
        if ( selectedIsotope === 'custom' ) {
          return hasDecayOccurred ? isotopeBName : isotopeAName;
        }
        return hasDecayOccurred ? leadName : poloniumName;
      }
    );

    // Add Atom button — center
    const addAtomButton = new RectangularPushButton( {
      visibleProperty: model.isPlayAreaEmptyProperty,
      content: new Text( NuclearDecayCommonFluent.addAtomStringProperty, {
        font: NuclearDecayCommonConstants.CONTROL_BOLD_FONT
      } ),
      baseColor: NuclearDecayCommonColors.addButtonProperty,
      accessibleHelpText: AlphaDecayFluent.a11y.addAtomButton.accessibleHelpTextStringProperty,
      accessibleContextResponse: AlphaDecayFluent.a11y.addAtomButton.accessibleContextResponse.createProperty( {
        isotope: currentIsotopeNameProperty
      } ),
      listener: () => model.activateAtom(),
      tandem: options.tandem.createTandem( 'addAtomButton' )
    } );

    const polonium = NuclearDecayCommonConstants.POLONIUM_211;
    const decayingAtom = new NuclearDecayAtom( polonium, 'alphaDecay' );
    const decayingAtomNode = new NuclearDecayAtomNode( decayingAtom, modelViewTransformProperty, {
      visibleProperty: model.isPlayAreaEmptyProperty.derived( isEmpty => !isEmpty )
    } );

    const potentialAreaCircle = new Circle( 50, {
      stroke: 'black',
      lineWidth: 1,
      lineDash: [ 5, 5 ],
      visibleProperty: model.isPlayAreaEmptyProperty.derived( isEmpty => !isEmpty )
    } );
    energyIntersectionPointProperty.link( point => {
      potentialAreaCircle.radius = point.x;
    } );

    // Atom state description, shown when an atom is in the play area.
    const atomDescriptionStringProperty = new DerivedStringProperty(
      [
        model.isPlayAreaEmptyProperty,
        model.hasDecayOccurredProperty,
        model.lastDecayTimeProperty,
        model.selectedIsotopeProperty,
        currentIsotopeNameProperty
      ],
      ( isPlayAreaEmpty, hasDecayOccurred, lastDecayTime, selectedIsotope, isotopeName ) => {
        if ( isPlayAreaEmpty ) {
          return '';
        }
        const decimalPlaces = selectedIsotope === 'custom' ? 1 : 2;
        const decayTimeFormatted = lastDecayTime !== null ? toFixed( lastDecayTime, decimalPlaces ) : '';
        if ( hasDecayOccurred ) {
          return AlphaDecayFluent.a11y.atomInPlayArea.nowPresent.format( { isotope: isotopeName, decayTime: decayTimeFormatted } );
        }
        else if ( lastDecayTime !== null ) {
          return AlphaDecayFluent.a11y.atomInPlayArea.readyToDecayLastDecay.format( { isotope: isotopeName, decayTime: decayTimeFormatted } );
        }
        else {
          return AlphaDecayFluent.a11y.atomInPlayArea.readyToDecay.format( { isotope: isotopeName } );
        }
      }
    );

    const atomDescriptionNode = new Node( {
      accessibleParagraph: atomDescriptionStringProperty,
      visibleProperty: model.isPlayAreaEmptyProperty.derived( isEmpty => !isEmpty )
    } );

    // Create the button for resetting the decay state of the atom.
    const resetDecayButton = new RectangularPushButton( {
      content: new Path( undoSolidShape, { scale: 0.038, fill: 'black' } ),
      baseColor: NuclearDecayCommonColors.resetButtonProperty,
      accessibleName: AlphaDecayFluent.a11y.resetAtomButton.accessibleNameStringProperty,
      accessibleContextResponse: AlphaDecayFluent.a11y.resetAtomButton.accessibleContextResponseStringProperty,
      listener: () => {
        model.timeProperty.reset();
        model.resetAtomDecayStates();
        model.activateAtom();
      },
      tandem: options.tandem.createTandem( 'resetDecayButton' ),
      enabledProperty: model.isPlayAreaEmptyProperty.derived( empty => !empty )
    } );

    // Linking the ui components' position to the changing bounds
    boundsProperty.link( bounds => {
      decayTimeReadout.left = bounds.left;
      decayTimeReadout.top = bounds.top;
      resetDecayButton.right = bounds.right;
      resetDecayButton.top = bounds.top;
      addAtomButton.center = bounds.center;
      decayingAtomNode.center = bounds.center;
      potentialAreaCircle.center = bounds.center;
    } );

    // Fire two context responses when the atom decays: one describing the decay event,
    // and a hint prompting the user to reset.
    model.hasDecayOccurredProperty.lazyLink( hasDecayOccurred => {
      if ( hasDecayOccurred ) {
        const decayTime = model.lastDecayTimeProperty.value !== null
                          ? toFixed( model.lastDecayTimeProperty.value, 2 )
                          : toFixed( model.timeProperty.value, 2 );
        atomDescriptionNode.addAccessibleContextResponse(
          AlphaDecayFluent.a11y.atomDecay.alphaParticleEmitted.format( { decayTime: decayTime } )
        );
      }
    } );

    options.children = [
      decayTimeReadout,
      addAtomButton,
      resetDecayButton,
      decayingAtomNode,
      potentialAreaCircle,
      atomDescriptionNode
    ];

    super( options );

    this.pdomOrder = [ addAtomButton, atomDescriptionNode, resetDecayButton ];
  }
}
