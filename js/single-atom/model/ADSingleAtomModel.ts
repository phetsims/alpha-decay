// Copyright 2026, University of Colorado Boulder

/**
 * SingleAtomModel is the main model class for the "Single Atom" screen.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import NuclearDecayAtom from '../../../../nuclear-decay-common/js/model/NuclearDecayAtom.js';
import NuclearDecayModel, { NuclearDecayModelOptions } from '../../../../nuclear-decay-common/js/model/NuclearDecayModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import AlphaDecayModel, { AlphaDecayModelOptions } from '../../common/model/AlphaDecayModel.js';

type SelfOptions = EmptySelfOptions;

type ADSingleAtomModelOptions = SelfOptions & AlphaDecayModelOptions;

export default class ADSingleAtomModel extends AlphaDecayModel {

  // The atom that may be decaying, may have already decayed, or may be null if no atom has been added yet.
  public readonly decayingAtomProperty: TProperty<NuclearDecayAtom | null>;

  public constructor( providedOptions: ADSingleAtomModelOptions ) {
    const options = optionize<ADSingleAtomModelOptions, SelfOptions, NuclearDecayModelOptions>()( {
      singleAtomModel: true
    }, providedOptions );

    super( options );

    // No decaying isotope yet
    this.decayingAtomProperty = new Property<NuclearDecayAtom | null>( null, {
      tandem: options.tandem.createTandem( 'decayingAtomProperty' ),
      phetioValueType: NullableIO( NuclearDecayAtom.NuclearDecayAtomIO )
    } );

    this.decayingAtomProperty.link( atom => {
      this.isPlayAreaEmptyProperty.value = atom === null;

      if ( atom === null ) {
        this.timeProperty.value = 0;
      }
    } );
  }

  /**
   * Adds exactly one of the selected isotopes into the model, and starts the decay process.
   */
  public addAtom(): void {
    if ( !this.decayingAtomProperty.value ) {
      const selectedIsotope = this.selectedIsotopeProperty.value;
      if ( selectedIsotope !== 'custom' ) {
        const atomConfig = NuclearDecayModel.getIsotopeAtomConfig( selectedIsotope );
        this.decayingAtomProperty.value = new NuclearDecayAtom( atomConfig, atomConfig );
      }
    }
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
