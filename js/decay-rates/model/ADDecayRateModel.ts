// Copyright 2026, University of Colorado Boulder

/**
 * DecayRateModel handles the state and behavior of the Decay Rates screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import { NuclearDecayModelOptions } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayModel, { AlphaDecayModelOptions } from '../../common/model/AlphaDecayModel.js';

type SelfOptions = EmptySelfOptions;

type ADDecayRateModelOptions = SelfOptions & AlphaDecayModelOptions;

export default class ADDecayRateModel extends AlphaDecayModel {

  public constructor( providedOptions: ADDecayRateModelOptions ) {
    const options = optionize<ADDecayRateModelOptions, SelfOptions, NuclearDecayModelOptions>()( {
      maxNumberOfAtoms: 1000
    }, providedOptions );

    super( options );

  }
}
