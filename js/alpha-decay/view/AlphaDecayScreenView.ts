// Copyright 2026, University of Colorado Boulder

/**
 * NOTE: Describe this class and its responsibilities.
 *
 * @author John
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import alphaDecay from '../../alphaDecay.js';
import AlphaDecayConstants from '../../common/AlphaDecayConstants.js';
import AlphaDecayModel from '../model/AlphaDecayModel.js';

type SelfOptions = {
  //NOTE: add options that are specific to AlphaDecayScreenView here
};

type AlphaDecayScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class AlphaDecayScreenView extends ScreenView {

  public constructor( model: AlphaDecayModel, providedOptions: AlphaDecayScreenViewOptions ) {

    const options = optionize<AlphaDecayScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      //NOTE: add default values for optional SelfOptions here

      //NOTE: add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - AlphaDecayConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - AlphaDecayConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    //NOTE: implement?
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    //NOTE: implement?
  }
}

alphaDecay.register( 'AlphaDecayScreenView', AlphaDecayScreenView );