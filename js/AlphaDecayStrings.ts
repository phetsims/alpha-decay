// Copyright 2026, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/browser/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/browser/LocalizedStringProperty.js';
import alphaDecay from './alphaDecay.js';

type StringsType = {
  'alpha-decay': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'singleAtomStringProperty': LocalizedStringProperty;
    'multipleAtomsStringProperty': LocalizedStringProperty;
    'decayRateStringProperty': LocalizedStringProperty;
  };
  'a11y': {
    'screenSummary': {
      'playAreaStringProperty': LocalizedStringProperty;
      'controlAreaStringProperty': LocalizedStringProperty;
      'currentDetailsStringProperty': LocalizedStringProperty;
      'interactionHint': {
        'addAtomStringProperty': LocalizedStringProperty;
        'afterDecayStringProperty': LocalizedStringProperty;
      }
    };
    'radioactiveAtomHeadingStringProperty': LocalizedStringProperty;
    'addAtomButton': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'atomInPlayArea': {
      'readyToDecayStringProperty': LocalizedStringProperty;
      'readyToDecayLastDecayStringProperty': LocalizedStringProperty;
      'nowPresentStringProperty': LocalizedStringProperty;
    };
    'atomDecay': {
      'alphaParticleEmittedStringProperty': LocalizedStringProperty;
      'resetAtomHintStringProperty': LocalizedStringProperty;
    };
    'resetAtomButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'decayDataHeadingStringProperty': LocalizedStringProperty;
  }
};

const AlphaDecayStrings = getStringModule( 'ALPHA_DECAY' ) as StringsType;

alphaDecay.register( 'AlphaDecayStrings', AlphaDecayStrings );

export default AlphaDecayStrings;
