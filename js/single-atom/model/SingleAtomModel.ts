// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomModel handles the state and behavior of a single atom in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import DecayingIsotope from '../../../../nuclear-decay-common/js/model/DecayingIsotope.js';
import NuclearDecayModel from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import alphaDecay from '../../alphaDecay.js';

type SelfOptions = EmptySelfOptions;

type SingleAtomModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class SingleAtomModel extends NuclearDecayModel {

  public readonly decayingIsotopeProperty: TProperty<DecayingIsotope | null>;

  public constructor( providedOptions: SingleAtomModelOptions ) {
    super( providedOptions );

    // No decaying isotope yet
    this.decayingIsotopeProperty = new Property<DecayingIsotope | null>( null );

    this.decayingIsotopeProperty.link( isotope => {
      this.isPlayAreaEmptyProperty.value = isotope === null;

      if ( isotope === null ) {
        this.timeProperty.value = 0;
      }
    } );
  }

  /**
   * Adds exactly one of the selected isotopes into the model, and starts the decay process.
   */
  public addIsotope(): void {
    if ( !this.decayingIsotopeProperty.value ) {
      const selectedIsotope = this.selectedIsotopeProperty.value;
      this.decayingIsotopeProperty.value = DecayingIsotope.startDecay( selectedIsotope );
    }
  }
}

alphaDecay.register( 'SingleAtomModel', SingleAtomModel );
