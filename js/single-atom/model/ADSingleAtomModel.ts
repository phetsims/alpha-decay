// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomModel is the main model class for the "Single Atom" screen.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import DecayingAtom from '../../../../nuclear-decay-common/js/model/DecayingAtom.js';
import NuclearDecayModel from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';

type SelfOptions = EmptySelfOptions;

type ADSingleAtomModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class ADSingleAtomModel extends NuclearDecayModel {

  // The atom that may be decaying, may have already decayed, or may be null if no atom has been added yet.
  public readonly decayingAtomProperty: TProperty<DecayingAtom | null> = new Property( null );

  public constructor( providedOptions: ADSingleAtomModelOptions ) {
    super( providedOptions );

    this.decayingAtomProperty.link( isotope => {
      this.isPlayAreaEmptyProperty.value = isotope === null;

      if ( isotope === null ) {
        this.timeProperty.value = 0;
      }
    } );
  }

  /**
   * Adds exactly one of the selected isotopes into the model, and starts the decay process.
   */
  public addAtom(): void {
    affirm( !this.decayingAtomProperty.value, 'There is already an atom, and this model only handles one.' );
    const selectedIsotope = this.selectedIsotopeProperty.value;
    this.decayingAtomProperty.value = DecayingAtom.startDecay( selectedIsotope );
  }

  /**
   * Resets the model, including the decaying atom.
   */
  public override reset(): void {
    this.decayingAtomProperty.value = null;
    super.reset();
  }

  public resetAtomDecay(): void {
    if ( this.decayingAtomProperty.value ) {
      this.decayingAtomProperty.value.resetDecay();
    }
  }

  public override restart(): void {
    this.resetAtomDecay();
    super.restart();
  }

  public override step( dt: number ): void {
    if ( this.decayingAtomProperty.value ) {
      this.decayingAtomProperty.value.step( dt );
    }
    super.step( dt );
  }
}
