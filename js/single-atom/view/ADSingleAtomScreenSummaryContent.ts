// Copyright 2026, University of Colorado Boulder

/**
 * Screen summary content for the Single Atom screen of Alpha Decay.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import AtomNameUtils from '../../../../shred/js/AtomNameUtils.js';
import AlphaDecayFluent from '../../AlphaDecayFluent.js';
import ADSingleAtomModel from '../model/ADSingleAtomModel.js';

export default class ADSingleAtomScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: ADSingleAtomModel ) {

    const poloniumNameProperty = AtomNameUtils.getNameAndMass( 84, 127 );
    const leadNameProperty = AtomNameUtils.getNameAndMass( 82, 125 );

    // Derive the name of the atom currently in the play area (parent before decay, daughter after).
    const currentAtomNameProperty = new DerivedStringProperty(
      [
        model.selectedIsotopeProperty,
        model.hasDecayOccurredProperty,
        NuclearDecayCommonFluent.isotopeAStringProperty,
        NuclearDecayCommonFluent.isotopeBStringProperty,
        poloniumNameProperty,
        leadNameProperty
      ],
      ( selectedIsotope, hasDecayOccurred, isotopeAName, isotopeBName, poloniumName, leadName ) => {
        if ( selectedIsotope === 'custom' ) {
          return hasDecayOccurred ? isotopeBName : isotopeAName;
        }
        return hasDecayOccurred ? leadName : poloniumName;
      }
    );

    const currentDetailsStringProperty = AlphaDecayFluent.a11y.screenSummary.currentDetails.createProperty( {
      atom: model.isPlayAreaEmptyProperty.derived( isEmpty => isEmpty ? 'noAtom' : 'withAtom' ),
      isotope: currentAtomNameProperty
    } );

    const interactionHintStringProperty = new DerivedStringProperty(
      [
        model.hasDecayOccurredProperty,
        AlphaDecayFluent.a11y.screenSummary.interactionHint.addAtomStringProperty,
        AlphaDecayFluent.a11y.screenSummary.interactionHint.afterDecayStringProperty
      ],
      ( hasDecayOccurred, addAtomHint, afterDecayHint ) => {
        return hasDecayOccurred ? afterDecayHint : addAtomHint;
      }
    );

    super( {
      playAreaContent: AlphaDecayFluent.a11y.screenSummary.playAreaStringProperty,
      controlAreaContent: AlphaDecayFluent.a11y.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsStringProperty,
      interactionHintContent: interactionHintStringProperty
    } );

  }
}
