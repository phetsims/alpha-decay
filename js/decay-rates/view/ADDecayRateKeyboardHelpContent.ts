// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard help content for the Decay Rates screen.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import FineCoarseSpinnerKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/FineCoarseSpinnerKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TimeControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/TimeControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import SceneryPhetFluent from '../../../../scenery-phet/js/SceneryPhetFluent.js';

export default class ADDecayRateKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {

    const leftSections = [
      new SliderControlsKeyboardHelpSection( {
        headingStringProperty: NuclearDecayCommonFluent.keyboardHelpDialog.dataProbe.headingStringProperty,
        verbStringProperty: SceneryPhetFluent.keyboardHelpDialog.moveStringProperty,
        sliderStringProperty: NuclearDecayCommonFluent.keyboardHelpDialog.dataProbe.probeStringProperty
      } ),
      new FineCoarseSpinnerKeyboardHelpSection( {
        sliderStringProperty: NuclearDecayCommonFluent.keyboardHelpDialog.numberOfAtomsStringProperty
      } ) ];
    const rightSections = [
      new TimeControlsKeyboardHelpSection(),
      new BasicActionsKeyboardHelpSection( { withCheckboxContent: true } )
    ];

    super( leftSections, rightSections, { isDisposable: false } );
  }
}
