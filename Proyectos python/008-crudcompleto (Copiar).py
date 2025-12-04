import sqlite3

conexion = sqlite3.connect("empresa.db")
cursor = conexion.cursor()

print("Programa agenda SQLite Dominique Farias")
while True:
    print("Escoge una opción:\n1.-Crear cliente\n2.-Listar clientes\n3.-Actualizar clientes\n4.-Eliminar clientes\n5.-Salir del programa")
    opcion = int(input("Selecciona una opcion: "))
    if opcion == 1:
        nombre = input("Introduce el nombre del cliente:")
        apellidos = input("Introduce los apellidos del cliente:")
        email = input("Introduce el email del cliente: ")
        cursor.execute("""
            INSERT INTO clientes (nombre, apellidos, email) VALUES (?, ?, ?);
        """, (nombre, apellidos, email))
        conexion.commit()
        
    elif opcion == 2:
        cursor.execute('SELECT * FROM clientes;')
        filas = cursor.fetchall()
        for fila in filas:
            print(fila)

    elif opcion == 3:
        identificador = input("Introduce el identificador a actualizar:")
        nombre = input("Introduce el nombre del nuevo cliente:")
        apellidos = input("Introduce los apellidos del nuevo cliente:")
        email = input("Introduce el email del nuevo cliente: ")
        cursor.execute("""
            UPDATE clientes SET
            nombre = ?,
            apellidos = ?,
            email = ?
            WHERE Identificador = ?;
        """, (nombre, apellidos, email, identificador))
        conexion.commit()
            
    elif opcion == 4:
        identificador = input("Introduce el identificador a eliminar: ")
        cursor.execute("""
            DELETE FROM clientes WHERE Identificador = ?;
        """, (identificador,))
        conexion.commit()

    elif opcion == 5:
        print("byebye")
        exit()

