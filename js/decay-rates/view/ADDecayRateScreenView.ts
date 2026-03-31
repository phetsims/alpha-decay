// Copyright 2026, University of Colorado Boulder

/**
 * DecayRateScreenView is responsible for the visual representation of the Decay Rates Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import AddAtomsControlPanel from '../../../../nuclear-decay-common/js/view/AddAtomsControlPanel.js';
import DecayRateGraph from '../../../../nuclear-decay-common/js/view/DecayRateGraph.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import ADDecayRateModel from '../model/ADDecayRateModel.js';

type SelfOptions = EmptySelfOptions;

type ADDecayRateScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class ADDecayRateScreenView extends ScreenView {

  public constructor( model: ADDecayRateModel, providedOptions: ADDecayRateScreenViewOptions ) {

    const options = optionize<ADDecayRateScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
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
      bottom: this.layoutBounds.maxY - MARGIN_Y,
      tandem: options.tandem.createTandem( 'resetAllButton' )
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

    const defaultAtomsToAdd = 100;
    const atomsToAddProperty = new NumberProperty(
      Math.min( model.maxNumberOfAtoms, defaultAtomsToAdd ), {
        range: new Range( 1, model.maxNumberOfAtoms ),
        tandem: options.tandem.createTandem( 'atomsToAddProperty' )
      } );

    const addAtomsPanel = new AddAtomsControlPanel(
      atomsToAddProperty,
      model.selectedIsotopeProperty,
      ( n: number ) => { model.addMultipleAtoms( n ); },
      {
      centerX: this.layoutBounds.centerX,
      bottom: this.layoutBounds.maxY - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
    } );
    this.addChild( addAtomsPanel );

    const decayRateGraphPanel = new DecayRateGraph( model, {
      left: this.layoutBounds.minX + MARGIN_X,
      top: this.layoutBounds.minY + MARGIN_Y
    } );
    this.addChild( decayRateGraphPanel );
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
