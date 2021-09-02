import CheckBox from './CheckBox';
import ControlledWrapper from './ControlledWrapper';
import Controller from './Controller';
import CustomErrorMessage from './CustomErrorMessage';
import DateInput from './DateInput';
import FieldWrapper from './FieldWrapper';
import Group from './Group';
import IconAddon from './IconAddon';
import NonFieldErrors from './NonFieldErrors';
import NumberInput from './NumberInput';
import Password from './Password';
import Select from './Select';
import TextArea from './TextArea';
import TextInput from './TextInput';

const Form = {
  TextInput: TextInput,
  NumberInput: NumberInput,
  DateInput: DateInput,
  Password: Password,
  TextArea: TextArea,
  Checkbox: CheckBox,
  IconAddon: IconAddon,
  FieldWrapper: FieldWrapper,
  ControlledWrapper: ControlledWrapper,
  Group: Group,
  Select: Select,
  Controller: Controller,
  ErrorMessage: CustomErrorMessage,
  NonFieldErrors: NonFieldErrors,
};

export default Form;
