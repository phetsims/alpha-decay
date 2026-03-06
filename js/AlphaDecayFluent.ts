// Copyright 2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from alpha-decay-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
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
addToMapIfDefined( 'screen_decayRates', 'screen.decayRatesStringProperty' );

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
    decayRatesStringProperty: _.get( AlphaDecayStrings, 'screen.decayRatesStringProperty' )
  }
};

export default AlphaDecayFluent;

alphaDecay.register('AlphaDecayFluent', AlphaDecayFluent);
