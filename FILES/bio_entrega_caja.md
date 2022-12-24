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







