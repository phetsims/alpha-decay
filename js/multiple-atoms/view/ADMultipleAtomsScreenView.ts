// Copyright 2026, University of Colorado Boulder

/**
 * MultipleAtomsScreenView is responsible for the visual representation of the Multiple Atoms Screen in the Alpha Decay simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import NuclearDecayCommonColors from '../../../../nuclear-decay-common/js/NuclearDecayCommonColors.js';
import NuclearDecayCommonConstants from '../../../../nuclear-decay-common/js/NuclearDecayCommonConstants.js';
import NuclearDecayCommonFluent from '../../../../nuclear-decay-common/js/NuclearDecayCommonFluent.js';
import AddAtomsControlPanel from '../../../../nuclear-decay-common/js/view/AddAtomsControlPanel.js';
import NuclearDecayAtomNode from '../../../../nuclear-decay-common/js/view/NuclearDecayAtomNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Stopwatch from '../../../../scenery-phet/js/Stopwatch.js';
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RadialGradient from '../../../../scenery/js/util/RadialGradient.js';
import { rasterizeNode } from '../../../../scenery/js/util/rasterizeNode.js';
import undoSolidShape from '../../../../sherpa/js/fontawesome-5/undoSolidShape.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
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
      isotopePanelMiddleContent: [ electronCloudCheckbox, stopwatchCheckbox ],
      numberOfAtomsInPlayAreaWidth: 40
    }, providedOptions );

    super( model, options );

    const decayingAtomsLayerNode = new Node();
    this.addChild( decayingAtomsLayerNode );

    const populateAtoms = () => {
      decayingAtomsLayerNode.removeAllChildren();

      const modelBounds = this.modelViewTransformProperty.value.viewToModelBounds( playAreaBounds );

      model.activeAtoms.forEach( atom => {
        atom.position = new Vector2(
          dotRandom.nextDoubleInRange( new Range( modelBounds.minX, modelBounds.maxX ) ),
          dotRandom.nextDoubleInRange( new Range( modelBounds.minY, modelBounds.maxY ) )
        );
        const atomNode = new NuclearDecayAtomNode( atom, this.modelViewTransformProperty );
        decayingAtomsLayerNode.addChild( atomNode );
      } );
    };

    const addAtomsPanel = new AddAtomsControlPanel(
      model.atomsToAddProperty,
      model.selectedIsotopeProperty,
      ( n: number ) => {
        model.addMultipleAtoms( n );
        populateAtoms();
        },
      {
        centerX: this.layoutBounds.centerX,
        bottom: this.layoutBounds.maxY - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
      } );
    this.addChild( addAtomsPanel );

    // TODO: Refine this. See https://github.com/phetsims/alpha-decay/issues/3.  Get the info back to the view for
    //       where the atoms can be placed in the model.
    const playAreaBounds = new Bounds2(
      this.halfLifePanel.left,
      this.halfLifePanel.bottom + NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
      this.rightColumnControls.left - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN,
      addAtomsPanel.top - NuclearDecayCommonConstants.SCREEN_VIEW_Y_MARGIN
    );
    this.setPlayAreaBounds( playAreaBounds );

    // Reset button — top-right
    const resetButton = new RectangularPushButton( {
      content: new Path( undoSolidShape, { scale: 0.038, fill: 'black' } ),
      baseColor: NuclearDecayCommonColors.resetButtonProperty,
      listener: () => {
        model.activeAtoms.clear();
        model.addAtom();
      },
      right: playAreaBounds.right,
      top: playAreaBounds.top
    } );
    this.addChild( resetButton );
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
