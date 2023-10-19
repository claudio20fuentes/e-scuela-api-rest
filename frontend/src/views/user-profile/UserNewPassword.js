import {
	Grid,
	Typography,
	Card,
	CardContent,
	Divider,
	Button,
	// IconButton,
	Link,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import axios from 'axios';
import { backend_url } from '../../config/variables';

import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
// import EditIcon from '@mui/icons-material/Edit';
// import PageContainer from '../../components/container/PageContainer';
import { UserContext } from '../../context/UserContext';

const UserNewPassword = () => {
	const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();

	// const { user } = useContext(UserContext);

  const { user } = useContext(UserContext);
	const {
		control,
		handleSubmit,
		formState: { errors },
		register,
		watch,
	} = useForm({
		defaultValues: {
			oldpassword: '',
			password: '',
			password2: '',
		},
		mode: 'onTouched',
	});

  const passwordValidations = (password) => {
    if (!/[a-z]/.test(password)) {
      return 'La contraseña debe contener al menos una minúscula';
    } else if (!/[A-Z]/.test(password)) {
      return 'La contraseña debe contener al menos una mayúscula';
    } else if (!/\d/.test(password)) {
      return 'La contraseña debe contener al menos un número';
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
      return 'La contraseña debe contener al menos un caracter especial';
    } else {
      return true;
    }
  };

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.password2) {
        setAlert('Las contraseñas no coinciden');
        return;
      }
      if (data.password.length < 8) {
        setAlert('La contraseña debe tener al menos 8 caracteres');
        return;
      }
      if (passwordValidations(data.password) !== true) {
        setAlert(passwordValidations(data.password));
        return;
      }
      await axios
        .post(`${backend_url}/api/usuario/update-password`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            cliente: localStorage.getItem('cliente')
          },
          body: {
            password: data.password,
            user
          }
        })
        .then((res) => {
        });
    } catch (error) {
      setAlert(
        'Ocurrió un problema al actualizar tu contraseña. Intentalo nuevamente'
      );
    }
  };

  return (
    <Grid container>
      <Grid item pl={3} mb={3} xs={12}>
        <Link href={`#/settings/user`} underline='hover'>
          <Typography fontSize='12px' color='#8F90A6'>
            {`< Volver a Información de Perfil`}
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={12} pl={3} mb={2}>
        <Typography variant='h3'>Cambiar contraseña</Typography>
      </Grid>
      <Grid item xs={12} md={8} display='flex'>
        <Card style={{ width: '100%' }}>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Grid container display='flex' spacing={1}>
                  <Grid item xs={12}>
                    <Controller
                      name='oldpassword'
                      control={control}
                      render={({ field }) => (
                        <>
                          <CustomFormLabel htmlFor='oldpassword'>
                            Contraseña actual
                          </CustomFormLabel>
                          <CustomTextField
                            {...register('oldpassword', {
                              required: {
                                value: true,
                                message: 'Debe ingresar una contraseña',
                              },
                            })}
                            {...field}
                            ref={null}
                            id='oldpassword'
                            type='password'
                            variant='outlined'
                            label='Ingresa tu contraseña actual'
                            fullWidth
                            error={!!errors?.oldpassword}
                            helperText={
                              errors?.oldpassword
                                ? errors.oldpassword.message
                                : null
                            }
                          />
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name='password'
                      control={control}
                      render={({ field }) => (
                        <>
                          <CustomFormLabel htmlFor='password'>
                            Nueva contraseña
                          </CustomFormLabel>
                          <CustomTextField
                            {...register('password', {
                              required: {
                                value: true,
                                message: 'Debe ingresar una contraseña',
                              },
                              minLength: {
                                value: 8,
                                message:
                                  'La contraseña debe tener al menos 8 caracteres',
                              },
                              validate: (value) => passwordValidations(value),
                            })}
                            {...field}
                            ref={null}
                            id='password'
                            type='password'
                            variant='outlined'
                            label='Ingresa tu nueva contraseña'
                            fullWidth
                            error={!!errors?.password}
                            helperText={
                              errors?.password ? errors.password.message : null
                            }
                          />
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name='password2'
                      control={control}
                      render={({ field }) => (
                        <>
                          <CustomFormLabel htmlFor='password'>
                            Repetir nueva contraseña
                          </CustomFormLabel>
                          <CustomTextField
                            {...register('password2', {
                              required: {
                                value: true,
                                message: 'Debe repetir su contraseña',
                              },
                              validate: (value) => {
                                if (watch('password') !== value) {
                                  return 'Las contraseñas no coinciden';
                                }
                              },
                            })}
                            {...field}
                            ref={null}
                            id='password2'
                            type='password'
                            variant='outlined'
                            label='Re-Ingresa tu nueva contraseña'
                            fullWidth
                            error={!!errors?.password2}
                            helperText={
                              errors?.password2
                                ? errors.password2.message
                                : null
                            }
                          />
                        </>
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} mt={4}>
              <Grid item xs={12}>
                <Divider
                  style={{
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                />
              </Grid>
              <Grid
                item
                container
                display='flex'
                justifyContent='flex-end'
                gap={2}
                mt={4}>
                <Link href={`#/settings/user`} underline='none'>
                  <Button
                    sx={{
                      marginTop: '15px',
                    }}
                    onClick={() => {
                      setOpen(false);
                    }}>
                    Cancelar
                  </Button>
                </Link>
                <Button
                  sx={{
                    marginTop: '15px',
                  }}
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit(onSubmit)}
                  >
                  Guardar cambios
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserNewPassword;
