// Copyright 2026, University of Colorado Boulder

/**
 * AlphaDecayPreferencesNode is the user interface for sim-specific preferences, accessed via the Preferences dialog.
 *
 * The Preferences dialog is created on demand by joist, using a PhetioCapsule, so AlphaDecayPreferencesNode must
 * implement dispose, and all elements of AlphaDecayPreferencesNode that have tandems must be disposed.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import PreferencesControl from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import optionize, { type EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import type PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox, { type VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ToggleSwitch from '../../../../sun/js/ToggleSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import AlphaDecayFluent from '../../AlphaDecayFluent.js';
import AlphaDecayPreferences from '../model/AlphaDecayPreferences.js';

type SelfOptions = EmptySelfOptions;
type AlphaDecayPreferencesNodeOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class AlphaDecayPreferencesNode extends VBox {
  public constructor( providedOptions: AlphaDecayPreferencesNodeOptions ) {

    const options = optionize<AlphaDecayPreferencesNodeOptions, SelfOptions, VBoxOptions>()( {
      spacing: PreferencesDialogConstants.CONTENT_SPACING
    }, providedOptions );

    super( options );

    this.addChild( new AdvancedQuantumPhysics( options.tandem.createTandem( 'advancedQuantumPhysicsControl' ) ) );
  }
}

class AdvancedQuantumPhysics extends PreferencesControl {

  public constructor( tandem: Tandem ) {

    super( {
      isDisposable: false,
      labelNode: new Text(
        AlphaDecayFluent.preferences.advancedQuantumPhysics.titleStringProperty,
        PreferencesDialogConstants.CONTROL_LABEL_OPTIONS
      ),
      descriptionNode: new RichText(
        AlphaDecayFluent.preferences.advancedQuantumPhysics.descriptionStringProperty,
        PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS
      ),
      controlNode: new ToggleSwitch(
        AlphaDecayPreferences.advancedQuantumPhysicsProperty,
        false,
        true,
        PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS
      ),
      tandem: tandem,
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true,
        phetioReadOnly: false
      }
    } );

    this.addLinkedElement( AlphaDecayPreferences.advancedQuantumPhysicsProperty );
  }
}
