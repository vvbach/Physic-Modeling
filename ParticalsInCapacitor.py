import numpy as np
import matplotlib.pyplot as plt
import math

# Constants
e = -1.6e-19  # elementary charge (C)
m = 9.1e-31   # electron mass (kg)

# Capacitor dimensions
r = 3e-2        # Interior radius (m)
R = 7e-2        # External radius (m)
L = 15e-2       # Length (m)

# Initial conditions
V = 7e6         # Initial speed (m/s)

U = (R - r) * 2 * m * math.log(R / r) * (V**2 / L**2) / abs(e) # Minimal voltage

# Function to calculate acceleration_coef
def acceleration_coef() -> float:
    return e * U / (m * math.log(R / r))

# Function to calculate y based on x
def calculate_Yx(x) -> float:
    return R + 1 / 2 * acceleration_coef() * (x**2 / V**2)

def calculate_Yt(t) -> float:
    return R + 1 / 2 * acceleration_coef() * (t**2)

def calculate_Ayt(t) -> float:
    return acceleration_coef()
     
def calculate_Vyt(t) -> float:
    return acceleration_coef() * t

# Simulation parameters
dx = 1.5e-3
dt = 10e-10           # Time step (s)
total_time = 10e-8    # Total simulation time (s)

x_array = np.arange(0, L, dx)
t_array = np.arange(0, total_time, dt)
yx_array, y_array, Vy_array, ay_array = [], [], [], []

for x in x_array:
    yx_array.append(calculate_Yx(x))

for t in t_array:
    y_array.append(calculate_Yt(t))
    Vy_array.append(calculate_Vyt(t))
    ay_array.append(calculate_Ayt(t))

# Convert lists to NumPy arrays for easier manipulation
yx_array = np.array(yx_array)
y_array = np.array(y_array)
Vy_array = np.array(Vy_array)
ay_array = np.array(ay_array)

# Calculate the time of the fly
t_end = math.sqrt(2 / abs(acceleration_coef()) * (R - r)) 
print('t_end = ', t_end)
v_end = calculate_Vyt(t_end)
print('v_end = ', v_end)

# Position vs. time
plt.subplot(221)
plt.plot(t_array, y_array)
plt.title('y(t)')
plt.xlabel('Time (s)')
plt.ylabel('Position (m)')

# Velocity vs. time
plt.subplot(222)
plt.plot(t_array, Vy_array)
plt.title('Vy(t)')
plt.xlabel('Time (s)')
plt.ylabel('Velocity (m/s)')

# Acceleration vs. time
plt.subplot(223)
plt.plot(t_array, ay_array)
plt.title('ay(t)')
plt.xlabel('Time (s)')
plt.ylabel('Acceleration (m/s^2)')

# Position vs. time
plt.subplot(224)
plt.plot(x_array, yx_array)
plt.title('y(x)')
plt.xlabel('Position (m)')
plt.ylabel('Position (m)')

plt.tight_layout()
plt.show()