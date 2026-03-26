// Copyright 2026, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import AlphaDecayFluent from './AlphaDecayFluent.js';
import './common/AlphaDecayQueryParameters.js';
import ADDecayRateScreen from './decay-rates/ADDecayRateScreen.js';
import ADMultipleAtomsScreen from './multiple-atoms/ADMultipleAtomsScreen.js';
import ADSingleAtomScreen from './single-atom/ADSingleAtomScreen.js';

// Launch the sim. Beware that scenery Image nodes created outside simLauncher.launch() will have zero bounds
// until the images are fully loaded. See https://github.com/phetsims/coulombs-law/issues/70#issuecomment-429037461
simLauncher.launch( () => {

  const titleStringProperty = AlphaDecayFluent[ 'alpha-decay' ].titleStringProperty;

  const screens = [
    new ADSingleAtomScreen( { tandem: Tandem.ROOT.createTandem( 'singleAtomScreen' ) } ),
    new ADMultipleAtomsScreen( { tandem: Tandem.ROOT.createTandem( 'multipleAtomsScreen' ) } ),
    new ADDecayRateScreen( { tandem: Tandem.ROOT.createTandem( 'decayRateScreen' ) } )
  ];

  const options: SimOptions = {

    // TODO fill in credits, all of these fields are optional, see joist.CreditsNode https://github.com/phetsims/alpha-decay/issues/1
    credits: {
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      contributors: '',
      qualityAssurance: '',
      graphicArts: '',
      soundDesign: '',
      thanks: ''
    }
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );