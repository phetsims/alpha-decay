// Copyright 2026, University of Colorado Boulder

/**
 * AlphaDecayPreferences is the model for sim-specific preferences. The values declared here can be updated via
 * the Preferences dialog.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import AlphaDecayQueryParameters from '../AlphaDecayQueryParameters.js';

const AlphaDecayPreferences = {

  // controls whether the sim is in Quantum mode
  advancedQuantumTunnellingProperty: new BooleanProperty( AlphaDecayQueryParameters.advancedQuantumTunnelling, {
    tandem: Tandem.PREFERENCES.createTandem( 'advancedQuantumTunnellingProperty' ),
    phetioFeatured: true
  } )
};

export default AlphaDecayPreferences;
