// Copyright 2026, University of Colorado Boulder
/**
 * Play area for the single atom view of the Alpha Decay simulation.
 *
 * @author Agustín Vallejo
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NuclearDecayAtom from '../../../../nuclear-decay-common/js/common/model/NuclearDecayAtom.js';
import ResetAtomsButton from '../../../../nuclear-decay-common/js/common/view/ResetAtomsButton.js';
import NuclearDecayCommonColors from '../../../../nuclear-decay-common/js/NuclearDecayCommonColors.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ScientificNotationNode from '../../../../scenery-phet/js/ScientificNotationNode.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Circle, { CircleOptions } from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomNameUtils from '../../../../shred/js/AtomNameUtils.js';
import InfinityNode from '../../../../shred/js/view/InfinityNode.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';

type SelfOptions = {
  potentialCircleOptions?: CircleOptions;
};

export type ADSingleAtomPlayAreaNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

export default class ADSingleAtomPlayAreaNode extends Node {

  /**
   *
   * @param model
   * @param boundsProperty - bounds of the play area
   * @param modelViewTransformProperty - mvt to convert coordinates between model and view
   * @param energyIntersectionPointProperty - we need to reference the point at which energy curves intersect,
   *                                          it will define the size of the escape zone
   * @param providedOptions
   */
  public constructor(
    model: ADSingleAtomModel,
    boundsProperty: TReadOnlyProperty<Bounds2>,
    modelViewTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    energyIntersectionPointProperty: TReadOnlyProperty<Vector2>,
    providedOptions?: ADSingleAtomPlayAreaNodeOptions
  ) {
    const options = optionize<ADSingleAtomPlayAreaNodeOptions, EmptySelfOptions, ADSingleAtomPlayAreaNodeOptions>()( {
      accessibleHeading: NuclearDecayCommonFluent.a11y.alphaDecay.radioactiveAtomHeadingStringProperty,
      potentialCircleOptions: {}
    }, providedOptions );

    const elapsedLinearTimeText = new RichText( model.timeProperty.derived(
      t => t > 0 ? toFixed( t, 1 ) : '--'
    ), {
      font: NuclearDecayCommonConstants.CONTROL_FONT,
      visibleProperty: model.timescaleProperty.derived( scale => scale === 'linear' )
    } );

    const elapsedLogTimeText = new ScientificNotationNode( model.timeProperty, {
      font: NuclearDecayCommonConstants.CONTROL_FONT,
      visibleProperty: new DerivedProperty(
        [ model.timescaleProperty, model.isTimeInfiniteProperty ], ( timescale, timeInfinite ) => {
          return timescale === 'exponential' && !timeInfinite;
        }
      ),
      showZeroExponent: true
    } );

    const infinityNode = new InfinityNode( {
      radius: 3,
      lineWidth: 1,
      visibleProperty: model.isTimeInfiniteProperty
    } );

    const unitsText = new RichText( NuclearDecayCommonFluent.secondsStringProperty, {
      font: NuclearDecayCommonConstants.CONTROL_FONT
    } );

    const decayTimeText = new Text( NuclearDecayCommonFluent.decayTimeStringProperty, {
      font: NuclearDecayCommonConstants.CONTROL_BOLD_FONT
    } );

    const decayTimeReadout = new HBox( {
      spacing: 5,
      children: [ decayTimeText, elapsedLinearTimeText, elapsedLogTimeText, infinityNode, unitsText ]
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
        font: NuclearDecayCommonConstants.CONTROL_FONT
      } ),
      baseColor: NuclearDecayCommonColors.setSampleButtonProperty,
      accessibleContextResponse: NuclearDecayCommonFluent.a11y.alphaDecay.addAtomButton.accessibleContextResponse.createProperty( {
        isotope: currentIsotopeNameProperty
      } ),
      listener: () => {
        model.activateAtom();
        this.addAccessibleContextResponse( NuclearDecayCommonFluent.a11y.alphaDecay.addAtomButton.accessibleContextResponse.format( {
          isotope: model.selectedIsotopeProperty.derived( isotope => NuclearDecayAtom.getNameAndMassString(
            isotope, NuclearDecayCommonFluent.isotopeAStringProperty.value ) )
        } ) );
      },
      tandem: options.tandem.createTandem( 'addAtomButton' )
    } );

    const potentialAreaCircle = new Circle( 50, combineOptions<CircleOptions>( {
      stroke: 'black',
      lineWidth: 1,
      lineDash: [ 5, 5 ]
    }, options.potentialCircleOptions ) );
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
          return NuclearDecayCommonFluent.a11y.alphaDecay.atomInPlayArea.nowPresent.format( { isotope: isotopeName, decayTime: decayTimeFormatted } );
        }
        else {
          return NuclearDecayCommonFluent.a11y.alphaDecay.atomInPlayArea.readyToDecay.format( { isotope: isotopeName } );
        }
      }
    );

    const atomDescriptionNode = new Node( {
      accessibleParagraph: atomDescriptionStringProperty,
      visibleProperty: model.isPlayAreaEmptyProperty.derived( isEmpty => !isEmpty )
    } );

    // Create the button for resetting the decay state of the atom.
    const resetDecayButton = new ResetAtomsButton( model.isPlayAreaEmptyProperty, {
      accessibleName: NuclearDecayCommonFluent.a11y.alphaDecay.resetAtomButton.accessibleNameStringProperty,
      accessibleContextResponse: NuclearDecayCommonFluent.a11y.alphaDecay.resetAtomButton.accessibleContextResponseStringProperty,
      listener: () => {
        model.resetTimes();
        model.resetAtoms();
        model.activateAtom();
      },
      tandem: options.tandem.createTandem( 'resetDecayButton' )
    } );

    // Linking the ui components' position to the changing bounds
    boundsProperty.link( bounds => {
      decayTimeReadout.left = bounds.left;
      decayTimeReadout.top = bounds.top;
      resetDecayButton.right = bounds.right;
      resetDecayButton.top = bounds.top;
      addAtomButton.center = bounds.center;
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
          NuclearDecayCommonFluent.a11y.alphaDecay.atomDecay.alphaParticleEmitted.format( { decayTime: decayTime } )
        );
      }
    } );

    options.children = [
      decayTimeReadout,
      addAtomButton,
      potentialAreaCircle,
      atomDescriptionNode,
      resetDecayButton
    ];

    super( options );

    this.pdomOrder = [ addAtomButton, atomDescriptionNode, resetDecayButton ];
  }
}
