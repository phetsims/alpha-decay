// Copyright 2026, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author John
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';

const AlphaDecayQueryParameters = QueryStringMachine.getAll( {
  quantumMode: {
    type: 'boolean',
    defaultValue: true,
    public: true
  }
} );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
phet.log && phet.log( `AlphaDecayQueryParameters: ${JSON.stringify( AlphaDecayQueryParameters, null, 2 )}` );

export default AlphaDecayQueryParameters;
