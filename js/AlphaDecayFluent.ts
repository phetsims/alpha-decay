// Copyright 2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from alpha-decay-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import alphaDecay from './alphaDecay.js';
import AlphaDecayStrings from './AlphaDecayStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( AlphaDecayStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'alpha_decay_title', 'alpha-decay.titleStringProperty' );
addToMapIfDefined( 'screen_singleAtom', 'screen.singleAtomStringProperty' );
addToMapIfDefined( 'screen_multipleAtoms', 'screen.multipleAtomsStringProperty' );
addToMapIfDefined( 'screen_decayRate', 'screen.decayRateStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea', 'a11y.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_controlArea', 'a11y.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_noAtom', 'a11y.screenSummary.currentDetails.noAtomStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_interactionHint_addAtom', 'a11y.screenSummary.interactionHint.addAtomStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_interactionHint_afterDecay', 'a11y.screenSummary.interactionHint.afterDecayStringProperty' );
addToMapIfDefined( 'a11y_radioactiveAtomHeading', 'a11y.radioactiveAtomHeadingStringProperty' );
addToMapIfDefined( 'a11y_addAtomButton_accessibleHelpText', 'a11y.addAtomButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_resetAtomButton_accessibleName', 'a11y.resetAtomButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_decayDataHeading', 'a11y.decayDataHeadingStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${FluentLibrary.formatMultilineForFtl( stringProperty.value )}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const AlphaDecayFluent = {
  "alpha-decay": {
    titleStringProperty: _.get( AlphaDecayStrings, 'alpha-decay.titleStringProperty' )
  },
  screen: {
    singleAtomStringProperty: _.get( AlphaDecayStrings, 'screen.singleAtomStringProperty' ),
    multipleAtomsStringProperty: _.get( AlphaDecayStrings, 'screen.multipleAtomsStringProperty' ),
    decayRateStringProperty: _.get( AlphaDecayStrings, 'screen.decayRateStringProperty' )
  },
  a11y: {
    screenSummary: {
      playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea', _.get( AlphaDecayStrings, 'a11y.screenSummary.playAreaStringProperty' ) ),
      controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_controlArea', _.get( AlphaDecayStrings, 'a11y.screenSummary.controlAreaStringProperty' ) ),
      currentDetails: {
        noAtomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_noAtom', _.get( AlphaDecayStrings, 'a11y.screenSummary.currentDetails.noAtomStringProperty' ) ),
        withAtomStringProperty: _.get( AlphaDecayStrings, 'a11y.screenSummary.currentDetails.withAtomStringProperty' )
      },
      interactionHint: {
        addAtomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_interactionHint_addAtom', _.get( AlphaDecayStrings, 'a11y.screenSummary.interactionHint.addAtomStringProperty' ) ),
        afterDecayStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_interactionHint_afterDecay', _.get( AlphaDecayStrings, 'a11y.screenSummary.interactionHint.afterDecayStringProperty' ) )
      }
    },
    radioactiveAtomHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_radioactiveAtomHeading', _.get( AlphaDecayStrings, 'a11y.radioactiveAtomHeadingStringProperty' ) ),
    addAtomButton: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_addAtomButton_accessibleHelpText', _.get( AlphaDecayStrings, 'a11y.addAtomButton.accessibleHelpTextStringProperty' ) )
    },
    atomInPlayArea: {
      readyToDecayStringProperty: _.get( AlphaDecayStrings, 'a11y.atomInPlayArea.readyToDecayStringProperty' ),
      readyToDecayLastDecayStringProperty: _.get( AlphaDecayStrings, 'a11y.atomInPlayArea.readyToDecayLastDecayStringProperty' ),
      nowPresentStringProperty: _.get( AlphaDecayStrings, 'a11y.atomInPlayArea.nowPresentStringProperty' )
    },
    resetAtomButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_resetAtomButton_accessibleName', _.get( AlphaDecayStrings, 'a11y.resetAtomButton.accessibleNameStringProperty' ) )
    },
    decayDataHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_decayDataHeading', _.get( AlphaDecayStrings, 'a11y.decayDataHeadingStringProperty' ) )
  }
};

export default AlphaDecayFluent;

alphaDecay.register('AlphaDecayFluent', AlphaDecayFluent);
