/* eslint-disable strict */
/* eslint-disable camelcase */
/* eslint-disable */

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldWrapper = void 0;
const react_1 = require("react");
/**
 * Use this hook to manage any field that your form may contain.
 *
 * The most basic usage of this hook is the following:
 * ```jsx
 *
 * interface FieldValues {
 *  userName: string
 *  password: string
 * }
 *
 * ...
 *
 * const { register, validateForm } = useForm<FieldValues>(initialValues)
 *
 * ...
 *
 * const onSubmit = () => {
 *  if(validateForm()) {
 *      // Success process
 *  }
 *  else {
 *      // Error process
 *  }
 * }
 *
 * return <>
 *  <input {...register("userName")(v => v.length > 3)} placeholder={"User name"} />
 *  <input {...register("password")(v => isPassword(v), {className: "form-password-input"})} placeholder={"Password"} type="password" />
 *  <input type="button" onClick={onSubmit} value="Login" />
 * </>
 * ```
 *
 * !Important
 * When using this library, you must set the className for the component in the ```register``` function
 *
 * @param initialValues Optional object that contains the initial values of the form
 * @param errorClassName Optional string that describes the css error class name.
 *  This string will be appended to the className.
 *  You will need to define the style of this class for yourself.
 *  (Default: "error")
 * @returns
 */
const useForm = (initialValues, errorClassName = "error") => {
  const [values, setValues] = (0, react_1.useState)(
    initialValues !== null && initialValues !== void 0 ? initialValues : {}
  );
  const [evaluateFields, setEvaluateFields] = (0, react_1.useState)(false);
  const [fieldEvaluation, setFieldEvaluation] = (0, react_1.useState)(() => ({}));
  /**
   * This function is used to register the field with the specified property
   * of the `useForm`'s initialValues object.
   *
   * @param field A string related to a initialValues' property
   * @param defaultValue The default value in case the related property is undefined (Default: "")
   * @returns This function returns another function that will have two parameters:
   * * isValid: A function ```(value: any) => boolean``` that indicates if the value of the field is correct
   * * options: An optional object that contains optional values:
   * * - canBeWritten: A function ```(value: any) => boolean``` that is used to allow the new user input on the field
   * * - middlewhare: A function ```(value: any) => any``` that is used to change the input type to another
   * * - onChange: A function ```(value: any) => void``` that is fired when the value changes
   * * - className: The className the field will use.
   */
  const register = (field, defaultValue = "") => {
    let _a;
    const fieldValue = (_a = values[field]) !== null && _a !== void 0 ? _a : defaultValue;
    return (isValid, options) => {
      const { canBeWritten, middleware, onChange, className } =
        options !== null && options !== void 0 ? options : {};
      const fieldIsValid = isValid(fieldValue);
      if (fieldEvaluation[field] !== fieldIsValid)
        setFieldEvaluation((f) => ({ ...f, [field]: isValid(fieldValue) }));
      const fieldChange = (value) => {
        const converted = middleware ? middleware(value) : value;
        const can = canBeWritten === undefined || canBeWritten(converted);
        if (can) {
          setFieldEvaluation((f) => ({ ...f, [field]: isValid(converted) }));
          onChange && onChange(converted);
          setValues((d) => ({ ...d, [field]: converted }));
        }
      };
      return {
        value: fieldValue,
        onChange: ({ target: { value } }) => {
          fieldChange(value);
        },
        className: `${className} ${evaluateFields && !fieldIsValid ? errorClassName : ""}`,
        errored: evaluateFields && !fieldEvaluation[field],
        onSimpleChange: (value) => {
          fieldChange(value);
        },
      };
    };
  };
  /**
   * A value that tells if all values in form are valid
   */
  const allValidValues = (() => {
    let e = true;
    for (const key in fieldEvaluation) {
      if (Object.prototype.hasOwnProperty.call(fieldEvaluation, key)) {
        e = e && fieldEvaluation[key] === true;
      }
    }
    return e;
  })();
  /**
   * A function that invokes form validation
   * @returns A boolean that indicates if all form has valid values
   */
  const validateForm = () => {
    const e = allValidValues;
    if (!e) {
      setEvaluateFields(true);
    }
    return e;
  };
  return {
    values,
    setValues,
    register,
    validateForm,
    fieldEvaluation,
    allValidValues,
    setFieldChecking: setEvaluateFields,
    fieldChecking: evaluateFields,
  };
};
exports.default = useForm;
/**
 * In case the field you want to validate is not working with the `register` function,
 * use this component and "register" it.
 * Then, use the `render` property to give the component your field as a function.
 *
 * The `render prop` will have an argument in the function with you can use to
 * adapt your field to the `register` internal structure.
 *
 * Example:
 * ```jsx
 * <FieldWrapper
    {
        ...register(
            "gender"
        )( [condition to aprove] )
    }
    render={p => (
        <MyField
            onChange={(e) => p.onChange(e)}
            value={p.value}
            error={p.error}
        />
    )}
    />
    ```
 */
function FieldWrapper(props) {
  return props.render(props);
}
exports.FieldWrapper = FieldWrapper;
