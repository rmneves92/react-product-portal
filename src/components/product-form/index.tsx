import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {
  Typography,
  Button,
  FormHelperText,
  TextField as Input
} from '@mui/material'
import { NumericFormat } from 'react-number-format'
import { TextField } from '@/components/text-field'
import { IProduct } from '@/@types/product'

type Props = {
  initialValues: IProduct
  onSubmit: (values: IProduct, formActions: { resetForm: () => void }) => void
  formTitle?: string
  buttonLabel: string
}

// Novo componente para o formulário
export const ProductForm = ({
  initialValues,
  onSubmit,
  formTitle,
  buttonLabel = 'Salvar'
}: Props) => {
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    avatar: Yup.string().url('URL inválida').required('Campo obrigatório'),
    preco: Yup.string().required('Campo obrigatório'),
    qt_estoque: Yup.number().required('Campo obrigatório'),
    qt_vendas: Yup.number().required('Campo obrigatório'),
    marca: Yup.string().required('Campo obrigatório')
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '60%'
          }}
        >
          <Typography variant="h5">{formTitle}</Typography>

          <TextField
            fieldName="nome"
            label="Nome"
            errors={errors}
            touched={touched}
          />

          <TextField
            fieldName="avatar"
            label="Avatar URL"
            errors={errors}
            touched={touched}
          />

          <Field
            name="preco"
            render={({ field, form }) => (
              <NumericFormat
                {...field}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                placeholder="R$ 0,00"
                customInput={Input}
                label="Preço"
                style={{ marginTop: '1.5rem', width: '100%' }}
                onValueChange={(values) => {
                  const numericValue = parseFloat(
                    (values.value || '').replace(/\D/g, '')
                  )
                  form.setFieldValue('preco', numericValue || 0)
                }}
              />
            )}
          />
          {errors.preco && touched.preco ? (
            <FormHelperText error>{errors.preco}</FormHelperText>
          ) : null}

          <TextField
            fieldName="qt_estoque"
            label="Quantidade em Estoque"
            errors={errors}
            touched={touched}
          />

          <TextField
            fieldName="qt_vendas"
            label="Quantidade de Vendas"
            errors={errors}
            touched={touched}
          />

          <TextField
            fieldName="marca"
            label="Marca"
            errors={errors}
            touched={touched}
          />

          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: '2rem' }}
          >
            {buttonLabel}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
