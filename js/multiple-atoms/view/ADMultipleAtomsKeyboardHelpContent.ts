// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard help content for the Multiple Atoms screen.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import MoveStopwatchKeyboardHelpSection from '../../../../nuclear-decay-common/js/common/view/MoveStopwatchKeyboardHelpSection.js';
import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import FineCoarseSpinnerKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/FineCoarseSpinnerKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TimeControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/TimeControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';

export default class ADMultipleAtomsKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {

    const leftSections = [ new FineCoarseSpinnerKeyboardHelpSection( {
      sliderStringProperty: NuclearDecayCommonFluent.keyboardHelpDialog.numberOfAtomsStringProperty
    } ),
      new SliderControlsKeyboardHelpSection( {
        headingStringProperty: NuclearDecayCommonFluent.keyboardHelpDialog.halfLifeControl.headingStringProperty,
        sliderStringProperty: NuclearDecayCommonFluent.keyboardHelpDialog.halfLifeControl.adjustStringProperty
      } ) ];
    const rightSections = [
      new MoveStopwatchKeyboardHelpSection(),
      new TimeControlsKeyboardHelpSection(),
      new BasicActionsKeyboardHelpSection( { withCheckboxContent: true } )
    ];

    super( leftSections, rightSections, { isDisposable: false } );
  }
}
