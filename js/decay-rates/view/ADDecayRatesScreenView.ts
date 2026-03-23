// Copyright 2026, University of Colorado Boulder

/**
 * DecayRatesScreenView is responsible for the visual representation of the Decay Rates Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import AddAtomsControlPanel from '../../../../nuclear-decay-common/js/view/AddAtomsControlPanel.js';
import DecayRatesGraph from '../../../../nuclear-decay-common/js/view/DecayRatesGraph.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import ADDecayRatesModel from '../model/ADDecayRatesModel.js';

type SelfOptions = EmptySelfOptions;

type ADDecayRatesScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class ADDecayRatesScreenView extends ScreenView {

  public constructor( model: ADDecayRatesModel, providedOptions: ADDecayRatesScreenViewOptions ) {

    const options = optionize<ADDecayRatesScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
    }, providedOptions );

    const MARGIN_X = NuclearDecayCommonConstants.SCREEN_VIEW_X_MARGIN;
    const MARGIN_Y = NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN;
    const PANEL_SPACING = NuclearDecayCommonConstants.PANEL_SPACING;

    super( options );

    // Bottom-right controls

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - MARGIN_X,
      bottom: this.layoutBounds.maxY - MARGIN_Y
      // tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    const timeControlNode = new TimeControlNode( model.isPlayingProperty, {
      playPauseStepButtonOptions: {
        stepForwardButtonOptions: {
          listener: () => model.manualStep()
        }
      },
      bottom: resetAllButton.bottom,
      right: resetAllButton.left - 5 * PANEL_SPACING
    } );

    this.addChild( timeControlNode );

    const addAtomsPanel = new AddAtomsControlPanel( model, {
      centerX: this.layoutBounds.centerX,
      bottom: this.layoutBounds.maxY - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
    } );
    this.addChild( addAtomsPanel );

    const decayRatesGraphPanel = new DecayRatesGraph( model, {
      left: this.layoutBounds.minX + MARGIN_X,
      top: this.layoutBounds.minY + MARGIN_Y
    } );
    this.addChild( decayRatesGraphPanel );
  }

  /**
   * Resets the view.
   */
  public reset(): void {
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
