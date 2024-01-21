import { FormHelperText, TextField as Input } from '@mui/material'
import { Field, FieldAttributes, FieldProps } from 'formik'

type Props = {
  fieldName: string
  label: string
  errors: {
    [key: string]: string
  }
  touched: {
    [key: string]: boolean
  }
} & FieldAttributes<any>

export const TextField = ({
  fieldName,
  label,
  errors,
  touched,
  ...props
}: Props) => (
  <>
    <Field type="text" name={fieldName}>
      {(fieldProps: FieldProps<any>) => {
        const { field } = fieldProps
        const { name, ...restField } = field
        return (
          <Input
            {...restField}
            {...props}
            label={label}
            name={name}
            style={{ marginTop: '1.5rem', width: '100%' }}
          />
        )
      }}
    </Field>
    {errors[fieldName] && touched[fieldName] && (
      <FormHelperText error>{errors[fieldName]}</FormHelperText>
    )}
  </>
)
