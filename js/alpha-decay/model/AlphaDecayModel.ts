// Copyright 2026, University of Colorado Boulder

/**
 * NOTE: Describe this class and its responsibilities.
 *
 * @author John
 */

import TModel from '../../../../joist/js/TModel.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import alphaDecay from '../../alphaDecay.js';

type SelfOptions = {
  //NOTE: add options that are specific to AlphaDecayModel here
};

type AlphaDecayModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class AlphaDecayModel implements TModel {

  public constructor( providedOptions: AlphaDecayModelOptions ) {
    //NOTE: implement me
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    //NOTE: implement me
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    //NOTE: implement me
  }
}

alphaDecay.register( 'AlphaDecayModel', AlphaDecayModel );