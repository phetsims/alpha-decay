// Copyright 2026, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author John
 */

import TModel from '../../../../joist/js/TModel.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import alphaDecay from '../../alphaDecay.js';

type SelfOptions = {
  //TODO add options that are specific to AlphaDecayModel here
};

type AlphaDecayModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class AlphaDecayModel implements TModel {

  public constructor( providedOptions: AlphaDecayModelOptions ) {
    //TODO
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    //TODO
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    //TODO
  }
}

alphaDecay.register( 'AlphaDecayModel', AlphaDecayModel );