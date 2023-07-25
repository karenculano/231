/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { KeyboardEventHandler, PureComponent } from 'react';
import PropTypes, { ReactNodeLike } from 'prop-types';

import classNames from 'classnames';
import throttle from 'lodash.throttle';

import * as keys from '../../internal/keyboard/keys';
import { matches } from '../../internal/keyboard/match';
import { PrefixContext } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { FeatureFlagContext } from '../FeatureFlags';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';

const defaultFormatLabel = (value, label) => {
  return typeof label === 'function' ? label(value) : `${value}${label}`;
};

/**
 * Minimum time between processed "drag" events.
 */
const EVENT_THROTTLE = 16; // ms

/**
 * Event types that trigger "drags".
 */
const DRAG_EVENT_TYPES = new Set(['mousemove', 'touchmove']);

/**
 * Event types that trigger a "drag" to stop.
 */
const DRAG_STOP_EVENT_TYPES = new Set(['mouseup', 'touchend', 'touchcancel']);

/**
 * When twoHandles prop is set, we're in range slider mode with two handles.
 */
enum HandlePosition {
  LOWER = 'lower',
  UPPER = 'upper',
}

type ExcludedAttributes = 'onChange' | 'onBlur';
export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ExcludedAttributes
  > {
  /**
   * The `ariaLabel` for the `<input>`.
   */
  ariaLabelInput?: string;

  /**
   * The `ariaLabel` for the lower bound `<input>` when twoHandles is set.
   */
  ariaLabelInputLower?: string;

  /**
   * The `ariaLabel` for the upper bound `<input>` when twoHandles is set.
   */
  ariaLabelInputUpper?: string;

  /**
   * The child nodes.
   */
  children?: ReactNodeLike;

  /**
   * The CSS class name for the slider, set on the wrapping div.
   */
  className?: string;

  /**
   * `true` to disable this slider.
   */
  disabled?: boolean;

  /**
   * The callback to format the label associated with the minimum/maximum value.
   */
  formatLabel?: (value: number, label: string | undefined) => string;

  /**
   * `true` to hide the number input box.
   */
  hideTextInput?: boolean;

  /**
   * The ID of the `<input>`.
   */
  id?: string;

  /**
   * The `type` attribute of the `<input>`.
   */
  inputType?: string;

  /**
   * `Specify whether the Slider is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the Slider is in an invalid state
   */
  invalidText?: React.ReactNode;

  /**
   * The label for the slider.
   */
  labelText?: ReactNodeLike;

  /**
   * @deprecated
   * `true` to use the light version.
   */
  light?: boolean;

  /**
   * The maximum value.
   */
  max: number;

  /**
   * The label associated with the maximum value.
   */
  maxLabel?: string;

  /**
   * The minimum value.
   */
  min: number;

  /**
   * The label associated with the minimum value.
   */
  minLabel?: string;

  /**
   * The `name` attribute of the `<input>`.
   */
  name?: string;

  /**
   * The `name` attribute of the lower bound `<input>` when twoHandles is set.
   */
  nameLower?: string;

  /**
   * The `name` attribute of the upper bound `<input>` when twoHandles is set.
   */
  nameUpper?: string;

  /**
   * Provide an optional function to be called when the input element
   * loses focus
   */
  onBlur?: (data: {
    value: string;
    handlePosition: HandlePosition | undefined;
  }) => void;

  /**
   * The callback to get notified of change in value.
   * `({ value}) => void`
  //  * @param {{ value }}
   */
  onChange?: (data: {
    value: SliderProps['value'];
    valueLower: SliderProps['valueLower'];
    valueUpper: SliderProps['valueUpper'];
  }) => void;

  /**
   * Provide an optional function to be called when a key is pressed in the number input
   */
  onInputKeyUp?: KeyboardEventHandler<HTMLInputElement>;

  /**
   * The callback to get notified of value on handle release.
   */
  onRelease?: (data: { value: SliderProps['value'] }) => void;

  /**
   * Whether the slider should be read-only
   */
  readOnly?: boolean;

  /**
   * `true` to specify if the control is required.
   */
  required?: boolean;

  /**
   * A value determining how much the value should increase/decrease by moving the thumb by mouse. If a value other than 1 is provided and the input is *not* hidden, the new step requirement should be added to a visible label. Values outside of the `step` increment will be considered invalid.
   */
  step?: number;

  /**
   * A value determining how much the value should increase/decrease by Shift+arrow keys,
   * which will be `(max - min) / stepMultiplier`.
   */
  stepMultiplier?: number;

  /**
   * Turn the slider into a range slider.
   */
  twoHandles?: boolean;

  /**
   * The single value when twoHandles is not set.
   */
  value?: number;

  /**
   * The lower bound value when twoHandles in set.
   */
  valueLower?: number;

  /**
   * The upper bound value when twoHandles in set.
   */
  valueUpper?: number;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

interface CalcValueProps {
  clientX?: number;
  value?: number;
  useRawValue?: boolean;
}

interface CalcLeftPercentProps {
  clientX?: number;
  value?: number;
  range?: number;
}

export default class Slider extends PureComponent<SliderProps> {
  static propTypes = {
    /**
     * The `ariaLabel` for the `<input>`.
     */
    ariaLabelInput: PropTypes.string,

    /**
     * The `ariaLabel` for the lower bound `<input>` when twoHandles is set.
     */
    ariaLabelInputLower: PropTypes.string,

    /**
     * The `ariaLabel` for the upper bound `<input>` when twoHandles is set.
     */
    ariaLabelInputUpper: PropTypes.string,

    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class name for the slider.
     */
    className: PropTypes.string,

    /**
     * `true` to disable this slider.
     */
    disabled: PropTypes.bool,

    /**
     * The callback to format the label associated with the minimum/maximum value.
     */
    formatLabel: PropTypes.func,

    /**
     * `true` to hide the number input box.
     */
    hideTextInput: PropTypes.bool,

    /**
     * The ID of the `<input>`.
     */
    id: PropTypes.string,

    /**
     * The `type` attribute of the `<input>`.
     */
    inputType: PropTypes.string,

    /**
     * `Specify whether the Slider is currently invalid
     */
    invalid: PropTypes.bool,

    /**
     * Provide the text that is displayed when the Slider is in an invalid state
     */
    invalidText: PropTypes.node,

    /**
     * The label for the slider.
     */
    labelText: PropTypes.node,

    /**
     * `true` to use the light version.
     */
    light: deprecate(
      PropTypes.bool,
      'The `light` prop for `Slider` is no longer needed and has ' +
        'been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.'
    ),

    /**
     * The maximum value.
     */
    max: PropTypes.number.isRequired,

    /**
     * The label associated with the maximum value.
     */
    maxLabel: PropTypes.string,

    /**
     * The minimum value.
     */
    min: PropTypes.number.isRequired,

    /**
     * The label associated with the minimum value.
     */
    minLabel: PropTypes.string,

    /**
     * The `name` attribute of the `<input>`.
     */
    name: PropTypes.string,

    /**
     * The `name` attribute of the lower bound `<input>` when twoHandles is set.
     */
    nameLower: PropTypes.string,

    /**
     * The `name` attribute of the upper bound `<input>` when twoHandles is set.
     */
    nameUpper: PropTypes.string,

    /**
     * Provide an optional function to be called when the input element
     * loses focus
     */
    onBlur: PropTypes.func,

    /**
     * The callback to get notified of change in value.
     */
    onChange: PropTypes.func,

    /**
     * Provide an optional function to be called when a key is pressed in the number input
     */
    onInputKeyUp: PropTypes.func,

    /**
     * The callback to get notified of value on handle release.
     */
    onRelease: PropTypes.func,

    /**
     * Whether the slider should be read-only
     */
    readOnly: PropTypes.bool,

    /**
     * `true` to specify if the control is required.
     */
    required: PropTypes.bool,

    /**
     * A value determining how much the value should increase/decrease by moving the thumb by mouse. If a value other than 1 is provided and the input is *not* hidden, the new step requirement should be added to a visible label. Values outside of the `step` increment will be considered invalid.
     */
    step: PropTypes.number,

    /**
     * A value determining how much the value should increase/decrease by Shift+arrow keys,
     * which will be `(max - min) / stepMultiplier`.
     */
    stepMultiplier: PropTypes.number,

    /**
     * Turn the slider into a range slider.
     */
    twoHandles: PropTypes.bool,

    /**
     * The value.
     */
    value: PropTypes.number.isRequired,

    /**
     * The lower bound value when twoHandles in set.
     */
    valueLower: PropTypes.number,

    /**
     * The upper bound value when twoHandles in set.
     */
    valueUpper: PropTypes.number,

    /**
     * `Specify whether the Slider is in a warn state
     */
    warn: PropTypes.bool,

    /**
     * Provide the text that is displayed when the Slider is in an warn state
     */
    warnText: PropTypes.node,
  };

  static defaultProps = {
    hideTextInput: false,
    step: 1,
    stepMultiplier: 4,
    disabled: false,
    minLabel: '',
    maxLabel: '',
    inputType: 'number',
    readOnly: false,
    twoHandles: false,
  };

  static contextType = FeatureFlagContext;

  state = {
    value: this.props.value,
    valueLower: this.props.valueLower,
    valueUpper: this.props.valueUpper,
    left: 0,
    leftLower: 0,
    leftUpper: 0,
    needsOnRelease: false,
    isValid: true,
    activeHandle: null,
  };

  thumbRef: React.RefObject<HTMLDivElement>;
  thumbRefLower: React.RefObject<HTMLDivElement>;
  thumbRefUpper: React.RefObject<HTMLDivElement>;
  filledTrackRef: React.RefObject<HTMLDivElement>;
  element: HTMLDivElement | null = null;
  inputId = '';
  track: HTMLDivElement | null | undefined;

  constructor(props) {
    super(props);
    this.thumbRef = React.createRef<HTMLDivElement>();
    this.thumbRefLower = React.createRef<HTMLDivElement>();
    this.thumbRefUpper = React.createRef<HTMLDivElement>();
    this.filledTrackRef = React.createRef<HTMLDivElement>();
  }

  /**
   * Sets up initial slider position and value in response to component mount.
   */
  componentDidMount() {
    const { twoHandles } = this.props;
    if (this.element) {
      if (twoHandles) {
        const { value: valueLower, left: leftLower } = this.calcValue({
          value: this.state.valueLower,
          useRawValue: true,
        });
        const { value: valueUpper, left: leftUpper } = this.calcValue({
          value: this.state.valueUpper,
          useRawValue: true,
        });
        this.setState({ valueLower, leftLower, valueUpper, leftUpper });
      } else {
        const { value, left } = this.calcValue({
          value: this.state.value,
          useRawValue: true,
        });
        this.setState({ value, left });
      }
    }
  }

  /**
   * Handles firing of `onChange` and `onRelease` callbacks to parent in
   * response to state changes.
   *
   * @param {*} prevProps prevProps
   * @param {*} prevState The previous Slider state, used to see if callbacks
   * should be called.
   */
  componentDidUpdate(prevProps, prevState) {
    // Fire onChange event handler if present, if there's a usable value, and
    // if the value is different from the last one

    if (this.props.twoHandles) {
      if (this.thumbRefLower.current) {
        this.thumbRefLower.current.style.left = `${this.state.leftLower}%`;
      }
      if (this.thumbRefUpper.current) {
        this.thumbRefUpper.current.style.left = `${this.state.leftUpper}%`;
      }
      if (this.filledTrackRef.current) {
        this.filledTrackRef.current.style.transform = `translate(${
          this.state.leftLower
        }%, -50%) scaleX(${
          (this.state.leftUpper - this.state.leftLower) / 100
        })`;
      }
    } else {
      if (this.thumbRef.current) {
        this.thumbRef.current.style.left = `${this.state.left}%`;
      }
      if (this.filledTrackRef.current) {
        this.filledTrackRef.current.style.transform = `translate(0%, -50%) scaleX(${
          this.state.left / 100
        })`;
      }
    }
    if (
      (prevState.value !== this.state.value ||
        prevState.valueLower !== this.state.valueLower ||
        prevState.valueUpper !== this.state.valueUpper) &&
      typeof this.props.onChange === 'function'
    ) {
      this.props.onChange({
        value: this.state.value,
        valueLower: this.state.valueLower,
        valueUpper: this.state.valueUpper,
      });
    }

    // Fire onRelease event handler if present and if needed
    if (
      this.state.needsOnRelease &&
      typeof this.props.onRelease === 'function'
    ) {
      this.props.onRelease({ value: this.state.value });
      // Reset the flag
      this.setState({ needsOnRelease: false });
    }

    // If value from props does not change, do nothing here.
    // Otherwise, do prop -> state sync without "value capping".
    if (
      prevProps.value === this.props.value &&
      prevProps.valueLower === this.props.valueLower &&
      prevProps.valueUpper === this.props.valueUpper &&
      prevProps.max === this.props.max &&
      prevProps.min === this.props.min
    ) {
      return;
    }
    this.setState(
      this.calcValue({
        value: this.props.value,
        useRawValue: true,
      })
    );
  }

  /**
   * Synonymous to ECMA2017+ `Math.clamp`.
   *
   * @param {number} val
   * @param {number} min
   * @param {number} max
   *
   * @returns `val` if `max>=val>=min`; `min` if `val<min`; `max` if `val>max`.
   */
  clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
  }

  /**
   * Sets up "drag" event handlers and calls `this.onDrag` in case dragging
   * started on somewhere other than the thumb without a corresponding "move"
   * event.
   *
   * @param {Event} evt The event.
   */
  onDragStart = (evt) => {
    // Do nothing if component is disabled
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    // Register drag stop handlers
    DRAG_STOP_EVENT_TYPES.forEach((element) => {
      this.element?.ownerDocument.addEventListener(element, this.onDragStop);
    });

    // Register drag handlers
    DRAG_EVENT_TYPES.forEach((element) => {
      this.element?.ownerDocument.addEventListener(element, this.onDrag);
    });

    let activeHandle;
    if (this.props.twoHandles) {
      const distanceToLower = this.calcDistanceToHandle(
        HandlePosition.LOWER,
        evt.clientX
      );
      const distanceToUpper = this.calcDistanceToHandle(
        HandlePosition.UPPER,
        evt.clientX
      );
      if (distanceToLower <= distanceToUpper) {
        activeHandle = HandlePosition.LOWER;
      } else {
        activeHandle = HandlePosition.UPPER;
      }
    }
    this.setState({ activeHandle });

    // Perform first recalculation since we probably didn't click exactly in the
    // middle of the thumb.
    this.onDrag(evt, activeHandle);
  };

  /**
   * Unregisters "drag" and "drag stop" event handlers and calls sets the flag
   * indicating that the `onRelease` callback should be called.
   */
  onDragStop = () => {
    // Do nothing if component is disabled
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    // Remove drag stop handlers
    DRAG_STOP_EVENT_TYPES.forEach((element) => {
      this.element?.ownerDocument.removeEventListener(element, this.onDragStop);
    });

    // Remove drag handlers
    DRAG_EVENT_TYPES.forEach((element) => {
      this.element?.ownerDocument.removeEventListener(element, this.onDrag);
    });

    // Set needsOnRelease flag so event fires on next update. Also unset the
    // activeHandle.
    this.setState({ needsOnRelease: true, isValid: true, activeHandle: null });
  };

  /**
   * Handles a "drag" event by recalculating the value/thumb and setting state
   * accordingly.
   *
   * @param {Event} evt The event.
   * @param activeHandle
   *   The first drag event call, we may have an explicit activeHandle value,
   *   which is to be used before state is used.
   */
  _onDrag = (evt, activeHandle: HandlePosition | null = null) => {
    activeHandle = activeHandle ?? this.state.activeHandle;
    // Do nothing if component is disabled, or we have no event.
    if (this.props.disabled || this.props.readOnly || !evt) {
      return;
    }

    let clientX;
    if ('clientX' in evt) {
      clientX = evt.clientX;
    } else if (
      'touches' in evt &&
      0 in evt.touches &&
      'clientX' in evt.touches[0]
    ) {
      clientX = evt.touches[0].clientX;
    } else {
      // Do nothing if we have no valid clientX
      return;
    }

    const { value, left } = this.calcValue({
      clientX,
      value: this.state.value,
    });
    // If we're set to two handles, negotiate which drag handle is closest to
    // the users' interaction.
    if (this.props.twoHandles && activeHandle) {
      this.setStateForHandle(activeHandle, { value, left });
    } else {
      this.setState({ value, left, isValid: true });
    }
  };

  /**
   * Throttles calls to `this._onDrag` by limiting events to being processed at
   * most once every `EVENT_THROTTLE` milliseconds.
   */
  onDrag = throttle(this._onDrag, EVENT_THROTTLE, {
    leading: true,
    trailing: false,
  });

  /**
   * Handles a `keydown` event by recalculating the value/thumb and setting
   * state accordingly.
   *
   * @param {Event} evt The event.
   */
  onKeyDown = (evt) => {
    // Do nothing if component is disabled or we don't have a valid event
    if (this.props.disabled || this.props.readOnly || !('which' in evt)) {
      return;
    }

    let delta = 0;
    if (matches(evt.which, [keys.ArrowDown, keys.ArrowLeft])) {
      delta = -(this.props.step ?? Slider.defaultProps.step);
    } else if (matches(evt.which, [keys.ArrowUp, keys.ArrowRight])) {
      delta = this.props.step ?? Slider.defaultProps.step;
    } else {
      // Ignore keys we don't want to handle
      return;
    }

    // If shift was held, account for the stepMultiplier
    if (evt.shiftKey) {
      const stepMultiplier = this.props.stepMultiplier;
      delta *= stepMultiplier ?? Slider.defaultProps.stepMultiplier;
    }

    if (this.props.twoHandles && this.state.activeHandle) {
      const currentValue =
        this.state.activeHandle === HandlePosition.LOWER
          ? this.state.valueLower
          : this.state.valueUpper;
      const { value, left } = this.calcValue({
        value: this.calcValueForDelta(currentValue, delta, this.props.step),
      });
      this.setStateForHandle(this.state.activeHandle, {
        value,
        left,
      });
    } else {
      const { value, left } = this.calcValue({
        // Ensures custom value from `<input>` won't cause skipping next stepping
        // point with right arrow key, e.g. Typing 51 in `<input>`, moving focus
        // onto the thumb and the hitting right arrow key should yield 52 instead
        // of 54.
        value: this.calcValueForDelta(this.state.value, delta, this.props.step),
      });
      this.setState({ value, left, isValid: true });
    }
  };

  /**
   * Provides the two-way binding for the input field of the Slider. It also
   * Handles a change to the input field by recalculating the value/thumb and
   * setting state accordingly.
   *
   * @param {Event} evt The event.
   */

  onChange = (evt) => {
    // Do nothing if component is disabled
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    // Do nothing if we have no valid event, target, or value
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    const targetValue = Number.parseFloat(evt.target.value);

    // Avoid calling calcValue for invalid numbers, but still update the state.
    const activeHandle =
      evt.target.dataset.handlePosition ?? HandlePosition.LOWER;
    if (isNaN(targetValue)) {
      if (this.props.twoHandles && activeHandle === HandlePosition.LOWER) {
        this.setState({ valueLower: evt.target.value });
      } else if (
        this.props.twoHandles &&
        activeHandle === HandlePosition.UPPER
      ) {
        this.setState({ valueUpper: evt.target.value });
      } else {
        this.setState({ value: evt.target.value });
      }
    } else {
      const { value, left } = this.calcValue({
        value: targetValue,
        useRawValue: true,
      });
      if (this.props.twoHandles) {
        this.setStateForHandle(activeHandle, { value, left });
      } else {
        this.setState({
          value,
          left,
        });
      }
    }
  };

  /**
   * Checks for validity of input value after clicking out of the input. It also
   * Handles state change to isValid state.
   *
   * @param {Event} evt The event.
   */
  onBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    // Do nothing if we have no valid event, target, or value
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    // determine validity of input change after clicking out of input
    const validity = evt.target.checkValidity();
    const { value } = evt.target;

    this.setState({ isValid: validity });
    this.props.onBlur?.({
      value,
      handlePosition: evt.target?.dataset?.handlePosition as
        | HandlePosition
        | undefined,
    });
  };

  calcLeftPercent = ({ clientX, value, range }: CalcLeftPercentProps) => {
    const boundingRect = this.element?.getBoundingClientRect?.();
    let width = boundingRect ? boundingRect.right - boundingRect.left : 0;

    // Enforce a minimum width of at least 1 for calculations
    if (width <= 0) {
      width = 1;
    }

    // If a clientX is specified, use it to calculate the leftPercent. If not,
    // use the provided value to calculate it instead.
    if (clientX) {
      const leftOffset = clientX - (boundingRect?.left ?? 0);
      return leftOffset / width;
    } else if (value && range) {
      // Prevent NaN calculation if the range is 0.
      return range === 0 ? 0 : (value - this.props.min) / range;
    }
    // We should never end up in this scenario, but in case we do, and to
    // re-assure Typescript, return 0.
    return 0;
  };

  calcSteppedValuePercent = ({ leftPercent, range }) => {
    const totalSteps = range / (this.props.step ?? Slider.defaultProps.step);

    let steppedValue =
      Math.round(leftPercent * totalSteps) *
      (this.props.step ?? Slider.defaultProps.step);
    const steppedPercent = this.clamp(steppedValue / range, 0, 1);

    steppedValue = this.clamp(
      steppedValue + this.props.min,
      this.props.min,
      this.props.max
    );

    return [steppedValue, steppedPercent];
  };

  /**
   * Calculates a new Slider `value` and `left` (thumb offset) given a `clientX`,
   * `value`, or neither of those.
   * - If `clientX` is specified, it will be used in
   *   conjunction with the Slider's bounding rectangle to calculate the new
   *   values.
   * - If `clientX` is not specified and `value` is, it will be used to
   *   calculate new values as though it were the current value of the Slider.
   * - If neither `clientX` nor `value` are specified, `this.props.value` will
   *   be used to calculate the new values as though it were the current value
   *   of the Slider.
   *
   * @param {object} params
   * @param {number} [params.clientX] Optional clientX value expected to be from
   *   an event fired by one of the Slider's `DRAG_EVENT_TYPES` events.
   * @param {number} [params.value] Optional value use during calculations if
   *   clientX is not provided.
   * @param {boolean} [params.useRawValue=false] `true` to use the given value as-is.
   */
  calcValue = ({ clientX, value, useRawValue = false }: CalcValueProps) => {
    const range = this.props.max - this.props.min;

    const leftPercent = this.calcLeftPercent({
      clientX,
      value,
      range,
    });

    if (useRawValue) {
      // Adjusts only for min/max of thumb position
      return {
        value,
        left: Math.min(1, Math.max(0, leftPercent)) * 100,
      };
    }

    const [steppedValue, steppedPercent] = this.calcSteppedValuePercent({
      leftPercent,
      range,
    });

    return { value: steppedValue, left: steppedPercent * 100 };
  };

  calcDistanceToHandle = (handle: HandlePosition, clientX) => {
    // left is a whole value between 0 and 100.
    const left =
      handle === HandlePosition.LOWER
        ? this.state.leftLower
        : this.state.leftUpper;
    const boundingRect = this.getSliderBoundingRect();
    const handleX = boundingRect.left + (left / 100) * boundingRect.width;
    return Math.abs(handleX - clientX);
  };

  /**
   * Given the current value, delta and step, calculate the new value.
   *
   * @param {number} currentValue
   *   Current value user is moving from.
   * @param {number} delta
   *   Movement from the current value. Can be positive or negative.
   * @param {number} step
   *   A value determining how much the value should increase/decrease by moving
   *   the thumb by mouse.
   */
  calcValueForDelta = (
    currentValue,
    delta,
    step = Slider.defaultProps.step
  ) => {
    return (
      (delta > 0 ? Math.floor(currentValue / step) * step : currentValue) +
      delta
    );
  };

  /**
   * Sets state relevant to the given handle position.
   *
   * Guards against setting either lower or upper values beyond its counterpart.
   */
  setStateForHandle = (handle: HandlePosition, { value, left }) => {
    const { valueLower, valueUpper, leftLower, leftUpper } = this.state;
    if (handle === HandlePosition.LOWER) {
      // Don't allow higher than the upper handle.
      this.setState({
        valueLower: valueUpper && value > valueUpper ? valueUpper : value,
        leftLower: valueUpper && value > valueUpper ? leftUpper : left,
        isValid: true,
      });
    } else {
      this.setState({
        valueUpper: valueLower && value < valueLower ? valueLower : value,
        leftUpper: valueLower && value < valueLower ? leftLower : left,
        isValid: true,
      });
    }
  };

  /**
   * Get the bounding rect for the slider DOM element.
   *
   * If the bounding rect is not available, a new, empty DOMRect is returned.
   */
  getSliderBoundingRect = (): DOMRect => {
    const boundingRect = this.element?.getBoundingClientRect();
    return boundingRect ?? new DOMRect();
  };

  // syncs invalid state and prop
  static getDerivedStateFromProps(props, state) {
    const { isValid } = state;
    // will override state in favor of invalid prop
    if (props.invalid === true && isValid === true) {
      return {
        isValid: false,
      };
    }

    if (props.invalid === false && isValid === false) {
      return {
        isValid: true,
      };
    }
    //if invalid prop is not provided, state will remain the same
    return null;
  }

  render() {
    const {
      ariaLabelInput,
      ariaLabelInputLower,
      ariaLabelInputUpper,
      className,
      hideTextInput,
      id = (this.inputId =
        this.inputId ||
        `__carbon-slider_${Math.random().toString(36).substr(2)}`),
      min,
      minLabel,
      max,
      maxLabel,
      formatLabel = defaultFormatLabel,
      labelText,
      step,
      stepMultiplier: _stepMultiplier,
      inputType,
      invalidText,
      required,
      disabled,
      name,
      nameLower,
      nameUpper,
      light,
      readOnly,
      warn,
      warnText,
      twoHandles,
      ...other
    } = this.props;

    delete other.onRelease;
    delete other.invalid;

    const { value, valueLower, valueUpper, isValid } = this.state;

    return (
      <PrefixContext.Consumer>
        {(prefix) => {
          const labelId = `${id}-label`;
          const labelClasses = classNames(`${prefix}--label`, {
            [`${prefix}--label--disabled`]: disabled,
          });

          const sliderClasses = classNames(
            `${prefix}--slider`,
            { [`${prefix}--slider--disabled`]: disabled },
            { [`${prefix}--slider--readonly`]: readOnly }
          );

          const fixedInputClasses = [
            `${prefix}--text-input`,
            `${prefix}--slider-text-input`,
          ];
          const conditionalClasses = {
            [`${prefix}--text-input--light`]: light,
            [`${prefix}--text-input--invalid`]: !readOnly && isValid === false,
            [`${prefix}--slider-text-input--hidden`]: hideTextInput,
            [`${prefix}--slider-text-input--warn`]: !readOnly && warn,
          };
          const inputClasses = classNames(
            fixedInputClasses,
            conditionalClasses
          );
          const lowerInputClasses = classNames([
            ...fixedInputClasses,
            `${prefix}--slider-text-input--lower`,
            conditionalClasses,
          ]);
          const upperInputClasses = classNames([
            ...fixedInputClasses,
            `${prefix}--slider-text-input--upper`,
            conditionalClasses,
          ]);

          return (
            <div className={classNames(`${prefix}--form-item`, className)}>
              <label htmlFor={id} className={labelClasses} id={labelId}>
                {labelText}
              </label>
              <div className={`${prefix}--slider-container`}>
                {twoHandles ? (
                  <input
                    type={hideTextInput ? 'hidden' : inputType}
                    id={`${id}-lower-input-for-slider`}
                    name={nameLower}
                    className={lowerInputClasses}
                    value={valueLower}
                    aria-labelledby={!ariaLabelInputLower ? labelId : undefined}
                    aria-label={
                      ariaLabelInputLower ? ariaLabelInputLower : undefined
                    }
                    disabled={disabled}
                    required={required}
                    min={min}
                    max={max}
                    step={step}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onKeyUp={this.props.onInputKeyUp}
                    data-invalid={!isValid && !readOnly ? true : null}
                    data-handle-position={
                      twoHandles ? HandlePosition.LOWER : null
                    }
                    aria-invalid={!isValid && !readOnly ? true : undefined}
                    readOnly={readOnly}
                  />
                ) : null}
                <span className={`${prefix}--slider__range-label`}>
                  {formatLabel(min, minLabel)}
                </span>
                {/* @ts-ignore onBlur + onChange types are incompatible*/}
                <div
                  className={sliderClasses}
                  ref={(node) => {
                    this.element = node;
                  }}
                  onMouseDown={this.onDragStart}
                  onTouchStart={this.onDragStart}
                  onKeyDown={this.onKeyDown}
                  role="presentation"
                  tabIndex={-1}
                  data-invalid={!isValid && !readOnly ? true : null}
                  {...other}>
                  <div
                    className={`${prefix}--slider__thumb ${prefix}--slider__thumb--lower`}
                    role="slider"
                    id={id}
                    tabIndex={!readOnly ? 0 : -1}
                    aria-valuemax={twoHandles ? valueUpper : max}
                    aria-valuemin={min}
                    aria-valuenow={twoHandles ? valueLower : value}
                    aria-labelledby={labelId}
                    ref={twoHandles ? this.thumbRefLower : this.thumbRef}
                    onFocus={() =>
                      this.setState({ activeHandle: HandlePosition.LOWER })
                    }
                  />
                  {twoHandles ? (
                    <div
                      className={`${prefix}--slider__thumb ${prefix}--slider__thumb--upper`}
                      role="slider"
                      id={id}
                      tabIndex={!readOnly ? 0 : -1}
                      aria-valuemax={max}
                      aria-valuemin={valueLower}
                      aria-valuenow={valueUpper}
                      aria-labelledby={labelId}
                      ref={this.thumbRefUpper}
                      onFocus={() =>
                        this.setState({ activeHandle: HandlePosition.UPPER })
                      }
                    />
                  ) : null}
                  <div
                    className={`${prefix}--slider__track`}
                    ref={(node) => {
                      this.track = node;
                    }}
                  />
                  <div
                    className={`${prefix}--slider__filled-track`}
                    ref={this.filledTrackRef}
                  />
                </div>
                <span className={`${prefix}--slider__range-label`}>
                  {formatLabel(max, maxLabel)}
                </span>
                <input
                  type={hideTextInput ? 'hidden' : inputType}
                  id={`${id}-${twoHandles ? 'upper-' : ''}input-for-slider`}
                  name={twoHandles ? nameUpper : name}
                  className={twoHandles ? upperInputClasses : inputClasses}
                  value={twoHandles ? valueUpper : value}
                  aria-labelledby={
                    (twoHandles && !ariaLabelInputUpper) ||
                    (!twoHandles && !ariaLabelInput)
                      ? labelId
                      : undefined
                  }
                  aria-label={
                    twoHandles && ariaLabelInputUpper
                      ? ariaLabelInputUpper
                      : ariaLabelInput
                      ? ariaLabelInput
                      : undefined
                  }
                  disabled={disabled}
                  required={required}
                  min={min}
                  max={max}
                  step={step}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  onKeyUp={this.props.onInputKeyUp}
                  data-invalid={!isValid && !readOnly ? true : null}
                  data-handle-position={
                    twoHandles ? HandlePosition.UPPER : null
                  }
                  aria-invalid={!isValid && !readOnly ? true : undefined}
                  readOnly={readOnly}
                />
                {!readOnly && isValid === false && (
                  <WarningFilled
                    className={`${prefix}--slider__invalid-icon`}
                  />
                )}

                {!readOnly && warn && isValid && (
                  <WarningAltFilled
                    className={`${prefix}--slider__invalid-icon ${prefix}--slider__invalid-icon--warning`}
                  />
                )}
              </div>
              {!readOnly && isValid === false && (
                <div
                  className={classNames(
                    `${prefix}--slider__validation-msg`,
                    `${prefix}--slider__validation-msg--invalid`,
                    `${prefix}--form-requirement`
                  )}>
                  {invalidText}
                </div>
              )}
              {!readOnly && warn && isValid && (
                <div
                  className={classNames(
                    `${prefix}--slider__validation-msg`,
                    `${prefix}--form-requirement`
                  )}>
                  {warnText}
                </div>
              )}
            </div>
          );
        }}
      </PrefixContext.Consumer>
    );
  }
}
