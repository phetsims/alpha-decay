// Copyright 2026, University of Colorado Boulder

/**
 * MultipleAtomsScreenView is responsible for the visual representation of the Multiple Atoms Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import { DecayRateScreenViewOptions } from '../../../../nuclear-decay-common/js/decay-rate/view/DecayRateScreenView.js';
import MultipleAtomsScreenView, { MultipleAtomsScreenViewOptions } from '../../../../nuclear-decay-common/js/multiple-atoms/view/MultipleAtomsScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ADMultipleAtomsModel from '../model/ADMultipleAtomsModel.js';

type SelfOptions = EmptySelfOptions;

type ADMultipleAtomsScreenViewOptions = SelfOptions & MultipleAtomsScreenViewOptions;

export default class ADMultipleAtomsScreenView extends MultipleAtomsScreenView {

  public constructor( model: ADMultipleAtomsModel, providedOptions: ADMultipleAtomsScreenViewOptions ) {

    const options = optionize<ADMultipleAtomsScreenViewOptions, SelfOptions, DecayRateScreenViewOptions>()( {
    }, providedOptions );

    super( model, options );
  }
}
