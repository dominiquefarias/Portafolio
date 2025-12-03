nombre_dragon_a = input("Dime el nombre del dragon A:")
edad_dragon_a = input("Dime la edad del dragon A:")
clasificacion_dragon_a = ""
Fuerza_dragon_a = 0
resistencia_dragon_a = 0
print("El nombre del dragon A es:", nombre_dragon_a)
print("La edad del dragon A es:", edad_dragon_a)

nombre_dragon_b = input("Dime el nombre del dragon B:")
edad_dragon_b = input("Dime la edad del dragon B:")
clasificacion_dragon_b = ""
Fuerza_dragon_b = 0
resistencia_dragon_b = 0
print("El nombre del dragon B es:", nombre_dragon_b)
print("La edad del dragon B es:", edad_dragon_b)

try:
    edad_dragon_a = int(edad_dragon_a)
    print("He convertido la edad correctamente")
except
    edad_dragon_a = 100
    print("No he convertido la edad correctamente")
try
    edad_dragon_b = int(edad_dragon_b)
    print("He convertido la edad correctamente")
except
    edad_dragon_b = 100
    print("No he convertido la edad correctamente")

if edad_dragon_a < 50:
    clasificacion_dragon_a = "joven"
elif edad_dragon_a >= 50 and edad_dragon_a <= 199:
    clasificacion_dragon_a = "adulto"
elif edad_dragon_a >= 200:
    clasificacion_dragon_a = "anciano"
    
if edad_dragon_b < 50:
    clasificacion_dragon_b = "joven"
elif edad_dragon_b >= 50 and edad_dragon_b <= 199:
    clasificacion_dragon_b = "adulto"
elif edad_dragon_b >= 200:
    clasificacion_dragon_b = "anciano"

for dia in range (1,4)
    if clasificacion_a == "joven":
        fuerza_dragon_a += 2
        resistencia_dragon_a += 2
    elif clasificacion_dragon_a == "adulto"
        fuerza_dragon_a += 1
        resistencia_dragon_a += 1
    else clasificacion_dragon_a 
        fuerza_dragon_a +=1
        resistencia_dragon_a += 1

