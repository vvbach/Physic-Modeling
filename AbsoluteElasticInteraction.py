import math

n = int(input('n = '))
v1 = 0
v2 = -1
m1 = 1
m2 = m1 * pow(10, n)
collisionObject = 'object'

W = 1/2 * m2 * v2**2


def OnCollisionWithObject():
    # Calculate new impulse before collision
    p = m1 * v1 + m2 * v2 

    # Calculate new velocity
    a = (m1**2 / m2) + m1
    b = - 2 * m1 * p / m2
    c = p**2 / m2 - 2 * W
    delta = b * b - 4 * a * c 
    sqrt_val = math.sqrt(abs(delta)) 
    v1_solutions = [(-b + sqrt_val)/(2 * a), (-b - sqrt_val)/(2 * a)]

    for v1_sol in v1_solutions:
        if round(v1_sol, 2) != round(v1, 2):
            new_v1 = v1_sol
            break
    new_v2 = (p - m1 * new_v1) / m2
    return new_v1, new_v2

def OnCollisionWithWall():
    return -v1

count = 0
while (True):
    if (collisionObject == 'object'):
        v1, v2 = OnCollisionWithObject()
        count += 1
        collisionObject = 'wall'
        print(v1, v2)
    elif (collisionObject == 'wall'):
        v1 = OnCollisionWithWall()
        count += 1
        collisionObject = 'object'
    if (v2 >= v1 and v1 >= 0):
        break

print("Number of collisions:", count)