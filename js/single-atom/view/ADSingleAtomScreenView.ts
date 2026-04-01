// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomScreenView is responsible for the visual representation of the Single Atom Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import EnergyDiagramAccordionBox from '../../../../nuclear-decay-common/js/view/EnergyDiagramAccordionBox.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayScreenView, { AlphaDecayScreenViewOptions } from '../../common/view/AlphaDecayScreenView.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';
import ADSingleAtomPlayAreaNode from './ADSingleAtomPlayAreaNode.js';

type SelfOptions = EmptySelfOptions;

type ADSingleAtomScreenViewOptions = SelfOptions & AlphaDecayScreenViewOptions;

export default class ADSingleAtomScreenView extends AlphaDecayScreenView {

  public constructor( model: ADSingleAtomModel, providedOptions: AlphaDecayScreenViewOptions ) {

    const options = optionize<ADSingleAtomScreenViewOptions, SelfOptions, AlphaDecayScreenViewOptions>()( {
    }, providedOptions );

    super( model, options );

    // Bottom-left panel

    const energyDiagramAccordionBox = new EnergyDiagramAccordionBox( {
      minWidth: NuclearDecayCommonConstants.LONG_PANEL_WIDTH,
      left: this.layoutBounds.minX + NuclearDecayCommonConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
      fill: NuclearDecayCommonConstants.MAIN_PANEL_FILL
    } );
    this.addChild( energyDiagramAccordionBox );

    const playAreaBounds = new Bounds2(
      this.halfLifePanel.left,
      this.halfLifePanel.bottom + NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
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
