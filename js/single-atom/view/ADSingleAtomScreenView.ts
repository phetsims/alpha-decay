// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomScreenView is responsible for the visual representation of the Single Atom Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import DynamicNucleusNode from '../../../../nuclear-decay-common/js/common/view/DynamicNucleusNode.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import EnergyDiagramAccordionBox from '../../../../nuclear-decay-common/js/single-atom/view/EnergyDiagramAccordionBox.js';
import SingleAtomScreenView, { SingleAtomScreenViewOptions } from '../../../../nuclear-decay-common/js/single-atom/view/SingleAtomScreenView.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Line, { LineOptions } from '../../../../scenery/js/nodes/Line.js';
import AlphaDecayPreferences from '../../common/model/AlphaDecayPreferences.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';
import ADSingleAtomPlayAreaNode from './ADSingleAtomPlayAreaNode.js';
import ADSingleAtomScreenSummaryContent from './ADSingleAtomScreenSummaryContent.js';

type SelfOptions = EmptySelfOptions;

type ADSingleAtomScreenViewOptions = SelfOptions & SingleAtomScreenViewOptions;

export default class ADSingleAtomScreenView extends SingleAtomScreenView {

  private readonly energyDiagramAccordionBox: EnergyDiagramAccordionBox;

  public constructor( model: ADSingleAtomModel, providedOptions: SingleAtomScreenViewOptions ) {

    const escapeRadiusForwardingProperty = new NumberProperty( 0 );

    const options = optionize<ADSingleAtomScreenViewOptions, SelfOptions, SingleAtomScreenViewOptions>()( {
      screenSummaryContent: new ADSingleAtomScreenSummaryContent( model ),
      escapeRadiusProperty: escapeRadiusForwardingProperty
    }, providedOptions );

    super( model, options );

    // Bottom-left panel: sized to fit between the screen's left edge and the time controls on the bottom-right.
    const energyDiagramBounds = new Bounds2(
      this.layoutBounds.minX + NuclearDecayCommonConstants.SCREEN_VIEW_X_MARGIN,
      0,
      this.decayTimeHistogramPanel.right,
      this.layoutBounds.maxY - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
    );

    affirm( this.atomNodes.length === 1, 'expected exactly one atom node in single atom screen' );
    affirm( this.atomNodes[ 0 ] instanceof DynamicNucleusNode, 'expected atom node to be a DynamicNucleusNode' );

    this.energyDiagramAccordionBox = new EnergyDiagramAccordionBox(
      model,
      this.atomNodes[ 0 ],
      energyDiagramBounds,
      this.modelViewTransformProperty,
      {
        fill: NuclearDecayCommonConstants.MAIN_PANEL_FILL,
        tandem: options.tandem.createTandem( 'energyDiagramAccordionBox' ),
        visibleProperty: AlphaDecayPreferences.advancedQuantumPhysicsProperty
      } );
    this.addChild( this.energyDiagramAccordionBox );

    // The panels around the play area change shape (top panel increases height on custom, bottom panel can be
    // toggled off via a preference). So we make sure to adjust the play area bounds so the central atom is
    // cozy right there in the middle of the available space
    Multilink.multilink(
      [
        this.decayTimeHistogramPanel.boundsProperty,
        this.energyDiagramAccordionBox.visibleProperty
      ], ( bounds, energyDiagramVisible ) => {
        this.playAreaBoundsProperty.value = new Bounds2(
          bounds.left,
          bounds.bottom + NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
          bounds.right,
          energyDiagramVisible ?
              this.energyDiagramAccordionBox.top - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN :
              this.layoutBounds.bottom - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
        );
      }
    );

    // The escape distance from the center of the atom is also given by the intersection point of the energy curves
    Multilink.multilink(
      [
        this.energyDiagramAccordionBox.energyIntersectionPointProperty,
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
        this.energyDiagramAccordionBox.energyIntersectionPointProperty,
        this.energyDiagramAccordionBox.boundsProperty,
        this.playAreaBoundsProperty
      ],
      ( intersectionPoint, diagramBounds, playAreaBounds ) => {
        return intersectionPoint.plusXY( 0, diagramBounds.centerY - playAreaBounds.centerY );
      }
    );

    energyIntersectionPointProperty.link( point => {
      escapeRadiusForwardingProperty.value = point.x;
    } );

    // Potential lines are shown if a number of conditions are met:
    const potentialLinesVisibleProperty = new DerivedProperty( [
        model.isPlayAreaEmptyProperty, // There is an atom in the play area
        model.alphaParticleDistanceProperty, // The alpha particle distance is lower than the escape distance (plus a threshold)
        model.escapeDistanceProperty,
        model.isNucleusStableProperty, // Nucleus is NOT stable
        this.energyDiagramAccordionBox.expandedProperty, // Energies accordion box is open
        AlphaDecayPreferences.advancedQuantumPhysicsProperty // User is using the preference of advances quantum physics
      ],
      ( isEmpty, particleDistance, escapeDistance, stable, expanded, advancedQuantumPhysics ) => {
        return !isEmpty && !stable && expanded && advancedQuantumPhysics && particleDistance < 1.1 * escapeDistance;
      } );

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

    // TODO Uncomment this once we plug the MVT to the atom https://github.com/phetsims/alpha-decay/issues/19
    // AlphaDecayPreferences.advancedQuantumPhysicsProperty.link( tunnelingOn => {
    //   this.numberOfAtomsInPlayAreaWidthProperty.value = tunnelingOn ? 10 : 5;
    // } );

    // Play area PDOM order: Radioactive Atom → Energy Diagram → Decay Data → Isotope Panel → Particle Counts → Nuclear Equation
    this.pdomPlayAreaNode.pdomOrder = [
      playAreaNode,
      this.energyDiagramAccordionBox,
      this.decayTimeHistogramPanel,
      this.isotopePanel,
      this.particleCountsAccordionBox,
      this.equationAccordionBox
    ];
  }

  public override reset(): void {
    super.reset();
    this.energyDiagramAccordionBox.reset();
  }
}
