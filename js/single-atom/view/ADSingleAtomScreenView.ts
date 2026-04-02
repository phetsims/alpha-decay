// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomScreenView is responsible for the visual representation of the Single Atom Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import EnergyDiagramAccordionBox from '../../../../nuclear-decay-common/js/view/EnergyDiagramAccordionBox.js';
import EquationAccordionBox from '../../../../nuclear-decay-common/js/view/EquationAccordionBox.js';
import ParticleCountsAccordionBox from '../../../../nuclear-decay-common/js/view/ParticleCountsAccordionBox.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayScreenView, { AlphaDecayScreenViewOptions } from '../../common/view/AlphaDecayScreenView.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';
import ADSingleAtomPlayAreaNode from './ADSingleAtomPlayAreaNode.js';

type SelfOptions = EmptySelfOptions;

type ADSingleAtomScreenViewOptions = SelfOptions & AlphaDecayScreenViewOptions;

export default class ADSingleAtomScreenView extends AlphaDecayScreenView {

  public constructor( model: ADSingleAtomModel, providedOptions: AlphaDecayScreenViewOptions ) {

    const options = optionize<ADSingleAtomScreenViewOptions, SelfOptions, AlphaDecayScreenViewOptions>()( {}, providedOptions );

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

    // Bottom-left panel

    const energyDiagramAccordionBox = new EnergyDiagramAccordionBox(
      model, this.modelViewTransformProperty,
      {
        minWidth: NuclearDecayCommonConstants.LONG_PANEL_WIDTH,
        left: this.layoutBounds.minX + NuclearDecayCommonConstants.SCREEN_VIEW_X_MARGIN,
        bottom: this.layoutBounds.maxY - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
        fill: NuclearDecayCommonConstants.MAIN_PANEL_FILL
      } );
    this.addChild( energyDiagramAccordionBox );

    const playAreaBounds = new Bounds2(
      this.decayTimeHistogramPanel.left,
      this.decayTimeHistogramPanel.bottom + NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
      this.rightColumnControls.left - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
      energyDiagramAccordionBox.top - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
    );
    const playAreaNode = new ADSingleAtomPlayAreaNode(
      model,
      playAreaBounds,
      this.modelViewTransformProperty
    );
    this.setPlayAreaBounds( playAreaBounds );
    this.addChild( playAreaNode );
  }
}
