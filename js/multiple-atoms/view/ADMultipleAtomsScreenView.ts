// Copyright 2026, University of Colorado Boulder

/**
 * MultipleAtomsScreenView is responsible for the visual representation of the Multiple Atoms Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Stopwatch from '../../../../scenery-phet/js/Stopwatch.js';
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RadialGradient from '../../../../scenery/js/util/RadialGradient.js';
import { rasterizeNode } from '../../../../scenery/js/util/rasterizeNode.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import AlphaDecayScreenView, { AlphaDecayScreenViewOptions } from '../../common/view/AlphaDecayScreenView.js';
import ADMultipleAtomsModel from '../model/ADMultipleAtomsModel.js';

type SelfOptions = EmptySelfOptions;

type ADMultipleAtomsScreenViewOptions = SelfOptions & AlphaDecayScreenViewOptions;

export default class ADMultipleAtomsScreenView extends AlphaDecayScreenView {

  public constructor( model: ADMultipleAtomsModel, providedOptions: ADMultipleAtomsScreenViewOptions ) {

    // TODO: Move them to wherever we create VisibleProperties https://github.com/phetsims/alpha-decay/issues/3
    const electronCloudVisibleProperty = new BooleanProperty( false );
    const stopwatchVisibleProperty = new BooleanProperty( false );

    const stopwatchIcon = rasterizeNode( new StopwatchNode( new Stopwatch( {
      isVisible: true,
      tandem: Tandem.OPT_OUT
    } ), {
      numberDisplayOptions: {
        textOptions: {
          maxWidth: 100
        }
      },
      tandem: Tandem.OPT_OUT
    } ), {
      resolution: 5,
      nodeOptions: {
        // tandem: tandem.createTandem( 'stopwatchIcon' ),
        visiblePropertyOptions: { phetioFeatured: true }
      }
    } );
    stopwatchIcon.setScaleMagnitude( 0.3 );

    const electronCloudRadius = 10;
    const electronCloudCheckbox = new Checkbox( electronCloudVisibleProperty,
      new HBox( {
        spacing: 10,
        children: [
          new Text( NuclearDecayCommonFluent.electronCloudStringProperty, { font: NuclearDecayCommonConstants.CONTROL_FONT } ),
          new Circle( electronCloudRadius, {
            fill: new RadialGradient( 0, 0, 0, 0, 0, electronCloudRadius )
              .addColorStop( 0, 'rgba( 0, 0, 255, 100 )' )
              .addColorStop( 0.9, 'rgba( 0, 0, 255, 0 )' )
          } )
        ]
      } )
    );
    const stopwatchCheckbox = new Checkbox( stopwatchVisibleProperty,
      new HBox( {
        spacing: 10,
        children: [
          new Text( NuclearDecayCommonFluent.stopwatchStringProperty, { font: NuclearDecayCommonConstants.CONTROL_FONT } ),
          stopwatchIcon
        ]
      } )
    );

    const options = optionize<ADMultipleAtomsScreenViewOptions, SelfOptions, AlphaDecayScreenViewOptions>()( {
      isotopePanelMiddleContent: [ electronCloudCheckbox, stopwatchCheckbox ]
    }, providedOptions );

    super( model, options );
  }

  /**
   * Resets the view.
   */
  public override reset(): void {
    // TO BE IMPLEMENTED
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    // TO BE IMPLEMENTED
  }
}
