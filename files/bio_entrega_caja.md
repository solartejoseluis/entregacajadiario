2022-12-21

# PROYECTO ENTREGA DE CAJA DIARIO
objetivos de la herramienta
- agilizar la toma de datos para la entrega de caja

A diario se hacen las ventas y se debe entregar el dinero que ingresa.
tambien se realizan gestiones de productos por fuera del movimiento tradicional
se hace entrega del las gestiones realizadas

El encargado de turno le entrega a auxiliar administrativa
la auxiliar administrativa recibe

Mensualmente se genera un cálculo de las ventas para el pago a vendedores.
Dentro de un tiempo podremos estandarizar la lista de los proveedores y les podremos hacer un seguimiento.

### ---------------------
### SECUENCIAS DE TRABAJO
### ---------------------


1.- El responsable del turno ingresa al sistema
	esto lo hace con su usuario y login, configura la fecha del turno,

el sistema le muestra la hoja principal, vacia.
### PANTALLA PRINCIPAL
	- boton NUEVA VENTA
	- boton CERRAR TURNO
	- Listado datables de las ventas.
	- Cuadro de indicadores:
		- Utilidad acumulada del dia por vendedor
		- cantidad de


2.- ingresa las diferentes gestiones que va haciendo en el turno.
3.- al final del turno para hacer el cierre necesita:
	- total vendido en la caja principal.
	- total de gestiones por turno, estas gestiones quedan almacenadas ya al final de mes se hará un consolidado por vendedor.
	- total a entregar


#### Necesitamos generar un registro del turno en que se se encuentra.
Estos datos deberían aparecer registrados en cada venta:
- Hora de registro de la gestión.
- Encargado de ese turno.


### ideas:


### boton CIERRE DEL TURNO.
	abre el modal de DATOS PARA CIERRE
### modal DATOS PARA CIERRE
	- [input] SALDO DE CAJA DEL TURNO
	- [input disabled] TOTAL UTILIDAD DE GESTIONES (sumatoria de las UTILIDADES del dia)
	- [input disabled] TOTAL A ENTREGAR (sumatoria de SALDOCAJATURNO + UTILIDADES)
	- [input] TOTAL DESCUADRE
### boton CERRAR TURNO.



### -----------------------------------------------------------
###  DEFINICION DE LOS ELEMENTOS DE CONSTRUCCION DE LA APLICACION
### -----------------------------------------------------------

Está elaborado en una plantilla de google docs pero voy a organizarlo con un formulario.

- fecha de hoy (calculado con una funcion)
- responsable del turno (select toma datos de la lista de usuarios)
- vendedor (select usuarios vendedores)
- total saldo_turno (input agregar numero)
- total utilidad_gestiones (sumatoria de campo utilidad)
- total a entregar (calculo saldo_turno + utilidad_gestiones)
- total descuadre

### datatables
- producto (input nombre del producto)
- proveedor (input nombre del proveedor)
- precio de costo (input costo del produto)
- precio de venta (input precio de venta)
- vendedor (select nombre usuarios vendedores)
- utilidad  (calculo precio_costo - precio_venta)
(descartado) utilidad acumulada (suma la utilidad anterior)

## DEFINICION DE LAS TABLAS

### TABLA USERS
user_id                 [int(5)]
user_nombre             [varchar(50)]
user_apellido           [varchar(50)]
user_cargo              [varchar(50)]
user_perfil             [varchar(50)]


### TABLA TURNOS
turno_id                [int(5)]
turno_fecha_actual      [datetime]
turno_total_caja        [int(10)]
turno_total_utilidad   [int(10) sumatoria: venta_utilidad]
turno_total_entrega     [int(10)suma total_utilidad + total_caja]
turno_total_descuadre   [int(10)]
(fk)user_id (encargado) [int(5)]


### TABLA VENTAS
venta_id                [int(5)]
venta_fecha             [datetime]
venta_nombre_producto   [varchar(50)]
venta_nombre_proveedor  [varchar(50)]
venta_costo_producto    [int(10)]
venta_valor_venta       [int(10)]
venta_utilidad          [cálculo: valor_venta - costo_producto]
(fk)user_id (vendedor)  [int(5)]
(fk)turno_id            [int(5)]


De la pantalla inicial ya tenemos un borrador que ha sido diseñado en google docs
Ya he diseñado la plantilla de trabajo:

[si] Crear el proyecto con los archivos de domiciliosv01
[ ] Ajuste de la pantalla principal
[ ] Creacion de la base de datos y llenado de campos
[ ] Eliminacion de los archivos sobrantes
[ ] Pruebas de Ajuste
[ 4] Backup de la  base de datos
[ ] Subir el proyecto a github

2022-12-26
## PROBLEMA
el boton edit no desplega el modal.
he revisado las opciones y resulta que no está pasando la variable venta_id
## BUSCANDO SOLUCION:

### TRAYECTORIA DE BOTÓN EDIT
- Se pulsa btnEdit /
- Activa jQuery = show btn confirm edit,  ejercuta función recuperarRegistro que recoge en una variable los datos del datatables que estan disponibles al momento en la (tr) actual (fila) y saca el valor venta_id y lo pasa


## 2022-12-29_jue
9:.09
resumen de ajustes pendientes:

- conversion de inputs texto a mayusculas automático.
- conversion de campos numericos a formato de pesos
- elaborar calculos y consultas para tablas superiores
-

16:29
## SOBRE EL FORMATO DE LAS CIFRAS DE DINERO.
He realizado varias pruebas con la presentacion de los numeros de cifras de dinero, cambiando el formato, poniendo

El signo de pesos al comienzo y cada miles separado por puntos.
pero ocurre un problema al realizar operaciones con los datos, que hay necesidad de quitarle el signo de pesos y el punto para poder hacer operaciones con ellos.

Por lo que veo en este momento tendre que hacer una operacion de convertirlos para mostrarlos con el formato, convertirlos para hacer operaciones, y luego convertirlos para volverlos a mostrar.
esta es un tema que tengo pendiente por resolver, cual es la mejor gestion que le voy a dar a estos datos.


# --------

continuando con el prouyecto ahora
necesito ir alorando los calculos de sintesis de los datos del dia. vamos a ver como puedo organizar esto...

### CONSULTAS

#### Sumar la utilidad del tuno de YULY

SELECT SUM(venta_utilidad) AS utilidad_yuly FROM VENTAS WHERE user_id = 2;


ya he puesto un dato a la  tabla de vendedores y necesito ahora recargar el dato cuando se actualiza el listado....


### 22:03
resumen de los ajustes realizados hoy:
- realizada sumatoria de utilidad por vendedores
- realizadad sumatoria total de utilidad
- creacion de tabla TURNOS


la tabla turnos hace falta crearle la relacion con la tabla de ventas
en esta tabla coloqu el campo de responsable de turno y en comentarios especifique que tomara los datos de la tabla  USERS esto me da la idea para no usar u nombre de campo que no se adecua a los datos.
 esto me estaba pasando con los datos de los vendeores que son los mismos user, pero en este contexto asumen otro rokl, deberian llamarse vendedores. esto es un cambio propuesto.

las consultas para los datos de sumatoria de vendedores los puse con los nombres propios de las dos vendedoras, los voy a cambiar a vendedor01, vendedor02.

Definición de la lógica para almacenar los datos del saldo de caja principal del turno y ello daria para el calculo del total a antregar, y tambien esta el campo  de descuadre del turno.
estos datos se van a almacenar en la tabla de turnos

He hecho una corrección al select del  modal de Edición, el problema que tenia era que no me mostraba los datos del nombre del vendedor solo podir a mostrar el codigo del vendedor, quería que se mostrara el select con los datos del nombre vendedor, la solución fue solo pasarle el dato que recogi de la consulta al select y mostró el dato: nombre del vendedor. esto me dejo pensando en que puedo entonces usar el mismo Modal de VENTA NUEVA tambien para editar, y asi me ahorraria unas líneas de código, lo que tendría que hacer es colocar algunas funciones que cambien el texto del titulo, y los botones. Aunque  veo que asi el codigo quedaria mezclado...
la ventaja que tengo ahora que los separé es eso, poder seguir el proceso de una forma mas clara. vamos a ver como evoluciona esto.

### HACE FALTA:

[X] crear la relación entre tablas TURNOS y VENTAS
[X] cambiar nombres propios de vendedores por palabra vendedor
[] Construir el modal de cerrar turno
[] Construir entrada a la aplicación indicando: responsable del turno, el horario del turno.

Voy notando que este proyecto de entrega de caja diaria a futuro se va fusionar con el seguimiento de actividades del del turno, que ya hemos planeado con calidad, lo justifico en el sentido de que el usuario va a tener todas las funciones en la misma pantalla y no se va a saturar con muchas pantallas por llenar.

Hace falta el módulo de observación del rol administrador en el que habrán estadísticas del comportamiento y cálculos con los datos historicos consignados.

voy notando que si tuviera un diagrama de casos de uso a esta momento estaria bnastante complejo, pero nos podria ayudar a ver y a agrupar la funcionalidades que necesita el proyecto.


## 2022-12-30

11:27
## REALIZADO
Ajustes para mostrar datos en pantalla principal

	- Se cambió "nombres propios" de vendedores por palabra vendedor en el código.
	- Se reorganizó y agrupó el código adicionando comentarios a manera de etiquetas de inicio y fin de las secciones.
	- Se creó funciones y procesos de código para los vendedores 3 y 4
	- se agregó 2 nuevos usuarios a tabla USERS.
	- se agregó una función en el modal edición que copia el dato del select al input oculto y permite guardar dato actualizado.
	- se creó una función que agrupa otras funciones de actualzación de los datos en pantalla principal para los vendedores, esto permite resumir código. se agraga al final de los ciclos de edicion y borrado.


# 2022-12-30_vie 14:18

### PARA HACER
[X] crear la relación entre tabla TURNOS y tabla VENTAS.
[X] crear la relación entre tabla TURNOS y tabla USERS.
[75%] construir la ventana de entrada a la aplicacion.





### REALIZADO

	- Se creó la relación de la tabla turnos y ventas por el campo turno_id.
	- Se creó la relación entre la tabla TURNOS y USERS por medio de los campos TURNOS.turno.responsable y USERS.user_id.
	- se creó la pantalla inicial inicio_home.html y el archivo comandos inicio.js
	- se creó carpeta js, carpeta img, carpeta css y se ubican los archivos respectivos en cada una.


### COMENTARIOS


turnos de suricentro:


1.- SEMANA 7:00am - 1:00pm
2.- SEMANA 1:00pm 10:00pm

3.- SÁBADO 7:00am - 2:00pm
4.- SÁBADO 2:00pm - 10:00pm

5.- DOMINGO 8:00am - 4:00pm




## 2022-12-31 VIE 23:38
Cambié el monbre de la base de datos a CONTROLCAJA

