// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomScreenView is responsible for the visual representation of the Single Atom Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import EnergyDiagramAccordionBox from '../../../../nuclear-decay-common/js/view/EnergyDiagramAccordionBox.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import AlphaDecayScreenView, { AlphaDecayScreenViewOptions } from '../../common/view/AlphaDecayScreenView.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';
import ADSingleAtomPlayAreaNode from './ADSingleAtomPlayAreaNode.js';

type SelfOptions = EmptySelfOptions;

type ADSingleAtomScreenViewOptions = SelfOptions & AlphaDecayScreenViewOptions;

export default class ADSingleAtomScreenView extends AlphaDecayScreenView {

  public constructor( model: ADSingleAtomModel, providedOptions: AlphaDecayScreenViewOptions ) {

    // Create the model-view transform needed for this particular screen.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2(
        ScreenView.DEFAULT_LAYOUT_BOUNDS.width * 0.375,
        ScreenView.DEFAULT_LAYOUT_BOUNDS.height * 0.45
      ),
      1
    );

    const options = optionize<ADSingleAtomScreenViewOptions, SelfOptions, AlphaDecayScreenViewOptions>()( {
      modelViewTransform: modelViewTransform
    }, providedOptions );

    super( model, options );

    const playAreaNode = new ADSingleAtomPlayAreaNode( model, {
      top: this.halfLifePanel.bottom + 10,
      left: NuclearDecayCommonConstants.SCREEN_VIEW_X_MARGIN
    } );
    this.addChild( playAreaNode );

    // Bottom-left panel

    const energyDiagramAccordionBox = new EnergyDiagramAccordionBox( {
      minWidth: NuclearDecayCommonConstants.LONG_PANEL_WIDTH,
      left: this.layoutBounds.minX + NuclearDecayCommonConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
      fill: NuclearDecayCommonConstants.MAIN_PANEL_FILL
    } );
    this.addChild( energyDiagramAccordionBox );
  }

  /**
   * Resets the view.
   */
  public override reset(): void {
    // TO BE IMPLEMENTED
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    // TO BE IMPLEMENTED
  }
}
