// Copyright 2026, University of Colorado Boulder

/**
 * ADDecayRateModel handles the state and behavior of the Decay Rates screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import DecayRateModel, { DecayRateModelOptions } from '../../../../nuclear-decay-common/js/decay-rate/model/DecayRateModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlphaDecayConstants from '../../common/AlphaDecayConstants.js';

type SelfOptions = EmptySelfOptions;

type ADDecayRateModelOptions = SelfOptions & DecayRateModelOptions;

export default class ADDecayRateModel extends DecayRateModel {

  public constructor( providedOptions: ADDecayRateModelOptions ) {
    const options = optionize<ADDecayRateModelOptions, SelfOptions, DecayRateModelOptions>()( {
    }, providedOptions );

    super( AlphaDecayConstants.SELECTABLE_ISOTOPES, 'alphaDecay', options );

    this.selectedIsotopeProperty.setInitialValue( 'polonium-211' );
    this.selectedIsotopeProperty.reset();
  }
}
