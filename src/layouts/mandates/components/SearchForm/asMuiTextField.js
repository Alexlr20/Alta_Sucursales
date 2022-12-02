/* eslint-disable */
/**
 * Wrapper for useForm's register function to allow easy MuiTextField integration
 * @param props the `useForm()`
 * @returns `A useForm implementation compatible to MUI TextField`
 */
export function asMuiTextField(props) {
  return {
    error: props.errored,
    onChange: props.onChange,
    value: props.value,
  };
}
