// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomScreenView is responsible for the visual representation of the Single Atom Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import EnergyDiagramAccordionBox from '../../../../nuclear-decay-common/js/view/EnergyDiagramAccordionBox.js';
import EquationAccordionBox from '../../../../nuclear-decay-common/js/view/EquationAccordionBox.js';
import ParticleCountsAccordionBox from '../../../../nuclear-decay-common/js/view/ParticleCountsAccordionBox.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import AlphaDecayFluent from '../../AlphaDecayFluent.js';
import AlphaDecayScreenView, { AlphaDecayScreenViewOptions } from '../../common/view/AlphaDecayScreenView.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';
import ADSingleAtomPlayAreaNode from './ADSingleAtomPlayAreaNode.js';
import ADSingleAtomScreenSummaryContent from './ADSingleAtomScreenSummaryContent.js';

type SelfOptions = EmptySelfOptions;

type ADSingleAtomScreenViewOptions = SelfOptions & AlphaDecayScreenViewOptions;

export default class ADSingleAtomScreenView extends AlphaDecayScreenView {

  public constructor( model: ADSingleAtomModel, providedOptions: AlphaDecayScreenViewOptions ) {

    const options = optionize<ADSingleAtomScreenViewOptions, SelfOptions, AlphaDecayScreenViewOptions>()( {
      screenSummaryContent: new ADSingleAtomScreenSummaryContent( model )
    }, providedOptions );

    super( model, options );

    // Right contents panel
    const particleCountsAccordionBox = new ParticleCountsAccordionBox( model, {
      tandem: options.tandem.createTandem( 'particleCountsAccordionBox' )
    } );
    const equationAccordionBox = new EquationAccordionBox( model.selectedIsotopeProperty,
      model.isPlayAreaEmptyProperty,
      model.hasDecayOccurredProperty,
      {
        tandem: options.tandem.createTandem( 'equationAccordionBox' )
      } );
    this.rightColumnControls.addChild( particleCountsAccordionBox );
    this.rightColumnControls.addChild( equationAccordionBox );

    // Bottom-left panel: sized to fit between the screen's left edge and the time controls on the bottom-right.
    const energyDiagramBounds = new Bounds2(
      this.layoutBounds.minX + NuclearDecayCommonConstants.SCREEN_VIEW_X_MARGIN,
      0,
      this.timeControlNode.left - 100,
      this.layoutBounds.maxY - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
    );
    const energyDiagramAccordionBox = new EnergyDiagramAccordionBox(
      model, energyDiagramBounds, this.modelViewTransformProperty,
      {
        fill: NuclearDecayCommonConstants.MAIN_PANEL_FILL,
        tandem: options.tandem.createTandem( 'energyDiagramAccordionBox' )
      } );
    this.addChild( energyDiagramAccordionBox );

    this.decayTimeHistogramPanel.boundsProperty.link( bounds => {
      this.playAreaBoundsProperty.value = new Bounds2(
        this.decayTimeHistogramPanel.left,
        this.decayTimeHistogramPanel.bottom + NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
        this.rightColumnControls.left - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
        energyDiagramAccordionBox.top - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
      );
    } );

    // We obtain the energy intersection point from the energy diagram, but since it's in the diagram's
    // own coordinates, it has to be shifted downwards for the correct positioning
    const energyIntersectionPointProperty = new DerivedProperty(
      [
        energyDiagramAccordionBox.energyIntersectionPointProperty,
        energyDiagramAccordionBox.boundsProperty,
        this.playAreaBoundsProperty
      ], ( intersectionPoint, diagramBounds, playAreaBounds ) => {
        return intersectionPoint.plusXY( 0, diagramBounds.centerY - playAreaBounds.centerY );
      }
    );

    const playAreaNode = new ADSingleAtomPlayAreaNode(
      model,
      this.playAreaBoundsProperty,
      this.modelViewTransformProperty,
      energyIntersectionPointProperty,
      {
        tandem: options.tandem.createTandem( 'playAreaNode' )
      }
    );
    this.children = [ this.playAreaBoundsRectangle, playAreaNode, ...this.children ];


    const markerLineOptions = {
      stroke: 'black',
      lineWidth: 1,
      lineDash: [ 5, 5 ],
      visibleProperty: model.isPlayAreaEmptyProperty.derived( isEmpty => !isEmpty )
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
    decayDataHeadingNode.pdomOrder = [ this.decayTimeHistogramPanel ];
    this.addChild( decayDataHeadingNode );

    // Play area PDOM order: Radioactive Atom → Energy Diagram → Decay Data → Isotope Panel → Particle Counts → Nuclear Equation
    this.pdomPlayAreaNode.pdomOrder = [
      playAreaNode,
      energyDiagramAccordionBox,
      decayDataHeadingNode,
      this.isotopePanel,
      particleCountsAccordionBox,
      equationAccordionBox
    ];

    // Control area PDOM order: Time Controls → Reset All
    this.pdomControlAreaNode.pdomOrder = [
      this.timeControlNode,
      this.resetAllButton
    ];
  }
}
