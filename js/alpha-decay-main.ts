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
import DecayRatesScreen from './decay-rates/DecayRatesScreen.js';
import MultipleAtomsScreen from './multiple-atoms/MultipleAtomsScreen.js';
import SingleAtomScreen from './single-atom/SingleAtomScreen.js';

// Launch the sim. Beware that scenery Image nodes created outside simLauncher.launch() will have zero bounds
// until the images are fully loaded. See https://github.com/phetsims/coulombs-law/issues/70#issuecomment-429037461
simLauncher.launch( () => {

  const titleStringProperty = AlphaDecayFluent[ 'alpha-decay' ].titleStringProperty;

  const screens = [
    new SingleAtomScreen( { tandem: Tandem.ROOT.createTandem( 'singleAtomScreen' ) } ),
    new MultipleAtomsScreen( { tandem: Tandem.ROOT.createTandem( 'multipleAtomsScreen' ) } ),
    new DecayRatesScreen( { tandem: Tandem.ROOT.createTandem( 'decayRatesScreen' ) } )
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