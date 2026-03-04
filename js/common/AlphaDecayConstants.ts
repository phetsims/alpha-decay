// Copyright 2026, University of Colorado Boulder

/**
 * AlphaDecayConstants is the set of constants used throughout the 'Simula Rasa' simulation.
 *
 * @author John
 */

import alphaDecay from '../alphaDecay.js';

export default class AlphaDecayConstants {

  private constructor() {
    // Not intended for instantiation.
  }

  public static readonly SCREEN_VIEW_X_MARGIN = 15;
  public static readonly SCREEN_VIEW_Y_MARGIN = 15;
}

alphaDecay.register( 'AlphaDecayConstants', AlphaDecayConstants );