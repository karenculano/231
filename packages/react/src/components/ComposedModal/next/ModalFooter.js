import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import ButtonSet from '../../ButtonSet';
import classNames from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';

export const ModalFooter = React.forwardRef(function ModalFooter(
  {
    className,
    primaryClassName,
    secondaryButtons,
    secondaryClassName,
    secondaryButtonText,
    primaryButtonText,
    primaryButtonDisabled,
    closeModal, // eslint-disable-line
    onRequestClose, // eslint-disable-line
    onRequestSubmit, // eslint-disable-line
    children,
    danger,
    inputref,
    ...other
  },
  ref
) {
  const prefix = usePrefix();

  function handleRequestClose(evt) {
    closeModal(evt);
    onRequestClose(evt);
  }

  const footerClass = classNames({
    [`${prefix}--modal-footer`]: true,
    [className]: className,
    [`${prefix}--modal-footer--three-button`]:
      Array.isArray(secondaryButtons) && secondaryButtons.length === 2,
  });

  const primaryClass = classNames({
    [primaryClassName]: primaryClassName,
  });

  const secondaryClass = classNames({
    [secondaryClassName]: secondaryClassName,
  });

  const SecondaryButtonSet = () => {
    if (Array.isArray(secondaryButtons) && secondaryButtons.length <= 2) {
      return secondaryButtons.map(
        ({ buttonText, onClick: onButtonClick }, i) => (
          <Button
            key={`${buttonText}-${i}`}
            className={secondaryClass}
            kind="secondary"
            onClick={onButtonClick || handleRequestClose}>
            {buttonText}
          </Button>
        )
      );
    }
    if (secondaryButtonText) {
      return (
        <Button
          className={secondaryClass}
          onClick={handleRequestClose}
          kind="secondary">
          {secondaryButtonText}
        </Button>
      );
    }
    return null;
  };

  return (
    <ButtonSet ref={ref} className={footerClass} {...other}>
      <SecondaryButtonSet />
      {primaryButtonText && (
        <Button
          onClick={onRequestSubmit}
          className={primaryClass}
          disabled={primaryButtonDisabled}
          kind={danger ? 'danger' : 'primary'}
          ref={inputref}>
          {primaryButtonText}
        </Button>
      )}

      {children}
    </ButtonSet>
  );
});

ModalFooter.propTypes = {
  /**
   * Pass in content that will be rendered in the Modal Footer
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the Modal Footer container
   */
  className: PropTypes.string,

  /**
   * Specify an optional function that is called whenever the modal is closed
   */
  closeModal: PropTypes.func,

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger: PropTypes.bool,

  /**
   * The `ref` callback for the primary button.
   */
  inputref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),

  /**
   * Specify an optional function for when the modal is requesting to be
   * closed
   */
  onRequestClose: PropTypes.func,

  /**
   * Specify an optional function for when the modal is requesting to be
   * submitted
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specify whether the primary button should be disabled
   */
  primaryButtonDisabled: PropTypes.bool,

  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.string,

  /**
   * Specify a custom className to be applied to the primary button
   */
  primaryClassName: PropTypes.string,

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.string,

  /**
   * Specify an array of config objects for secondary buttons
   * (`Array<{
   *   buttonText: string,
   *   onClick: function,
   * }>`).
   */
  secondaryButtons: (props, propName, componentName) => {
    if (props.secondaryButtons) {
      if (
        !Array.isArray(props.secondaryButtons) ||
        props.secondaryButtons.length !== 2
      ) {
        return new Error(
          `${propName} needs to be an array of two button config objects`
        );
      }

      const shape = {
        buttonText: PropTypes.node,
        onClick: PropTypes.func,
      };

      props[propName].forEach((secondaryButton) => {
        PropTypes.checkPropTypes(
          shape,
          secondaryButton,
          propName,
          componentName
        );
      });
    }

    return null;
  },

  /**
   * Specify a custom className to be applied to the secondary button
   */
  secondaryClassName: PropTypes.string,
};

ModalFooter.defaultProps = {
  onRequestClose: () => {},
  onRequestSubmit: () => {},
};
