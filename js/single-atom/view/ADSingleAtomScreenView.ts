// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomScreenView is responsible for the visual representation of the Single Atom Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import EnergyDiagramAccordionBox from '../../../../nuclear-decay-common/js/single-atom/view/EnergyDiagramAccordionBox.js';
import SingleAtomScreenView, { SingleAtomScreenViewOptions } from '../../../../nuclear-decay-common/js/single-atom/view/SingleAtomScreenView.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Line, { LineOptions } from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import AlphaDecayFluent from '../../AlphaDecayFluent.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';
import ADSingleAtomPlayAreaNode from './ADSingleAtomPlayAreaNode.js';
import ADSingleAtomScreenSummaryContent from './ADSingleAtomScreenSummaryContent.js';

type SelfOptions = EmptySelfOptions;

type ADSingleAtomScreenViewOptions = SelfOptions & SingleAtomScreenViewOptions;

export default class ADSingleAtomScreenView extends SingleAtomScreenView {

  public constructor( model: ADSingleAtomModel, providedOptions: SingleAtomScreenViewOptions ) {

    const options = optionize<ADSingleAtomScreenViewOptions, SelfOptions, SingleAtomScreenViewOptions>()( {
      screenSummaryContent: new ADSingleAtomScreenSummaryContent( model )
    }, providedOptions );

    super( model, options );

    // Bottom-left panel: sized to fit between the screen's left edge and the time controls on the bottom-right.
    const energyDiagramBounds = new Bounds2(
      this.layoutBounds.minX + NuclearDecayCommonConstants.SCREEN_VIEW_X_MARGIN,
      0,
      this.decayTimeHistogramPanel.right,
      this.layoutBounds.maxY - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
    );

    const energyDiagramExpandedProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'energyDiagramExpandedProperty' )
    } );

    const energyDiagramAccordionBox = new EnergyDiagramAccordionBox(
      model, energyDiagramBounds, this.modelViewTransformProperty,
      {
        fill: NuclearDecayCommonConstants.MAIN_PANEL_FILL,
        tandem: options.tandem.createTandem( 'energyDiagramAccordionBox' ),
        expandedProperty: energyDiagramExpandedProperty
      } );
    this.addChild( energyDiagramAccordionBox );

    this.decayTimeHistogramPanel.boundsProperty.link( bounds => {
      this.playAreaBoundsProperty.value = new Bounds2(
        bounds.left,
        bounds.bottom + NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
        bounds.right,
        energyDiagramAccordionBox.top - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
      );
    } );

    // The escape distance from the center of the atom is also given by the intersection point of the energy curves
    Multilink.multilink(
      [
        energyDiagramAccordionBox.energyIntersectionPointProperty,
        this.modelViewTransformProperty
      ],
      ( energyIntersectionPoint, modelViewTransform ) => {

        affirm( energyIntersectionPoint.x > 0, 'expected positive value for energy intersection point' );

        // Note that this assumes the atom is at position (0,0).
        model.escapeDistanceProperty.value = modelViewTransform.viewToModelDeltaX( energyIntersectionPoint.x );
      }
    );

    // We obtain the energy intersection point from the energy diagram, but since it's in the diagram's
    // own coordinates, it has to be shifted downwards for the correct positioning
    const energyIntersectionPointProperty = new DerivedProperty(
      [
        energyDiagramAccordionBox.energyIntersectionPointProperty,
        energyDiagramAccordionBox.boundsProperty,
        this.playAreaBoundsProperty
      ],
      ( intersectionPoint, diagramBounds, playAreaBounds ) => {
        return intersectionPoint.plusXY( 0, diagramBounds.centerY - playAreaBounds.centerY );
      }
    );

    const potentialLinesVisibleProperty = new DerivedProperty( [ model.isPlayAreaEmptyProperty, energyDiagramExpandedProperty ],
      ( isEmpty, expanded ) => !isEmpty && expanded );

    const playAreaNode = new ADSingleAtomPlayAreaNode(
      model,
      this.playAreaBoundsProperty,
      this.modelViewTransformProperty,
      energyIntersectionPointProperty,
      {
        tandem: options.tandem.createTandem( 'playAreaNode' ),
        potentialCircleOptions: {
          visibleProperty: potentialLinesVisibleProperty
        }
      }
    );
    this.children = [ this.playAreaBoundsRectangle, playAreaNode, ...this.children ];


    const markerLineOptions: LineOptions = {
      stroke: 'black',
      lineWidth: 1,
      lineDash: [ 5, 5 ],
      visibleProperty: potentialLinesVisibleProperty
    };
    const leftMarkerLine = new Line( 0, 0, 0, 0, markerLineOptions );
    const rightMarkerLine = new Line( 0, 0, 0, 0, markerLineOptions );

    this.addChild( leftMarkerLine );
    this.addChild( rightMarkerLine );

    Multilink.multilink(
      [ this.playAreaBoundsProperty, energyIntersectionPointProperty ],
      ( bounds: Bounds2, point: Vector2 ) => {
        const centerX = bounds.center.x;
        const centerY = bounds.center.y;

        const radius = point.x;
        leftMarkerLine.setLine( centerX - radius, centerY, centerX - radius, centerY + point.y );
        rightMarkerLine.setLine( centerX + radius, centerY, centerX + radius, centerY + point.y );
      }
    );

    // Heading node grouping the decay timeline histogram panel under "Decay Data".
    const decayDataHeadingNode = new Node( {
      accessibleHeading: AlphaDecayFluent.a11y.decayDataHeadingStringProperty
    } );
    this.addChild( decayDataHeadingNode );

    // Play area PDOM order: Radioactive Atom → Energy Diagram → Decay Data → Isotope Panel → Particle Counts → Nuclear Equation
    this.pdomPlayAreaNode.pdomOrder = [
      playAreaNode,
      energyDiagramAccordionBox,
      decayDataHeadingNode,
      this.isotopePanel,
      this.particleCountsAccordionBox,
      this.equationAccordionBox
    ];
  }
}
