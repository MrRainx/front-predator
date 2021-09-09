import BootstrapSwitchButton, {
  Colors,
  ColorsOutline,
} from 'bootstrap-switch-button-react';
import React from 'react';

export interface SwitchButtonProps {
  /**
   * Function to call when the SwitchButton is changed
   */
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  value?: boolean;
  disabled?: boolean;
  onlabel?: string;
  offlabel?: string;
  onstyle?: Colors | ColorsOutline;
  offstyle?: Colors | ColorsOutline;
  size?: 'xs' | 'sm' | 'lg';
  style?: string;
  width?: number;
  height?: number;
}

const SwitchButton: React.FC<SwitchButtonProps> = (props) => {
  return (
    <BootstrapSwitchButton {...props} checked={props.checked || props.value} />
  );
};

export default SwitchButton;
