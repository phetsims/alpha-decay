// Copyright 2026, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author John
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
import alphaDecay from '../alphaDecay.js';

const AlphaDecayQueryParameters = QueryStringMachine.getAll( {
  //TODO add schemas for query parameters
} );

alphaDecay.register( 'AlphaDecayQueryParameters', AlphaDecayQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.alphaDecay.AlphaDecayQueryParameters' );

export default AlphaDecayQueryParameters;