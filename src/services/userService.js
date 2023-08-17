const User = require('../models/userModel');
const Rol = require('../models/rolModel');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');


class UserService {

    async getAllUsers() {
        try {
            const result = await User.findAll();
            return result;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);

        }
    }

    async getOnUser(id) {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {

            console.error(`Error al obtener el user con ID ${id}:`, error);

        }
    }

    async createUser(userData, roleId) {

        try {

            const { correo, contrasena } = userData;

            //Validación de entrada
            if (!correo || !contrasena) throw new Error('Correo y contraseña son campos obligatorios');

            const existignUser = await User.findOne({ where: { correo } });

            if (existignUser) throw new Error('El usuario ya está registrado');

            //Validación de contraseña fuerte
            const isStrongPassword = this.validateStrongPassword(contrasena);

            if (!isStrongPassword) throw new Error('La contraseña no cumple con los requisitos de seguridad');

            const hashedPassword = await bcrypt.hash(contrasena, 10);

            //Iniciar transacción
            const transaction = await sequelize.transaction();

            try {
                const user = await User.create({
                    ...userData,
                    contrasena: hashedPassword,
                }, { transaction });

                const role = await Rol.findByPk(roleId, { transaction });

                if (!role) console.error('Rol no encontrado');

                await user.addRole(role, { transaction });

                await transaction.commit();

                return user;

            } catch (error) {
                //Revertir transacción en caso de error
                await transaction.rollback();
                throw error;
            }

        } catch (error) {
            console.error("Error al crear el user", error);
            throw error;
        }
    }

    //Validar password => ej: Messi1010
    validateStrongPassword(contrasena) {

        const minLongitud = 8;
        const maxLongitud = 10;
        const expRegMayuscula = /[A-Z]/;
        const expRegDigito = /\d/;

        if (contrasena.lenth < minLongitud || contrasena.lenth > maxLongitud) return false;

        if (!expRegMayuscula.test(contrasena)) return false;

        if (!expRegDigito.test(contrasena)) return false;

        return true;

    }

    async authenticateUser(correo, contrasena) {
        try {
            const user = await User.findOne({ where: { correo } });

            if (!user) {
                return null;
            }

            const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

            if (!isPasswordValid) {
                return null;
            }

            return user;

        } catch (error) {
            console.error("Error al autenticar al usuario:", error);
            throw error;
        }
    }

    async updateUser(id, userData) {
        try {

            const { correo, contrasena } = userData;
            const user = await User.findByPk(id);

            if (!user) {
                console.error('Usuario no encontrado');
                return null;
            }


            if (contrasena) {

                const isStrongPassword = this.validateStrongPassword(contrasena);

                if (!isStrongPassword) throw new Error('La nueva contraseña no cumple con los requisitos de seguridad');

                const hashedPassword = await bcrypt.hash(contrasena, 10);
                userData.contrasena = hashedPassword;

            }

            await user.update(userData);
            return user;

        } catch (error) {
            console.error(`Error al editar el user con ID ${id}:`, error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                console.error('User no encontrado')
            }
            await user.destroy();
            return true;
        } catch (error) {
            console.error(`Error al eliminar el user con ID ${id}:`, error);

        }
    }

}

module.exports = new UserService();