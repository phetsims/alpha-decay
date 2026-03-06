// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomScreenView is responsible for the visual representation of the Single Atom Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import EnergyDiagramAccordionBox from '../../../../nuclear-decay-common/js/view/EnergyDiagramAccordionBox.js';
import NuclearDecayScreenView, { NuclearDecayScreenViewOptions } from '../../../../nuclear-decay-common/js/view/NuclearDecayScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import alphaDecay from '../../alphaDecay.js';
import SingleAtomModel from '../model/SingleAtomModel.js';

type SelfOptions = EmptySelfOptions;

type SingleAtomScreenViewOptions = SelfOptions & NuclearDecayScreenViewOptions;

export default class SingleAtomScreenView extends NuclearDecayScreenView {

  public constructor( model: SingleAtomModel, providedOptions: SingleAtomScreenViewOptions ) {

    const options = optionize<SingleAtomScreenViewOptions, SelfOptions, NuclearDecayScreenViewOptions>()( {
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

alphaDecay.register( 'SingleAtomScreenView', SingleAtomScreenView );
