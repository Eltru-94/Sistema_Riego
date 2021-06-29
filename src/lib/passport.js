const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../basedatos");
const helpers = require("../lib/helpers");

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
     
      const rows = await db.query(
        "SELECT * FROM tbl_usuario u INNER JOIN tbl_cliente c ON c.cli_id=u.cli_id  WHERE u.usu_nombre = ? AND c.cli_estado=?",
        [username,1]
      );
    
      if (rows.length > 0) {
        var user = rows[0];
        const validacion = await helpers.comprarclave(
          password,
          user.usu_contraseña
        );
        if (validacion) {
        
          done(
            null,
            user,
            req.flash("success","Bienvenido "+user.cli_nombre+" "+user.cli_apellido),
  
          );
          
         
        } else {
          done(null, false, req.flash("mensage", "Contraseña Incorrecta"));
        }
      } else {
        done(
          null,
          false,
          req.flash("mensage", "El nombre de usuario no existe ")
        );
      }
    }
  )
);

passport.serializeUser((user, done) => {
  
  done(null, user.usu_id);
});
passport.deserializeUser(async (id, done) => {

  const a = await db.query(
    "SELECT * FROM tbl_rol INNER JOIN tbl_rol_modulo ON (tbl_rol.rol_id = tbl_rol_modulo.rol_id) INNER JOIN tbl_modulo ON (tbl_rol_modulo.mod_id = tbl_modulo.mod_id) INNER JOIN tbl_cliente_rol ON (tbl_rol.rol_id = tbl_cliente_rol.rol_id) INNER JOIN tbl_cliente ON (tbl_cliente_rol.cli_id = tbl_cliente.cli_id) INNER JOIN tbl_usuario ON (tbl_cliente.cli_id = tbl_usuario.cli_id) WHERE tbl_usuario.usu_id=? AND tbl_rol_modulo.rol_mod_estado=?",
    [id, 1]
  );
  
  done(null, a);
});
