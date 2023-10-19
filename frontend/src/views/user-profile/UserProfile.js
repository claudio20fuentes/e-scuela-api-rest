import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  IconButton,
  Link,
} from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import { Controller, useForm } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import { backend_url } from '../../config/variables';
import axios from 'axios';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from '../../context/UserContext';
// import PageContainer from '../../components/container/PageContainer';

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userMail, setUserMail] = useState('');
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    mail: '',
  });
  const { user: userData } = useContext(UserContext);

  const {
    control,
    handleSubmit,
    // register,
    // formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      await axios
        .put(
          `${backend_url}/api/usuario/update-user/${userData.id}`,
          { nombre: userName, celular: userPhone },
          {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('token'),
              cliente: localStorage.getItem('cliente'),
            },
          }
        )
        .then((res) => {
          setOpen(!open);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const rolType = (rol) => {
    switch (rol) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Profesor de Asignatura';
      case 3:
        return 'Profesor Guía';
      case 4:
        return 'Apoderado';
      default:
        return 'Sin rol';
    }
  };

  return (
    <PageContainer title='Profile' description='User profile'>
      <Grid container>
        <Grid item xs={12} pl={3} mb={2}>
          <Typography variant='h3'>Mi Perfil</Typography>
        </Grid>
        <Grid item xs={12} md={8} display='flex'>
          <Card style={{ width: '100%' }}>
            <CardContent>
              <Grid container>
                <Grid item xs={12} display='flex' justifyContent='flex-end'>
                  {!open && (
                    <IconButton
                      aria-label='expand row'
                      size='small'
                      onClick={() => setOpen(!open)}>
                      <EditIcon color='primary' />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Grid container display='flex' spacing={1}>
                    <Grid item xs={12}>
                      <Controller
                        name='userName'
                        control={control}
                        render={({ field }) => (
                          <>
                            <CustomFormLabel htmlFor='userName'>
                              Nombre Completo
                            </CustomFormLabel>
                            <CustomTextField
                              {...field}
                              ref={null}
                              id='userName'
                              variant='outlined'
                              fullWidth
                              value={userData.name}
                              onChange={(e) => setUserName(e.target.value)}
                              disabled={!open}
                            />
                          </>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor='email'>Email</CustomFormLabel>
                      <CustomTextField
                        id='email'
                        variant='outlined'
                        fullWidth
                        value={userData.mail}
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor='role'>Tipo de Perfil</CustomFormLabel>
                      <CustomTextField
                        id='role'
                        variant='outlined'
                        fullWidth
                        value={rolType(userData.rol)}
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name='userPhone'
                        control={control}
                        render={({ field }) => (
                          <>
                            <CustomFormLabel htmlFor='userPhone'>
                              Teléfono
                            </CustomFormLabel>
                            <CustomTextField
                              {...field}
                              ref={null}
                              id='userPhone'
                              variant='outlined'
                              value={userData.phone}
                              onChange={(e) => setUserPhone(e.target.value)}
                              fullWidth
                              disabled={!open}
                            />
                          </>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor='pwd'>
                        Contraseña
                      </CustomFormLabel>
                      <CustomTextField
                        id='pwd'
                        variant='outlined'
                        fullWidth
                        disabled={true}
                        value={'thisisapassword'}
                        type='password'
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      display='flex'
                      justifyContent='flex-end'
                      pr={1}>
                      <Link
                        underline='none'
                        href='#/settings/user/new-password'>
                        <Typography
                          fontStyle='italic'
                          fontSize='16px'
                          fontWeight='400'
                          color='#5DB5A9'>
                          Cambiar contraseña
                        </Typography>
                      </Link>
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
                {open && (
                  <Grid
                    item
                    container
                    display='flex'
                    justifyContent='flex-end'
                    gap={2}
                    mt={4}>
                    <Button
                      sx={{
                        marginTop: '15px',
                      }}
                      variant='contained'
                      color='primary'
                      onClick={handleSubmit(onSubmit)}>
                      Guardar cambios
                    </Button>
                    <Button
                      sx={{
                        marginTop: '15px',
                      }}
                      variant='contained'
                      color='error'
                      onClick={() => {
                        setUserName(`${user.nombre} ${user.apellido || ''}`);
                        setUserPhone(user.celular || '');
                        setOpen(false);
                      }}>
                      Cancelar
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
