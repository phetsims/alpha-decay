// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard help content for the Single Atom screen.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TimeControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/TimeControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';

export default class ADSingleAtomKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {

    const leftSections = [ new SliderControlsKeyboardHelpSection( {
      headingStringProperty: NuclearDecayCommonFluent.keyboardHelpDialog.halfLifeAndEnergyControls.headingStringProperty,
      sliderStringProperty: NuclearDecayCommonFluent.keyboardHelpDialog.halfLifeAndEnergyControls.adjustStringProperty
    } ) ];
    const rightSections = [
      new TimeControlsKeyboardHelpSection(),
      new BasicActionsKeyboardHelpSection()
    ];

    super( leftSections, rightSections, { isDisposable: false } );
  }
}
