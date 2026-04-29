// Copyright 2026, University of Colorado Boulder

/**
 * DecayRateScreenView is responsible for the visual representation of the Decay Rates Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import DecayRateScreenView, { DecayRateScreenViewOptions } from '../../../../nuclear-decay-common/js/decay-rate/view/DecayRateScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ADDecayRateModel from '../model/ADDecayRateModel.js';

type SelfOptions = EmptySelfOptions;

type ADDecayRateScreenViewOptions = SelfOptions & DecayRateScreenViewOptions;

export default class ADDecayRateScreenView extends DecayRateScreenView {

  public constructor( model: ADDecayRateModel, providedOptions: ADDecayRateScreenViewOptions ) {

    const options = optionize<ADDecayRateScreenViewOptions, SelfOptions, DecayRateScreenViewOptions>()( {
    }, providedOptions );

    super( model, options );
  }
}
