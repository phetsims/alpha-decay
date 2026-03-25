// Copyright 2026, University of Colorado Boulder

/**
 * DecayRatesModel handles the state and behavior of the Decay Rates screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import { NuclearDecayModelOptions } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayModel, { AlphaDecayModelOptions } from '../../common/model/AlphaDecayModel.js';

type SelfOptions = EmptySelfOptions;

type ADDecayRatesModelOptions = SelfOptions & AlphaDecayModelOptions;

export default class ADDecayRatesModel extends AlphaDecayModel {

  public constructor( providedOptions: ADDecayRatesModelOptions ) {
    const options = optionize<ADDecayRatesModelOptions, SelfOptions, NuclearDecayModelOptions>()( {
    }, providedOptions );

    super( options );

  }
}
